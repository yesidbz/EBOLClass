import React, {Component} from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';


const AreaSchema = Yup.object().shape({
    nombre: Yup.string()
    .min(2, 'Campo demasiado corto')
    .max(16, 'Campo demasiado largo')
    .required('Campo requerido'),  
   
});


class CrearArea extends Component {



    constructor(props){
        super(props);
        this.state = {
           sweetShow : false ,
           sweetTitle : '',
           sweetText : '',
           sweetType : '',
        }

    }

            Area = {
            nombre  : '',

            
            
            }

            volver(){
              this.props.history.push(`/area`);
          }
            guardar(value){
                axios({
                    method: 'post',
                    url: `${URL}/Area`,
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

      render(){
          return (
<div>

            <Formik
            initialValues={this.Area}
            validationSchema={AreaSchema}
            onSubmit= {value=>{
                    this.guardar(value);
            }}  
          >
            {({ errors, touched, values }) => (




              <Form>

                <div className = "container">
                  <h1>Registrar área</h1> 
                     
                    <div className="row">


                        <div className="col-12 form-group ">
                        <label>Nombre</label>
                        <Field name="nombre" className="form-control" />
                        {errors.nombre && touched.nombre ? (
                        <div className="text-danger">{errors.nombre}</div>
                        ) : null}   
                        </div>
    <div>
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
        this.props.history.push('/Area');
        }
    }
      />
          
</div>
          );
      }



}

export default CrearArea