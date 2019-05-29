import React, {Component} from 'react'
import DocenteSelect from '../../componets/Docente/DocenteSelect'
import AsignaturaSelect from '../../componets/Asignatura/IdasignaturaSelect'
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
});


class CrearDocente_Asignatura extends Component {



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
                    url: `${URL}/Docente_Asignatura`,
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
              this.props.history.push(`/docente_asignatura`);
          }

      render(){
          return (
<div>

            <Formik
            initialValues={this.docente_asignatura}
            validationSchema={Docente_AsignaturaSchema}
            onSubmit= {value=>{
                    this.guardar(value);
            }}  
          >
            {({ errors, touched, values }) => (




              <Form>

                <div className="container">
                  <h1>Delegar asignatura</h1> 
                     
                    <div className="row">





                         <div className="col-6 form-group">
                         <label>Docente</label> 
                         <DocenteSelect/>
                         {errors.iddocente  && values.iddocente == ""  ? (
                        <div className="text-danger">{errors.iddocente }</div>
                        ) : null} 
                            </div>
                    

                            <div className="col-6 form-group">
                         <label>Asignatura</label> 
                         <AsignaturaSelect/>
                         {errors.idasignatura  && values.idasignatura == ""  ? (
                        <div className="text-danger">{errors.idasignatura }</div>
                        ) : null} 
                            </div>
                
                
                            <div>

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

export default CrearDocente_Asignatura