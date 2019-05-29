import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';


class ModificarAsignatura extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            asignatura : null
        }
    }

    componentWillMount(){
        let idasignatura = this.props.match.params.id;
        let o =
        axios({
            method: 'get',
            url: `${URL}/Materia/`+ `${idasignatura}`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    asignatura : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }

    volver(){
        this.props.history.push(`/Materia`);
    } 

        formulario(){
            return(
            <Formik
                initialValues={this.state.asignatura}
                >
                {({ errors, touched, values }) => (
                    <Form>
                <div className="container">
                  <h1>Detalles de asignaturas</h1> 
                     
                    <div className="row">





                    <div className="col-6 form-group ">
                        <label>Nombre</label>
                        <Field type ="submit" name="nombre" className="form-control" />
                        {errors.nombre && touched.nombre ? (
                        <div className="text-danger">{errors.nombre}</div>
                        ) : null}   
                        </div>
                    

                
                            <div>
                        
                         < br/>
                    </div>
                    <div className="wrapp">
                    <div className = "col-1 form-group2">
                            <button onClick={()=>this.volver()} className="btn btn-danger">Volver</button>
                            
                            </div>
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
                this.state.asignatura != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/Materia');
                    }}
                />
    </div>
        );
    }
}

export default ModificarAsignatura;
