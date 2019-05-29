import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, Col } from "reactstrap";
import Tabla from "./../../componets/Tabla/Tabla";
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';

// import ModificarVisitante from './../Visitante/ModificarVisitante';

export default class TipoDocumento extends Component {
 constructor(props) {
 super(props);
 this.state = {
 tipodocumento: [],
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
        url: `${URL}/Tipodocumento`,
         headers: {
                "Authorization": "bearer "+TOKEN
            }
        
        }).then(respuesta => {
 let r = respuesta.data;
 let tipodocumento = [];
 r.data.forEach(d => {
 const {id_tipodocumento,nombre,estado } = d;
 let obj = {
id_tipodocumento,
 nombre,
 estado: estado === 1 ? "Activo" : "Inactivo",id_tipodocumento,
 botones: [
 this.boton_estado(
 `btn btn-${estado === 1 ? "danger" : "success"}`,
 estado === 1 ? "Inhabilitar" : "Activar",id_tipodocumento,
 ),
 <button onClick={()=>this.editar(id_tipodocumento)} className="btn btn-primary">Editar</button>,
 <button onClick={()=>this.detalle(id_tipodocumento)}  className="btn btn-warning" >Detalle</button>


 ]
 };
 tipodocumento.push(obj);
 });
 this.setState({
 tipodocumento
 });
 });
 },100)
}

editar(id_tipodocumento){
  this.props.history.push(`/Tipodocumento/modificar/${id_tipodocumento}`);
}

detalle(id_tipodocumento){
  this.props.history.push(`/Tipodocumento/detalle/${id_tipodocumento}`);
}



 componentDidMount() {
 this.llamar_listar();
 }

 // componentWillReceiveProps() {
 // this.llamar_listar();
 // }

 cambiar_estado(id_tipodocumento){
  axios({
      method: 'delete',
      url: `${URL}/Tipodocumento/${id_tipodocumento}`,
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


 boton_estado(clase, texto, id_tipodocumento) {
  return (<button onClick={()=>{
    this.cambiar_estado(id_tipodocumento);
  }}
  
  className={clase}
  >
  {texto}
  </button>
  );
  }

 listar() {
 if (this.state.tipodocumento.length > 0) {
 return this.state.tipodocumento.map((e, i) => (
 <tr key={i}>
  <td>{e.id_tipodocumento}</td>
           <td>{e.nombre}</td>
 <td>{e.estado}</td>
 <td>{e.botones}</td>

   
 </tr>

 ));
 }
 }

 render() {
 var data = this.state.tipodocumento;
 var ds = [];
 if (this.state.parametro !== "" ) {
 data.forEach(v => {
 if (
  v.id_tipodocumento.toString().includes(this.state.parametro) ||
  v.nombre.toLowerCase().includes(this.state.parametro) ||
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
  "Estado",
  

 ]}
 
 propiedades={[
  "id_tipodocumento",
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
