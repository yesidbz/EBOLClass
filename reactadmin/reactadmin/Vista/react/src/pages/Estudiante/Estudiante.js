import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, Col } from "reactstrap";
import Tabla from "./../../componets/Tabla/Tabla";
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';

// import ModificarVisitante from './../Visitante/ModificarVisitante';

export default class Estudiante extends Component {
 constructor(props) {
 super(props);
 this.state = {
 estudiante: [],
 parametro: "",
 sweetShow : false ,
 sweetTitle : '',
 sweetText : '',
 sweetType : '',
 };
 }



 llamar_listar() {
  setTimeout(() => {
    axios({
        method: 'get',
        url: `${URL}/Estudiante`,
         headers: {
                "Authorization": "bearer "+TOKEN
            }
        
        }).then(respuesta => {
 let r = respuesta.data;
 let estudiante = [];
 r.data.forEach(d => {
 const {id, documento, id_tipodocumento, Primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,id_municipio,id_acudiente,id_parentesco,estado, } = d;
 let obj = {
 id,
 documento,
 id_tipodocumento,
 Primer_nombre,
 segundo_nombre,
 primer_apellido,
 segundo_apellido,
 id_municipio,
 id_acudiente,
 id_parentesco,
 estado: estado === 1 ? "Activo" : "Inactivo",id,
 botones: [
 this.boton_estado(
 `btn btn-${estado === 1 ? "danger" : "success"}`,
 estado === 1 ? "Inhabilitar" : "Activar",id,
 ),
 <button onClick={()=>this.editar(id)} className="btn btn-primary">Editar</button>,
 <button onClick={()=>this.detalle(id)}  className="btn btn-warning" >Detalle</button>


 ]
 };
 estudiante.push(obj);
 });
 this.setState({
 estudiante
 });
 });
 },100)
}

editar(id){
  this.props.history.push(`/Estudiante/modificar/${id}`);
}

detalle(id){
  this.props.history.push(`/Estudiante/detalle/${id}`);
}



 componentDidMount() {
 this.llamar_listar();
 }

 // componentWillReceiveProps() {
 // this.llamar_listar();
 // }

 cambiar_estado(id){
  axios({
      method: 'delete',
      url: `${URL}/Estudiante/${id}`,
       headers: {
              "Authorization": "bearer "+TOKEN
          }
      }).then(respuesta => {
 let r = respuesta.data;
 if (r.ok) {
 this.setState({
 sweetShow: true,
 sweetTitle: "Genial",
 sweetText: r.mensaje,
 sweetType: "seccess"
 });
 this.llamar_listar();
 } else {
 this.setState({
 sweetShow: true,
 sweetTitle: "Ops",
 sweetText: r.error,
 sweetType: "error"
 });
 }
 })
 .catch(error => {
 alert("Error");
 });
 }


 boton_estado(clase, texto, id) {
  return (<button onClick={()=>{
    this.cambiar_estado(id);
  }}
  
  className={clase}
  >
  {texto}
  </button>
  );
  }

 listar() {
 if (this.state.estudiante.length > 0) {
 return this.state.estudiante.map((e, i) => (
 <tr key={i}>
  <td>{e.id}</td>
           <td>{e.documento}</td>
           <td>{e.id_tipodocumento}</td>
           <td>{e.Primer_nombre}</td>
           <td>{e.segundo_nombre}</td>
           <td>{e.primer_apellido}</td>
           <td>{e.segundo_apellido}</td>
           <td>{e.id_municipio}</td>
           <td>{e.id_acudiente}</td>
           <td>{e.id_parentesco}</td>
 <td>{e.estado}</td>
 <td>{e.botones}</td>

   
 </tr>

 ));
 }
 }

 render() {
 var data = this.state.estudiante;
 var ds = [];
 if (this.state.parametro !== "" ) {
 data.forEach(v => {
 if (
  v.documento.toString().includes(this.state.parametro) ||
  v.id_tipodocumento.toString().includes(this.state.parametro) ||
  v.Primer_nombre.toLowerCase().includes(this.state.parametro) ||
  v.primer_apellido.toLowerCase().includes(this.state.parametro) ||
  v.segundo_apellido.toLowerCase().includes(this.state.parametro) ||
  v.id_municipio.toString().includes(this.state.parametro) ||
  v.id_acudiente.toString().includes(this.state.parametro) ||
  v.id_parentesco.toString().includes(this.state.parametro) ||
 v.estado.includes(this.state.parametro)
 ) {
 ds.push(v);
 }
 });
 data = ds;
 }
 return (
 <div className="container">
 <Col md={12}>
 <Card className="demo-icons">
 <CardHeader>
 <div className="row">
 <div className="col-md-12">
 <div className="col-3 form-group">
 <label>Buscar</label> 
 <input className="form-control"
    onKeyUp={({ target }) =>
 this.setState({ parametro: target.value.toLowerCase() })
 }
 />
  </div>

 <Tabla
 datos={data}
 botones
 titulos={[
  "Id",
  "Documento",
  "Tipo documento",
  "Primer nombre",
  "Primer apellido",
  "Codigo del acudiente",
  "Estado",
  

 ]}
 
 propiedades={[
  "id",
  "documento",
  "id_tipodocumento",
  "segundo_nombre",
  "primer_apellido",
  "id_acudiente",
 "estado",
 "botones"
 ]}
 />

 
 </div>
 </div>

 </CardHeader>
 </Card>
 </Col>

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
