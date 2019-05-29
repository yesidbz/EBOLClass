import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import Estudiante from './pages/Estudiante/Estudiante'
import CrearEstudiante from './pages/Estudiante/CrearEstudiante'
import ModificarEstudiante from './pages/Estudiante/ModificarEstudiante'
import Grupo from './pages/Grupo/Grupo'
import CrearGrupo from './pages/Grupo/CrearGrupo'
import ModificarGrupo from './pages/Grupo/ModificarGrupo'
import Grado from './pages/Grado/Grado'
import CrearGrado from './pages/Grado/CrearGrado'
import ModificarGrado from './pages/Grado/ModificarGrado'
import Salon from './pages/Salon/Salon'
import CrearSalon from './pages/Salon/CrearSalon'
import ModificarSalon from './pages/Salon/ModificarSalon'
import Jornada from './pages/Jornada/Jornada'
import CrearJornada from './pages/Jornada/CrearJornada'
import ModificarJornada from './pages/Jornada/ModificarJornada'
import Departamento from './pages/Departamento/Departamento'
import CrearDepartamento from './pages/Departamento/CrearDepartamento'
import ModificarDepartamento from './pages/Departamento/ModificarDepartamento'
import Municipio from './pages/Municipio/Municipio'
import CrearMunicipio from './pages/Municipio/CrearMunicipio'
import ModificarMunicipio from './pages/Municipio/ModificarMunicipio'
import Acudiente from './pages/Acudiente/Acudiente'
import CrearAcudiente from './pages/Acudiente/CrearAcudiente'
import ModificarAcudiente from './pages/Acudiente/ModificarAcudiente'
import Tipodocumento from './pages/Tipodocumento/Tipodocumento'
import CrearTipodocumento from './pages/Tipodocumento/CrearTipodocumento'
import ModificarTipodocumento from './pages/Tipodocumento/ModificarTipodocumento'
import Docentes from './pages/Docentes/Docentes';
import CrearDocentes from './pages/Docentes/CrearDocentes';
import ModificarDocentes from './pages/Docentes/ModificarDocentes';
import Area from './pages/Area/Area'
import CrearArea  from './pages/Area/CrearArea'
import ModificarArea  from './pages/Area/ModificarArea'
import Asignatura from './pages/Asignatura/Asignatura'
import CrearAsignatura  from './pages/Asignatura/CrearAsignatura'
import ModificarAsignatura  from './pages/Asignatura/ModificarAsignatura'
import Register from './pages/login/Recuperar'
import index from './pages/login/index'
import Registrar from './pages/login/Registrar'




class Routes extends Component {
       
    render(){
           return ( 
            <Switch>
            <Route path="/estudiante"  exact   component={Estudiante} />
            <Route path="/estudiante/crear"  exact   component={CrearEstudiante} />  
            <Route path="/estudiante/modificar/:id"  exact   component={ModificarEstudiante} />
            <Route path="/grupo"  exact   component={Grupo} />
            <Route path="/grupo/crear"  exact   component={CrearGrupo} />  
            <Route path="/grupo/modificar/:id"  exact   component={ModificarGrupo} />
            <Route path="/grado"  exact   component={Grado} />
            <Route path="/grado/crear"  exact   component={CrearGrado} />  
            <Route path="/grado/modificar/:id"  exact   component={ModificarGrado} />
            <Route path="/salon"  exact   component={Salon} />
            <Route path="/salon/crear"  exact   component={CrearSalon} />  
            <Route path="/salon/modificar/:id"  exact   component={ModificarSalon} />
            <Route path="/jornada"  exact   component={Jornada} />
            <Route path="/jornada/crear"  exact   component={CrearJornada} />  
            <Route path="/jornada/modificar/:id"  exact   component={ModificarJornada} />
            <Route path="/departamento"  exact   component={Departamento} />
            <Route path="/departamento/crear"  exact   component={CrearDepartamento} />  
            <Route path="/departamento/modificar/:id"  exact   component={ModificarDepartamento} />
            <Route path="/municipio"  exact   component={Municipio} />
            <Route path="/municipio/crear"  exact   component={CrearMunicipio} />  
            <Route path="/municipio/modificar/:id"  exact   component={ModificarMunicipio} />
            <Route path="/Acudiente"  exact   component={Acudiente} />
            <Route path="/Acudiente/crear"  exact   component={CrearAcudiente} />  
            <Route path="/Acudiente/modificar/:id"  exact   component={ModificarAcudiente} />
            <Route path="/tipodocumento"  exact   component={Tipodocumento } />
            <Route path="/tipodocumento/crear"  exact   component={CrearTipodocumento } />  
            <Route path="/tipodocumento/modificar/:id"  exact   component={ModificarTipodocumento } />
            <Route path="/docentes" exact component={Docentes}/>
            <Route path="/docentes/crear" exact component={CrearDocentes}/>
            <Route path="/docentes/modificar/:iddocente" exact component={ModificarDocentes}/>
            <Route path="/Area"  exact   component={Area} />
            <Route path="/Area/crear"  exact   component={CrearArea} />  
            <Route path="/Area/modificar/:id"  exact   component={ModificarArea} />
            <Route path="/Materia"  exact   component={Asignatura } />
            <Route path="/Materia/crear"  exact   component={CrearAsignatura } />  
            <Route path="/Materia/modificar/:id"  exact   component={ModificarAsignatura } />
            <Route path="/login/index"  exact   component={index} />
            <Route path="/login/Registrar"  exact   component={Registrar} />
           
        </Switch>

     ); 
    }
}

export default Routes