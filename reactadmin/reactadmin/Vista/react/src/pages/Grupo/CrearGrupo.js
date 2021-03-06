import React, {Component} from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {URL,TOKEN} from '../../config/config';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';


const GrupoSchema = Yup.object().shape({
  descripcion: Yup.number('Los caracteres deben ser numeros')
  .required('Campo requerido') 
  .min(1, 'Campo demasiado corto')
  .max(99, 'Campo demasiado largo'),
});


      

class CrearGrupo extends Component {



    constructor(props){
        super(props);
        this.state = {
           sweetShow : false ,
           sweetTitle : '',
           sweetText : '',
           sweetType : '',
        }

    }

            grupo = {
            descripcion  : '',
           

            
            
            }

            volver(){
                this.props.history.push(`/Grupo`);
            }
            guardar(value){
                axios({
                    method: 'post',
                    url: `${URL}/Grupo`,
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
            initialValues={this.grupo}
            validationSchema={GrupoSchema}
            onSubmit= {value=>{
                    this.guardar(value);
            }}  
          >
            {({ errors, touched, values }) => (




              <Form>
                  <div className="container">
                  <h1>Registrar grupo</h1> 
                     
                    <div className="row">


                        <div className="col-12 form-group ">
                        <label>Descripción</label>
                        <Field name="descripcion" className="form-control" />
                        {errors.descripcion && touched.descripcion? (
                        <div className="text-danger">{errors.descripcion}</div>
                        ) : null}   
                        </div>
   <div>




    
                      




                     
                  
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
                         < br/>

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
        this.props.history.push('/Grupo');
        }
    }
      />
          
</div>
          );
      }



}

export default CrearGrupo