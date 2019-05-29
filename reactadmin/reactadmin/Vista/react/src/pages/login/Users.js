import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, Col } from "reactstrap";
import Tabla from "./../../componets/Tabla/Tabla";
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';

// import ModificarVisitante from './../Visitante/ModificarVisitante';

export default class User extends Component {
 constructor(props) {
 super(props);
 this.state = {
User: [],
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
        url: `${URL}/User`,
         headers: {
                "Authorization": "bearer "+TOKEN
            }
        
        }).then(respuesta => {
 let r = respuesta.data;
 let User = [];
 r.data.forEach(d => {
 const {id,name,email,password,created_at,updated_at,is_verified,estado,rol } = d;
 let obj = {
 id,
 name,
 email,
 password,
 created_at,
 updated_at,
 is_verified : is_verified === 1 ? "validado" : "No validado",id,
 rol,
 estado: estado === 1 ? "Activo" : "Inactivo",id,
 botones: [
 this.boton_estado(
 `btn btn-${estado === 1 ? "danger" : "success"}`,
 estado === 1 ? "Inhabilitar" : "Activar",id,
 ),



 ]
 };
 User.push(obj);
 });
 this.setState({
 User
 });
 });
 },100)
}







 componentDidMount() {
 this.llamar_listar();
 }

 // componentWillReceiveProps() {
 // this.llamar_listar();
 // }

 cambiar_estado(id){
  axios({
      method: 'delete',
      url: `${URL}/User/${id}`,
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


 boton_estado(clase, texto, id) {
  return (<button onClick={()=>{
    this.cambiar_estado(id);
  }}
  
  className={clase}
  >
  {texto}
  </button>
  );
  }

 listar() {
 if (this.state.User.length > 0) {
 return this.state.User.map((e, i) => (
 <tr key={i}>
  <td>{e.id}</td>
  <td>{e.name}</td>
<td>{e.email}</td>
<td>{e.password}</td>
 <td>{e.created_at}</td>
<td>{e.updated_at}</td>
<td>{e.is_verified}</td>
<td>{e.rol}</td>
 <td>{e.estado}</td>
 <td>{e.botones}</td>


 </tr>

 ));
 }
 }

 render() {
 var data = this.state.User;
 var ds = [];
 if (this.state.parametro !== "" ) {
 data.forEach(v => {
 if (
 v.id.toString().includes(this.state.parametro) || 
 v.name.toLowerCase().includes(this.state.parametro) ||
 v.email.toLowerCase().includes(this.state.parametro) ||
v.password.toLowerCase().includes(this.state.parametro) ||
v.created_at.toLowerCase().includes(this.state.parametro) ||
v.updated_at.toLowerCase().includes(this.state.parametro) ||
v.is_verified.toString().includes(this.state.parametro) ||
v.rol.toLowerCase().includes(this.state.parametro) ||
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
    "Id del usuario",
    "Nombre del usuario",
    "Email",
    "fecha de creacion",
    "fecha de edicion",
    "validado por correo",
    "Rol",
    "Estado",


 ]}
 
 propiedades={[
    "id",
    "name",
    "email",
    "created_at",
    "updated_at",
    "is_verified",
    "rol",
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
