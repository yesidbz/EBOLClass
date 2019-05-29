import React, {Component} from 'react'
import Docente_Asignatura_Select from '../../componets/Docente_asignatura/Docente_Asignatura_select'
import PDSelect from '../../componets/Planeacion_Dimension/PDSelect'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {URL,TOKEN} from '../../config/config';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';


const Docente_AsignaturaSchema = Yup.object().shape({
// iddocente : Yup.string()
// .required('Campo requerido'),

// idasignatura: Yup.string()
// .required('Campo requerido'),

porcentaje: Yup.number()
.min(1, 'Campo demasiado corto')
.max(100, 'Campo demasiado largo')
.required('Campo requerido'),  
});


class CrearD_A_P extends Component {



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
                    url: `${URL}/Docente_Asignatura_Planeacion`,
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
              this.props.history.push(`/`);
          }

      render(){
          return (
<div>

            <Formik
            initialValues={this.docente_asignatura_planeacion}
            validationSchema={Docente_AsignaturaSchema}
            onSubmit= {value=>{
                    this.guardar(value);
            }}  
          >
            {({ errors, touched, values }) => (




              <Form>

                <div className="container">
                  <h1>D.A.P</h1> 
                     
                    <div className="row">





                         <div className="col-3 form-group">
                         <label>Docente-Asignatura</label> 
                         <Docente_Asignatura_Select/>
                         {errors.iddocente  && values.iddocente == ""  ? (
                        <div className="text-danger">{errors.iddocente }</div>
                        ) : null} 
                            </div>
                    

                            <div className="col-3 form-group">
                         <label>Planeación-dimensión</label> 
                         <PDSelect/>
                         {errors.id_planeacion_dimension  && values.id_planeacion_dimension == ""  ? (
                        <div className="text-danger">{errors.id_planeacion_dimension}</div>
                        ) : null} 
                            </div>
                


                            <div className="col-3 form-group">
                        <label>Porcentaje</label>
                            <Field type = "number" name="porcentaje" className="form-control"/>
                            {errors.porcentaje && touched.porcentaje ? (
                            <div className="text-danger">{errors.porcentaje}</div>
                            ) : null}
                        </div>

                            <div>

 < br/>
 < br/>
 < br/>
 < br/>

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
        this.props.history.push('/Docente_Asignatura');
        }
    }
      />
          
</div>
          );
      }



}

export default CrearD_A_P