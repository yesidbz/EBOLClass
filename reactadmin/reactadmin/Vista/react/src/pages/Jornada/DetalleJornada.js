import React, {Component} from 'react';
import {URL, TOKEN} from '../../config/config';
import { Formik, Form, Field } from 'formik';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';



class DetalleJornada extends Component {

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

        

        formulario(){
            return(
            <Formik
                initialValues={this.state.jornada}
                >
                {({ errors, touched, values }) => (
                    <Form>
                        <div className="container">
                    <h1>Detalles de la jornada</h1> 
                       
                      <div className="row">
  
      
                          <div className="col-6 form-group ">
                        <label>Nombre</label>
                        <Field type="submit" name="nombre" className="form-control" />
                        {errors.nombre && touched.nombre ? (
                        <div className="text-danger">{errors.nombre}</div>
                        ) : null}   
                        </div>
    
                        <div className="col-6 form-group ">
                        <label>Hora de inicio</label>
                        <Field type="submit" name="hora_inicio" className="form-control" />
                        {errors.hora_inicio && touched.hora_inicio ? (
                        <div className="text-danger">{errors.hora_inicio}</div>
                        ) : null}   
                        </div>

                        <div className="col-6 form-group ">
                        <label>Hora final</label>
                        <Field type="submit" name="hora_fin" className="form-control" />
                        {errors.hora_fin && touched.hora_fin ? (
                        <div className="text-danger">{errors.hora_fin}</div>
                        ) : null}   
                        </div>

  
                         
                           < br/>
                           < br/>
                           < br/>

                              <div className="wrapp">
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
            this.props.history.push(`/Jornada`);
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

export default DetalleJornada;
