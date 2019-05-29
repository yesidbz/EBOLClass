import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, Col } from "reactstrap";
import Tabla from "./../../componets/Tabla/Tabla";
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';

// import ModificarVisitante from './../Visitante/ModificarVisitante';

export default class Departamento extends Component {
 constructor(props) {
 super(props);
 this.state = {
 departamento: [],
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
        url: `${URL}/Departamento`,
         headers: {
                "Authorization": "bearer "+TOKEN
            }
        
        }).then(respuesta => {
 let r = respuesta.data;
 let departamento = [];
 r.data.forEach(d => {
 const {id_departamento,nombre,estado } = d;
 let obj = {
 id_departamento,
 nombre,
 estado: estado === 1 ? "Activo" : "Inactivo",id_departamento,
 botones: [
 this.boton_estado(
 `btn btn-${estado === 1 ? "danger" : "success"}`,
 estado === 1 ? "Inhabilitar" : "Activar",id_departamento,
 ),
 <button onClick={()=>this.editar(id_departamento)} className="btn btn-primary">Editar</button>,
 <button onClick={()=>this.detalle(id_departamento)}  className="btn btn-warning" >Detalle</button>


 ]
 };
 departamento.push(obj);
 });
 this.setState({
 departamento
 });
 });
 },100)
}

editar(id_departamento){
  this.props.history.push(`/Departamento/modificar/${id_departamento}`);
}

detalle(id_departamento){
  this.props.history.push(`/Departamento/detalle/${id_departamento}`);
}



 componentDidMount() {
 this.llamar_listar();
 }

 // componentWillReceiveProps() {
 // this.llamar_listar();
 // }

 cambiar_estado(id_departamento){
  axios({
      method: 'delete',
      url: `${URL}/Departamento/${id_departamento}`,
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


 boton_estado(clase, texto, id_departamento) {
  return (<button onClick={()=>{
    this.cambiar_estado(id_departamento);
  }}
  
  className={clase}
  >
  {texto}
  </button>
  );
  }

 listar() {
 if (this.state.departamento.length > 0) {
 return this.state.departamento.map((e, i) => (
 <tr key={i}>
  <td>{e.id_departamento}</td>
           <td>{e.nombre}</td>
 <td>{e.estado}</td>
 <td>{e.botones}</td>

   
 </tr>

 ));
 }
 }

 render() {
 var data = this.state.departamento;
 var ds = [];
 if (this.state.parametro !== "" ) {
 data.forEach(v => {
 if (
  v.id_departamento.toString().includes(this.state.parametro) ||
  v.nombre.toLowerCase().includes(this.state.parametro) ||
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
  "Id",
  "Nombre",
  "Estado",
  

 ]}
 
 propiedades={[
  "id_departamento",
  "nombre",
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
