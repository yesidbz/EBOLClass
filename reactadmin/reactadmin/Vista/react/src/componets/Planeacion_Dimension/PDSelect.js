import React , {Component} from 'react'; 
import axios from 'axios';
import {Field} from 'formik';
import {URL,TOKEN} from '../../config/config';


class PDSelect extends Component{

constructor(props) {
  super(props);
    this.state = {
        PlaneacionDimension: [] 
    }
}

componentDidMount(){
    axios({
        method: 'get',
        url: `${URL}/PlaneacionDimension/select_pd`,
         headers: {
              "Authorization": "bearer "+TOKEN
        }
        }).then(respuesta=>{

       let datos  = respuesta.data ; 
       if(datos.ok){
              this.setState({
                PlaneacionDimension : datos.data
              });
            }
          else {
              console.log("no");
          }    
       
      });
}
 

listar (){

    if(this.state.PlaneacionDimension.length > 0 ){
        let id_planeacion_dimension = this.props.id_planeacion_dimension;
    
            return this.state.PlaneacionDimension.map((e , i) => 
               <option value={id_planeacion_dimension} key={i} value={e.id_planeacion_dimension}> {e.id_planeacion_dimension}</option>
               );
    }
}  

    render(){
        return(
            <Field component="select" name="id_planeacion_dimension" className="form-control">
              <option value="">Seleccionar</option>
           {this.listar()} 
    
          </Field>
        );
    }
}

export default PDSelect;