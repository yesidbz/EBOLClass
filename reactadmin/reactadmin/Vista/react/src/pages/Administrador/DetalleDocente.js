import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';



class DetalleDocentes1 extends Component {

    constructor(props){
        super(props);
        this.state = {
            docentes : null
        }
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


    volver(){
        this.props.history.push(`/Docentes`);
    }
        

        formulario(){
            return(<Formik
                initialValues={this.state.docentes}
                onSubmit={value=>{
                
                }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                           <div className = "container">      
             
                        <h1>Detalle del Administrador</h1>
    
                        <div className="row">


                        <div className="col-6 form-group">
                        <label>Documento docente</label>
                            <Field type = "submit" name="documento_docente" className="form-control"/>
                            {errors.documento_docente && touched.documento_docente ? (
                            <div className="text-danger">{errors.documento_docente}</div> 
                            ): null}
                        </div>
    
                        <div className="col-6 form-group">
                            <label>Primer nombre</label>
                            <Field type = "submit"  name="name" className="form-control"/>
                            {errors.name && touched.name ? (
                            <div className="text-danger">{errors.name}</div>
                            ) : null}
                        </div>

                        <div className="col-6 form-group">
                        <label>Segundo nombre</label>
                            <Field type = "submit"  name="segundo_nombre" className="form-control"/>
                            {errors.segundo_nombre && touched.segundo_nombre ? (
                            <div className="text-danger">{errors.segundo_nombre}</div> 
                            ): null}
                        </div>

                        <div className="col-6 form-group">
                        <label>Primer apellido</label>
                            <Field type = "submit"  name="primer_apellido" className="form-control"/>
                            {errors.primer_apellido && touched.primer_apellido ? (
                            <div className="text-danger">{errors.primer_apellido}</div> 
                            ): null}
                        </div>

                        <div className="col-6 form-group">
                        <label>Segundo apellido</label>
                            <Field  type = "submit" name="segundo_apellido" className="form-control"/>
                            {errors.segundo_apellido && touched.segundo_apellido ? (
                            <div className="text-danger">{errors.segundo_apellido}</div> 
                            ): null}
                        </div>

                        <div className="col-6 form-group">
                        <label>Celular</label>
                            <Field type = "submit" name="celular" className="form-control"/>
                            {errors.celular && touched.celular ? (
                            <div className="text-danger">{errors.celular}</div> 
                            ): null}
                        </div>

                        <div className="col-6 form-group">
                        <label>Teléfono</label>
                            <Field type = "submit"  name="telefono" className="form-control"/>
                            {errors.telefono && touched.telefono ? (
                            <div className="text-danger">{errors.telefono}</div> 
                            ): null}
                        </div>



                        <div className="col-6 form-group">
                        <label>Dirección</label>
                            <Field type = "submit" name="direccion" className="form-control"/>
                            {errors.direccion && touched.direccion ? (
                            <div className="text-danger">{errors.direccion}</div> 
                            ): null}
                        </div>



                            <br/>
                            <br/>
                            <div className="wrapp">
                            <div className = "col-1 form-group2">
                            <button onClick={()=>this.volver()} className="btn btn-danger">Volver</button>
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
                        this.props.history.push('/administradora');
                    }}
                />
    </div>
        );
    }
}

export default DetalleDocentes1;