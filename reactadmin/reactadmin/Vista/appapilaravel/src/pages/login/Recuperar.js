import React, {
    Component
  } from 'react';
  
  import { URL } from '../../config/config';
  import axios from 'axios';
  import {
    Formik,
    Form,
    Field
  } from 'formik';
  import * as Yup from 'yup';
  
  
  import Recuperar from 'sweetalert-react';
  const RegisterSchema = Yup.object().shape({
  
    email: Yup.string()
        .required('Required'),
    
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
  
  
    
  
    Register={
   
    email:'',
   
  }
  
    Register(value) {
              axios({
        method: 'post',
        url: `${URL}/recover`,
        data : value
    }).then(respuesta=>{
        let datos = respuesta.data;
        if(datos.ok !=false){
          localStorage.user = value.email;
          this.props.history.push("/login");
          this.login = {
            email: "",
          };

          this.setState({
            sweetShow: true,
            sweetText: datos.mensaje,
            sweetTitle: "Bienvenido",
            sweetType: "success"
        });
  
       
  
        this.Register={
      
          email:'',
    
        }
  
        }else {
          console.log("Email no encontrado.")
          this.setState({
            sweetShow: true,
            sweetText: datos.error,
            sweetTitle: "Verifica los datos",
            sweetType: "error"
        }
        
        );
        
        console.log(respuesta);
  
        
        }
    });
    }
  
    login(){
      this.props.history.push(`/login/Index`);
  }
  
  render() {
    return (
      <Row
        style={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Col md={6} lg={4}>
          <Card body>
            <Formik
              initialValues={this.Register}
              validationSchema={RegisterSchema}
              onSubmit={value => {
                this.Register(value);
              }}
            >
              {({ errors, values }) => (
                <Form>
                  <br />

                  <label>Correo:</label>
                  <Field
                    placeholder="ejemplologin@gmail.com"
                    type="email"
                    name="email"
                    className="form-control"
                  />
                  {errors.email && values.email ? (
                    <div className="text-danger">{errors.email}</div>
                  ) : null}
                  <br />
                  
                  <br />
                  <center>
                    <button
                      type="submit"
                      className="btn btn-success alighcenter"
                    >
                      Recuperar
                    </button>
                  </center>
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
              
          </Card>
        </Col>
      </Row>
    );
  }
    }
  
  export default Recuperar