import React, {Component} from 'react'
import axios from 'axios';
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';


class Asignatura extends Component {
constructor (props){
    super(props);
    this.state= {
            Asignatura :[],
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
            url: `${URL}/Materia`,
             headers: {
                    "Authorization": "bearer "+TOKEN
                }
            
            }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    Asignatura : r.data
                }); 
            }).catch(error=>{
                alert("Error");
            });    
    }, 100)
    
}

componentDidMount() {
    this.llamar_listar();
    
}


editar(idasignatura){
    this.props.history.push(`/Materia/modificar/${idasignatura}`);
}

cambiar_estado(idasignatura){
    axios({
        method: 'delete',
        url: `${URL}/Materia/${idasignatura}`,
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





boton_estado(clase, texto, idasignatura){

    return (<button onClick={()=>{
        this.cambiar_estado(idasignatura);
}} className={clase}>{texto}</button>)
}


listar(){
if(this.state.Asignatura.length > 0){
    return this.state.Asignatura.map(
        (e ,i)=>
        
        <tr key={i} >
           <td>{e.idasignatura}</td>
           <td>{e.nombre}</td>    
           <td>{e.id_area}</td>
           <td>{e.estado == 1? 'Activo' : 'Inactivo'}</td>
           <td> 
               { 
                   e.estado == 1?
                   this.boton_estado("btn btn-danger","inactivar",e.idasignatura)
                   :
                   this.boton_estado("btn btn-success","Activar",e.idasignatura)
               }
               <button onClick={()=>this.editar(e.idasignatura)} className="btn btn-primary">Editar</button>
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
              <h1>ASIGNATURA</h1>
              <table className="table table-bordered">
                 <thead>
                        <tr>
                                <th>Codigo de la asignatura</th>
                                <th>Nombre </th>
                                <th>codigo area </th>
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

export default Asignatura