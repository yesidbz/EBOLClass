import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const DimensionSchema = Yup.object().shape({
    porcentaje: Yup.string()
    .min(2, 'Campo demasiado corto')
    .max(16, 'Campo demasiado largo')
    .required('Campo requerido'),  
});

class CrearDimension extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
        }
    }

    Dimension = {
        porcentaje: ''
        }

        volver(){
            this.props.history.push(`/dimension`);
        }

        guardar(value){
            axios({
                method: 'post',
                url: `${URL}/Dimension`,
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

    render(){
        return(
            <div>
            <Formik
            initialValues={this.Dimension}
            validationSchema={DimensionSchema}
            onSubmit={value=>{
                this.guardar(value);
            }}
            >
            {({ errors, touched, values }) => (
                <Form>
                    <div className="container">
                    <h1>Registrar dimensión</h1>

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
                        this.props.history.push('/Dimension');
                    }}
                />
    </div>
        );
    }
}

export default CrearDimension;