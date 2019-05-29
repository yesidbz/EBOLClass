import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const TipodocumentoSchema = Yup.object().shape({
    nombre: Yup.string()
    .min(2, 'Campo demasiado corto')
    .max(16, 'Campo demasiado largo')
    .required('Campo requerido'), 
    
});

class ModificarTipodocumento extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            tipodocumento : null
        }
    }

    componentWillMount(){
        let id_tipodocumento = this.props.match.params.id;
        axios({
            method: 'get',
            url: `${URL}/Tipodocumento/`+ `${id_tipodocumento}`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    tipodocumento : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }

    volver(){
        this.props.history.push(`/Tipodocumento`);
    }

        modificar(value){
            axios({
                method: 'put',
                url: `${URL}/Tipodocumento/${this.state.tipodocumento.id_tipodocumento}`,
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

        formulario(){
            return(
            <Formik
                initialValues={this.state.tipodocumento}
                validationSchema={TipodocumentoSchema}
                onSubmit={value=>{
                    this.modificar(value);
                }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                      <div className="container">
                    <h1>Modificar tipo de documento</h1> 
                       
                      <div className="row">
  
  
                          <div className="col-12 form-group ">
                          <label>Nombre</label>
                          <Field name="nombre" className="form-control" />
                          {errors.nombre&& touched.nombre ? (
                          <div className="text-danger">{errors.nombre}</div>
                          ) : null}   
                          </div>
      
  
  
                         <div>
                           < br/>
                           < br/>
                           < br/>
                              
                            </div>
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
  
  
                              
                </Form>
                )}
        </Formik>);
        }

    render(){
        return(
            <div>
            {
                this.state.tipodocumento != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/Tipodocumento');
                    }}
                />
    </div>
        );
    }
}

export default ModificarTipodocumento;
