import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const AnolectivoSchema = Yup.object().shape({
    anoelectivo : Yup.number('Los caracteres deben ser numeros')
    .min(1, 'El numero es muy corto')
    .max(2999, 'El numero es muy largo')
    .required('Campo requerido'),
   
    

});

class DetalleAnolectivo extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            anolectivo : null
        }
    }

    componentWillMount(){
        let idano = this.props.match.params.id;
        axios({
            method: 'get',
            url: `${URL}/Anolectivo/`+ `${idano}`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    anolectivo : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }

       
        volver(){
            this.props.history.push(`/anolectivo`);
        }


        formulario(){
            return(
            <Formik
                initialValues={this.state.anolectivo}
                >
                {({ errors, touched, values }) => (
                        <Form>
                        <div className="container">
                          <h1>Modificar año</h1> 
                             
                            <div className="row">
        
        
                                <div className="col-6 form-group ">
                                <label>Año</label>
                                <Field name="anoelectivo" type="submit" className="form-control" />
                                {errors.anoelectivo && touched.anoelectivo ? (
                                <div className="text-danger">{errors.anoelectivo}</div>
                                ) : null}   
                                </div>
            <div>
                                 < br/>
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
                this.state.anolectivo != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/Anolectivo');
                    }}
                />
    </div>
        );
    }
}

export default DetalleAnolectivo;
