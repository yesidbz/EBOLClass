import React, {Component} from 'react'
import axios from 'axios';

import {URL,TOKEN} from '../../config/config';
import SweetAlert from 'sweetalert-react';


class Listar extends Component {
constructor (props){
    super(props);
    this.state= {
            docente_asignatura_planeacion :[],
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
            url: `${URL}/Docente_Asignatura_Planeacion`,
             headers: {
                    "Authorization": "bearer "+TOKEN
                }
            
            }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    docente_asignatura_planeacion : r.data
                }); 
            }).catch(error=>{
                alert("Error");
            });    
    }, 100)
    
}

componentDidMount() {
    this.llamar_listar();
}


editar(id_docente_asignatura_planeacion){
    this.props.history.push(`/D_A_P/Modificar/${id_docente_asignatura_planeacion}`);
}

cambiar_estado(id_docente_asignatura_planeacion){
    axios({
        method: 'delete',
        url: `${URL}/Docente_Asignatura_Planeacion/${id_docente_asignatura_planeacion}`,
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





boton_estado(clase, texto, id_docente_asignatura_planeacion){

    return (<button onClick={()=>{
        this.cambiar_estado(id_docente_asignatura_planeacion);
}} className={clase}>{texto}</button>)
}


listar(){
if(this.state.docente_asignatura_planeacion.length > 0){
    return this.state.docente_asignatura_planeacion.map(
        (e ,i)=>
        
        <tr key={i} >
           <td>{e.id_docente_asignatura_planeacion}</td>
           <td>{e.id_docente_asignatura}</td>
           <td>{e.id_planeacion_dimension}</td>
           <td>{e.porcentaje}</td>
           <td>{e.estado == 1? 'Activo' : 'Inactivo'}</td>
           <td> 
               { 
                   e.estado == 1?
                   this.boton_estado("btn btn-danger","inactivar",e.id_docente_asignatura_planeacion)
                   :
                   this.boton_estado("btn btn-success","Activar",e.id_docente_asignatura_planeacion)
               }
               <button onClick={()=>this.editar(e.id_docente_asignatura_planeacion)} className="btn btn-primary">Editar</button>
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
              <h1>D.A.P</h1>
              <table className="table table-bordered">
                 <thead>
                        <tr>
                                <th>Id</th>
                                <th>Id Docente Asignatura</th>
                                <th>Id Planeación</th>
                                <th>Porcentaje</th>
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

export default Listar