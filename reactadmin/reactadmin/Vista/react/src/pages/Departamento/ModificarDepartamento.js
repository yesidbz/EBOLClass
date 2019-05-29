import React, {Component} from 'react';
import {URL, TOKEN} from '../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const DepartamentoSchema = Yup.object().shape({
    nombre: Yup.string()
    .min(2, 'Campo demasiado corto')
    .max(16, 'Campo demasiado largo')
    .required('Campo requerido'),  
    
});

class ModificarDepartamento extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            departamento : null
        }
    }

    componentWillMount(){
        let id_departamento = this.props.match.params.id;
        axios({
            method: 'get',
            url: `${URL}/Departamento/`+ `${id_departamento}`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    departamento : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }

        modificar(value){
            axios({
                method: 'put',
                url: `${URL}/Departamento/${this.state.departamento.id_departamento}`,
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
            this.props.history.push(`/departamento`);
        }


        formulario(){
            return(
            <Formik
                initialValues={this.state.departamento}
                validationSchema={DepartamentoSchema}
                onSubmit={value=>{
                    this.modificar(value);
                }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                        <div className="container">
                    <h1>Modificar departamento</h1> 
                       
                      <div className="row">
  
  
                          <div className="col-6 form-group ">
                          <label>Departamento</label>
                          <Field name="nombre" className="form-control" />
                          {errors.nombre && touched.nombre ? (
                          <div className="text-danger">{errors.nombre}</div>
                          ) : null}   
                          </div>
      
  <div>
  
                         
                           < br/>
                           < br/>
                           < br/>
                              <div className = "col-1 form-group2">
                              <button type="submit" className="btn btn-success float-right">Modificar</button>
                              </div>
                              <div className = "col-1 form-group2">
                            <button onClick={()=>this.volver()} className="btn btn-danger">Cancelar</button>
                            
                            </div>
                      </div>
  
                      </div>
  
                      ></div>               
                </Form>
                )}
        </Formik>);
        }

    render(){
        return(
            <div>
            {
                this.state.departamento != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/Departamento');
                    }}
                />
    </div>
        );
    }
}

export default ModificarDepartamento;
