import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, Col } from "reactstrap";
import Tabla from "./../../componets/Tabla/Tabla";
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';

// import ModificarVisitante from './../Visitante/ModificarVisitante';

export default class Grado extends Component {
 constructor(props) {
 super(props);
 this.state = {
 grado: [],
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
        url: `${URL}/Grado`,
         headers: {
                "Authorization": "bearer "+TOKEN
            }
        
        }).then(respuesta => {
 let r = respuesta.data;
 let grado = [];
 r.data.forEach(d => {
 const {id_grado,descripcion,estado } = d;
 let obj = {
 id_grado,
 descripcion,
 estado: estado === 1 ? "Activo" : "Inactivo",id_grado,
 botones: [
 this.boton_estado(
 `btn btn-${estado === 1 ? "danger" : "success"}`,
 estado === 1 ? "Inhabilitar" : "Activar",id_grado,
 ),
 <button onClick={()=>this.editar(id_grado)} className="btn btn-primary">Editar</button>,
 <button onClick={()=>this.detalle(id_grado)}  className="btn btn-warning" >Detalle</button>


 ]
 };
 grado.push(obj);
 });
 this.setState({
 grado
 });
 });
 },100)
}

editar(id_grado){
  this.props.history.push(`/Grado/modificar/${id_grado}`);
}

detalle(id_grado){
  this.props.history.push(`/Grado/detalle/${id_grado}`);
}



 componentDidMount() {
 this.llamar_listar();
 }

 // componentWillReceiveProps() {
 // this.llamar_listar();
 // }

 cambiar_estado(id_grado){
  axios({
      method: 'delete',
      url: `${URL}/Grado/${id_grado}`,
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


 boton_estado(clase, texto, id_grado) {
  return (<button onClick={()=>{
    this.cambiar_estado(id_grado);
  }}
  
  className={clase}
  >
  {texto}
  </button>
  );
  }

 listar() {
 if (this.state.grado.length > 0) {
 return this.state.grado.map((e, i) => (
 <tr key={i}>
  <td>{e.id_grado}</td>
           <td>{e.descripcion}</td>
 <td>{e.estado}</td>
 <td>{e.botones}</td>

   
 </tr>

 ));
 }
 }

 render() {
 var data = this.state.grado;
 var ds = [];
 if (this.state.parametro !== "" ) {
 data.forEach(v => {
 if (
  v.id_grado.toString().includes(this.state.parametro) ||
  v.descripcion.toLowerCase().includes(this.state.parametro) ||
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
  "Descripcion",
  "Estado",
  

 ]}
 
 propiedades={[
  "id_grado",
  "descripcion",
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
