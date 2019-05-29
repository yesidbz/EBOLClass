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
import BackgroundImagePage from './style';
import TipoDocumento from '../Tipodocumento/Tipodocumento';






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


    
      
      setTimeout(() => {
        localStorage.token=datos.token;
        localStorage.rol=datos.rol.rol;
        //window.localStorage.setItem('datos.data.rol', localStorage.rol);
        //var rehydratedAnimal = JSON.parse(window.localStorage.getItem('datos.data.rol'));
        //var roles = localStorage.getItem('rol');
        //localStorage.roleta=JSON.parse(roles);
        
      
      }, 2000);


        
  
    

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
                <BackgroundImagePage/>
                  <div className="contai" align="center">
                    <div className="text-center">
                    <h1>Inicio De Sesión</h1>
                    </div>
                    <br></br>
                    <div className="row">
                    <div>
                    
                              
                        <div>
                            <label>Correo electronico</label>
                            <Field  type="email" name="email"  className="form-control" />
                            {errors.email && values.email ? (
                                <div className="text-danger">{errors.email}</div>
                            ) : null}
                        </div>
                               
                        <div>
                            <label>Contraseña</label>
                            <Field  type="password" name="password" className="form-control" />
                            {errors.password && values.password ? (
                                <div className="text-danger">{errors.password}</div>
                            ) : null}
                        </div>



                        </div>
                        <br />
                        <br />
                        <div>

<div className="left"><br></br><a href="/login/Recuperar">Recuperar contraseña</a></div>
<div className="right"><button type="submit"  className="btn btn-success float-right">Iniciar</button></div>
</div>
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