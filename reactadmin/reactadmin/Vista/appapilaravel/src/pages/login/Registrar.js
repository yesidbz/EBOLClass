import React, {
    Component
  } from 'react';
  
  import { URL } from './../../config/config';
  import axios from 'axios';
  import {
    Formik,
    Form,
    Field
  } from 'formik';
  import * as Yup from 'yup';
  
  
  import SweetAlert from 'sweetalert-react';
  const RegisterSchema = Yup.object().shape({
  

    name: Yup.string()
    .required('Required'),
    email: Yup.string()
        .required('Required'),
    password: Yup.string()
    .required('Required')
  });
  
  class Register extends Component {
  
    constructor(props){
      super(props);
      this.state = {
          sweetShow: false,
          sweetTitle: '',
          sweetText: '',
          sweetType: '',
      }
  }
  
  
    
  
    Register={
    name:'',
    email:'',
    password:''
  }
  
    Register(value) {
              axios({
        method: 'post',
        url: `${URL}/register`,
        data : value
    }).then(respuesta=>{
        let datos = respuesta.data;
        if(datos.ok !=false){
          this.setState({
            sweetShow: true,
            sweetText: datos.mensaje,
            sweetTitle: "Bienvenido",
            sweetType: "success"
        });
  
       
  
        this.Register={
        name:'', 
          email:'',
          password:''
        }
  
        }else {
          this.setState({
            sweetShow: true,
            sweetText: datos.error,
            sweetTitle: "Verifica los datos",
            sweetType: "error"
        });
        
        console.log(respuesta);
  
        
        }
    });
    }
  
    login(){
      this.props.history.push(`/login/Index`);
  }
  
    render(){
    
      return (
          <div> 
              <Formik
                  initialValues={this.login}
                  validationSchema={RegisterSchema}
                  onSubmit={value=>{
                      this.Registrar(value);
                  
                  }}
              >
              {({ errors, touched, values, handleChange }) => (
                  <Form >
                      <div className="text-center">
                      <h1>REGISTRAR</h1>
                      </div>
                      <br></br>
                      <div className="row">
                      <div className="container-fluid">


                      <div className="col-8   form-group">
                              <label>Nombre</label>
                              <Field  type="name" name="name"  className="form-control" />
                              {errors.name && values.name ? (
                                  <div className="text-danger">{errors.name}</div>
                              ) : null}
                          </div>
                                
                          <div className="col-8   form-group">
                              <label>email</label>
                              <Field  type="email" name="email"  className="form-control" />
                              {errors.email && values.email ? (
                                  <div className="text-danger">{errors.email}</div>
                              ) : null}
                          </div>
                                 
                          <div className="col-8 form-group">
                              <label>password</label>
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
                            <button onClick={()=>this.login()} className="btn btn-primary">Login</button>
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
                    this.props.history.push('/');
                }}
                  
              />
          </div>
      );
  }
    }
  
  export default Register