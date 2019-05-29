import React from 'react';
import { Route, Switch } from 'react-router-dom';

import asyncComponent from './components/async.component';
import Classic from './layouts/layout-classic/layout-classic.component';
import Compact from './layouts/layout-compact/layout-compact.component';
import Toolbar from './layouts/layout-toolbar/layout-toolbar.component';
import Boxed from './layouts/layout-boxed/layout-boxed.component';
import Funky from './layouts/layout-funky/layout-funky.component';
import Tabbed from './layouts/layout-tabbed/layout-tabbed.component';
import NoLayout from './layouts/layout-none/layout-none.component';


import Estudiante from './pages/Estudiante/Estudiante';
import CrearEstudiante from './pages/Estudiante/CrearEstudiante';
import ModificarEstudiante from './pages/Estudiante/ModificarEstudiante';
import DetalleEstudiante from './pages/Estudiante/DetalleEstudiante';
import Grupo from './pages/Grupo/Grupo';
import CrearGrupo from './pages/Grupo/CrearGrupo';
import ModificarGrupo from './pages/Grupo/ModificarGrupo';
import DetalleGrupo from './pages/Grupo/DetalleGrupo';
import Grado from './pages/Grado/Grado';
import CrearGrado from './pages/Grado/CrearGrado';
import ModificarGrado from './pages/Grado/ModificarGrado';
import DetalleGrado from './pages/Grado/DetalleGrado';
import Salon from './pages/Salon/Salon';
import CrearSalon from './pages/Salon/CrearSalon';
import ModificarSalon from './pages/Salon/ModificarSalon';
import DetalleSalon from './pages/Salon/DetalleSalon';
import Jornada from './pages/Jornada/Jornada';
import CrearJornada from './pages/Jornada/CrearJornada';
import ModificarJornada from './pages/Jornada/ModificarJornada';
import DetalleJornada from './pages/Jornada/DetalleJornada';
import Departamento from './pages/Departamento/Departamento';
import CrearDepartamento from './pages/Departamento/CrearDepartamento';
import ModificarDepartamento from './pages/Departamento/ModificarDepartamento';
import DetalleDepartamento from './pages/Departamento/DetalleDepartamento';
import Municipio from './pages/Municipio/Municipio';
import CrearMunicipio from './pages/Municipio/CrearMunicipio';
import ModificarMunicipio from './pages/Municipio/ModificarMunicipio';
import DetalleMunicipio from './pages/Municipio/MunicipioDetalle';
import Acudiente from './pages/Acudiente/Acudiente';
import CrearAcudiente from './pages/Acudiente/CrearAcudiente';
import ModificarAcudiente from './pages/Acudiente/ModificarAcudiente';
import DetalleAcudiente from './pages/Acudiente/DetalleAcudiente';
import Tipodocumento from './pages/Tipodocumento/Tipodocumento';
import CrearTipodocumento from './pages/Tipodocumento/CrearTipodocumento';
import ModificarTipodocumento from './pages/Tipodocumento/ModificarTipodocumento';
import DetalleTipodocumento from './pages/Tipodocumento/DetalleTipodocumento';
import Docentes from './pages/Docentes/Docentes';
import CrearDocentes from './pages/Docentes/CrearDocentes';
import ModificarDocentes from './pages/Docentes/ModificarDocentes';
import DetalleDocentes from './pages/Docentes/DetalleDocente';
import Docentes1 from './pages/Administrador/Docentes';
import CrearDocentes1 from './pages/Administrador/CrearDocentes';
import ModificarDocentes1 from './pages/Administrador/ModificarDocentes';
import DetalleDocentes1 from './pages/Administrador/DetalleDocente';
import Area from './pages/Area/Area';
import CrearArea  from './pages/Area/CrearArea';
import ModificarArea   from './pages/Area/ModificarArea';
import DetalleArea  from './pages/Area/DetalleArea';
import Asignatura from './pages/Asignatura/Asignatura';
import CrearAsignatura  from './pages/Asignatura/CrearAsignatura';
import ModificarAsignatura  from './pages/Asignatura/ModificarAsignatura';
import DetalleAsignatura  from './pages/Asignatura/Detalleasignatura';
import Planeacion_Dimension from './pages/Planeacion_Dimension/Planeacion_Dimension';
import CrearPlaneacion_Dimension from './pages/Planeacion_Dimension/CrearPlaneacion_Dimension';
import Modificar from './pages/Planeacion_Dimension/Modificar';
import DetallePlaneaciond from './pages/Planeacion_Dimension/DetallePlaneacion_Dimension';
import Planeacion from './pages/planeacion/Planeacion';
import CrearPlaneacion from './pages/planeacion/CrearPlaneacion';
import ModificarPlaneacion from './pages/planeacion/ModificarPlaneacion';
import DetallePlaneacion from './pages/planeacion/DetallePlaneacion';
import Dimension from './pages/Dimension/Dimension';
import CrearDimension from './pages/Dimension/CrearDimension';
import ModificarDimension from './pages/Dimension/ModificarDimension';
import DetalleDimension from './pages/Dimension/DetalleDimension';
import Anolectivo from './pages/Anolectivo/Anolectivo';
import CrearAnolectivo from './pages/Anolectivo/CrearAnolectivo';
import ModificarAnolectivo from './pages/Anolectivo/ModificarAnolectivo';
import DetalleAnolectivo from './pages/Anolectivo/Detalleanolectivo';
import Docente_Asignatura from './pages/Docente_Asignatura/Docente_Asignatura';
import CrearDocente_Asignatura from './pages/Docente_Asignatura/CrearDocente_Asignatura';
import ModificarDocente_Asignatura from './pages/Docente_Asignatura/ModificarDocente_Asignatura';
import D_A_PCrear from './pages/Docente_Asignatura_Planeacion/D_A_PCrear';
import Dap from './pages/Docente_Asignatura_Planeacion/lis';
import ModificarDAP from './pages/Docente_Asignatura_Planeacion/ModificarDAP';
import DetalleDAP from './pages/Docente_Asignatura_Planeacion/DetalleDAP';
import AsignarSalon from './pages/AsignarSalon/AsignarSalon';
import CrearAsignarSalon from './pages/AsignarSalon/CrearAsignarSalon';
import ModificarAsignarSalon from './pages/AsignarSalon/ModificarAsignarSalon';
import pdf from './pages/AsignarSalon/PdfSalon';
import Programacion from './pages/Programacion/Programacion';
import CrearProgramacion from './pages/Programacion/CrearProgramacion';
import ModificarProgramacion from './pages/Programacion/ModificarProgramacion';
import DetalleProgramacion from './pages/Programacion/DetalleProgramacion';
import index from './pages/login/index';
import Cerrar from './pages/login/Cerrar';
import Registrar from './pages/login/Registrar';
import Registrar1 from './pages/login/Registrar1';
import Recuperar from './pages/login/Recuperar';
import User from './pages/login/Users';
import Cambiar from './pages/login/Cambiar';




