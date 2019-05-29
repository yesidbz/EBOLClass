import React , {Component} from 'react'; 
import axios from 'axios';
import {Field} from 'formik';
import {URL,TOKEN} from '../../config/config';


class SalonSelect extends Component{

constructor(props) {
  super(props);
    this.state = {
         grado_grupo : [] 
    }
}

componentDidMount(){
    axios({
        method: 'get',
        url: `${URL}/SalonSelect/select_gg`,
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

    if(this.state.grado_grupo.length > 0 ){
    let id_grado_grupo = this.props.id_grado_grupo;
        return this.state.grado.map((e , i) => 
           <option value={id_grado_grupo}   key={i} value={e.id_grado_grupo}>{e.grado} - {e.grupo}</option>
           );
    }
}  

    render(){
        return(
            <Field component="select" name="id_grado_grupo" className="form-control">
              <option value="">Seleccionar</option>
           {this.listar()} 
    
          </Field>
        );
    }
}

export default SalonSelect;