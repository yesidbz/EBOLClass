import React, {Component} from 'react'
import axios from 'axios';

import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';


class Estudiante extends Component {
constructor (props){
    super(props);
    this.state= {
            estudiante :[],
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
            url: `${URL}/Estudiante`,
             headers: {
                    "Authorization": "bearer "+TOKEN
                }
            
            }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    estudiante : r.data
                }); 
            }).catch(error=>{
                alert("Error");
            });    
    }, 100)
    
}

componentDidMount() {
    this.llamar_listar();
}


editar(id){
    this.props.history.push(`/Estudiante/modificar/${id}`);
}

cambiar_estado(id){
    axios({
        method: 'delete',
        url: `${URL}/Estudiante/${id}`,
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





boton_estado(clase, texto, id){

    return (<button onClick={()=>{
        this.cambiar_estado(id);
}} className={clase}>{texto}</button>)
}


listar(){
if(this.state.estudiante.length > 0){
    return this.state.estudiante.map(
        (e ,i)=>
        
        <tr key={i} >
           <td>{e.documento}</td>
           <td>{e.Primer_nombre}</td>
           <td>{e.segundo_nombre}</td>
           <td>{e.primer_apellido}</td>
           <td>{e.segundo_apellido}</td>
           <td>{e.celular }</td>
           <td>{e.id_acudiente}</td>
           <td>{e.codigo_grupo}</td>
           <td>{e.estado == 1? 'Activo' : 'Inactivo'}</td>
           <td> 
               { 
                   e.estado == 1?
                   this.boton_estado("btn btn-danger","inactivar",e.id)
                   :
                   this.boton_estado("btn btn-success","Activar",e.id)
               }
               <button onClick={()=>this.editar(e.id)} className="btn btn-primary">Editar</button>
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
              <h1>Estudiantes</h1>
              <table className="table table-bordered">
                 <thead>
                        <tr>
                                <th class = "MuiTableCell-root-18862 MuiTableCell-head-18863 MuiTableCell-numeric-18866">Documento</th>
                                <th>Primer nombre</th>
                                <th>Segundo nombre</th>
                                <th>Primer apellido</th>
                                <th>segundo apellido</th>
                                <th>celular </th>
                                <th>Codigo del acudiente</th>
                                <th>grupo</th>
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

export default Estudiante