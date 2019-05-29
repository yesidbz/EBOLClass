import React, {Component} from 'react'
import MunicipioSelect from './../../componets/Municipio/MunicipioSelect'
import ParentescoSelect from './../../componets/Parentesco/ParentescoSelect'
import TipodocumentoSelect from './../../componets/Tipodocumento/Tipodocumento'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';


const AcudienteSchema  = Yup.object().shape({
    documento: Yup.string()
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


class CrearAcudiente extends Component {



    constructor(props){
        super(props);
        this.state = {
           sweetShow : false ,
           sweetTitle : '',
           sweetText : '',
           sweetType : '',
        }

    }

            Acudiente = {
            documento : '',
            tipo_documento : '',
            eps : '',
            rh : '',
            Lugar_espedicion : '',
            fecha_expedicion : '',
            Primer_nombre : '',
            segundo_nombre : '',
            primer_apellido : '',
            segundo_apellido : '',
            celular : '',
            telefono : '',
            id_parentesco : '',
            id_municipio : '',
            direccion : '',
            
            
            }


            guardar(value){
                axios({
                    method: 'post',
                    url: `${URL}/Acudiente`,
                     headers: {
            
                            "Authorization": "bearer "+TOKEN
                        },
                        data : value
                    }).then(respuesta=>{
                   let datos  = respuesta.data ; 
                   if(datos.ok){
                       this.setState({
                              sweetShow : true,
                             sweetText : datos.mensaje,
                              sweetTitle : "hola",
                              sweetType : "success"

                       });


          

                   }
                       
                      else {
                        this.setState({
                            sweetShow : false,
                            sweetText : datos.error,
                            sweetTitle : "hola",
                            sweetType : "error"

                     });
                      }    
                   
                  });
            }

      render(){
          return (
<div>

            <Formik
            initialValues={this.Acudiente}
            validationSchema={AcudienteSchema}
            onSubmit= {value=>{
                    this.guardar(value);
            }}  
          >
            {({ errors, touched, values }) => (




              <Form>
                  <h1>REGISTRAR ACUDIENTE</h1> 
                     
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
                        <TipodocumentoSelect/>
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
                         <label>Parentezco</label> 
                         <ParentescoSelect/>
                         {errors.id_parentesco  && values.id_parentesco == ""  ? (
                        <div className="text-danger">{errors.id_parentesco }</div>
                        ) : null} 
                            </div>


                            <div className="col-6 form-group">
                         <label>municipio</label> 
                         <MunicipioSelect/>
                         {errors.id_municipio  && values.id_municipio == ""  ? (
                        <div className="text-danger">{errors.id_municipio }</div>
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
                            <button type="submit" className="btn btn-success float-right">Registrar</button>
                            </div>
                    </div>



                            
              </Form>
            )}
          </Formik>

        <SweetAlert
        show={this.state.sweetShow}
        title={this.state.sweetTitle}
        text={this.state.sweetText}
        value={this.state.sweetType}
        onConfirm={() => { 
        this.setState({ sweetShow: false })
        this.props.history.push('/Acudiente');
        }
    }
      />
          
</div>
          );
      }



}

export default CrearAcudiente