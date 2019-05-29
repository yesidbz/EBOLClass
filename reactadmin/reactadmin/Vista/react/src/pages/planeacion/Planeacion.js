import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, Col } from "reactstrap";
import Tabla from "./../../componets/Tabla/Tabla";
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';

// import ModificarVisitante from './../Visitante/ModificarVisitante';

export default class Planeacion extends Component {
 constructor(props) {
 super(props);
 this.state = {
 planeacion: [],
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
        url: `${URL}/Planeacion`,
         headers: {
                "Authorization": "bearer "+TOKEN
            }
        
        }).then(respuesta => {
 let r = respuesta.data;
 let planeacion = [];
 r.data.forEach(d => {
 const {idplaneacion,descri,estado } = d;
 let obj = {
 idplaneacion,
 descri,
 estado: estado === 1 ? "Activo" : "Inactivo",idplaneacion,
 botones: [
 this.boton_estado(
 `btn btn-${estado === 1 ? "danger" : "success"}`,
 estado === 1 ? "Inhabilitar" : "Activar",idplaneacion,
 ),
 <button onClick={()=>this.editar(idplaneacion)} className="btn btn-primary">Editar</button>,
 <button onClick={()=>this.detalle(idplaneacion)}  className="btn btn-warning" >Detalle</button>


 ]
 };
 planeacion.push(obj);
 });
 this.setState({
 planeacion
 });
 });
 },100)
}

editar(idplaneacion){
  this.props.history.push(`/Planeacion/modificar/${idplaneacion}`);
}

detalle(idplaneacion){
  this.props.history.push(`/Planeacion/detalle/${idplaneacion}`);
}



 componentDidMount() {
 this.llamar_listar();
 }

 // componentWillReceiveProps() {
 // this.llamar_listar();
 // }

 cambiar_estado(idplaneacion){
  axios({
      method: 'delete',
      url: `${URL}/Planeacion/${idplaneacion}`,
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


 boton_estado(clase, texto, idplaneacion) {
  return (<button onClick={()=>{
    this.cambiar_estado(idplaneacion);
  }}
  
  className={clase}
  >
  {texto}
  </button>
  );
  }

 listar() {
 if (this.state.planeacion.length > 0) {
 return this.state.planeacion.map((e, i) => (
 <tr key={i}>
  <td>{e.idplaneacion}</td>
           <td>{e.descri}</td>
            <td>{e.estado}</td>
 <td>{e.botones}</td>

   
 </tr>

 ));
 }
 }

 render() {
 var data = this.state.planeacion;
 var ds = [];
 if (this.state.parametro !== "" ) {
 data.forEach(v => {
 if (
  v.idplaneacion.toString().includes(this.state.parametro) ||
  v.descri.toLowerCase().includes(this.state.parametro) ||
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
  "Descripcion",
    "Estado",
  

 ]}
 
 propiedades={[
  "idplaneacion",
  "descri",
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
