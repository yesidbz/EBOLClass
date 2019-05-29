import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, Col } from "reactstrap";
import Tabla from "./../../componets/Tabla/Tabla";
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';

// import ModificarVisitante from './../Visitante/ModificarVisitante';

export default class asignatura extends Component {
 constructor(props) {
 super(props);
 this.state = {
 asignatura: [],
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
        url: `${URL}/Materia`,
         headers: {
                "Authorization": "bearer "+TOKEN
            }
        
        }).then(respuesta => {
 let r = respuesta.data;
 let asignatura = [];
 r.data.forEach(d => {
 const {idasignatura,nombre,id_area,estado } = d;
 let obj = {
 idasignatura,
 nombre,
 id_area,
 estado: estado === 1 ? "Activo" : "Inactivo",idasignatura,
 botones: [
 this.boton_estado(
 `btn btn-${estado === 1 ? "danger" : "success"}`,
 estado === 1 ? "Inhabilitar" : "Activar",idasignatura,
 ),
 <button onClick={()=>this.editar(idasignatura)} className="btn btn-primary">Editar</button>,
 <button onClick={()=>this.detalle(idasignatura)}  className="btn btn-warning" >Detalle</button>


 ]
 };
 asignatura.push(obj);
 });
 this.setState({
 asignatura
 });
 });
 },100)
}

editar(idasignatura){
  this.props.history.push(`/Materia/modificar/${idasignatura}`);
}

detalle(idasignatura){
  this.props.history.push(`/Materia/detalle/${idasignatura}`);
}



 componentDidMount() {
 this.llamar_listar();
 }

 // componentWillReceiveProps() {
 // this.llamar_listar();
 // }

 cambiar_estado(idasignatura){
  axios({
      method: 'delete',
      url: `${URL}/Materia/${idasignatura}`,
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


 boton_estado(clase, texto, idasignatura) {
  return (<button onClick={()=>{
    this.cambiar_estado(idasignatura);
  }}
  
  className={clase}
  >
  {texto}
  </button>
  );
  }

 listar() {
 if (this.state.asignatura.length > 0) {
 return this.state.asignatura.map((e, i) => (
 <tr key={i}>
  <td>{e.idasignatura}</td>
 <td>{e.nombre}</td>
 <td>{e.id_area}</td>
 <td>{e.estado}</td>
 <td>{e.botones}</td>

   
 </tr>

 ));
 }
 }

 render() {
 var data = this.state.asignatura;
 var ds = [];
 if (this.state.parametro !== "" ) {
 data.forEach(v => {
 if (
  v.idasignatura.toString().includes(this.state.parametro) ||
  v.nombre.toLowerCase().includes(this.state.parametro) ||
  v.id_area.toString().includes(this.state.parametro) ||
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
  "Nombre",
  "Area",
  "Estado",
  

 ]}
 
 propiedades={[
  "idasignatura",
  "nombre",
  "id_area",
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
