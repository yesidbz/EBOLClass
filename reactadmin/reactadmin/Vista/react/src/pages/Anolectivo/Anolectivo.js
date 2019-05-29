import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, Col } from "reactstrap";
import Tabla from "./../../componets/Tabla/Tabla";
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';

// import ModificarVisitante from './../Visitante/ModificarVisitante';

export default class Anolectivo extends Component {
 constructor(props) {
 super(props);
 this.state = {
 anolectivo: [],
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
        url: `${URL}/Anolectivo`,
         headers: {
                "Authorization": "bearer "+TOKEN
            }
        
        }).then(respuesta => {
 let r = respuesta.data;
 let anolectivo = [];
 r.data.forEach(d => {
 const {idano,anoelectivo,estado } = d;
 let obj = {
 idano,
 anoelectivo,
 estado: estado === 1 ? "Activo" : "Inactivo",idano,
 botones: [
 this.boton_estado(
 `btn btn-${estado === 1 ? "danger" : "success"}`,
 estado === 1 ? "Inhabilitar" : "Activar",idano,
 ),
 <button onClick={()=>this.editar(idano)} className="btn btn-primary">Editar</button>,
 <button onClick={()=>this.detalle(idano)}  className="btn btn-warning" >Detalle</button>


 ]
 };
 anolectivo.push(obj);
 });
 this.setState({
anolectivo
 });
 });
 },100)
}

editar(idano){
  this.props.history.push(`/Anolectivo/modificar/${idano}`);
}

detalle(idano){
  this.props.history.push(`/Anolectivo/detalle/${idano}`);
}



 componentDidMount() {
 this.llamar_listar();
 }

 // componentWillReceiveProps() {
 // this.llamar_listar();
 // }

 cambiar_estado(idano){
  axios({
      method: 'delete',
      url: `${URL}/Anolectivo/${idano}`,
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


 boton_estado(clase, texto, idano) {
  return (<button onClick={()=>{
    this.cambiar_estado(idano);
  }}
  
  className={clase}
  >
  {texto}
  </button>
  );
  }

 listar() {
 if (this.state.anolectivo.length > 0) {
 return this.state.anolectivo.map((e, i) => (
 <tr key={i}>
  <td>{e.idano}</td>
           <td>{e.anoelectivo}</td>
 <td>{e.estado}</td>
 <td>{e.botones}</td>

   
 </tr>

 ));
 }
 }

 render() {
 var data = this.state.anolectivo;
 var ds = [];
 if (this.state.parametro !== "" ) {
 data.forEach(v => {
 if (
  v.idano.toString().includes(this.state.parametro) ||
  v.anoelectivo.toString().includes(this.state.parametro) ||
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
  "Año",
  "Estado",
  

 ]}
 
 propiedades={[
  "idano",
  "anoelectivo",
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
