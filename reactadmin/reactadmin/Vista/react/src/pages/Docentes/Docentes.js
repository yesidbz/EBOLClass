import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, Col } from "reactstrap";
import Tabla from "./../../componets/Tabla/Tabla";
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';

// import ModificarVisitante from './../Visitante/ModificarVisitante';

export default class Docentes extends Component {
 constructor(props) {
 super(props);
 this.state = {
 docentes: [],
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
        url: `${URL}/Docente`,
         headers: {
                "Authorization": "bearer "+TOKEN
            }
        
        }).then(respuesta => {
 let r = respuesta.data;
 let docentes = [];
 r.data.forEach(d => {
 const {iddocente,documento_docente,primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,celular,telefono,estado } = d;
 let obj = {
 iddocente,
 documento_docente,
 primer_nombre,
 segundo_nombre,
 primer_apellido,
 segundo_apellido,
 celular,
 telefono,
 estado: estado === 1 ? "Activo" : "Inactivo",iddocente,
 botones: [
 this.boton_estado(
 `btn btn-${estado === 1 ? "danger" : "success"}`,
 estado === 1 ? "Inhabilitar" : "Activar",iddocente,
 ),
 <button onClick={()=>this.editar(iddocente)} className="btn btn-primary">Editar</button>,
 <button onClick={()=>this.detalle(iddocente)}  className="btn btn-warning" >Detalle</button>


 ]
 };
 docentes.push(obj);
 });
 this.setState({
 docentes
 });
 });
 },100)
}

editar(iddocente){
  this.props.history.push(`/docentes/modificar/${iddocente}`);
}

detalle(iddocente){
  this.props.history.push(`/docentes/detalle/${iddocente}`);
}



 componentDidMount() {
 this.llamar_listar();
 }

 // componentWillReceiveProps() {
 // this.llamar_listar();
 // }

 cambiar_estado(iddocente){
  axios({
      method: 'delete',
      url: `${URL}/Docente/${iddocente}`,
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
 if (this.state.docentes.length > 0) {
 return this.state.docentes.map((e, i) => (
 <tr key={i}>
  <td>{e.iddocente}</td>
  <td>{e.documento_docente}</td>
<td>{e.primer_nombre}</td>
<td>{e.segundo_nombre}</td>
 <td>{e.primer_apellido}</td>
<td>{e.segundo_apellido}</td>
<td>{e.celular}</td>
<td>{e.telefono}</td>
 <td>{e.estado}</td>
 <td>{e.botones}</td>

   
 </tr>

 ));
 }
 }

 render() {
 var data = this.state.docentes;
 var ds = [];
 if (this.state.parametro !== "" ) {
 data.forEach(v => {
 if (
 v.iddocente.toString().includes(this.state.parametro) || 
 v.documento_docente.toString().includes(this.state.parametro) ||
 v.primer_nombre.toLowerCase().includes(this.state.parametro) ||
v.primer_apellido.toLowerCase().includes(this.state.parametro) ||
v.segundo_apellido.toLowerCase().includes(this.state.parametro) ||
v.celular.toString().includes(this.state.parametro) ||
v.telefono.toString().includes(this.state.parametro) ||
v.estado.includes(this.state.parametro)

 ) {
 ds.push(v);
 }
 });
 data = ds;
 }
 return (
 <div>
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
    "Id del docente",
    "Documento del docente",
    "Primer nombre",
    "Segundo nombre",
    "Primer apellido",
    "Segundo apellido",
    "Celular",
    "Telefono",
  "Estado",
  

 ]}
 
 propiedades={[
    "iddocente",
    "documento_docente",
    "primer_nombre",
    "segundo_nombre",
    "primer_apellido",
    "segundo_apellido",
    "celular",
    "telefono",
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
