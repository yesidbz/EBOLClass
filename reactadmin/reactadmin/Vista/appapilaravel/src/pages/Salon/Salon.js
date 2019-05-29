import React, {Component} from 'react'
import axios from 'axios';
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';


class Salon extends Component {
constructor (props){
    super(props);
    this.state= {
            salon :[],
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
            url: `${URL}/Salon`,
             headers: {
                    "Authorization": "bearer "+TOKEN
                }
            
            }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    salon : r.data
                }); 
            }).catch(error=>{
                alert("Error");
            });    
    }, 100)
    
}

componentDidMount() {
    this.llamar_listar();
    
}


editar(id_grado_grupo){
    this.props.history.push(`/Salon/modificar/${id_grado_grupo}`);
}

cambiar_estado(id_grado_grupo){
    axios({
        method: 'delete',
        url: `${URL}/Salon/${id_grado_grupo}`,
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





boton_estado(clase, texto, id_grado_grupo){

    return (<button onClick={()=>{
        this.cambiar_estado(id_grado_grupo);
}} className={clase}>{texto}</button>)
}


listar(){
if(this.state.salon.length > 0){
    return this.state.salon.map(
        (e ,i)=>
        
        <tr key={i} >
           <td>{e.id_grado_grupo}</td>
           <td>{e.id_grado}</td>    
           <td>{e.id_grupo}</td>
           <td>{e.estado == 1? 'Activo' : 'Inactivo'}</td>
           <td> 
               { 
                   e.estado == 1?
                   this.boton_estado("btn btn-danger","inactivar",e.id_grado_grupo)
                   :
                   this.boton_estado("btn btn-success","Activar",e.id_grado_grupo)
               }
               <button onClick={()=>this.editar(e.id_grado_grupo)} className="btn btn-primary">Editar</button>
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
              <h1>SALON</h1>
              <table className="table table-bordered">
                 <thead>
                        <tr>
                                <th>Codigo del salon</th>
                                <th>Grado</th>
                                <th>Grupo</th>
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

export default Salon