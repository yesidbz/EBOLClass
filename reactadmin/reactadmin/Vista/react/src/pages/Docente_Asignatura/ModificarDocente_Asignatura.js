import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import DocenteSelect from '../../componets/Docente/DocenteSelect'
import AsignaturaSelect from '../../componets/Asignatura/IdasignaturaSelect'
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const SalonSchema = Yup.object().shape({
          // id_grado: Yup.string()
// .required('Campo requerido'),

   // id_grupo: Yup.string()
// .required('Campo requerido'),
});

class ModificarDocente_Asignatura extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            docente_asignatura : null
        }
    }

    componentWillMount(){
        let id_docente_asignatura = this.props.match.params.id_docente_asignatura;
        axios({
            method: 'get',
            url: `${URL}/Docente_Asignatura/`+ id_docente_asignatura,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    docente_asignatura : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }


    volver(){
        this.props.history.push(`/Docente_Asignatura`);
    }
        modificar(value){
            axios({
                method: 'put',
                url: `${URL}/Docente_Asignatura/${this.state.docente_asignatura.id_docente_asignatura}`,
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
                initialValues={this.state.docente_asignatura}
                validationSchema={SalonSchema}
                onSubmit={value=>{
                    this.modificar(value);
                }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                        <div className="container">
                    <h1>Modificar asignatura delegada</h1> 
                       
                      <div className="row">

  
  
  
                           <div className="col-6 form-group">
                           <label>Docente</label> 
                           <DocenteSelect iddocente={this.state.docente_asignatura.iddocente}/>
                           {errors.iddocente  && values.iddocente == ""  ? (
                          <div className="text-danger">{errors.iddocente }</div>
                          ) : null} 
                              </div>

                            <div className="col-6 form-group">
                           <label>Asignatura</label> 
                           <AsignaturaSelect idasignatura={this.state.docente_asignatura.idasignatura} />
                           {errors.idasignatura  && values.idasignatura == ""  ? (
                          <div className="text-danger">{errors.idasignatura }</div>
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
                this.state.docente_asignatura != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/Docente_Asignatura');
                    }}
                />
    </div>
        );
    }
}

export default ModificarDocente_Asignatura;
