import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import MunicipioSelect from './../../componets/Municipio/MunicipioSelect';
import ParentescoSelect from './../../componets/Parentesco/ParentescoSelect';
import TipodocumentoSelect from './../../componets/Tipodocumento/Tipodocumento'
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const AcudienteSchema = Yup.object().shape({
    documento: Yup.string()
    .min(2, 'Too Short!')
    .max(40, 'Too Long!')
    .required('Required'),
    eps: Yup.string()
    .min(2, 'Too Short!')
    .max(40, 'Too Long!')
    .required('Required'),
    rh: Yup.string()
    .min(2, 'Too Short!')
    .max(40, 'Too Long!')
    .required('Required'),
    Lugar_espedicion: Yup.string()
    .min(2, 'Too Short!')
    .max(40, 'Too Long!')
    .required('Required'),
    fecha_expedicion: Yup.string()
    .min(2, 'Too Short!')
    .max(40, 'Too Long!')
    .required('Required'),
    Primer_nombre: Yup.string()
    .min(2, 'Too Short!')
    .max(40, 'Too Long!')
    .required('Required'),
    segundo_nombre: Yup.string()
    .min(2, 'Too Short!')
    .max(40, 'Too Long!')
    .required('Required'),
    primer_apellido: Yup.string()
    .min(2, 'Too Short!')
    .max(40, 'Too Long!')
    .required('Required'),
    segundo_apellido: Yup.string()
    .min(2, 'Too Short!')
    .max(40, 'Too Long!')
    .required('Required'),
    celular: Yup.string()
    .required('Required'),
    telefono: Yup.string()
    .required('Required'),
    id_municipio: Yup.string()
    .required('Required'),
    id_parentesco: Yup.string()
    .required('Required'),
});

class ModificarAcudiente extends Component {

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

        modificar(value){
            axios({
                method: 'put',
                url: `${URL}/Acudiente/${this.state.acudiente.id}`,
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
                        sweetTitle: "Hola",
                        sweetType: "success"
                    });
                        
                    }else{
                        this.setState({
                            sweetShow: true,
                            sweetText: datos.error,
                            sweetTitle: "Hola",
                            sweetType: "error"
                        });
                    }
              });
        }

        formulario(){
            return(
            <Formik
                initialValues={this.state.acudiente}
                validationSchema={AcudienteSchema}
                onSubmit={value=>{
                    this.modificar(value);
                }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                    <h1>MODIFICAR ACUDIENTE</h1> 
                       
                      <div className="row">
  
  
                          <div className="col-6 form-group ">
                          <label>documento</label>
                          <Field name="documento" className="form-control" />
                          {errors.documento && touched.documento ? (
                          <div className="text-danger">{errors.documento}</div>
                          ) : null}   
                          </div>
      
  
  
                          <div className="col-6 form-group">
                          <label>Tipo de documento</label>
                          <TipodocumentoSelect id_tipodocumento={this.state.acudiente.id_tipodocumento}/>
                          {errors.tipo_documento && touched.tipo_documento ? (
                          <div className="text-danger">{errors.tipo_documento}</div>
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
                           <label>Lugar de espedicion</label>  
                          <Field name="Lugar_espedicion" className="form-control" />
                          {errors.Lugar_espedicion && touched.Lugar_espedicion ? (
                          <div className="text-danger">{errors.Lugar_espedicion}</div>
                          ) : null}  
                          </div>                       
  
  
  
  
  
                           <div className="col-6 form-group">
                           <label>fecha de expedicion</label>  
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
  
                  <label>Primer Apellido</label> 
                          <Field name="primer_apellido" className="form-control" />
                          {errors.primer_apellido && touched.primer_apellido ? (
                          <div className="text-danger">{errors.primer_apellido}</div>
                          ) : null} 
                          </div>     
  
  
  
  
                           <div className="col-6 form-group">
                           <label>segundo apellido</label> 
                          <Field name="segundo_apellido" className="form-control" />
                          {errors.segundo_apellido && touched.segundo_apellido ? (
                          <div className="text-danger">{errors.segundo_apellido}</div>
                          ) : null} 
                          </div>                       
  
  
  
  
                           <div className="col-6 form-group">
                           <label>celular</label> 
                          <Field name="celular" className="form-control" />
                          {errors.celular && touched.celular ? (
                          <div className="text-danger">{errors.celular}</div>
                          ) : null} 
                          </div>                       
  
  
  
  
  
  
  
                           <div className="col-6 form-group">
  
                   <label>telefono</label> 
                         <Field name="telefono" className="form-control" />
                          {errors.telefono && touched.telefono ? (
                          <div className="text-danger">{errors.telefono}</div>
                          ) : null} 
                          </div>                       
  
  
  
  
                          <div className="col-6 form-group">
                           <label>municipio</label> 
                           <MunicipioSelect id_municipio={this.state.acudiente.id_municipio}/>
                           {errors.municipio_id  && values.municipio_id == ""  ? (
                          <div className="text-danger">{errors.municipio_id }</div>
                          ) : null} 
                              </div>

                            <div className="col-6 form-group">
                           <label>parentezco</label> 
                           <ParentescoSelect id_parentesco={this.state.acudiente.id_acudiente}/>
                           {errors.parentesco_id  && values.parentesco_id == ""  ? (
                          <div className="text-danger">{errors.acudiente_id }</div>
                          ) : null} 
                              </div>
                      
  
                          <div className="col-6 form-group">
                   <label>direccion</label> 
                       <Field name="direccion" className="form-control" />
                          {errors.direccion  && touched.direccion  ? (
                          <div className="text-danger">{errors.direccion }</div>
                          ) : null} 
  
                          </div>
  

  

                           < br/>
                           < br/>
                           < br/>
                              <div className = "col-1 form-group2">
                              <button type="submit" className="btn btn-success float-right">Modificar</button>
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

export default ModificarAcudiente;
