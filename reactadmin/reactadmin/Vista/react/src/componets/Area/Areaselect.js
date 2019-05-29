import React , {Component} from 'react'; 
import axios from 'axios';
import {Field} from 'formik';
import {URL,TOKEN} from './../../config/config';


class AreaSelect extends Component{

constructor(props) {
  super(props);
    this.state = {
         area : [] 
    }
}

componentDidMount(){
    axios({
        method: 'get',
        url: `${URL}/Asignatura/select_area`,
         headers: {
              "Authorization": "bearer "+TOKEN
        }
        }).then(respuesta=>{

       let datos  = respuesta.data ; 
       if(datos.ok){
              this.setState({
                area : datos.data
              });
            }
          else {
              console.log("no");
          }    
       
      });
}
 

listar (){

    if(this.state.area.length > 0 ){
    let id_area = this.props.id_area;
        return this.state.area.map((e , i) => 
           <option value={id_area}   key={i} value={e.id_area}>{e.nombre}</option>
           );
    }
}  

    render(){
        return(
            <Field component="select" name="id_area" className="form-control">
              <option value="">Seleccionar</option>
           {this.listar()} 
    
          </Field>
        );
    }
}

export default AreaSelect;