import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, Col } from "reactstrap";
import Tabla from "../../componets/Tabla/Tabla";
import {URL,TOKEN} from '../../config/config';
import SweetAlert from 'sweetalert-react';

// import ModificarVisitante from './../Visitante/ModificarVisitante';

export default class Programacion extends Component {
 constructor(props) {
 super(props);
 this.state = {
 programacion: [],
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
        url: `${URL}/Programacion`,
         headers: {
                "Authorization": "bearer "+TOKEN
            }
        
        }).then(respuesta => {
 let r = respuesta.data;
 let programacion = [];
 r.data.forEach(d => {
 const {id_programacion, id_docente_asignatura, id_grado_grupo_alumno, hora_i,hora_f,dias_semana,id_jornada,estado, } = d;
 let obj = {
 id_programacion,
 id_docente_asignatura,
 id_grado_grupo_alumno,
 hora_i,
 hora_f,
 dias_semana,
 id_jornada,
 estado,
 estado: estado === 1 ? "Activo" : "Inactivo",id_programacion,
 botones: [
 this.boton_estado(
 `btn btn-${estado === 1 ? "danger" : "success"}`,
 estado === 1 ? "Inhabilitar" : "Activar",id_programacion,
 ),
 <button onClick={()=>this.editar(id_programacion)} className="btn btn-primary">Editar</button>,
 <button onClick={()=>this.detalle(id_programacion)}  className="btn btn-warning" >Detalle</button>


 ]
 };
 programacion.push(obj);
 });
 this.setState({
 programacion
 });
 });
 },100)
}

editar(id_programacion){
  this.props.history.push(`/Programacion/modificar/${id_programacion}`);
}

detalle(id_programacion){
  this.props.history.push(`/Programacion/detalle/${id_programacion}`);
}



 componentDidMount() {
 this.llamar_listar();
 }

 // componentWillReceiveProps() {
 // this.llamar_listar();
 // }

 cambiar_estado(id_programacion){
  axios({
      method: 'delete',
      url: `${URL}/Programacion/${id_programacion}`,
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


 boton_estado(clase, texto, id_programacion) {
  return (<button onClick={()=>{
    this.cambiar_estado(id_programacion);
  }}
  
  className={clase}
  >
  {texto}
  </button>
  );
  }

 listar() {
 if (this.state.programacion.length > 0) {
 return this.state.programacion.map((e, i) => (
 <tr key={i}>
  <td>{e.id_programacion}</td>
           <td>{e.id_docente_asignatura}</td>
           <td>{e.id_grado_grupo_alumno}</td>
           <td>{e.hora_i}</td>
           <td>{e.hora_f}</td>
           <td>{e.dias_semana}</td>
           <td>{e.id_jornada}</td>
 <td>{e.estado}</td>
 <td>{e.botones}</td>

   
 </tr>

 ));
 }
 }

 render() {
 var data = this.state.programacion;
 var ds = [];
 if (this.state.parametro !== "" ) {
 data.forEach(v => {
 if (
  v.id_programacion.toString().includes(this.state.parametro) ||
  v.id_docente_asignatura.toString().includes(this.state.parametro) ||
  v.id_grado_grupo_alumno.toString().includes(this.state.parametro) ||
  v.hora_i.toString().includes(this.state.parametro) ||
  v.hora_f.toString().includes(this.state.parametro) ||
  v.dias_semana.toLowerCase().includes(this.state.parametro) ||
  v.id_jornada.toString().includes(this.state.parametro) ||
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
  "ID",
  "Docente asignatura",
  "Salon",
  "Hora inicio",
  "Hora final",
  "Dia de la semana",
  "Jornada",
  "Estado",
  

 ]}
 
 propiedades={[
  "id_programacion",
  "id_docente_asignatura",
  "id_grado_grupo_alumno",
  "hora_i",
  "hora_f",
  "dias_semana",
  "id_jornada",
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
