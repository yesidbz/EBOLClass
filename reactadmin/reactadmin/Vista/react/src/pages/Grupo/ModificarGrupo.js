import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const GrupoSchema = Yup.object().shape({
    descripcion: Yup.number('Los caracteres deben ser numeros')
    .required('Campo requerido') 
    .min(1, 'Campo demasiado corto')
    .max(99, 'Campo demasiado largo'),
  });

class ModificarGrupo extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            grupo : null
        }
    }

    componentWillMount(){
        let id_grupo = this.props.match.params.id;
        axios({
            method: 'get',
            url: `${URL}/Grupo/`+ `${id_grupo}`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    grupo : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }

    volver(){
        this.props.history.push(`/Grupo`);
    }

        modificar(value){
            axios({
                method: 'put',
                url: `${URL}/Grupo/${this.state.grupo.id_grupo}`,
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

        formulario(){
            return(
            <Formik
                initialValues={this.state.grupo}
                validationSchema={GrupoSchema}
                onSubmit={value=>{
                    this.modificar(value);
                }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                        <div className = "container">
                    <h1>Modificar grupo</h1> 
                       
                      <div className="row">
  
  
                          <div className="col-12 form-group ">
                          <label>Descripción</label>
                          <Field name="descripcion" className="form-control" />
                          {errors.documento && touched.documento ? (
                          <div className="text-danger">{errors.documento}</div>
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
                this.state.grupo != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/Grupo');
                    }}
                />
    </div>
        );
    }
}

export default ModificarGrupo;
