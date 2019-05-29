import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const GradoSchema = Yup.object().shape({
    descripcion: Yup.string()
    .required('Required'),
    
});

class ModificarGrado extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            grado : null
        }
    }

    componentWillMount(){
        let id_grado = this.props.match.params.id;
        axios({
            method: 'get',
            url: `${URL}/Grado/`+ `${id_grado}`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    grado : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }

        modificar(value){
            axios({
                method: 'put',
                url: `${URL}/Grado/${this.state.grado.id_grado}`,
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
                initialValues={this.state.grado}
                validationSchema={GradoSchema}
                onSubmit={value=>{
                    this.modificar(value);
                }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                    <h1>MODIFICAR GRADO</h1> 
                       
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
                this.state.grado != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/Grado');
                    }}
                />
    </div>
        );
    }
}

export default ModificarGrado;
