import React, {Component} from 'react'
import IddimensionSelect from '../../componets/Dimension/IddimensionSelect'
import PlaneacionSelect from '../../componets/Planeacion/PlaneacionSelect'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {URL,TOKEN} from '../../config/config';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';


const Planeacion_DimensionSchema = Yup.object().shape({

    
});


class CrearPlaneacion_Dimension extends Component {



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
                    url: `${URL}/Planeacion_Dimension`,
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
              this.props.history.push(`/Planeacion_Dimension`);
          }

      render(){
          return (
<div>

            <Formik
            initialValues={this.Planeacion_Dimension}
            validationSchema={Planeacion_DimensionSchema}
            onSubmit= {value=>{
                    this.guardar(value);
            }}  
          >
            {({ errors, touched, values }) => (




              <Form>

                <div className="container">
                  <h1> </h1> 
                     
                    <div className="row">





                         <div className="col-6 form-group">
                         <label>Dimensión</label> 
                         <IddimensionSelect/>
                         {errors.id_dimension  && values.id_dimension == ""  ? (
                        <div className="text-danger">{errors.id_dimension }</div>
                        ) : null} 
                            </div>
                    

                            <div className="col-6 form-group">
                         <label>Planeación</label> 
                         <PlaneacionSelect/>
                         {errors.id_planeacion  && values.id_planeacion == ""  ? (
                        <div className="text-danger">{errors.id_planeacion }</div>
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
        this.props.history.push('/Planeacion_Dimension');
        }
    }
      />
          
</div>
          );
      }



}

export default CrearPlaneacion_Dimension