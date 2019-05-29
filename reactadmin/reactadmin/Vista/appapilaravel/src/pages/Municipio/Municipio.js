import React, {Component} from 'react'
import axios from 'axios';
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';


class Municipio extends Component {
constructor (props){
    super(props);
    this.state= {
            municipio :[],
            sweetShow : false ,
            sweetTitle : '',
            sweetText : '',
            sweetType : '',

    }
}

llamar_listar(){
    setTimeout(() => {
        axios({
            method: 'get',
            url: `${URL}/Municipio`,
             headers: {
                    "Authorization": "bearer "+TOKEN
                }
            
            }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    municipio : r.data
                }); 
            }).catch(error=>{
                alert("Error");
            });    
    }, 100)
    
}

componentDidMount() {
    this.llamar_listar();
}


editar(id_municipio){
    this.props.history.push(`/Municipio/modificar/${id_municipio}`);
}

cambiar_estado(id_municipio){
    axios({
        method: 'delete',
        url: `${URL}/Municipio/${id_municipio}`,
         headers: {
                "Authorization": "bearer "+TOKEN
            }
        }).then(respuesta=>{
            let r = respuesta.data;
               if (r.ok){
                this.setState({
                    sweetShow : true,
                    sweetText : r.mensaje,
                    sweetTitle : "hola",
                    sweetType : "success"

             });
             this.llamar_listar();
               }    
        }).catch(error=>{
            alert("Error");
        });
}





boton_estado(clase, texto, id_municipio){

    return (<button onClick={()=>{
        this.cambiar_estado(id_municipio);
}} className={clase}>{texto}</button>)
}


listar(){
if(this.state.municipio.length > 0){
    return this.state.municipio.map(
        (e ,i)=>
        
        <tr key={i} >
           <td>{e.Nombre}</td>
           <td>{e.id_departamento}</td>
           <td>{e.estado == 1? 'Activo' : 'Inactivo'}</td>
           <td> 
               { 
                   e.estado == 1?
                   this.boton_estado("btn btn-danger","inactivar",e.id_municipio)
                   :
                   this.boton_estado("btn btn-success","Activar",e.id_municipio)
               }
               <button onClick={()=>this.editar(e.id_municipio)} className="btn btn-primary">Editar</button>
           </td>
        </tr>
        
        );    

}

}

cargando(){
    return(<tr>
        <td colSpan="12" className="text-center"><img src="./giphy.gif"/></td>
        </tr>
        )
}
      render(){
          return (
              <div>
              <h1>Municipio</h1>
              <table className="table table-bordered">
                 <thead>
                        <tr>
                                <th>Municipio</th>
                                <th>Departamento</th>
                                <th>Estado</th>
                                <th>Opciones</th>

                        </tr>
                </thead>
                <tbody>
                {this.listar()==null?this.cargando():this.listar()}
                </tbody>
              </table>


              <SweetAlert
              show={this.state.sweetShow}
              title={this.state.sweetTitle}
              text={this.state.sweetText}
              value={this.state.sweetType}
              onConfirm={() => this.setState({ sweetShow: false })}
            />
              </div>
          );        
      }

}

export default Municipio