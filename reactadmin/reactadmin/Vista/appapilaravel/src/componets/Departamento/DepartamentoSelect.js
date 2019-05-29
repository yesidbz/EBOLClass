import React , {Component} from 'react'; 
import axios from 'axios';
import {Field} from 'formik';
import {URL,TOKEN} from '../../config/config';


class DepartamentoSelect extends Component{

constructor(props) {
  super(props);
    this.state = {
         departamento: [] 
    }
}

componentDidMount(){
    axios({
        method: 'get',
        url: `${URL}/MunicipioSelect/select_d`,
         headers: {
              "Authorization": "bearer "+TOKEN
        }
        }).then(respuesta=>{

       let datos  = respuesta.data ; 
       if(datos.ok){
              this.setState({
                  departamento : datos.data
              });
            }
          else {
              console.log("no");
          }    
       
      });
}
 

listar (){

    if(this.state.departamento.length > 0 ){
    let id_departamento = this.props.id;
        return this.state.departamento.map((e , i) => 
           <option value={id_departamento}   key={i} value={e.id_departamento}>{e.nombre}</option>
           );
    }
}  

    render(){
        return(
            <Field component="select" name="id_departamento" className="form-control">
              <option value="">Seleccionar</option>
           {this.listar()} 
    
          </Field>
        );
    }
}

export default DepartamentoSelect;