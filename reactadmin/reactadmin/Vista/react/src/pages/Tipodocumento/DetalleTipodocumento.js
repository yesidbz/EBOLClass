import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';



class DetalleTipodocumento extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            tipodocumento : null
        }
    }

    componentWillMount(){
        let id_tipodocumento = this.props.match.params.id;
        axios({
            method: 'get',
            url: `${URL}/Tipodocumento/`+ `${id_tipodocumento}`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    tipodocumento : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }

    volver(){
        this.props.history.push(`/Tipodocumento`);
    }

        

        formulario(){
            return(
            <Formik
                initialValues={this.state.tipodocumento}
                >
                {({ errors, touched, values }) => (
                    <Form>
                      <div className="container">
                    <h1>Detalle del tipo de documento</h1> 
                       
                      <div className="row">
  
  
                          <div className="col-6 form-group ">
                          <label>Nombre</label>
                          <Field type="submit" name="nombre" className="form-control" />
                          {errors.nombre&& touched.nombre ? (
                          <div className="text-danger">{errors.nombre}</div>
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
                this.state.tipodocumento != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/Tipodocumento');
                    }}
                />
    </div>
        );
    }
}

export default DetalleTipodocumento;
