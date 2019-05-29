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
const LoginSchema = Yup.object().shape({

  email: Yup.string()
      .required('Required'),
  password: Yup.string()
  .required('Required')
});

class Index extends Component {

  constructor(props){
    super(props);
    this.state = {
        sweetShow: false,
        sweetTitle: '',
        sweetText: '',
        sweetType: '',
    }
}


  

  login={
  email:'',
  password:''
}

  logiarse(value) {
            axios({
      method: 'post',
      url: `${URL}/login`,
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

       localStorage.token=datos.data.token

      this.login={
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

  registrar(){
    this.props.history.push(`/login/Registrar`);
}

  render(){
  
    return (
        <div> 
            <Formik
                initialValues={this.login}
                validationSchema={LoginSchema}
                onSubmit={value=>{
                    this.logiarse(value);
                
                }}
            >
            {({ errors, touched, values, handleChange }) => (
                <Form >
                    <div className="text-center">
                    <h1>Inicio De Sesión</h1>
                    </div>
                    <br></br>
                    <div className="row">
                    <div className="container-fluid">
                              
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
                            
                          <button type="submit"  className="btn btn-success float-right">Iniciar</button>
                          <button onClick={()=>this.registrar()} className="btn btn-primary">Registrar</button>

                          <a href="/recuperar">¿Olvidó su contraseña?</a>

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

export default Index;