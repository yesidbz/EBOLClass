import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import IdasignaturaSelect from './../../componets/Asignatura/IdasignaturaSelect';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const DocentesSchema = Yup.object().shape({
    idasignatura: Yup.string()
        .required('Required'),
    primer_nombre: Yup.string()
        .required('Required'),
    segundo_nombre: Yup.string()
        .required('Required'),
    primer_apellido: Yup.string()
        .required('Required'),
    segundo_apellido: Yup.string()
        .required('Required'),
    celular: Yup.string()
        .required('Required'),
    telefono: Yup.string()
        .required('Required'),
    documento_docente: Yup.string()
        .required('Required'),
    direccion: Yup.string()
        .required('Required'),
    usuario: Yup.string()
        .required('Required'),
    contraseña: Yup.string()
        .required('Required'),
});

class CrearDocentes extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
        }
    }

    Docentes = {
        idasignatura: '',
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        celular: '',
        telefono: '',
        documento_docente: '',
        direccion: '',
        usuario: '',
        contraseña: ''
        }

        guardar(value){
            axios({
                method: 'post',
                url: `${URL}/Docente`,
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
                        sweetTitle: "Hola",
                        sweetType: "success"
                    });

                    }else{
                        this.setState({
                            sweetShow: true,
                            sweetText: datos.error,
                            sweetTitle: "Hola",
                            sweetType: "error"
                        });
                    }
              });
        }

    render(){
        return(
            <div>
            <Formik
            initialValues={this.Docentes}
            validationSchema={DocentesSchema}
            onSubmit={value=>{
                this.guardar(value);
            }}
            >
            {({ errors, touched, values }) => (
                <Form>
                    <h1>Crear docentes</h1>

                    <div className="row">

                        <div className="col-4 form-group">
                        <label>Id asignatura</label>
                            <IdasignaturaSelect/>
                            {errors.idasignatura && values.idasignatura == "" ? (
                            <div className="text-danger">{errors.idasignatura}</div>
                            ) : null}
                        </div>

                        <div className="col-4 form-group">
                        <label>Primer nombre</label>
                            <Field name="primer_nombre" className="form-control"/>
                            {errors.primer_nombre && touched.primer_nombre ? (
                            <div className="text-danger">{errors.primer_nombre}</div>
                            ) : null}
                        </div>

                        <div className="col-4 form-group">
                        <label>Segundo nombre</label>
                            <Field name="segundo_nombre" className="form-control"/>
                            {errors.segundo_nombre && touched.segundo_nombre ? (
                            <div className="text-danger">{errors.segundo_nombre}</div> 
                            ): null}
                        </div>

                        <div className="col-4 form-group">
                        <label>Primer apellido</label>
                            <Field name="primer_apellido" className="form-control"/>
                            {errors.primer_apellido && touched.primer_apellido ? (
                            <div className="text-danger">{errors.primer_apellido}</div> 
                            ): null}
                        </div>

                        <div className="col-4 form-group">
                        <label>Segundo apellido</label>
                            <Field name="segundo_apellido" className="form-control"/>
                            {errors.segundo_apellido && touched.segundo_apellido ? (
                            <div className="text-danger">{errors.segundo_apellido}</div> 
                            ): null}
                        </div>

                        <div className="col-4 form-group">
                        <label>Celular</label>
                            <Field name="celular" className="form-control"/>
                            {errors.celular && touched.celular ? (
                            <div className="text-danger">{errors.celular}</div> 
                            ): null}
                        </div>

                        <div className="col-4 form-group">
                        <label>Telefono</label>
                            <Field name="telefono" className="form-control"/>
                            {errors.telefono && touched.telefono ? (
                            <div className="text-danger">{errors.telefono}</div> 
                            ): null}
                        </div>

                        <div className="col-4 form-group">
                        <label>Documento docente</label>
                            <Field name="documento_docente" className="form-control"/>
                            {errors.documento_docente && touched.documento_docente ? (
                            <div className="text-danger">{errors.documento_docente}</div> 
                            ): null}
                        </div>

                        <div className="col-4 form-group">
                        <label>Dirección</label>
                            <Field name="direccion" className="form-control"/>
                            {errors.direccion && touched.direccion ? (
                            <div className="text-danger">{errors.direccion}</div> 
                            ): null}
                        </div>

                        <div className="col-4 form-group">
                        <label>Usuario</label>
                            <Field name="usuario" className="form-control"/>
                            {errors.usuario && touched.usuario ? (
                            <div className="text-danger">{errors.usuario}</div> 
                            ): null}
                        </div>

                        <div className="col-4 form-group">
                        <label>Contraseña</label>
                            <Field name="contraseña" className="form-control"/>
                            {errors.contraseña && touched.contraseña ? (
                            <div className="text-danger">{errors.contraseña}</div> 
                            ): null}
                        </div>

                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <div className="col-12">
                            <button type="submit" className="btn btn-success float-right">Crear</button>
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
                        this.props.history.push('/Docentes');
                    }}
                />
    </div>
        );
    }
}

export default CrearDocentes;