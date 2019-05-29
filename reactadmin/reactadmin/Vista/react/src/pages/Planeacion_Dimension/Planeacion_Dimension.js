import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, Col } from "reactstrap";
import Tabla from "./../../componets/Tabla/Tabla";
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';

// import ModificarVisitante from './../Visitante/ModificarVisitante';

export default class Planeacion_Dimension extends Component {
 constructor(props) {
 super(props);
 this.state = {
 pldi: [],
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
        url: `${URL}/Planeacion_Dimension`,
         headers: {
                "Authorization": "bearer "+TOKEN
            }
        
        }).then(respuesta => {
 let r = respuesta.data;
 let pldi = [];
 r.data.forEach(d => {
 const {id_planeacion_dimension,id_planeacion,id_dimension,estado } = d;
 let obj = {
id_planeacion_dimension,
id_planeacion,
id_dimension,
 estado: estado === 1 ? "Activo" : "Inactivo",	id_planeacion_dimension,
 botones: [
 this.boton_estado(
 `btn btn-${estado === 1 ? "danger" : "success"}`,
 estado === 1 ? "Inhabilitar" : "Activar",	id_planeacion_dimension,
 ),
 <button onClick={()=>this.editar(id_planeacion_dimension)} className="btn btn-primary">Editar</button>,
 <button onClick={()=>this.detalle(id_planeacion_dimension)}  className="btn btn-warning" >Detalle</button>


 ]
 };
 pldi.push(obj);
 });
 this.setState({
    pldi
 });
 });
 },100)
}

editar(id_planeacion_dimension){
  this.props.history.push(`/Planeacion_Dimension/modificar/${id_planeacion_dimension}`);
}

detalle(id_planeacion_dimension){
  this.props.history.push(`/Planeacion_Dimension/detalle/${id_planeacion_dimension}`);
}



 componentDidMount() {
 this.llamar_listar();
 }  

 // componentWillReceiveProps() {
 // this.llamar_listar();
 // }

 cambiar_estado(id_planeacion_dimension){
  axios({
      method: 'delete',
      url: `${URL}/${id_planeacion_dimension}`,
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


 boton_estado(clase, texto, id_planeacion_dimension) {
  return (<button onClick={()=>{
    this.cambiar_estado(id_planeacion_dimension);
  }}
  
  className={clase}
  >
  {texto}
  </button>
  );
  }

 listar() {
 if (this.state.pldi.length > 0) {
 return this.state.pldi.map((e, i) => (
 <tr key={i}>
  <td>{e.id_planeacion_dimension}</td>
<td>{e.id_planeacion}</td>
<td>{e.id_dimension}</td>
 <td>{e.estado}</td>
 <td>{e.botones}</td>

   
 </tr>

 ));
 }
 }

 render() {
 var data = this.state.pldi;
 var ds = [];
 if (this.state.parametro !== "" ) {
 data.forEach(v => {
 if (
  v.id_planeacion_dimension.toString().includes(this.state.parametro) ||
  v.id_planeacion.toString().includes(this.state.parametro) ||
  v.id_dimension.toString().includes(this.state.parametro) ||
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
  "Id planeación",
  "Id dimensión",
  "Estado",
  

 ]}
 
 propiedades={[
  "id_planeacion_dimension",
  "id_planeacion",
  "id_dimension",
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
