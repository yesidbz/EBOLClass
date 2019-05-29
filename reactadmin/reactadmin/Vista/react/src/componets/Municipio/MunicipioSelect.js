import React , {Component} from 'react'; 
import axios from 'axios';
import {Field} from 'formik';
import {URL,TOKEN} from './../../config/config';


class MunicipioSelect extends Component{

constructor(props) {
  super(props);
    this.state = {
         municipio : [] 
    }
}

componentDidMount(){
    axios({
        method: 'get',
        url: `${URL}/MunicipioSelect/select_m`,
         headers: {
              "Authorization": "bearer "+TOKEN
        }
        }).then(respuesta=>{

       let datos  = respuesta.data ; 
       if(datos.ok){
              this.setState({
                  municipio : datos.data
              });
            }
          else {
              console.log("no");
          }    
       
      });
}
 

listar (){

    if(this.state.municipio.length > 0 ){
    let id_municipio = this.props.id_municipio;
        return this.state.municipio.map((e , i) => 
           <option value={id_municipio}   key={i} value={e.id_municipio}>{e.Nombre}</option>
           );
    }
}  

    render(){
        return(
            <Field component="select" name="id_municipio" className="form-control">
              <option value="">Seleccionar</option>
           {this.listar()} 
    
          </Field>
        );
    }
}

export default MunicipioSelect;