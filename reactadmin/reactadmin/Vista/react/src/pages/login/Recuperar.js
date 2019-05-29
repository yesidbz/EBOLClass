import React, {Component} from 'react';
  import { URL } from './../../config/config';
  import axios from 'axios';
  import {Formik,Form,Field} from 'formik';
  import * as Yup from 'yup';
  import SweetAlert from 'sweetalert-react';
  import { Card, CardHeader, Col } from 'reactstrap';
  import BackgroundImagePage from './style';
  

  const RegistrarSchema = Yup.object().shape({

    email: Yup.string()
        .required('Required')

  });
  
  class Recuperar extends Component {
  
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
    email:''
  }
  


  
    registrarse(value) {
              axios({
        method: 'post',
        url: `${URL}/recover`,
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
                sweetTitle: "el link fue enviado verifica tu correo",
                sweetType: "success"
      
            });
          localStorage.user = value.email;
          this.login = {
            email: "",
          };

  
        //  localStorage.token=datos.data.token
        //  return <Redirect to='/producto' /> 
        // this.props.history.push('/producto/ordenservicio') 
  
        this.registrar={
            
            email:'',
            
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
                   <BackgroundImagePage/>
                   <div className="contai" align="center">
                  
                   <div className="text-center">

                   <h1>Recuperar contraseña</h1>
                   <br></br>
                   </div>
                   <div className="row">
                   <div className="wrapp">


                              
                             < div className="text-center">
                     <div className="wrapp">
                           <Field className="center" type="email" name="email" placeholder="Correo electronico"  className="form-control" />
                           {errors.email && values.email ? (
                               <div className="text-danger">{errors.email}</div>
                           ) : null}
                     </div>
                             </div>

                       </div>
                       
                       <br />
                       <br />
                       <div>
                         <div className="left"><br></br><a href="/login/Index">Regresar a inicio</a></div>
                         <div className="right"><button type="submit"  className="btn btn-success float-right">Recuperar</button></div>
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
                    this.props.history.push('/login/index');
                }}
                  
              />
             
          </div>
      );
  }
    
}

  
  export default Recuperar;