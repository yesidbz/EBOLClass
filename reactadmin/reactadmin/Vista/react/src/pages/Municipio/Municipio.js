import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, Col } from "reactstrap";
import Tabla from "./../../componets/Tabla/Tabla";
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';

// import ModificarVisitante from './../Visitante/ModificarVisitante';

export default class Municipio extends Component {
 constructor(props) {
 super(props);
 this.state = {
 municipio: [],
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
        url: `${URL}/Municipio`,
         headers: {
                "Authorization": "bearer "+TOKEN
            }
        
        }).then(respuesta => {
 let r = respuesta.data;
 let municipio = [];
 r.data.forEach(d => {
 const {id_municipio,Nombre,id_departamento,estado } = d;
 let obj = {
 id_municipio,
 Nombre,
 id_departamento,
 estado: estado === 1 ? "Activo" : "Inactivo",id_municipio,
 botones: [
 this.boton_estado(
 `btn btn-${estado === 1 ? "danger" : "success"}`,
 estado === 1 ? "Inhabilitar" : "Activar",id_municipio,
 ),
 <button onClick={()=>this.editar(id_municipio)} className="btn btn-primary">Editar</button>,
 <button onClick={()=>this.detalle(id_municipio)}  className="btn btn-warning" >Detalle</button>


 ]
 };
 municipio.push(obj);
 });
 this.setState({
 municipio
 });
 });
 },100)
}

editar(id_municipio){
  this.props.history.push(`/Municipio/modificar/${id_municipio}`);
}

detalle(id_municipio){
  this.props.history.push(`/Municipio/detalle/${id_municipio}`);
}



 componentDidMount() {
 this.llamar_listar();
 }

 // componentWillReceiveProps() {
 // this.llamar_listar();
 // }

 cambiar_estado(id_municipio){
  axios({
      method: 'delete',
      url: `${URL}/Municipio/${id_municipio}`,
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


 boton_estado(clase, texto, id_municipio) {
  return (<button onClick={()=>{
    this.cambiar_estado(id_municipio);
  }}
  
  className={clase}
  >
  {texto}
  </button>
  );
  }

 listar() {
 if (this.state.municipio.length > 0) {
 return this.state.municipio.map((e, i) => (
 <tr key={i}>
  <td>{e.id_municipio}</td>
<td>{e.Nombre}</td>
<td>{e.id_departamento}</td>
 <td>{e.estado}</td>
 <td>{e.botones}</td>

   
 </tr>

 ));
 }
 }

 render() {
 var data = this.state.municipio;
 var ds = [];
 if (this.state.parametro !== "" ) {
 data.forEach(v => {
 if (
  v.id_municipio.toString().includes(this.state.parametro) ||
  v.Nombre.toLowerCase().includes(this.state.parametro) ||
  v.id_departamento.toString().includes(this.state.parametro) ||
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
  "Id departamento",
  "Estado",
  

 ]}
 
 propiedades={[
  "id_municipio",
  "Nombre",
  "id_departamento",
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