// DASHBOARD ROUTE
const AsyncAnalyticsDashboard = asyncComponent(() => import('./containers/dashboards/analytics/analytics.component'));
const AsyncEcommerceDashboard = asyncComponent(() => import('./containers/dashboards/ecommerce/ecommerce.component'));
const AsyncCryptoDashboard = asyncComponent(() => import('./containers/dashboards/crypto/crypto.component'));
const AsyncProjectDashboard = asyncComponent(() => import('./containers/dashboards/project/project.component'));
const AsyncTheming = asyncComponent(() => import('./containers/theming/theming.component'));

// APP ROUTES
const AsyncEmailApp = asyncComponent(() => import('./containers/apps/email/email.component'));
const AsyncTodoApp = asyncComponent(() => import('./containers/apps/todo/todo.component'));
const AsyncMapsApp = asyncComponent(() => import('./containers/apps/maps/maps.component'));
const AsyncNotesApp = asyncComponent(() => import('./containers/apps/notes/notes.component'));
const AsyncContactsApp = asyncComponent(() => import('./containers/apps/contacts/contacts.component'));
const AsyncChatApp = asyncComponent(() => import('./containers/apps/chat/chat.component'));
const AsyncCalendarApp = asyncComponent(() => import('./containers/apps/calendar/calendar.component'));

