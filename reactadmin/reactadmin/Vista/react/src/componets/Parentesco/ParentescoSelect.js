import React , {Component} from 'react'; 
import axios from 'axios';
import {Field} from 'formik';
import {URL,TOKEN} from './../../config/config';


class ParentescoSelect extends Component{

constructor(props) {
  super(props);
    this.state = {
         parentesco : [] 
    }
}

componentDidMount(){
    axios({
        method: 'get',
        url: `${URL}/Parentesco/select_p`,
         headers: {
              "Authorization": "bearer "+TOKEN
        }
        }).then(respuesta=>{

       let datos  = respuesta.data ; 
       if(datos.ok){
              this.setState({
                  parentesco : datos.data
              });
            }
          else {
              console.log("no");
          }    
       
      });
}
 

listar (){

    if(this.state.parentesco.length > 0 ){
    let id_parentesco = this.props.id_parentesco;
        return this.state.parentesco.map((e , i) => 
           <option value={id_parentesco}   key={i} value={e.id_parentesco}>{e.nombre}</option>
           );
    }
}  

    render(){
        return(
            <Field component="select" name="id_parentesco" className="form-control">
              <option value="">Seleccionar</option>
           {this.listar()} 
    
          </Field>
        );
    }
}

export default ParentescoSelect;