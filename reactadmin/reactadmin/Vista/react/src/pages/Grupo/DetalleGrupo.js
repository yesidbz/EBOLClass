import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';


class DetalleGrupo extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            grupo : null
        }
    }

    componentWillMount(){
        let id_grupo = this.props.match.params.id;
        axios({
            method: 'get',
            url: `${URL}/Grupo/`+ `${id_grupo}`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    grupo : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }

    volver(){
        this.props.history.push(`/Grupo`);
    }

      

        formulario(){
            return(
            <Formik
                initialValues={this.state.grupo}
                >
                {({ errors, touched, values }) => (
                    <Form>
                        <div className = "container">
                    <h1>Detalles del grupo</h1> 
                       
                      <div className="row">
  
  
                          <div className="col-6 form-group ">
                          <label>Descripción</label>
                          <Field type="submit" name="descripcion" className="form-control" />
                          {errors.documento && touched.documento ? (
                          <div className="text-danger">{errors.documento}</div>
                          ) : null}   
                          </div>
      <div>
  
  
                         
                           < br/>
                           < br/>
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
                this.state.grupo != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/Grupo');
                    }}
                />
    </div>
        );
    }
}

export default DetalleGrupo;
