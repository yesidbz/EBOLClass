import React, {Component} from 'react';
import {URL,TOKEN} from '../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Docente_Asignatura_Select from '../../componets/Docente_asignatura/Docente_Asignatura_select';
import AsignarSalonSelect from '../../componets/AsignarSalon/AsignarSalonSelect';
import JornadaSelect from '../../componets/Jornada/JornadaSelect';
import DiaSelect from '../../componets/Dia/DiaSelect';
import HoraISelect from '../../componets/Hora/HoraISelect';
import HoraFSelect from '../../componets/Hora/HoraFSelect';
import Anolectivo from '../../componets/Anolectivo/Anolectivo';



import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const PlaneacionSchema = Yup.object().shape({   
    //iddimension: Yup.string()
    //.required('Campo requerido'),  
    
    
    // descri: Yup.string()
    // .min(2, 'Campo demasiado corto')
    // .max(20000, 'Campo demasiado largo')
    // .required('Campo requerido'),  

   

});

class CrearProgramacion extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
        }
    }

    programacion = {
        id_programacion: '',
        id_docente_asignatura: '',
        id_grado_grupo_alumno: '',
        hora_i: '',
        hora_f: '',
        dias_semana :'',
        id_jornada:''
        }

        guardar(value){
            axios({
                method: 'post',
                url: `${URL}/Programacion`,
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
            this.props.history.push(`/Programacion `);
        }

    render(){
        return(
            <div>
            <Formik
            initialValues={this.programacion}
            validationSchema={PlaneacionSchema}
            onSubmit={value=>{
                this.guardar(value);
            }}
            >
            {({ errors, touched, values }) => (
                <Form>

                    <div className="container">
                    <h1>Registrar programación</h1>

                    <div className="row">

                        <div className="col-6 form-group">
                        <label>Docente asignatura</label>
                            <Docente_Asignatura_Select/>
                            {errors.id_docente_asignatura && values.id_docente_asignatura == "" ? (
                            <div className="text-danger">{errors.id_docente_asignatura}</div>
                            ) : null}
                        </div>
                        <div className="col-6 form-group">
                        <label>Asignar salón</label>
                            <AsignarSalonSelect/>
                            {errors.id_grado_grupo_alumno && values.id_grado_grupo_alumno == "" ? (
                            <div className="text-danger">{errors.id_grado_grupo_alumno}</div>
                            ) : null}
                        </div>
                        <div className="col-6 form-group">
                        <label>Hora de inicio</label>
                        <HoraISelect/>
                            {errors.id_hora && values.id_hora == "" ? (
                            <div className="text-danger">{errors.id_hora}</div>
                            ) : null}
                        </div>
                        

                        <div className="col-6 form-group">
                        <label>Jornada</label>
                            <JornadaSelect/>
                            {errors.id_jornada && values.id_jornada == "" ? (
                            <div className="text-danger">{errors.id_jornada}</div>
                            ) : null}
                        </div>
                        <div className="col-6 form-group">
                        <label>Hora final</label>
                        <HoraFSelect/>
                            {errors.id_hora && values.id_hora == "" ? (
                            <div className="text-danger">{errors.id_hora}</div>
                            ) : null}
                        </div>
                        <div className="col-6 form-group">
                        <label>Día</label>
                        <DiaSelect/>
                            {errors.Id_dia && values.Id_dia == "" ? (
                            <div className="text-danger">{errors.Id_dia}</div>
                            ) : null}
                        </div>

                        <div className="col-6 form-group">
                        <label>Año lectivo</label>
                        <Anolectivo/>
                            {errors.idano && values.idano == "" ? (
                            <div className="text-danger">{errors.idano}</div>
                            ) : null}
                        </div>
                        <br/>
                        <div className="wrapp">
                        <div className = "col-1 form-group2">
                            <button type="submit" className="btn btn-success float-right">Registrar</button>
                            </div>


                            <div className = "col-1 form-group2">
                            <button onClick={()=>this.volver()} className="btn btn-danger">Cancelar</button>
                            
                            </div>
                        </div>
                        </div>



                    


                        
                        <br/>
                        <br/>
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
                        this.props.history.push(`/Programacion `);
                    }}
                />
    </div>
        );
    }
}

export default CrearProgramacion;
