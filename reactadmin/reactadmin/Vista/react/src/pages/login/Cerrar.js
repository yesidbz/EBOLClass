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

  
  
  class Cerrar extends Component {
  
 
  
    componentDidMount(){
      this.props.history.push(`/login/index`);
      localStorage.removeItem(localStorage.token);
      localStorage.removeItem(localStorage.rol);
      localStorage.clear();
  }
  
    render(){
    
      return (
        
          <div> 
              <Formik

                  onSubmit={value=>{
                      this.registrar(value);

                  }}
              >
              </Formik>
          </div>
          
      );
  }
    }
  
  export default Cerrar;