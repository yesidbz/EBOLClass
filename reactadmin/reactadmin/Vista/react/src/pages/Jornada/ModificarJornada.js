import React, {Component} from 'react';
import {URL, TOKEN} from '../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const JornadaSchema = Yup.object().shape({
    nombre : Yup.string()
    .min(2, 'Campo demasiado corto')
    .max(16, 'Campo demasiado largo')
    .required('Campo requerido'),  
   
    hora_inicio :  Yup.string()
      .required('Campo requerido'),  

    hora_fin :  Yup.string()
     .required('Campo requerido'),  
    
});

class ModificarJornada extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            jornada : null
        }
    }

    componentWillMount(){
        let id_jornada = this.props.match.params.id;
        axios({
            method: 'get',
            url: `${URL}/Jornada/`+ `${id_jornada}`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    jornada : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }

        modificar(value){
            axios({
                method: 'put',
                url: `${URL}/Jornada/${this.state.jornada.id_jornada}`,
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
                initialValues={this.state.jornada}
                validationSchema={JornadaSchema}
                onSubmit={value=>{
                    this.modificar(value);
                }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                        <div className="container">
                    <h1>Modificar jornada</h1> 
                       
                      <div className="row">
  
      
                          <div className="col-6 form-group ">
                        <label>Nombre</label>
                        <Field name="nombre" className="form-control" />
                        {errors.nombre && touched.nombre ? (
                        <div className="text-danger">{errors.nombre}</div>
                        ) : null}   
                        </div>
    
                        <div className="col-6 form-group ">
                        <label>Hora de inicio</label>
                        <Field name="hora_inicio" className="form-control" />
                        {errors.hora_inicio && touched.hora_inicio ? (
                        <div className="text-danger">{errors.hora_inicio}</div>
                        ) : null}   
                        </div>

                        <div className="col-6 form-group ">
                        <label>Hora final</label>
                        <Field name="hora_fin" className="form-control" />
                        {errors.hora_fin && touched.hora_fin ? (
                        <div className="text-danger">{errors.hora_fin}</div>
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

        volver(){
            this.props.history.push(`/jornada`);
        }

    render(){
        return(
            <div>
            {
                this.state.jornada != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/Jornada');
                    }}
                />
    </div>
        );
    }
}

export default ModificarJornada;
