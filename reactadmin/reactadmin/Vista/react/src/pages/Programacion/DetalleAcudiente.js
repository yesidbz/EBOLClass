import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';


class DetalleAcudiente extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            estudiante : null
        }
    }

    componentWillMount(){
        let id = this.props.match.params.id;
        let id_acudiente = `${id}`
        axios({
            method: 'get',
            url: `${URL}/Acudiente/`+id_acudiente,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    acudiente : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }

    volver(){
        this.props.history.push(`/Acudiente`);
    }

        formulario(){
            return(
            <Formik
                initialValues={this.state.acudiente}

                >
                {({ errors, touched, values }) => (
                    <Form>
              <div className = "container">

                    <h1>Detalles del acudiente</h1> 
                       
                      <div className="row">
  
  
                          <div className="col-6 form-group ">
                          <label>Documento</label>
                          <Field type ="submit" name="documento" className="form-control" />
                          {errors.documento && touched.documento ? (
                          <div className="text-danger">{errors.documento}</div>
                          ) : null}   
                          </div>
      
    
  
  
                           <div className="col-6 form-group">
                           <label>Eps</label>
                          <Field type ="submit" name="eps" className="form-control" />
                          {errors.eps && touched.eps ? (
                          <div className="text-danger">{errors.eps}</div>
                          ) : null} 
                          </div>   
  
  
  
  
                          <div className="col-6 form-group">
                          <label>Rh</label>  
                          <Field type ="submit" name="rh" className="form-control" />
                          {errors.rh && touched.rh ? (
                          <div className="text-danger">{errors.rh}</div>
                          ) : null}   
                          </div>                       
  
  
  
  
                           <div className="col-6 form-group">
                           <label>Lugar de expedición</label>  
                          <Field type ="submit" name="Lugar_espedicion" className="form-control" />
                          {errors.Lugar_espedicion && touched.Lugar_espedicion ? (
                          <div className="text-danger">{errors.Lugar_espedicion}</div>
                          ) : null}  
                          </div>                       
  
  
  
  
  
                           <div className="col-6 form-group">
                           <label>Fecha de expedición</label>  
                          <Field type ="submit" type="date" name="fecha_expedicion" className="form-control" />
                          {errors.fecha_expedicion && touched.fecha_expedicion ? (
                          <div className="text-danger">{errors.fecha_expedicion}</div>
                          ) : null}  
                          </div>                       
  
  
  
  
                           <div className="col-6 form-group">
                           <label>Primer nombre</label>  
                         <Field type ="submit" name="Primer_nombre" className="form-control" />
                          {errors.Primer_nombre && touched.Primer_nombre ? (
                          <div className="text-danger">{errors.Primer_nombre}</div>
                          ) : null} 
                          </div>        
  
  
  
  
                           <div className="col-6 form-group">
  
                     <label>Segundo nombre</label> 
                         <Field type ="submit" name="segundo_nombre" className="form-control" />
                          {errors.segundo_nombre && touched.segundo_nombre ? (
                          <div className="text-danger">{errors.segundo_nombre}</div>
                          ) : null}    
                          </div>       
  
  
  
  
                           <div className="col-6 form-group">
  
                  <label>Primer Apellido</label> 
                          <Field type ="submit" name="primer_apellido" className="form-control" />
                          {errors.primer_apellido && touched.primer_apellido ? (
                          <div className="text-danger">{errors.primer_apellido}</div>
                          ) : null} 
                          </div>     
  
  
  
  
                           <div className="col-6 form-group">
                           <label>Segundo apellido</label> 
                          <Field type ="submit" name="segundo_apellido" className="form-control" />
                          {errors.segundo_apellido && touched.segundo_apellido ? (
                          <div className="text-danger">{errors.segundo_apellido}</div>
                          ) : null} 
                          </div>                       
  
  
  
  
                           <div className="col-6 form-group">
                           <label>Celular</label> 
                          <Field type ="submit" name="celular" className="form-control" />
                          {errors.celular && touched.celular ? (
                          <div className="text-danger">{errors.celular}</div>
                          ) : null} 
                          </div>                       
  
  
  
  
  
  
  
                           <div className="col-6 form-group">
  
                   <label>Teléfono</label> 
                         <Field type ="submit" name="telefono" className="form-control" />
                          {errors.telefono && touched.telefono ? (
                          <div className="text-danger">{errors.telefono}</div>
                          ) : null} 
                          </div>                       
  
  
  


                      
  
                          <div className="col-6 form-group">
                   <label>Dirección</label> 
                       <Field  type ="submit" name="direccion" className="form-control" />
                          {errors.direccion  && touched.direccion  ? (
                          <div className="text-danger">{errors.direccion }</div>
                          ) : null} 
  
                          </div>
  

  

                           < br/>
                           < br/>
                           < br/>

                              
                              
                              <div className = "col-1 form-group2">
                            <button onClick={()=>this.volver()} className="btn btn-danger">Volver</button>
                            </div>
                      </div>
                      </div>
  
  
                              
                </Form>
                )}
        </Formik>);
        }

    render(){
        return(
            <div>
            {
                this.state.acudiente != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/Acudiente');
                    }}
                />
    </div>
        );
    }
}

export default DetalleAcudiente;
