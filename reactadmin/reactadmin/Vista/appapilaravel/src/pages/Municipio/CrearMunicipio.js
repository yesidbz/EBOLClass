import React, {Component} from 'react'
import DepartamentoSelect from '../../componets/Departamento/DepartamentoSelect'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {URL,TOKEN} from '../../config/config';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';


const MunicipioSchema = Yup.object().shape({
    nombre : Yup.string()
    .required('Required'),
    id_departamento: Yup.string()
    .required('Required'),
});


class CrearMunicipio extends Component {



    constructor(props){
        super(props);
        this.state = {
           sweetShow : false ,
           sweetTitle : '',
           sweetText : '',
           sweetType : '',
        }

    }

            Municipio = {
            nombre  : '',
            id_departamento : ''

            
            
            }


            guardar(value){
                axios({
                    method: 'post',
                    url: `${URL}/Municipio`,
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
            initialValues={this.Municipio}
            validationSchema={MunicipioSchema}
            onSubmit= {value=>{
                    this.guardar(value);
            }}  
          >
            {({ errors, touched, values }) => (




              <Form>
                  <h1>REGISTRAR MUNICIPIO</h1> 
                     
                    <div className="row">


                        <div className="col-6 form-group ">
                        <label>nombre</label>
                        <Field name="nombre" className="form-control" />
                        {errors.nombre && touched.nombre? (
                        <div className="text-danger">{errors.nombre}</div>
                        ) : null}   
                        </div>
    




                         <div className="col-6 form-group">
                         <label>id Departamento</label> 
                         <DepartamentoSelect/>
                         {errors.id_departamento  && values.id_departamento == ""  ? (
                        <div className="text-danger">{errors.id_departamento }</div>
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
        this.props.history.push('/Municipio');
        }
    }
      />
          
</div>
          );
      }



}

export default CrearMunicipio