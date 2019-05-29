import React, {Component} from 'react';
import {URL,TOKEN} from '../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import IddimensionSelect from '../../componets/Dimension/IddimensionSelect'
import PlaneacionSelect from '../../componets/Planeacion/PlaneacionSelect'
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const PlaneacionDimensionSchema = Yup.object().shape({
    //iddimension: Yup.string()
    //.required('Campo requerido'),  
    
    
   // descri: Yup.string()
    //.min(2, 'Campo demasiado corto')
    //.max(20000, 'Campo demasiado largo')
    //.required('Campo requerido'),  

   

});

class Modificar extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            pldi : null
        }
    }

    volver(){
        this.props.history.push(`/Planeacion_Dimension `);
    }

    componentWillMount(){
        let 	id_planeacion_dimension = this.props.match.params.id_planeacion_dimension;
        axios({
            method: 'get',
            url: `${URL}/Planeacion_Dimension/${id_planeacion_dimension}`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    pldi : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }


            volver(){
            this.props.history.push(`/Planeacion_Dimension`);
        }


        modificar(value){
            axios({
                method: 'put',
                url: `${URL}/Planeacion_Dimension/${this.state.pldi.id_planeacion_dimension}`,
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
                initialValues={this.state.pldi}
                validationSchema={PlaneacionDimensionSchema}
                onSubmit={value=>{
                    this.modificar(value);
                }}
                >
                {({ errors, touched, values }) => (
                    <Form>

                        <div className="container">
                        <h1>Modificar planeación-Dimensión</h1>
    
                        <div className="row">

                        <div className="col-6 form-group">
                            <label>Dimensión</label>
                                <IddimensionSelect iddimension={this.state.pldi.iddimension}/>
                                {errors.iddimension && values.iddimension == "" ? (
                                <div className="text-danger">{errors.iddimension}</div>
                                ) : null}
                        </div>
    




                        <div className="col-12 form-group">
                        <label>Planeación</label>
                        <PlaneacionSelect id_planeacion={this.state.pldi.id_planeacion}/>
                                {errors.id_planeacion && values.id_planeacion == "" ? (
                                <div className="text-danger">{errors.id_planeacion}</div>
                                ) : null}
                        </div>

                       
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        <div className = "col-1 form-group2">
                            <button type="submit" className="btn btn-success float-right">Modificar</button>
                            </div>


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
                this.state.pldi != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/Planeacion_Dimension');
                    }}
                />
    </div>
        );
    }
}

export default Modificar;