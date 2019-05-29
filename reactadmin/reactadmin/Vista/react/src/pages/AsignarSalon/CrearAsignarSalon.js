import React, {Component} from 'react'
import AnolectivoSelect from '../../componets/Anolectivo/Anolectivo'
import SalonSelect from '../../componets/Salon/SalonSelect'
import DocenteSelect from '../../componets/Docente/DocenteSelect'
import EstudianteSelect from '../../componets/Estudiante/EstudianteSelect'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {URL,TOKEN} from '../../config/config';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';


const Docente_AsignaturaSchema = Yup.object().shape({
iddocente : Yup.string()
.required('Campo requerido'),

idasignatura: Yup.string()
.required('Campo requerido'),


});



class CrearAsignarSalon extends Component {



    constructor(props){
        super(props);
        this.state = {
           sweetShow : false ,
           sweetTitle : '',
           sweetText : '',
           sweetType : '',
        }

    }


            guardar(value){
                axios({
                    method: 'post',
                    url: `${URL}/AsignarSalon`,
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
                              sweetTitle : "Genial",
                              sweetType : "success"

                       });


          

                   }
                       
                      else {
                        this.setState({
                            sweetShow : false,
                            sweetText : datos.error,
                            sweetTitle : "Ops",
                            sweetType : "error"

                     });
                      }    
                   
                  });
            }


            volver(){
              this.props.history.push(`/AsignarSalon`);
          }

      render(){
          return (
<div>

            <Formik
            initialValues={this.grado_grupo_alumno}
            validationSchema={Docente_AsignaturaSchema}
            onSubmit= {value=>{
                    this.guardar(value);
            }}  
          >
            {({ errors, touched, values }) => (




              <Form>

                <div className="container">
                  <h1>Asignar salón</h1> 
                     
                    <div className="row">





                         <div className="col-6 form-group">
                         <label>Año</label> 
                         <AnolectivoSelect/>
                         {errors.idano  && values.idano == ""  ? (
                        <div className="text-danger">{errors.idano }</div>
                        ) : null} 
                            </div>
                    

                            <div className="col-6 form-group">
                         <label>Salón</label> 
                         <SalonSelect/>
                         {errors.id_grado_grupo  && values.id_grado_grupo == ""  ? (
                        <div className="text-danger">{errors.id_grado_grupo }</div>
                        ) : null} 
                            </div>

                            <div className="col-6 form-group">
                         <label>Docente</label> 
                         <DocenteSelect/>
                         {errors.iddocente  && values.iddocente == ""  ? (
                        <div className="text-danger">{errors.iddocente }</div>
                        ) : null} 
                            </div>

                            <div className="col-6 form-group">
                         <label>Estudiante</label> 
                         <EstudianteSelect/>
                         {errors.id  && values.id == ""  ? (
                        <div className="text-danger">{errors.id }</div>
                        ) : null} 
                            </div>

                            <div>

 < br/>
 < br/>
 < br/>
 < br/>

   
    </div>

    <div className="wrapp">
    <div className = "col-1 form-group2">
    <button type="submit" className="btn btn-success float-right">Registrar</button>
    
    </div>
    <div className = "col-1 form-group2">
    <button onClick={()=>this.volver()} className="btn btn-danger">Cancelar</button>
    
    </div>
    </div>
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
        this.props.history.push('/AsignarSalon');
        }
    }
      />
          
</div>
          );
      }



}

export default CrearAsignarSalon