import React, {Component} from 'react'
import AreaSelect from './../../componets/Area/Areaselect'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';


const AsignaturaSchema = Yup.object().shape({
    
});


class CrearAsignatura extends Component {



    constructor(props){
        super(props);
        this.state = {
           sweetShow : false ,
           sweetTitle : '',
           sweetText : '',
           sweetType : '',
        }

    }

            Asignatura = {            
              nombre : '',
              id_area : ''
            }


            guardar(value){
                axios({
                    method: 'post',
                    url: `${URL}/Materia`,
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
            initialValues={this.Asignatura}
            validationSchema={AsignaturaSchema}
            onSubmit= {value=>{
                    this.guardar(value);
            }}  
          >
            {({ errors, touched, values }) => (




              <Form>
                  <h1>REGISTRAR ASIGNATURAS</h1> 
                     
                    <div className="row">





                    <div className="col-12 form-group ">
                        <label>Nombre</label>
                        <Field name="nombre" className="form-control" />
                        {errors.nombre && touched.nombre ? (
                        <div className="text-danger">{errors.nombre}</div>
                        ) : null}   
                        </div>
                    

                        <div className="col-6 form-group">
                         <label>Area</label> 
                         <AreaSelect/>
                         {errors.id_area && values.id_area == ""  ? (
                        <div className="text-danger">{errors.id_area }</div>
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
        this.props.history.push('/Modelo');
        }
    }
      />
          
</div>
          );
      }



}

export default CrearAsignatura