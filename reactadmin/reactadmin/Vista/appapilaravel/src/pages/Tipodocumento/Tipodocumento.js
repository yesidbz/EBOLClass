import React, {Component} from 'react'
import axios from 'axios';
import {URL,TOKEN} from '../../config/config';
import SweetAlert from 'sweetalert-react';


class Tipodocumento extends Component {
constructor (props){
    super(props);
    this.state= {
            Tipodocumento :[],
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
            url: `${URL}/Tipodocumento`,
             headers: {
                    "Authorization": "bearer "+TOKEN
                }
            
            }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    Tipodocumento : r.data
                }); 
            }).catch(error=>{
                alert("Error");
            });    
    }, 100)
    
}

componentDidMount() {
    this.llamar_listar();
}


editar(id_tipodocumento){
    this.props.history.push(`/Tipodocumento/modificar/${id_tipodocumento}`);
}

cambiar_estado(id_tipodocumento){
    axios({
        method: 'delete',
        url: `${URL}/Tipodocumento/${id_tipodocumento}`,
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





boton_estado(clase, texto, id_tipodocumento){

    return (<button onClick={()=>{
        this.cambiar_estado(id_tipodocumento);
}} className={clase}>{texto}</button>)
}


listar(){
if(this.state.Tipodocumento.length > 0){
    return this.state.Tipodocumento.map(
        (e ,i)=>
        
        <tr key={i} >
           <td>{e.nombre}</td>
           <td>{e.estado == 1? 'Activo' : 'Inactivo'}</td>
           <td> 
               { 
                   e.estado == 1?
                   this.boton_estado("btn btn-danger","inactivar",e.id_tipodocumento)
                   :
                   this.boton_estado("btn btn-success","Activar",e.id_tipodocumento)
               }
               <button onClick={()=>this.editar(e.id_tipodocumento)} className="btn btn-primary">Editar</button>
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
              <h1>TIPOS DE DOCUMENTO</h1>
              <table className="table table-bordered">
                 <thead>
                        <tr>
                                <th>tipo de documento</th>
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

export default Tipodocumento