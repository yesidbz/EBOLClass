import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const DocentesSchema = Yup.object().shape({


        name: Yup.string()
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

    documento_docente: Yup.number('Los caracteres deben ser numeros')
    .min(1, 'El numero es muy corto')
    .max(99999999999, 'El numero es muy largo')
    .required('Campo requerido'),
    
    direccion: Yup.string()
    .min(2, 'Campo demasiado corto')
    .max(40, 'Campo demasiado largo')
    .required('Campo requerido'), 
    

    
});

class ModificarDocentes1 extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            docentes : null
        }
    }

    volver(){
        this.props.history.push(`/administrador`);
    }

    componentWillMount(){
        let iddocente = this.props.match.params.iddocente;
        axios({
            method: 'get',
            url: `${URL}/Administrador/${iddocente}`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    docentes : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }

        modificar(value){
            axios({
                method: 'put',
                url: `${URL}/Administrador/${this.state.docentes.iddocente}`,
                headers: {
                    "Authorization": "bearer "+TOKEN
                } ,
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
            return(<Formik
                initialValues={this.state.docentes}
                validationSchema={DocentesSchema}
                onSubmit={value=>{
                    this.modificar(value);
                }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                           <div className = "container">      
             
                        <h1>Modificar administrador</h1>
    
                        <div className="row">
                 
                 
                 
                 


                        <div className="col-6 form-group">
                        <label>Documento administrador</label>
                            <Field type="button" name="documento_docente" className="form-control"/>
                            {errors.documento_docente && touched.documento_docente ? (
                            <div className="text-danger">{errors.documento_docente}</div> 
                            ): null}
                        </div>


    
                        <div className="col-6 form-group">
                            <label>Primer nombre</label>
                            <Field name="name" className="form-control"/>
                            {errors.name && touched.name ? (
                            <div className="text-danger">{errors.name}</div>
                            ) : null}
                        </div>

                        <div className="col-6 form-group">
                        <label>Segundo nombre</label>
                            <Field name="segundo_nombre" className="form-control"/>
                            {errors.segundo_nombre && touched.segundo_nombre ? (
                            <div className="text-danger">{errors.segundo_nombre}</div> 
                            ): null}
                        </div>

                        <div className="col-6 form-group">
                        <label>Primer apellido</label>
                            <Field name="primer_apellido" className="form-control"/>
                            {errors.primer_apellido && touched.primer_apellido ? (
                            <div className="text-danger">{errors.primer_apellido}</div> 
                            ): null}
                        </div>

                        <div className="col-6 form-group">
                        <label>Segundo apellido</label>
                            <Field name="segundo_apellido" className="form-control"/>
                            {errors.segundo_apellido && touched.segundo_apellido ? (
                            <div className="text-danger">{errors.segundo_apellido}</div> 
                            ): null}
                        </div>

                        <div className="col-6 form-group">
                        <label>Celular</label>
                            <Field name="celular" className="form-control"/>
                            {errors.celular && touched.celular ? (
                            <div className="text-danger">{errors.celular}</div> 
                            ): null}
                        </div>



                        <div className="col-6 form-group">
                        <label>Teléfono</label>
                            <Field name="telefono" className="form-control"/>
                            {errors.telefono && touched.telefono ? (
                            <div className="text-danger">{errors.telefono}</div> 
                            ): null}
                        </div>



                        <div className="col-6 form-group">
                        <label>Dirección</label>
                            <Field name="direccion" className="form-control"/>
                            {errors.direccion && touched.direccion ? (
                            <div className="text-danger">{errors.direccion}</div> 
                            ): null}
                        </div>


                            <br/>
                            <br/>
                            <div className="wrapp">
                            <div className="col-1 form-group2">
                                <button type="submit" className="btn btn-warning float-right">Modificar</button>
                            </div>

                            <div className = "col-1 form-group2">
                            <button onClick={()=>this.volver()} className="btn btn-danger">Cancelar</button>
                            </div>
                            </div>
                            <br/>
                            <br/>
                            
                            
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
                this.state.docentes != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/administrador');
                    }}
                />
    </div>
        );
    }
}

export default ModificarDocentes1;