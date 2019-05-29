import React , {Component} from 'react'; 
import axios from 'axios';
import {Field} from 'formik';
import {URL,TOKEN} from './../../config/config';


class GradoSelect extends Component{

constructor(props) {
  super(props);
    this.state = {
         grado : [] 
    }
}

componentDidMount(){
    axios({
        method: 'get',
        url: `${URL}/SalonSelect/select_grado`,
         headers: {
              "Authorization": "bearer "+TOKEN
        }
        }).then(respuesta=>{

       let datos  = respuesta.data ; 
       if(datos.ok){
              this.setState({
                grado : datos.data
              });
            }
          else {
              console.log("no");
          }    
       
      });
}
 

listar (){

    if(this.state.grado.length > 0 ){
    let id_grado = this.props.id_grado;
        return this.state.grado.map((e , i) => 
           <option value={id_grado}   key={i} value={e.id_grado}>{e.descripcion}</option>
           );
    }
}  

    render(){
        return(
            <Field component="select" name="id_grado" className="form-control">
              <option value="">Seleccionar</option>
           {this.listar()} 
    
          </Field>
        );
    }
}

export default GradoSelect;