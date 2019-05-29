import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import MunicipioSelect from './../../componets/Municipio/MunicipioSelect';
import AcudienteSelect from './../../componets/Acudiente/AcudienteSelect';
import ParentescoSelect from './../../componets/Parentesco/ParentescoSelect';
import TipodocumentoSelect from './../../componets/Tipodocumento/Tipodocumento';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const max = new Date();
const EstudianteSchema = Yup.object().shape(
    {
    documento: Yup.number('Los caracteres deben ser numeros')
    .min(1, 'El numero es muy corto')
    .max(99999999999, 'El numero es muy largo')
    .required('Campo requerido'),
   
    //tipo_documento: Yup.string()
    //.required('Campo requerido'),

    eps: Yup.string('El campo campo solo pueden ir letras')
    .min(2, 'Campo demasiado corto')
    .max(12, 'Campo demasiado largo')
    .required('Campo requerido'),  

    rh:  Yup.string('El campo campo solo pueden ir letras')
    .min(2, 'Campo demasiado corto')
    .max(4, 'Campo demasiado largo')
    .required('Campo requerido'),  

    Lugar_espedicion:  Yup.string('El campo campo solo pueden ir letras')
    .min(2, 'Campo demasiado corto')
    .max(16, 'Campo demasiado largo')
    .required('Campo requerido'),  


    
    fecha_expedicion: Yup.date('La fecha no puede ser mayor a hoy')
    
    .default(new Date(max))
    .max(new Date(max), `La fecha supera la actual ${max}`)
    .required('Campo requerido'),
     


    Primer_nombre: Yup.string()
    .min(2, 'Campo demasiado corto')
    .max(16, 'Campo demasiado largo')
    .required('Campo requerido'),  

    segundo_nombre: Yup.string()
    .min(2, 'Campo demasiado corto')
    .max(16, 'Campo demasiado largo'),

    primer_apellido: Yup.string()
    .min(2, 'Campo demasiado corto')
    .max(16, 'Campo demasiado largo')
    .required('Campo requerido'),  
    
    segundo_apellido: Yup.string()
    .min(2, 'Campo demasiado corto')
    .max(16, 'Campo demasiado largo')
    .required('Campo requerido'),  

    celular: Yup.number('Los caracteres deben ser numeros')
    .required('Campo requerido') 
    .min(999999999, 'Campo demasiado corto')
    .max(99999999999, 'Campo demasiado largo'),

    telefono: Yup.number('Los caracteres deben ser numeros')
    .required('Campo requerido') 
    .min(999999, 'Campo demasiado corto')
    .max(99999999, 'Campo demasiado largo'),


    //id_municipio: Yup.string()
    //.required('Campo requerido'),

    direccion: Yup.string()
    .min(2, 'Campo demasiado corto')
    .max(40, 'Campo demasiado largo')
    .required('Campo requerido'), 

    //documento_acudiente : Yup.string()
    //.required('Campo requerido'),
});

class ModificarEstudiante extends Component {

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

    volver(){
        this.props.history.push(`/Estudiante`);
    }

