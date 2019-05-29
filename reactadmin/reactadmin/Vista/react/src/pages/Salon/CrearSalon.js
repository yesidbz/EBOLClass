import React, {Component} from 'react'
import GrupoSelect from './../../componets/Grupo/Gruposelect'
import GradoSelect from './../../componets/Grado/Gradoselect'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';


const SalonSchema = Yup.object().shape({
  id_grado: Yup.number()
  .min(1, 'el grado no debe ser menor que 1')
  .max(11, 'El grado no debe ser mayor a 11')
  .required('Campo requerido'),

  id_grupo: Yup.string()
  .required('Campo requerido'),
});


class CrearSalon extends Component {



    constructor(props){
        super(props);
        this.state = {
           sweetShow : false ,
           sweetTitle : '',
           sweetText : '',
           sweetType : '',
        }

    }

            Salon = {            
              id_grado : '',
              id_grupo : ''
            }


            guardar(value){
                axios({
                    method: 'post',
                    url: `${URL}/Salon`,
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
              this.props.history.push(`/Salon`);
          }
      render(){
          return (
<div>

            <Formik
            initialValues={this.salon}
            validationSchema={SalonSchema}
            onSubmit= {value=>{
                    this.guardar(value);
            }}  
          >
            {({ errors, touched, values }) => (




              <Form>

                <div className = "container" >
                  <h1>Registrar salón</h1> 
                     
                    <div className="row">





                         <div className="col-6 form-group">
                         <label>Grado</label> 
                         <GradoSelect/>
                         {errors.id_grado  && values.id_grado == ""  ? (
                        <div className="text-danger">{errors.id_grado }</div>
                        ) : null} 
                            </div>
                    

                            <div className="col-6 form-group">
                         <label>Grupo</label> 
                         <GrupoSelect/>
                         {errors.id_grupo  && values.id_grupo == ""  ? (
                        <div className="text-danger">{errors.id_grupo }</div>
                        ) : null} 
                            </div>
                
                
                         < br/>
                         < br/>
                         < br/>
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
        this.props.history.push('/Salon');
        }
    }
      />
          
</div>
          );
      }



}

export default CrearSalon