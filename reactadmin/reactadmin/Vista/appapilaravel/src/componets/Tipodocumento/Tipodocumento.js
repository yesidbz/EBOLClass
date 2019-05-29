import React , {Component} from 'react'; 
import axios from 'axios';
import {Field} from 'formik';
import {URL,TOKEN} from './../../config/config';


class TipodocumentoSelect extends Component{

constructor(props) {
  super(props);
    this.state = {
         tipodocumento : [] 
    }
}

componentDidMount(){
    axios({
        method: 'get',
        url: `${URL}/TipodocumentoSelect/select_tipo`,
         headers: {
              "Authorization": "bearer "+TOKEN
        }
        }).then(respuesta=>{

       let datos  = respuesta.data ; 
       if(datos.ok){
              this.setState({
                tipodocumento : datos.data
              });
            }
          else {
              console.log("no");
          }    
       
      });
}
 

listar (){

    if(this.state.tipodocumento.length > 0 ){
    let id_tipodocumento = this.props.id_tipodocumento;
        return this.state.tipodocumento.map((e , i) => 
           <option value={id_tipodocumento}   key={i} value={e.id_tipodocumento}>{e.nombre}</option>
           );
    }
}  

    render(){
        return(
            <Field component="select" name="id_tipodocumento" className="form-control">
              <option value="">Seleccionar</option>
           {this.listar()} 
    
          </Field>
        );
    }
}

export default TipodocumentoSelect;