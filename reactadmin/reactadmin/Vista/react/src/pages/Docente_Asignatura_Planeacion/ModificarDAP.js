import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Docente_Asignatura_Select from '../../componets/Docente_asignatura/Docente_Asignatura_select'
import PDSelect from '../../componets/Planeacion_Dimension/PDSelect'
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const SalonSchema = Yup.object().shape({
          // id_grado: Yup.string()
// .required('Campo requerido'),

   // id_grupo: Yup.string()
// .required('Campo requerido'),
});

class ModificarDAP extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            docente_asignatura_planeacion : null
        }
    }

    componentWillMount(){
        let id_docente_asignatura_planeacion = this.props.match.params.id_docente_asignatura_planeacion;
        axios({
            method: 'get',
            url: `${URL}/Docente_Asignatura_Planeacion/`+ id_docente_asignatura_planeacion,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    docente_asignatura_planeacion : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }


    volver(){
        this.props.history.push(`/D_A_P`);
    }
        modificar(value){
            axios({
                method: 'put',
                url: `${URL}/Docente_Asignatura_Planeacion/${this.state.docente_asignatura_planeacion.id_docente_asignatura_planeacion}`,
                headers: {
                    "Authorization": "bearer "+TOKEN
                },
                data : value
              }).then(respuesta=>{
                let datos = respuesta.data;
                if(datos.ok){
                    this.setState({
                        sweetShow: true,
                        sweetText: datos.mensaje,
                        sweetTitle: "Genial",
                        sweetType: "success"
                    });
                        
                    }else{
                        this.setState({
                            sweetShow: true,
                            sweetText: datos.error,
                            sweetTitle: "Ops",
                            sweetType: "error"
                        });
                    }
              });
        }

        formulario(){
            return(
            <Formik
                initialValues={this.state.docente_asignatura_planeacion}
                validationSchema={SalonSchema}
                onSubmit={value=>{
                    this.modificar(value);
                }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                        <div className="container">
                    <h1>Modificar D.A.P</h1> 
                       
                      <div className="row">

  
  
  
                           <div className="col-4 form-group">
                           <label>Docente asignatura</label> 
                           <Docente_Asignatura_Select id_docente_asignatura={this.state.docente_asignatura_planeacion.id_docente_asignatura}/>
                           {errors.id_docente_asignatura  && values.id_docente_asignatura == ""  ? (
                          <div className="text-danger">{errors.id_docente_asignatura }</div>
                          ) : null} 
                              </div>

                            <div className="col-4 form-group">
                           <label>Planeación</label> 
                           <PDSelect id_grupo={this.state.docente_asignatura_planeacion.id_planeacion_dimension} />
                           {errors.id_planeacion_dimension  && values.id_planeacion_dimension == ""  ? (
                          <div className="text-danger">{errors.id_planeacion_dimension }</div>
                          ) : null} 
                              </div>

                              <div className="col-4 form-group ">
                          <label>Porcentaje</label>
                          <Field name="porcentaje" className="form-control" />
                          {errors.porcentaje && touched.porcentaje ? (
                          <div className="text-danger">{errors.porcentaje}</div>
                          ) : null}   
                          </div>
                      
  
                    
                           < br/>
                           < br/>
                           < br/>
                              <div className = "col-1 form-group2">
                              <button type="submit" className="btn btn-success float-right">Modificar</button>
                              </div>

                              <div className = "col-1 form-group2">
                            <button onClick={()=>this.volver()} className="btn btn-danger">Cancelar</button>
                            
                            </div> 
                      </div>
  
         
  
                      </div>
                </Form>
                )}
        </Formik>);
        }

    render(){
        return(
            <div>
            {
                this.state.docente_asignatura_planeacion != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/D_A_P');
                    }}
                />
    </div>
        );
    }
}

export default ModificarDAP;
