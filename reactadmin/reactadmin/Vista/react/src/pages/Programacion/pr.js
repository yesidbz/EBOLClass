import React, {Component} from 'react'
import axios from 'axios';

import {URL,TOKEN} from '../../config/config';
import SweetAlert from 'sweetalert-react';


class Programacion extends Component {
constructor (props){
    super(props);
    this.state= {
            programacion :[],
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
            url: `${URL}/Programacion`,
             headers: {
                    "Authorization": "bearer "+TOKEN
                }
            
            }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    programacion : r.data
                }); 
            }).catch(error=>{
                alert("Error");
            });    
    }, 100)
    
}

componentDidMount() {
    this.llamar_listar();
}


editar(id_programacion){
    this.props.history.push(`/Programacion/Modificar/${id_programacion}`);
}

cambiar_estado(id_programacion){
    axios({
        method: 'delete',
        url: `${URL}/Programacion/${id_programacion}`,
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





boton_estado(clase, texto, id_programacion){

    return (<button onClick={()=>{
        this.cambiar_estado(id_programacion);
}} className={clase}>{texto}</button>)
}


listar(){
if(this.state.programacion.length > 0){
    return this.state.programacion.map(
        (e ,i)=>
        
        <tr key={i} >
           <td>{e.id_programacion}</td>
           <td>{e.id_docente_asignatura}</td>
           <td>{e.id_grado_grupo_alumno}</td>
           <td>{e.hora_i}</td>
           <td>{e.hora_f}</td>
           <td>{e.dia_semana}</td>
           <td>{e.id_jornada}</td>
           <td>{e.estado == 1? 'Activo' : 'Inactivo'}</td>
           <td> 
               { 
                   e.estado == 1?
                   this.boton_estado("btn btn-danger","inactivar",e.id_programacion)
                   :
                   this.boton_estado("btn btn-success","Activar",e.id_programacion)
               }
               <button onClick={()=>this.editar(e.id_programacion)} className="btn btn-primary">Editar</button>
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
              <div className="container">
              <h1>Programación</h1>
              <table className="table table-bordered">
                 <thead>
                        <tr>
                                <th>Id</th>
                                <th>Id docente asignatura</th>
                                <th>Grado grupo alumno</th>
                                <th>Hora de inicio</th>
                                <th>Hora final</th>
                                <th>Dias semanas</th>
                                <th>Jornada</th>
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

export default Programacion