    componentWillMount(){
        let id = this.props.match.params.id;
        let id_estudiante = `${id}`
        axios({
            method: 'get',
            url: `${URL}/Estudiante/`+id_estudiante,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    estudiante : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }

        modificar(value){
            axios({
                method: 'put',
                url: `${URL}/Estudiante/${this.state.estudiante.id}`,
                headers: {
                    "Authorization": "bearer "+TOKEN
                },
                data : value
              }).then(respuesta=>{
                let datos = respuesta.data;
                if(datos.ok){
                    this.setState({
                        sweetShow: true,
                        sweetText: datos.mensaje,
                        sweetTitle: "Genial",
                        sweetType: "success"
                    });
                        
                    }else{
                        this.setState({
                            sweetShow: true,
                            sweetText: datos.error,
                            sweetTitle: "Ops",
                            sweetType: "error"
                        });
                    }
              });
        }

        formulario(){
            return(
            <Formik
                initialValues={this.state.estudiante}
                validationSchema={EstudianteSchema}
                onSubmit={value=>{
                    this.modificar(value);
                }}
                >
                {({ errors, touched, values }) => (
                    <Form>

<div className = "container">      
             
                    <h1>Modificar estudiante</h1> 
                       
                      <div className="row">
  
  
                          <div className="col-6 form-group ">
                          <label>Documento</label>
                          <Field type ="button" name="documento" className="form-control" />
                          {errors.documento && touched.documento ? (
                          <div className="text-danger">{errors.documento}</div>
                          ) : null}   
                          </div>
      
  
  
                          <div className="col-6 form-group">
                          <label>Tipo de documento</label>
                          <TipodocumentoSelect id_tipodocumento={this.state.estudiante.id_tipodocumento}/>
                          {errors.id_tipodocumento && touched.id_tipodocumento ? (
                          <div className="text-danger">{errors.id_tipodocumento}</div>
                          ) : null}       
                          </div>
  
  
  
  
                           <div className="col-6 form-group">
                           <label>Eps</label>
                          <Field name="eps" className="form-control" />
                          {errors.eps && touched.eps ? (
                          <div className="text-danger">{errors.eps}</div>
                          ) : null} 
                          </div>   
  
  
  
  
                          <div className="col-6 form-group">
                          <label>Rh</label>  
                          <Field name="rh" className="form-control" />
                          {errors.rh && touched.rh ? (
                          <div className="text-danger">{errors.rh}</div>
                          ) : null}   
                          </div>                       
  
  
  
  
                           <div className="col-6 form-group">
                           <label>Lugar de expedición</label>  
                          <Field name="Lugar_espedicion" className="form-control" />
                          {errors.Lugar_espedicion && touched.Lugar_espedicion ? (
                          <div className="text-danger">{errors.Lugar_espedicion}</div>
                          ) : null}  
                          </div>                       
  
  
  
  
  
                           <div className="col-6 form-group">
                           <label>Fecha de expedición</label>  
                          <Field name="fecha_expedicion" className="form-control" />
                          {errors.fecha_expedicion && touched.fecha_expedicion ? (
                          <div className="text-danger">{errors.fecha_expedicion}</div>
                          ) : null}  
                          </div>                       
  
  
  
  
                           <div className="col-6 form-group">
                           <label>Primer nombre</label>  
                         <Field name="Primer_nombre" className="form-control" />
                          {errors.Primer_nombre && touched.Primer_nombre ? (
                          <div className="text-danger">{errors.Primer_nombre}</div>
                          ) : null} 
                          </div>        
  
  
  
  
                           <div className="col-6 form-group">
  
                     <label>Segundo nombre</label> 
                         <Field name="segundo_nombre" className="form-control" />
                          {errors.segundo_nombre && touched.segundo_nombre ? (
                          <div className="text-danger">{errors.segundo_nombre}</div>
                          ) : null}    
                          </div>       
  
  
  
  
                           <div className="col-6 form-group">
  
                  <label>Primer apellido</label> 
                          <Field name="primer_apellido" className="form-control" />
                          {errors.primer_apellido && touched.primer_apellido ? (
                          <div className="text-danger">{errors.primer_apellido}</div>
                          ) : null} 
                          </div>     
  
  
  
  
                           <div className="col-6 form-group">
                           <label>Segundo apellido</label> 
                          <Field name="segundo_apellido" className="form-control" />
                          {errors.segundo_apellido && touched.segundo_apellido ? (
                          <div className="text-danger">{errors.segundo_apellido}</div>
                          ) : null} 
                          </div>                       
  
  
  
  
                           <div className="col-6 form-group">
                           <label>Celular</label> 
                          <Field name="celular" className="form-control" />
                          {errors.celular && touched.celular ? (
                          <div className="text-danger">{errors.celular}</div>
                          ) : null} 
                          </div>                       
  
  
  
  
  
  
  
                           <div className="col-6 form-group">
  
                   <label>Teléfono</label> 
                         <Field name="telefono" className="form-control" />
                          {errors.telefono && touched.telefono ? (
                          <div className="text-danger">{errors.telefono}</div>
                          ) : null} 
                          </div>                       
  
  
  
  
                           <div className="col-6 form-group">
                           <label>Municipio</label> 
                           <MunicipioSelect id_municipio={this.state.estudiante.id_municipio}/>
                           {errors.municipio_id  && values.municipio_id == ""  ? (
                          <div className="text-danger">{errors.municipio_id }</div>
                          ) : null} 
                              </div>
                      
  
                          <div className="col-6 form-group">
                   <label>Dirección</label> 
                       <Field name="direccion" className="form-control" />
                          {errors.direccion  && touched.direccion  ? (
                          <div className="text-danger">{errors.direccion }</div>
                          ) : null} 
  
                          </div>
  
  
  
  
                          <div className="col-6 form-group">
                          <label>Documento del acudiente</label> 
                          <AcudienteSelect id_acudiente={this.state.estudiante.id_acudiente}/>
                          {errors.id_acudiente && touched.id_acudiente ? (
                          <div className="text-danger">{errors.id_acudiente }</div>
                          ) : null} 
                          </div>

                          
                          <div className="col-6 form-group">
                           <label>Parentesco</label> 
                           <ParentescoSelect id_parentesco={this.state.estudiante.id_parentesco}/>
                           {errors.id_parentesco  && values.id_parentesco == ""  ? (
                          <div className="text-danger">{errors.id_parentesco }</div>
                          ) : null} 
                              </div>
  
  

                           < br/>
                           < br/>
                           < br/>
                              <div className="wrapp">
                              <div className = "col-1 form-group2">
                              <button type="submit" className="btn btn-success float-right">Modificar</button>
                              </div>

                              <div className = "col-1 form-group2">
                            <button onClick={()=>this.volver()} className="btn btn-danger">Cancelar</button>
                            
                            </div>
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
                this.state.estudiante != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/Estudiante');
                    }}
                />
    </div>
        );
    }
}

export default ModificarEstudiante;
