import React, {Component} from 'react';
  import { URL } from './../../config/config';
  import axios from 'axios';
  import {Formik,Form,Field} from 'formik';
  import * as Yup from 'yup';
  import SweetAlert from 'sweetalert-react';
  import { Card, CardHeader, Col } from 'reactstrap';
  


  const LoginSchema = Yup.object().shape({
  newpassword: Yup.string().required("Required"),
  confirmPassword: Yup.string().required("Required")
});



class Cambiar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  login = {
    newpassword: "",
    confirmPassword : ""
  };

  logiarse(value) {
    axios({
      method: "post",
      url: `${URL}/reset`,
      data: {
        newpassword : value.newpassword,
        confirmPassword : value.confirmPassword,
        User : localStorage.user
      }
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok !== null) {
        this.setState({
          sweetShow: true,
          sweetText: datos.mensaje,
          sweetTitle: "contraseña modificada con exito",
          sweetType: "success"

      });
        this.login = {
          newpassword: "",
          confirmPassword : ""
        };
      } else {
        console.log("Eror al reseterar")
      }
      console.log(respuesta);
    });
  }
  render() {
    return (
      
        <Col md={6} lg={4}>
          <Card body>
            <Formik
              initialValues={this.login}
              validationSchema={LoginSchema}
              onSubmit={value => {
                this.logiarse(value);
              }}
            >
              {({ errors, values }) => (
                <Form>
                  <br />

                  <label>Nueva Contraseña:</label>
                  <Field
                    placeholder="*********"
                    type="password"
                    name="newpassword"
                    className="form-control"
                  />
                  {errors.newpassword && values.newpassword ? (
                    <div className="text-danger">{errors.newpassword}</div>
                  ) : null}
                  <br />
                  <label>Confirmar Contraseña:</label>
                  <Field
                    placeholder="*********"
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                  />
                  {errors.confirmPassword && values.confirmPassword ? (
                    <div className="text-danger">{errors.confirmPassword}</div>
                  ) : null}
                  <br />
                  <center>
                    <button
                      type="submit"
                      className="btn btn-success alighcenter"
                    >
                      Guardar
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
                    this.props.history.push('/login/index');
                }}
                  
              />
          </Card>
        </Col>
      
    );
  }
}

export default Cambiar;
