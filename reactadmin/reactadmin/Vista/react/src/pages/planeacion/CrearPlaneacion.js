import React, {Component} from 'react';
import {URL,TOKEN} from '../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const PlaneacionSchema = Yup.object().shape({   
    
    
    
    descri: Yup.string()
    .min(2, 'Campo demasiado corto')
    .max(20000, 'Campo demasiado largo')
    .required('Campo requerido'),  

   

});

class CrearPlaneacion extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
        }
    }

    Planeacion = {
        
        descri: ''
        }

        guardar(value){
            axios({
                method: 'post',
                url: `${URL}/Planeacion`,
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
                        console.log(datos)
                    }
              });
        }


        volver(){
            this.props.history.push(`/Planeacion `);
        }

    render(){
        return(
            <div>
            <Formik
            initialValues={this.Planeacion}
            validationSchema={PlaneacionSchema}
            onSubmit={value=>{
                this.guardar(value);
            }}
            >
            {({ errors, touched, values }) => (
                <Form>

                    <div className="container">
                    <h1>Registrar planeación</h1>

                    <div className="row">

                        <div className="col-12 form-group">
                        <label>Descripción</label>
                            <Field component="textarea"  heigh="150px" name="descri" className="form-control"/>
                            {errors.descri && touched.descri ? (
                            <div className="text-danger">{errors.descri}</div>
                            ) : null}
                        </div>


                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <div className = "col-1 form-group2">
                            <button type="submit" className="btn btn-success float-right">Registrar</button>
                            </div>


                            <div className = "col-1 form-group2">
                            <button onClick={()=>this.volver()} className="btn btn-danger">Cancelar</button>
                            
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
                        this.props.history.push('/Planeacion');
                    }}
                />
    </div>
        );
    }
}

export default CrearPlaneacion;