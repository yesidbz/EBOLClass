import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, Col } from "reactstrap";
import Tabla from "../../componets/Tabla/Tabla";
import {URL,TOKEN} from '../../config/config';
import SweetAlert from 'sweetalert-react';

// import ModificarVisitante from './../Visitante/ModificarVisitante';

export default class Listar extends Component {
 constructor(props) {
 super(props);
 this.state = {
 dap: [],
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
        url: `${URL}/Docente_Asignatura_Planeacion`,
         headers: {
                "Authorization": "bearer "+TOKEN
            }
        
        }).then(respuesta => {
 let r = respuesta.data;
 let dap = [];
 r.data.forEach(d => {
 const {id_docente_asignatura_planeacion,id_docente_asignatura,id_planeacion_dimension,porcentaje,estado } = d;
 let obj = {
 id_docente_asignatura_planeacion,
 id_docente_asignatura,
 id_planeacion_dimension,
 porcentaje,
 estado: estado === 1 ? "Activo" : "Inactivo",id_docente_asignatura_planeacion,
 botones: [
 this.boton_estado(
 `btn btn-${estado === 1 ? "danger" : "success"}`,
 estado === 1 ? "Inhabilitar" : "Activar",id_docente_asignatura_planeacion,
 ),
 <button onClick={()=>this.editar(id_docente_asignatura_planeacion)} className="btn btn-primary">Editar</button>,
 <button onClick={()=>this.detalle(id_docente_asignatura_planeacion)}  className="btn btn-warning" >Detalle</button>


 ]
 };
 dap.push(obj);
 });
 this.setState({
  dap
 });
 });
 },100)
}

editar(id_docente_asignatura_planeacion){
  this.props.history.push(`/D_A_P/modificar/${id_docente_asignatura_planeacion}`);
}

detalle(id_docente_asignatura_planeacion){
  this.props.history.push(`/D_A_P/detalle/${id_docente_asignatura_planeacion}`);
}



 componentDidMount() {
 this.llamar_listar();
 }

 // componentWillReceiveProps() {
 // this.llamar_listar();
 // }

 cambiar_estado(id_docente_asignatura_planeacion){
  axios({
      method: 'delete',
      url: `${URL}/Docente_Asignatura_Planeacion/${id_docente_asignatura_planeacion}`,
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


 boton_estado(clase, texto, id_docente_asignatura_planeacion) {
  return (<button onClick={()=>{
    this.cambiar_estado(id_docente_asignatura_planeacion);
  }}
  
  className={clase}
  >
  {texto}
  </button>
  );
  }

 listar() {
 if (this.state.dap.length > 0) {
 return this.state.dap.map((e, i) => (
 <tr key={i}>
  <td>{e.id_docente_asignatura_planeacion}</td>
 <td>{e.id_docente_asignatura}</td>
 <td>{e.id_planeacion_dimension}</td>
 <td>{e.porcentaje}</td>
 <td>{e.estado}</td>
 <td>{e.botones}</td>

   
 </tr>

 ));
 }
 }

 render() {
 var data = this.state.dap;
 var ds = [];
 if (this.state.parametro !== "" ) {
 data.forEach(v => {
 if (
  v.id_docente_asignatura_planeacion.toString().includes(this.state.parametro) ||
  v.id_docente_asignatura_planeacion.toString().includes(this.state.parametro) ||
  v.id_planeacion_dimension.toString().includes(this.state.parametro) ||
  v.porcentaje.toString().includes(this.state.parametro) ||
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
  "Id docente asignatura",
  "Plaeacion",
  "Porcentaje",
  "Estado",
  

 ]}
 
 propiedades={[
  "id_docente_asignatura_planeacion",
  "id_docente_asignatura",
  "id_planeacion_dimension",
  "porcentaje",
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
