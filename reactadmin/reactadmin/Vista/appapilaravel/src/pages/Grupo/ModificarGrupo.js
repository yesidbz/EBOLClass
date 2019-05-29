import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const GrupoSchema = Yup.object().shape({
    descripcion: Yup.string()
    .required('Required'),
    
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
                initialValues={this.state.grupo}
                validationSchema={GrupoSchema}
                onSubmit={value=>{
                    this.modificar(value);
                }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                    <h1>MODIFICAR GRUPO</h1> 
                       
                      <div className="row">
  
  
                          <div className="col-6 form-group ">
                          <label>descripcion</label>
                          <Field name="descripcion" className="form-control" />
                          {errors.documento && touched.documento ? (
                          <div className="text-danger">{errors.documento}</div>
                          ) : null}   
                          </div>
      
  
  
                         
                           < br/>
                           < br/>
                           < br/>
                              <div className = "col-1 form-group2">
                              <button type="submit" className="btn btn-success float-right">Modificar</button>
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
