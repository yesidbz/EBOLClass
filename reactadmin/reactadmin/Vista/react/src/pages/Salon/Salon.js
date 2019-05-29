import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, Col } from "reactstrap";
import Tabla from "./../../componets/Tabla/Tabla";
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';

// import ModificarVisitante from './../Visitante/ModificarVisitante';

export default class Salon extends Component {
 constructor(props) {
 super(props);
 this.state = {
 salon: [],
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
        url: `${URL}/Salon`,
         headers: {
                "Authorization": "bearer "+TOKEN
            }
        
        }).then(respuesta => {
 let r = respuesta.data;
 let salon = [];
 r.data.forEach(d => {
 const {id_grado_grupo,id_grupo,id_grado,estado } = d;
 let obj = {
id_grado_grupo,
 id_grupo,
 id_grado,
 estado: estado === 1 ? "Activo" : "Inactivo",id_grado_grupo,
 botones: [
 this.boton_estado(
 `btn btn-${estado === 1 ? "danger" : "success"}`,
 estado === 1 ? "Inhabilitar" : "Activar",id_grado_grupo,
 ),
 <button onClick={()=>this.editar(id_grado_grupo)} className="btn btn-primary">Editar</button>,
 <button onClick={()=>this.detalle(id_grado)}  className="btn btn-warning" >Detalle</button>


 ]
 };
 salon.push(obj);
 });
 this.setState({
 salon
 });
 });
 },100)
}

editar(id_grado_grupo){
  this.props.history.push(`/Salon/modificar/${id_grado_grupo}`);
}

detalle(id_grado){
  this.props.history.push(`/Salon/detalle/${id_grado}`);
}



 componentDidMount() {
 this.llamar_listar();
 }

 // componentWillReceiveProps() {
 // this.llamar_listar();
 // }

 cambiar_estado(id_grado_grupo){
  axios({
      method: 'delete',
      url: `${URL}/Salon/${id_grado_grupo}`,
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


 boton_estado(clase, texto, id_grado_grupo) {
  return (<button onClick={()=>{
    this.cambiar_estado(id_grado_grupo);
  }}
  
  className={clase}
  >
  {texto}
  </button>
  );
  }

 listar() {
 if (this.state.salon.length > 0) {
 return this.state.salon.map((e, i) => (
 <tr key={i}>
  <td>{e.id_grado_grupo}</td>
  <td>{e.id_grado}</td>
<td>{e.id_grupo}</td>
 <td>{e.estado}</td>
 <td>{e.botones}</td>

   
 </tr>

 ));
 }
 }

 render() {
 var data = this.state.salon;
 var ds = [];
 if (this.state.parametro !== "" ) {
 data.forEach(v => {
 if (
  v.id_grado_grupo.toString().includes(this.state.parametro) ||
  v.id_grupo.toString().includes(this.state.parametro) ||
  v.id_grado.toString().includes(this.state.parametro) ||
 v.estado.includes(this.state.parametro)
 ) {
 ds.push(v);
 }
 });
 data = ds;
 }
 return (
 <div class="container">
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
  "Id grado",
  "Id grupo",
  "Estado",
  

 ]}
 
 propiedades={[
  "id_grado_grupo",
  "id_grado",
  "id_grupo",
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
