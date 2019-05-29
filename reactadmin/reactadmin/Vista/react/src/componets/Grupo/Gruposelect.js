import React , {Component} from 'react'; 
import axios from 'axios';
import {Field} from 'formik';
import {URL,TOKEN} from './../../config/config';


class GrupoSelect extends Component{

constructor(props) {
  super(props);
    this.state = {
         grupo : [] 
    }
}

componentDidMount(){
    axios({
        method: 'get',
        url: `${URL}/SalonSelect/select_grupo`,
         headers: {
              "Authorization": "bearer "+TOKEN
        }
        }).then(respuesta=>{

       let datos  = respuesta.data ; 
       if(datos.ok){
              this.setState({
                  grupo : datos.data
              });
            }
          else {
              console.log("no");
          }    
       
      });
}
 

listar (){

    if(this.state.grupo.length > 0 ){
    let id_grupo = this.props.id_grupo;
        return this.state.grupo.map((e , i) => 
           <option value={id_grupo}   key={i} value={e.id_grupo}>{e.descripcion}</option>
           );
    }
}  

    render(){
        return(
            <Field component="select" name="id_grupo" className="form-control">
              <option value="">Seleccionar</option>
           {this.listar()} 
    
          </Field>
        );
    }
}

export default GrupoSelect;