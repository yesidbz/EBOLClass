import React, {Component} from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {URL,TOKEN} from '../../config/config';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';


const JornadaSchema = Yup.object().shape({
    nombre : Yup.string()
    .required('Required'),
   
   // hora_inicio : Yup.time()
    //.required('Required'),

   // hora_fin : Yup.time()
    //.required('Required')
});


class CrearJornada extends Component {



    constructor(props){
        super(props);
        this.state = {
           sweetShow : false ,
           sweetTitle : '',
           sweetText : '',
           sweetType : '',
        }

    }

            Jornada = {
            nombre : '',
            hora_inicio : '',
            hora_fin : '',

            
            
            }


            guardar(value){
                axios({
                    method: 'post',
                    url: `${URL}/Jornada`,
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
            initialValues={this.Jornada}
            validationSchema={JornadaSchema}
            onSubmit= {value=>{
                    this.guardar(value);
            }}  
          >
            {({ errors, touched, values }) => (




              <Form>
                  <h1>REGISTRAR JORNADA</h1> 
                     
                    <div className="row">


                        <div className="col-12 form-group ">
                        <label>Nombre</label>
                        <Field   name="nombre" className="form-control" />
                        {errors.nombre && touched.nombre ? (
                        <div className="text-danger">{errors.nombre}</div>
                        ) : null}   
                        </div>
    
                        <div className="col-12 form-group ">
                        <label>Hora inicio</label>
                        <Field type ="time" name="hora_inicio" className="form-control" />
                        {errors.hora_inicio && touched.hora_inicio ? (
                        <div className="text-danger">{errors.hora_inicio}</div>
                        ) : null}   
                        </div>

                        <div className="col-12 form-group ">
                        <label>Hora fin </label>
                        <Field type ="time" name="hora_fin" className="form-control" />
                        {errors.hora_fin && touched.hora_fin ? (
                        <div className="text-danger">{errors.hora_fin}</div>
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
        this.props.history.push('/Jornada');
        }
    }
      />
          
</div>
          );
      }



}

export default CrearJornada