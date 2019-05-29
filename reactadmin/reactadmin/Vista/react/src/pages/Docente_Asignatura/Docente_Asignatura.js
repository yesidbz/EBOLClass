import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, Col } from "reactstrap";
import Tabla from "./../../componets/Tabla/Tabla";
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';

// import ModificarVisitante from './../Visitante/ModificarVisitante';

export default class Docente_asignatura extends Component {
 constructor(props) {
 super(props);
 this.state = {
 delegar: [],
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
        url: `${URL}/Docente_Asignatura`,
         headers: {
                "Authorization": "bearer "+TOKEN
            }
        
        }).then(respuesta => {
 let r = respuesta.data;
 let delegar = [];
 r.data.forEach(d => {
 const {id_docente_asignatura,iddocente,idasignatura,estado } = d;
 let obj = {
 id_docente_asignatura,
 iddocente,
 idasignatura,
 estado: estado === 1 ? "Activo" : "Inactivo",id_docente_asignatura,
 botones: [
 this.boton_estado(
 `btn btn-${estado === 1 ? "danger" : "success"}`,
 estado === 1 ? "Inhabilitar" : "Activar",id_docente_asignatura,
 ),
 <button onClick={()=>this.editar(id_docente_asignatura)} className="btn btn-primary">Editar</button>,
 <button onClick={()=>this.detalle(id_docente_asignatura)}  className="btn btn-warning" >Detalle</button>


 ]
 };
 delegar.push(obj);
 });
 this.setState({
 delegar
 });
 });
 },100)
}

editar(id_docente_asignatura){
  this.props.history.push(`/docente_asignatura/modificar/${id_docente_asignatura}`);
}

detalle(id_docente_asignatura){
  this.props.history.push(`/docente_asignatura/detalle/${id_docente_asignatura}`);
}



 componentDidMount() {
 this.llamar_listar();
 }  

 // componentWillReceiveProps() {
 // this.llamar_listar();
 // }

 cambiar_estado(id_docente_asignatura){
  axios({
      method: 'delete',
      url: `${URL}/${id_docente_asignatura}`,
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


 boton_estado(clase, texto, id_docente_asignatura) {
  return (<button onClick={()=>{
    this.cambiar_estado(id_docente_asignatura);
  }}
  
  className={clase}
  >
  {texto}
  </button>
  );
  }

 listar() {
 if (this.state.delegar.length > 0) {
 return this.state.delegar.map((e, i) => (
 <tr key={i}>
  <td>{e.id_docente_asignatura}</td>
<td>{e.iddocente}</td>
<td>{e.idasignatura}</td>
 <td>{e.estado}</td>
 <td>{e.botones}</td>

   
 </tr>

 ));
 }
 }

 render() {
 var data = this.state.delegar;
 var ds = [];
 if (this.state.parametro !== "" ) {
 data.forEach(v => {
 if (
  v.id_docente_asignatura.toString().includes(this.state.parametro) ||
  v.iddocente.toString().includes(this.state.parametro) ||
  v.idasignatura.toString().includes(this.state.parametro) ||
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
  "Id docente",
  "Id asignatura",
  "Estado",
  

 ]}
 
 propiedades={[
  "id_docente_asignatura",
  "iddocente",
  "idasignatura",
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
