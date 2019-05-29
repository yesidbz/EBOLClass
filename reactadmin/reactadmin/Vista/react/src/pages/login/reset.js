import React, {Component} from 'react';
  import { URL } from '../../config/config';
  import axios from 'axios';
  import {Formik,Form,Field} from 'formik';
  import * as Yup from 'yup';
  import SweetAlert from 'sweetalert-react';
  import { Card, CardHeader, Col } from 'reactstrap';
  

  const RegistrarSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required'),
    email: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required')
  });
  
  class reset extends Component {
  
    constructor(props){
      super(props);
      this.state = {
          sweetShow: false,
          sweetTitle: '',
          sweetText: '',
          sweetType: '',
      }
  } 
  
    registrar={
    name:'',
    email:'',
    password:'',
    rol:'doc'
  }
  
    registrarse(value) {
              axios({
        method: 'post',
        url: `${URL}/register`,
        headers: {
           // "Authorization": "bearer"+ localStorage.token
        },
        data : value
    }).then(respuesta=>{
        let datos = respuesta.data;
        if(datos.ok !=false){
          this.setState({
            sweetShow: true,
            sweetText: datos.mensaje,
            sweetTitle: "Registro Exitoso",
            sweetType: "success"
        });
  
        //  localStorage.token=datos.data.token
        //  return <Redirect to='/producto' /> 
        // this.props.history.push('/producto/ordenservicio') 
  
        this.registrar={
            name:'',
            email:'',
            password:'',
            rol:'doc'
        }
  
        }else {
          this.setState({
            sweetShow: true,
            sweetText: datos.error,
            sweetTitle: "Verifica los datos",
            sweetType: "error"
        });
        // this.props.history.push('/producto/login');
        console.log(respuesta);
  
        // this.props.history.push('/listarorden') ;
        }
    });
    }
    render(){
    
      return (
          <div> 

        <Formik
                  initialValues={this.registrar}
                  validationSchema={RegistrarSchema}
                  onSubmit={value=>{
                      this.registrarse(value);
                  
                  }}
              >
              {({ errors, values}) => (
                  <Form>
                           <div className="container">

                      <h1>Registrar primera fase verificacion</h1>
                      <br></br>
                      <div className="row">
                

                        <div className="col-5 form-group">
                              <label>Nombre</label>
                              <Field  type="text" name="name"  className="form-control"/>
                              {errors.name && values.name ? (
                                  <div className="text-danger">{errors.name}</div>
                              ) : null}
                        </div>
                                 
 
                        <div className="col-5 form-group">
                              <label>Correo</label>
                              <Field  type="email" name="email"  className="form-control" />
                              {errors.email && values.email ? (
                                  <div className="text-danger">{errors.email}</div>
                              ) : null}
                        </div>
                                 
                        <div className="col-5 form-group">
                              <label>Contraseña</label>
                              <Field  type="password" name="password" className="form-control" />
                              {errors.password && values.password ? (
                                  <div className="text-danger">{errors.password}</div>
                              ) : null}
                        </div>



                          </div>
                          <br />
                          <br />
                          <div className="col-8">
                              <button type="submit"  className="btn btn-success float-right">Registrar</button>
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
                    this.props.history.push('/docentes/crear');
                }}
                  
              />
             
          </div>
      );
  }
    
}

  
  export default reset;