// EXAMPLE ROUTES
const AsyncAutocompleteExample = asyncComponent(() => import('./containers/elements/autocomplete/autocomplete.component'));
const AsyncSelectionControlsExample = asyncComponent(() => import('./containers/elements/selection-controls/selection-controls.component'));
const AsyncPickerExample = asyncComponent(() => import('./containers/elements/picker/picker.component'));
const AsyncSelectExample = asyncComponent(() => import('./containers/elements/select/select.component'));
const AsyncTextFieldExample = asyncComponent(() => import('./containers/elements/text-field/text-field.component'));
const AsyncAppBarExample = asyncComponent(() => import('./containers/elements/app-bar/app-bar.component'));
const AsyncMenuExample = asyncComponent(() => import('./containers/elements/menu/menu.component'));
const AsyncListExample = asyncComponent(() => import('./containers/elements/list/list.component'));
const AsyncCardExample = asyncComponent(() => import('./containers/elements/card/card.component'));
const AsyncPaperExample = asyncComponent(() => import('./containers/elements/paper/paper.component'));
const AsyncAvatarExample = asyncComponent(() => import('./containers/elements/avatars/avatars.component'));
const AsyncSteppersExample = asyncComponent(() => import('./containers/elements/steppers/steppers.component'));
const AsyncButtonExample = asyncComponent(() => import('./containers/elements/button/button.component'));
const AsyncProgressExample = asyncComponent(() => import('./containers/elements/progress/progress.component'));

// AUTHENTICATION ROUTES
const AsyncLogin = asyncComponent(() => import('./containers/authentication/login/login.component'));
const AsyncRegister = asyncComponent(() => import('./containers/authentication/register/register.component'));
const AsyncProfile = asyncComponent(() => import('./containers/authentication/profile/profile.component'));
const AsyncLock = asyncComponent(() => import('./containers/authentication/lock/lock.component'));
const AsyncForgot = asyncComponent(() => import('./containers/authentication/forgot-password/forgot-password.component'));

// ERROR ROUTES
const AsyncError404 = asyncComponent(() => import('./containers/errors/404.component'));
const AsyncError500 = asyncComponent(() => import('./containers/errors/500.component'));

const AsyncNotFound = asyncComponent(() => import('./containers/not-found/not-found.component'));

// PAGES ROUTES
const AsyncTypography = asyncComponent(() => import('./containers/pages/typography.component'));
const AsyncColors = asyncComponent(() => import('./containers/pages/colors.component'));

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

const ClassicLayout = props => (
  <Classic>{props.children}</Classic>
);

const CompactLayout = props => (
  <Compact>{props.children}</Compact>
);

const ToolbarLayout = props => (
  <Toolbar>{props.children}</Toolbar>
);

const BoxedLayout = props => (
  <Boxed>{props.children}</Boxed>
);

const FunkyLayout = props => (
  <Funky>{props.children}</Funky>
);

const TabbedLayout = props => (
  <Tabbed>{props.children}</Tabbed>
);

