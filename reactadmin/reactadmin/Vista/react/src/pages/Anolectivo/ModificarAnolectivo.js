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

class ModificarAnolectivo extends Component {

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

        modificar(value){
            axios({
                method: 'put',
                url: `${URL}/Anolectivo/${this.state.anolectivo.idano}`,
                headers: {
                    "Authorization": "bearer "+TOKEN
                },
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
        volver(){
            this.props.history.push(`/anolectivo`);
        }


        formulario(){
            return(
            <Formik
                initialValues={this.state.anolectivo}
                validationSchema={AnolectivoSchema}
                onSubmit={value=>{
                    this.modificar(value);
                }}
                >
                {({ errors, touched, values }) => (
                        <Form>
                        <div className="container">
                          <h1>Detalle del año</h1> 
                             
                            <div className="row">
        
        
                                <div className="col-12 form-group ">
                                <label>Año</label>
                                <Field name="anoelectivo" type="number" className="form-control" />
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
                                    <div className="wrapp">
                                 <div className = "col-1 form-group2">
                                    <button type="submit" className="btn btn-success float-right">Modificar</button>
                                    
                                    </div>
                                    <div className = "col-1 form-group2">
                                    <button onClick={()=>this.volver()} className="btn btn-danger">Cancelar</button>
                                    
                                    </div>
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

export default ModificarAnolectivo;
