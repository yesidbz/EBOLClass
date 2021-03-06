import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, Col } from "reactstrap";
import Tabla from "./../../componets/Tabla/Tabla";
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';

// import ModificarVisitante from './../Visitante/ModificarVisitante';

export default class AsignarSalon extends Component {
 constructor(props) {
 super(props);
 this.state = {
 grado_grupo_alumno: [],
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
        url: `${URL}/AsignarSalon`,
         headers: {
                "Authorization": "bearer "+TOKEN
            }
        
        }).then(respuesta => {
 let r = respuesta.data;
 let grado_grupo_alumno = [];
 r.data.forEach(d => {
 const {id_grado_grupo_alumno,idano,id_grado_grupo,iddocente,idestudiante,estado } = d;
 let obj = {
 id_grado_grupo_alumno,
 idano,
 id_grado_grupo,
 iddocente,
 idestudiante,
 estado: estado === 1 ? "Activo" : "Inactivo",id_grado_grupo_alumno,
 botones: [
 this.boton_estado(
 `btn btn-${estado === 1 ? "danger" : "success"}`,
 estado === 1 ? "Inhabilitar" : "Activar",id_grado_grupo_alumno,
 ),
 <button onClick={()=>this.editar(id_grado_grupo_alumno)} className="btn btn-primary">Editar</button>,
 <button onClick={()=>this.detalle(id_grado_grupo_alumno)}  className="btn btn-warning" >Detalle</button>


 ]
 };
 grado_grupo_alumno.push(obj);
 });
 this.setState({
 grado_grupo_alumno
 });
 });
 },100)
}

editar(id_grado_grupo_alumno){
  this.props.history.push(`/AsignarSalon/modificar/${id_grado_grupo_alumno}`);
}

detalle(id_grado_grupo_alumno){
  this.props.history.push(`/AsignarSalon/detalle/${id_grado_grupo_alumno}`);
}



 componentDidMount() {
 this.llamar_listar();
 }

 // componentWillReceiveProps() {
 // this.llamar_listar();
 // }

 cambiar_estado(id_grado_grupo_alumno){
  axios({
      method: 'delete',
      url: `${URL}/AsignarSalon/${id_grado_grupo_alumno}`,
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


 boton_estado(clase, texto, id_grado_grupo_alumno) {
  return (<button onClick={()=>{
    this.cambiar_estado(id_grado_grupo_alumno);
  }}
  
  className={clase}
  >
  {texto}
  </button>
  );
  }

 listar() {
 if (this.state.grado_grupo_alumno.length > 0) {
 return this.state.grado_grupo_alumno.map((e, i) => (
 <tr key={i}>
 <td>{e.id_grado_grupo_alumno}</td>
 <td>{e.idano}</td>
 <td>{e.iddocente}</td>
 <td>{e.idestudiante}</td>
 <td>{e.id_grado_grupo}</td>
 <td>{e.estado}</td>
 <td>{e.botones}</td>

   
 </tr>

 ));
 }
 }

 render() {
 var data = this.state.grado_grupo_alumno;
 var ds = [];
 if (this.state.parametro !== "" ) {
 data.forEach(v => {
 if (
  v.id_grado_grupo_alumno.toString().includes(this.state.parametro) ||
  v.idano.toString().includes(this.state.parametro) ||
  v.iddocente.toString().includes(this.state.parametro) ||
  v.idestudiante.toString().includes(this.state.parametro) ||
  v.id_grado_grupo.toString().includes(this.state.parametro) ||
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
  "Año",
  "Docente",
  "Estudiante",
  "Salon",
  "Estado"
  

 ]}
 
 propiedades={[
  "id_grado_grupo_alumno",
  "idano",
  "iddocente",
  "idestudiante",
  "id_grado_grupo",
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
