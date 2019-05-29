import React, {Component} from 'react';
import {URL,TOKEN} from '../../config/config';
import { Formik, Form, Field } from 'formik';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';



class DetallePlaneacion extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            iddimension : null
        }
    }

    volver(){
        this.props.history.push(`/planeacion `);
    }

    componentWillMount(){
        let idplaneacion = this.props.match.params.idplaneacion;
        axios({
            method: 'get',
            url: `${URL}/Planeacion/${idplaneacion}`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    planeacion : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }


            volver(){
            this.props.history.push(`/Planeacion `);
        }


      
        

        formulario(){
            return(<Formik
                initialValues={this.state.planeacion}
                >
                {({ errors, touched, values }) => (
                    <Form>

                        <div className="container">
                        <h1>Detalle planeación</h1>
    
                        <div className="row">

    



                        <div className="col-12 form-group">
                        <label>Descripción</label>
                            <Field  component="textarea"  heigh="150px" name="descri" className="form-control"/>
                            {errors.descri && touched.descri ? (
                            <div className="text-danger">{errors.descri}</div>
                            ) : null}
                        </div>

                       
                            <br/>
                            <br/>
                            <br/>
                            <br/>


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
                this.state.planeacion != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/Planeacion');
                    }}
                />
    </div>
        );
    }
}

export default DetallePlaneacion;