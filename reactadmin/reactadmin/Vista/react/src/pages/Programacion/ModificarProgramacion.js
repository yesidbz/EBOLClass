import React, {Component} from 'react';
import {URL, TOKEN} from '../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Docente_Asignatura_Select from '../../componets/Docente_asignatura/Docente_Asignatura_select';
import AsignarSalonSelect from '../../componets/AsignarSalon/AsignarSalonSelect';
import JornadaSelect from '../../componets/Jornada/JornadaSelect';
import DiaSelect from '../../componets/Dia/DiaSelect';
import HoraISelect from '../../componets/Hora/HoraISelect';
import HoraFSelect from '../../componets/Hora/HoraFSelect';
import Anolectivo from '../../componets/Anolectivo/Anolectivo';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';


const max = new Date(); 
const ProgramacionSchema = Yup.object().shape({
     
    id_docente_asignatura: Yup.string()
    .required('Campo requerido'),
  
     id_grado_grupo_alumno: Yup.string()
     .required('Campo requerido'),

     hora_i: Yup.string()
     .required('Campo requerido'),

     hora_f: Yup.string()
     .required('Campo requerido'),

     dias_semana: Yup.string()
     .required('Campo requerido'),

     id_jornada: Yup.string()
     .required('Campo requerido'),

     idano: Yup.string()
     .required('Campo requerido'),
});


class ModificarProgramacion extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            programacion : null
        }
    }

    componentWillMount(){
        let id_programacion = this.props.match.params.id_programacion;
    
        axios({
            method: 'get',
            url: `${URL}/Programacion/`+`${id_programacion}`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    programacion : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }

    volver(){
        this.props.history.push(`/Programacion`);
    }
        modificar(value){
            axios({
                method: 'put',
                url: `${URL}/Programacion/${this.state.programacion.id_programacion}`,
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
                initialValues={this.state.programacion}
                validationSchema={ProgramacionSchema}
                onSubmit={value=>{
                    this.modificar(value);
                }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                           <div className = "container">      
             
                    <h1>Modificar programación</h1> 
                       
                      <div className="row">

                      <div className="col-6 form-group">
                          <label>Docente asignatura</label>
                          <Docente_Asignatura_Select id_docente_asignatura={this.state.programacion.id_docente_asignatura}/>
                          {errors.id_docente_asignatura && touched.id_docente_asignatura ? (
                          <div className="text-danger">{errors.id_docente_asignatura}</div>
                          ) : null}       
                          </div>

                          <div className="col-6 form-group">
                          <label>Asignar salón</label>
                          <AsignarSalonSelect id_grado_grupo_alumno={this.state.programacion.id_grado_grupo_alumno}/>
                          {errors.id_grado_grupo_alumno && touched.id_grado_grupo_alumno ? (
                          <div className="text-danger">{errors.id_grado_grupo_alumno}</div>
                          ) : null}       
                          </div>

                          <div className="col-6 form-group">
                          <label>Hora de inicio</label>
                          <HoraISelect hora_i={this.state.programacion.hora_i}/>
                          {errors.hora_i && touched.hora_i ? (
                          <div className="text-danger">{errors.hora_i}</div>
                          ) : null}       
                          </div>

                          <div className="col-6 form-group">
                          <label>Jornada</label>
                          <JornadaSelect id_jornada={this.state.programacion.id_jornada}/>
                          {errors.id_jornada && touched.id_jornada ? (
                          <div className="text-danger">{errors.id_jornada}</div>
                          ) : null}       
                          </div>

                          <div className="col-6 form-group">
                          <label>Hora final</label>
                          <HoraFSelect hora_f={this.state.programacion.hora_f}/>
                          {errors.hora_f && touched.hora_f ? (
                          <div className="text-danger">{errors.hora_f}</div>
                          ) : null}       
                          </div>
                          
                          <div className="col-6 form-group">
                          <label>Día</label>
                          <DiaSelect dias_semana={this.state.programacion.dias_semana}/>
                          {errors.dias_semana && touched.dias_semana ? (
                          <div className="text-danger">{errors.dias_semana}</div>
                          ) : null}       
                          </div>

                          <div className="col-6 form-group">
                          <label>Año lectivo</label>
                          <Anolectivo idano={this.state.programacion.idano}/>
                          {errors.idano && touched.idano ? (
                          <div className="text-danger">{errors.idano}</div>
                          ) : null}       
                          </div>

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
                           < br/>
                              
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
                this.state.programacion != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/Programacion');
                    }}
                />
    </div>
        );
    }
}

export default ModificarProgramacion;