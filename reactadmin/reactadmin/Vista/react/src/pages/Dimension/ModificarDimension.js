
import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const dimensionSchema = Yup.object().shape({
    porcentaje: Yup.string()
    .min(2, 'Campo demasiado corto')
    .max(16, 'Campo demasiado largo')
    .required('Campo requerido'),  
});

class ModificarDimension extends Component {

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
    
    volver(){
        this.props.history.push(`/dimension`);
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

        modificar(value){
            axios({
                method: 'put',
                url: `${URL}/Dimension/${this.state.dimension.iddimension}`,
                headers: {
                    "Authorization": "bearer "+TOKEN
                } ,
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
            return(<Formik
                initialValues={this.state.dimension}
                validationSchema={dimensionSchema}
                onSubmit={value=>{
                    this.modificar(value);
                }}
                >
                {({ errors, touched, values }) => (
                    <Form>

                        <div className = "container">
                        <h1>Modificar dimensión</h1>
    
                        <div className="row">

                        <div className="col-6 form-group">
                            <label>Dimensión</label>
                            <Field name="porcentaje" className="form-control"/>
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
                            <button type="submit" className="btn btn-success float-right">  Modificar</button>
                            
                            </div>
                            <div className = "col-1 form-group2">
                            <button onClick={()=>this.volver()} className="btn btn-danger">Cancelar</button>
                            
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

export default ModificarDimension;