// TODO: Consider looping through an object containing all routes
export default ({ childProps, layout }) => {
  let activeLayout;
  switch (layout.currentLayout) {
  case 'classic':
    activeLayout = ClassicLayout;
    break;
  case 'compact':
    activeLayout = CompactLayout;
    break;
  case 'toolbar':
    activeLayout = ToolbarLayout;
    break;
  case 'boxed':
    activeLayout = BoxedLayout;
    break;
  case 'funky':
    activeLayout = FunkyLayout;
    break;
  case 'tabbed':
    activeLayout = TabbedLayout;
    break;
  default:
    activeLayout = ClassicLayout;
  }

  return (
    <Switch>
      <AppRoute path="/" exact component={AsyncAnalyticsDashboard} props={childProps} layout={activeLayout} />
      <AppRoute path="/estudiante" exact component={Estudiante} props={childProps} layout={activeLayout} />
      <AppRoute path="/estudiante/crear"  exact component={CrearEstudiante} props={childProps} layout={activeLayout} />
      <AppRoute path="/estudiante/modificar/:id"  exact component={ModificarEstudiante}  props={childProps} layout={activeLayout} />
      <AppRoute path="/estudiante/detalle/:id"  exact component={DetalleEstudiante}  props={childProps} layout={activeLayout} />
      <AppRoute path="/docentes" exact component={Docentes} props={childProps} layout={activeLayout}/>
      <AppRoute path="/docentes/crear" exact component={CrearDocentes} props={childProps} layout={activeLayout}/>
      <AppRoute path="/docentes/modificar/:iddocente" exact component={ModificarDocentes} props={childProps} layout={activeLayout}/>
      <AppRoute path="/docentes/detalle/:iddocente" exact component={DetalleDocentes} props={childProps} layout={activeLayout}/>
      <AppRoute path="/administrador" exact component={Docentes1} props={childProps} layout={activeLayout}/>
      <AppRoute path="/administrador/crear" exact component={CrearDocentes1} props={childProps} layout={activeLayout}/>
      <AppRoute path="/administrador/modificar/:iddocente" exact component={ModificarDocentes1} props={childProps} layout={activeLayout}/>
      <AppRoute path="/administrador/detalle/:iddocente" exact component={DetalleDocentes1} props={childProps} layout={activeLayout}/>
      <AppRoute path="/Acudiente"  exact   component={Acudiente} props={childProps} layout={activeLayout} />
      <AppRoute path="/Acudiente/crear"  exact   component={CrearAcudiente} props={childProps} layout={activeLayout} />
      <AppRoute path="/Acudiente/modificar/:id"  exact   component={ModificarAcudiente} props={childProps} layout={activeLayout} />
      <AppRoute path="/Acudiente/detalle/:id"  exact   component={DetalleAcudiente} props={childProps} layout={activeLayout} />
      <AppRoute path="/Area"  exact   component={Area} props={childProps} layout={activeLayout} />
      <AppRoute path="/Area/crear"  exact   component={CrearArea} props={childProps} layout={activeLayout} />
      <AppRoute path="/Area/modificar/:id"  exact   component={ModificarArea} props={childProps} layout={activeLayout} />
      <AppRoute path="/Area/detalle/:id"  exact   component={DetalleArea} props={childProps} layout={activeLayout} />
      <AppRoute path="/departamento"  exact   component={Departamento} props={childProps} layout={activeLayout} />
      <AppRoute path="/departamento/crear"  exact   component={CrearDepartamento} props={childProps} layout={activeLayout} />
      <AppRoute path="/departamento/modificar/:id"  exact   component={ModificarDepartamento} props={childProps} layout={activeLayout} />
      <AppRoute path="/departamento/detalle/:id"  exact   component={DetalleDepartamento} props={childProps} layout={activeLayout} />
      <AppRoute path="/municipio"  exact   component={Municipio}  props={childProps} layout={activeLayout}/>
      <AppRoute path="/municipio/crear"  exact   component={CrearMunicipio}  props={childProps} layout={activeLayout} />
      <AppRoute path="/municipio/modificar/:id"  exact   component={ModificarMunicipio}  props={childProps} layout={activeLayout} />
      <AppRoute path="/municipio/detalle/:id"  exact   component={DetalleMunicipio}  props={childProps} layout={activeLayout} />
      <AppRoute path="/grupo"  exact   component={Grupo}  props={childProps} layout={activeLayout} />
      <AppRoute path="/grupo/crear"  exact   component={CrearGrupo}  props={childProps} layout={activeLayout} />
      <AppRoute path="/grupo/modificar/:id"  exact   component={ModificarGrupo}  props={childProps} layout={activeLayout} />
      <AppRoute path="/grupo/detalle/:id"  exact   component={DetalleGrupo}  props={childProps} layout={activeLayout} />
      <AppRoute path="/grado"  exact   component={Grado} props={childProps} layout={activeLayout} />
      <AppRoute path="/grado/crear"  exact   component={CrearGrado} props={childProps} layout={activeLayout} />
      <AppRoute path="/grado/modificar/:id"  exact   component={ModificarGrado} props={childProps} layout={activeLayout} />
      <AppRoute path="/grado/detalle/:id"  exact   component={DetalleGrado} props={childProps} layout={activeLayout} />
      <AppRoute path="/jornada"  exact   component={Jornada} props={childProps} layout={activeLayout} />
      <AppRoute path="/jornada/crear"  exact   component={CrearJornada} props={childProps} layout={activeLayout} />
      <AppRoute path="/jornada/modificar/:id"  exact   component={ModificarJornada} props={childProps} layout={activeLayout} />
      <AppRoute path="/jornada/detalle/:id"  exact   component={DetalleJornada} props={childProps} layout={activeLayout} />
      <AppRoute path="/salon"  exact   component={Salon} props={childProps} layout={activeLayout} />
      <AppRoute path="/salon/crear"  exact   component={CrearSalon} props={childProps} layout={activeLayout}/>
      <AppRoute path="/salon/modificar/:id"  exact   component={ModificarSalon} props={childProps} layout={activeLayout} />
      <AppRoute path="/salon/detalle/:id"  exact   component={DetalleSalon} props={childProps} layout={activeLayout} />
      <AppRoute path="/tipodocumento"  exact   component={Tipodocumento }  props={childProps} layout={activeLayout}/>
      <AppRoute path="/tipodocumento/crear"  exact   component={CrearTipodocumento }  props={childProps} layout={activeLayout} />
      <AppRoute path="/tipodocumento/modificar/:id"  exact   component={ModificarTipodocumento }  props={childProps} layout={activeLayout} />
      <AppRoute path="/tipodocumento/detalle/:id"  exact   component={DetalleTipodocumento }  props={childProps} layout={activeLayout} />
      <AppRoute path="/dimension" exact component={Dimension}  props={childProps} layout={activeLayout}/>
      <AppRoute path="/dimension/crear" exact component={CrearDimension}  props={childProps} layout={activeLayout}/>
      <AppRoute path="/dimension/modificar/:iddimension" exact component={ModificarDimension}  props={childProps} layout={activeLayout}/>
      <AppRoute path="/dimension/Detalle/:iddimension" exact component={DetalleDimension}  props={childProps} layout={activeLayout}/>
      <AppRoute path="/planeacion" exact component={Planeacion} props={childProps} layout={activeLayout}/>
      <AppRoute path="/planeacion/crear" exact component={CrearPlaneacion} props={childProps} layout={activeLayout}/>
      <AppRoute path="/planeacion/modificar/:idplaneacion" exact component={ModificarPlaneacion} props={childProps} layout={activeLayout}/>
      <AppRoute path="/planeacion/Detalle/:idplaneacion" exact component={DetallePlaneacion} props={childProps} layout={activeLayout}/>

      <AppRoute path="/planeacion_dimension" exact component={Planeacion_Dimension} props={childProps} layout={activeLayout}/>
      <AppRoute path="/planeacion_dimension/crear" exact component={CrearPlaneacion_Dimension} props={childProps} layout={activeLayout}/>
      <AppRoute path="/planeacion_dimension/modificar/:id_planeacion_dimension" exact component={Modificar} props={childProps} layout={activeLayout}/>
      <AppRoute path="/planeacion_dimension/detalle/:id_planeacion_dimension" exact component={DetallePlaneaciond} props={childProps} layout={activeLayout}/>
      

      <AppRoute path="/anolectivo"  exact   component={Anolectivo } props={childProps} layout={activeLayout}/>
      <AppRoute path="/anolectivo/crear"  exact   component={CrearAnolectivo } props={childProps} layout={activeLayout}/>  
      <AppRoute path="/anolectivo/modificar/:id"  exact   component={ModificarAnolectivo } props={childProps} layout={activeLayout}/>
      <AppRoute path="/anolectivo/Detalle/:id"  exact   component={DetalleAnolectivo } props={childProps} layout={activeLayout}/>
      <AppRoute path="/Materia"  exact   component={Asignatura }  props={childProps} layout={activeLayout} />
      <AppRoute path="/Materia/crear"  exact   component={CrearAsignatura }  props={childProps} layout={activeLayout} />
      <AppRoute path="/Materia/modificar/:id"  exact   component={ModificarAsignatura }  props={childProps} layout={activeLayout} />      
      <AppRoute path="/Materia/detalle/:id"  exact   component={DetalleAsignatura }  props={childProps} layout={activeLayout} />      
      <AppRoute path="/docente_asignatura"  exact   component={Docente_Asignatura } props={childProps} layout={activeLayout} />
      <AppRoute path="/docente_asignatura/crear"  exact   component={CrearDocente_Asignatura } props={childProps} layout={activeLayout} />  
      <AppRoute path="/docente_asignatura/modificar/:id_docente_asignatura"  exact   component={ModificarDocente_Asignatura } props={childProps} layout={activeLayout} />
      <AppRoute path="/D_A_P/crear"  exact   component={D_A_PCrear } props={childProps} layout={activeLayout} />
      <AppRoute path="/D_A_P"  exact   component={Dap} props={childProps} layout={activeLayout} />
      <AppRoute path="/D_A_P/modificar/:id_docente_asignatura_planeacion"  exact   component={ModificarDAP } props={childProps} layout={activeLayout} />
      <AppRoute path="/D_A_P/detalle/:id_docente_asignatura_planeacion"  exact   component={DetalleDAP} props={childProps} layout={activeLayout} />
      <AppRoute path="/AsignarSalon"  exact   component={AsignarSalon } props={childProps} layout={activeLayout} />
      <AppRoute path="/AsignarSalon/crear"  exact   component={CrearAsignarSalon } props={childProps} layout={activeLayout} />  
      <AppRoute path="/AsignarSalon/modificar/:id"  exact   component={ModificarAsignarSalon } props={childProps} layout={activeLayout} />
      <AppRoute path="/AsignarSalon/pdf/:id"  exact   component={pdf} props={childProps} layout={activeLayout} />
      <AppRoute path="/Programacion"  exact   component={Programacion } props={childProps} layout={activeLayout} />
      <AppRoute path="/Programacion/crear"  exact   component={CrearProgramacion } props={childProps} layout={activeLayout} />  
      <AppRoute path="/Programacion/modificar/:id_programacion"  exact   component={ModificarProgramacion } props={childProps} layout={activeLayout} />
      <AppRoute path="/Programacion/detalle/:id_programacion"  exact   component={DetalleProgramacion } props={childProps} layout={activeLayout} />

       <AppRoute path="/login/Registrar"  exact   component={Registrar} props={childProps} layout={activeLayout} />
       <AppRoute path="/login/Registrar1"  exact   component={Registrar1} props={childProps} layout={activeLayout} />
      <AppRoute path="/login/index" exact component={index} props={childProps} layout={NoLayout} />
      <AppRoute path="/login/Recuperar" exact component={Recuperar} props={childProps} layout={NoLayout} />
      <AppRoute path="/login/User" exact component={User} props={childProps} layout={activeLayout} />
      <AppRoute path="/login/cambio/password/reset" exact component={Cambiar} props={childProps} layout={NoLayout} />
      <AppRoute path="/login/cerrar" exact component={Cerrar} props={childProps} layout={activeLayout} />


      <AppRoute path="/dashboards/crypto" exact component={AsyncCryptoDashboard} props={childProps} layout={activeLayout} />
      <AppRoute path="/dashboards/project" exact component={AsyncProjectDashboard} props={childProps} layout={activeLayout} />
      <AppRoute path="/theming" exact component={AsyncTheming} props={childProps} layout={activeLayout} />
      <AppRoute path="/apps/email" exact component={AsyncEmailApp} props={childProps} layout={activeLayout} />
      <AppRoute path="/apps/todo" exact component={AsyncTodoApp} props={childProps} layout={activeLayout} />
      <AppRoute path="/apps/maps" exact component={AsyncMapsApp} props={childProps} layout={activeLayout} />
      <AppRoute path="/apps/notes" exact component={AsyncNotesApp} props={childProps} layout={activeLayout} />
      <AppRoute path="/apps/contacts" exact component={AsyncContactsApp} props={childProps} layout={activeLayout} />
      <AppRoute path="/apps/chat" exact component={AsyncChatApp} props={childProps} layout={activeLayout} />
      <AppRoute path="/apps/calendar" exact component={AsyncCalendarApp} props={childProps} layout={activeLayout} />
      <AppRoute path="/elements/autocomplete" exact component={AsyncAutocompleteExample} props={childProps} layout={activeLayout} />
      <AppRoute path="/elements/selection-controls" exact component={AsyncSelectionControlsExample} props={childProps} layout={activeLayout} />
      <AppRoute path="/elements/picker" exact component={AsyncPickerExample} props={childProps} layout={activeLayout} />
      <AppRoute path="/elements/selects" exact component={AsyncSelectExample} props={childProps} layout={activeLayout} />
      <AppRoute path="/elements/text-fields" exact component={AsyncTextFieldExample} props={childProps} layout={activeLayout} />
      <AppRoute path="/elements/app-bar" exact component={AsyncAppBarExample} props={childProps} layout={activeLayout} />
      <AppRoute path="/elements/menu" exact component={AsyncMenuExample} props={childProps} layout={activeLayout} />
      <AppRoute path="/elements/list" exact component={AsyncListExample} props={childProps} layout={activeLayout} />
      <AppRoute path="/elements/cards" exact component={AsyncCardExample} props={childProps} layout={activeLayout} />
      <AppRoute path="/elements/paper" exact component={AsyncPaperExample} props={childProps} layout={activeLayout} />
      <AppRoute path="/elements/avatars" exact component={AsyncAvatarExample} props={childProps} layout={activeLayout} />
      <AppRoute path="/elements/steppers" exact component={AsyncSteppersExample} props={childProps} layout={activeLayout} />
      <AppRoute path="/elements/buttons" exact component={AsyncButtonExample} props={childProps} layout={activeLayout} />
      <AppRoute path="/elements/progress" exact component={AsyncProgressExample} props={childProps} layout={activeLayout} />
      <AppRoute path="/login" exact component={AsyncLogin} props={childProps} layout={NoLayout} />
      <AppRoute path="/register" exact component={AsyncRegister} props={childProps} layout={NoLayout} />
      <AppRoute path="/profile" exact component={AsyncProfile} props={childProps} layout={activeLayout} />
      <AppRoute path="/lock" exact component={AsyncLock} props={childProps} layout={NoLayout} />
      <AppRoute path="/forgot-password" exact component={AsyncForgot} props={childProps} layout={NoLayout} />
      <AppRoute path="/errors/404" exact component={AsyncError404} props={childProps} layout={NoLayout} />
      <AppRoute path="/errors/500" exact component={AsyncError500} props={childProps} layout={NoLayout} />
      <AppRoute path="/pages/typography" exact component={AsyncTypography} props={childProps} layout={activeLayout} />
      <AppRoute path="/pages/colors" exact component={AsyncColors} props={childProps} layout={activeLayout} />
      <AppRoute component={AsyncNotFound} layout={activeLayout} />


            {/* <Route path="/estudiante"  exact   component={Estudiante} props={childProps} layout={activeLayout}/> */}

            

 


          

           

            


           
            
    </Switch>);
};
