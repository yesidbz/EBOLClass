
import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

class DetalleDimension extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            docentes : null
        }
    }

    componentWillMount(){
        let iddimension  = this.props.match.params.iddimension;
        axios({
            method: 'get',
            url: `${URL}/Dimension/${iddimension}`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    dimension : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }

    volver(){
        this.props.history.push(`/dimension`);
    }

        formulario(){
            return(<Formik
                initialValues={this.state.dimension}
                >
                {({ errors, touched, values }) => (
                    <Form>

                        <div className = "container">
                        <h1>Detalle de dimensión</h1>
    
                        <div className="row">

                        <div className="col-6 form-group">
                            <label>Dimensión</label>
                            <Field type = "submit" name="porcentaje" className="form-control"/>
                            {errors.porcentaje && touched.porcentaje ? (
                            <div className="text-danger">{errors.porcentaje}</div>
                            ) : null}
                        </div>

                         <div>

                        <br/>
                        < br/>
                         < br/>
                         < br/>

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
                this.state.dimension != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/Dimension');
                    }}
                />
    </div>
        );
    }
}

export default DetalleDimension;