import React, {Component} from 'react';
import {URL, TOKEN} from '../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AnolectivoSelect from '../../componets/Anolectivo/Anolectivo'
import SalonSelect from '../../componets/Salon/SalonSelect'
import DocenteSelect from '../../componets/Docente/DocenteSelect'
import EstudianteSelect from '../../componets/Estudiante/EstudianteSelect'
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const SalonSchema = Yup.object().shape({
   
});

class ModificarSalon extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            salon : null
        }
    }

    componentWillMount(){
        let id_grado_grupo_alumno = this.props.match.params.id;
        axios({
            method: 'get',
            url: `${URL}/AsignarSalon/`+ id_grado_grupo_alumno,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    salon : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }

        modificar(value){
            axios({
                method: 'put',
                url: `${URL}/AsignarSalon/${this.state.salon.id_grado_grupo_alumno}`,
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
        volver(){
            this.props.history.push(`/AsignarSalon`);
        }

        formulario(){
            return(
            <Formik
                initialValues={this.state.salon}
                validationSchema={SalonSchema}
                onSubmit={value=>{
                    this.modificar(value);
                }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                    <div className="container">
                    <h1>Modificar salones</h1> 
                       
                      <div className="row">






                      <div className="col-6 form-group">
                         <label>Año</label> 
                         <AnolectivoSelect idano={this.state.salon.idano} />
                           {errors.idano  && values.idano == ""  ? (
                          <div className="text-danger">{errors.idano }</div>
                          ) : null} 
                            </div>
                            

                            <div className="col-6 form-group">
                         <label>Salón</label> 
                         <SalonSelect id_grado_grupo={this.state.salon.id_grado_grupo} />
                           {errors.id_grado_grupo  && values.id_grado_grupo == ""  ? (
                          <div className="text-danger">{errors.id_grado_grupo }</div>
                          ) : null}
                            </div>

                            <div className="col-6 form-group">
                         <label>Docente</label> 
                         <DocenteSelect iddocente={this.state.salon.iddocente} />
                           {errors.iddocente  && values.iddocente == ""  ? (
                          <div className="text-danger">{errors.iddocente }</div>
                          ) : null}
                            </div>

                            <div className="col-6 form-group">
                         <label>Estudiante</label> 
                         <EstudianteSelect idestudiante={this.state.salon.idestudiante} />
                           {errors.idestudiante  && values.idestudiante == ""  ? (
                          <div className="text-danger">{errors.idestudiante }</div>
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
                this.state.salon != null ? this.formulario() : ''

               
            }

            
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/Salon');
                    }}
                />
    </div>
        );
    }
}

export default ModificarSalon;
