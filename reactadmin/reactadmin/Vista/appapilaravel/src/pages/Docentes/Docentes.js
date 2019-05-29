import React, {Component} from 'react';
import SweetAlert from 'sweetalert-react';
import {URL, TOKEN} from './../../config/config';
import axios from 'axios';

class Docentes extends Component {
    
    constructor(props){
        super(props);
        this.state= {
            docentes :[],
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
        }
    }

    llamar_listar(){
        setTimeout(()=>{
            axios({
                method: 'get',
                url: `${URL}/Docente`,
                headers: {
                    "Authorization": "bearer "+TOKEN
                }
              }).then(respuesta=>{
                    let r = respuesta.data;
                    this.setState({
                        docentes : r.data
                    });
              }).catch(error=>{
                  alert("Error");
              });
           }, 500)
    }

    componentDidMount(){
       this.llamar_listar();
    }

    editar(iddocente){
        this.props.history.push(`/docentes/modificar/${iddocente}`);
    }

    cambiar_estado(iddocente){
        axios({
            method: 'delete',
            url: `${URL}/Docente/${iddocente}`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
               if(r.ok){
                this.setState({
                    sweetShow: true,
                    sweetText: r.mensaje,
                    sweetTitle: "Hola",
                    sweetType: "success"
                });
                this.llamar_listar();
               }
          }).catch(error=>{
              alert("Error");
          });
    }

    boton_estado(clase, texto, iddocente){
        return (<button onClick={()=>{this.cambiar_estado(iddocente);}} className={clase}>{texto}</button>)
    }

    listar(){
        if(this.state.docentes.length > 0){
            return this.state.docentes.map(
                (e, i)=>
                <tr key={i}> 
                  <td>{e.documento_docente}</td>
                    
                    <td>{e.primer_nombre}</td>
                    <td>{e.segundo_nombre}</td>
                    <td>{e.primer_apellido}</td>
                    <td>{e.segundo_apellido}</td>
                    <td>{e.celular}</td>
                    <td>{e.telefono}</td>
                    <td>{e.idasignatura}</td>
                    <td>{e.estado == 1? 'Activo': 'Inactivo'}</td>
                    <td>
                        {
                            e.estado == 1 ?
                            this.boton_estado("btn btn-danger", "Inactivar", e.iddocente)
                            :
                            this.boton_estado("btn btn-success", "Activar", e.iddocente)
                        }
                        <button onClick={()=>this.editar(e.iddocente)} className="btn btn-primary">Editar</button>
                    </td>
                </tr>
            );
        }
    }


    cargando(){
        return (<tr>
           < td colSpan="12" className="text-center"><img src="./giphy.gif"/></td>
        </tr>)
    }

    render(){
        return(

            <div>
                <h1>Docentes</h1>
                <br/>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th>Documento docente</th>
                           
                            <th>Primer nombre</th>
                            <th>Segundo nombre</th>
                            <th>Primer apellido</th>
                            <th>Segundo apellido</th>
                            <th>Celular</th>
                            <th>Telefono</th>
                            <th>Id asignatura</th>
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

export default Docentes;