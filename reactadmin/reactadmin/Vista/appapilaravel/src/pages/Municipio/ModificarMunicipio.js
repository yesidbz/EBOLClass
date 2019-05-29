import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import DepartamentoSelect from '../../componets/Departamento/DepartamentoSelect'
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const MunicipioSchema = Yup.object().shape({
    nombre : Yup.string()
    .required('Required'),
    id_departamento: Yup.string()
    .required('Required'),
});


class ModificarMunicipio extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            municipio : null
        }
    }

    componentWillMount(){
        let id_municipio = this.props.match.params.id;
        
        axios({
            method: 'get',
            url: `${URL}/Municipio/`+id_municipio,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    municipio : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }

        modificar(value){
            axios({
                method: 'put',
                url: `${URL}/Municipio/${this.state.municipio.id_municipio}`,
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
                initialValues={this.state.municipio}
                validationSchema={MunicipioSchema}
                onSubmit={value=>{
                    this.modificar(value);
                }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                    <h1>MODIFICAR MUNICIPIO</h1> 
                       
                      <div className="row">
  
  
                      <div className="col-6 form-group ">
                        <label>nombre</label>
                        <Field name="nombre" className="form-control" />
                        {errors.nombre && touched.nombre? (
                        <div className="text-danger">{errors.nombre}</div>
                        ) : null}   
                        </div>
    




                         <div className="col-6 form-group">
                         <label>id Departamento</label> 
                         <DepartamentoSelect id_departamento={this.state.municipio.id_departamento}/>
                         {errors.id_departamento  && values.id_departamento == ""  ? (
                        <div className="text-danger">{errors.id_departamento }</div>
                        ) : null} 
                            </div>
                    
                          </div>
                           < br/>
                           < br/>
                           < br/>
                              <div className = "col-1 form-group2">
                              <button type="submit" className="btn btn-success float-right">Modificar</button>
                              </div>
                   
  
  
  
                              
                </Form>
                )}
        </Formik>);
        }

    render(){
        return(
            <div>
            {
                this.state.municipio != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/Municipio');
                    }}
                />
    </div>
        );
    }
}

export default ModificarMunicipio;
