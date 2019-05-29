import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PinDropIcon from '@material-ui/icons/PinDrop';
import EmailIcon from '@material-ui/icons/Email';
import ExtensionIcon from '@material-ui/icons/Extension';
import MenuIcon from '@material-ui/icons/Menu';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import InfoIcon from '@material-ui/icons/Info';
import BuildIcon from '@material-ui/icons/Build';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import PaletteIcon from '@material-ui/icons/Palette';
import PersonIcon from '@material-ui/icons/Person';
import EventNoteIcon from '@material-ui/icons/EventNote';
import FaceIcon from '@material-ui/icons/Face';
import ChatIcon from '@material-ui/icons/Chat';
import DateRangeIcon from '@material-ui/icons/DateRange';

import themes from './themes';
import routes from './routes';

export const configuredTheme = themes[0].theme;
export const configuredLayout = {
  currentLayout: 'classic',
  notificationsOpen: false
};

const iconStyle = {
  fontSize: 16
};


export const menuItems =
[{
  title: 'AUTENTICACIÓN',
  type: 'header'
  },{
  title: 'Autenticación',
  icon: <HomeIcon style={iconStyle} />,
  children: [{
    title: 'Login',
    href: '/login/index',
    icon: <HomeIcon style={ iconStyle} />
  },{
      title: 'Usuarios',
      href: '/login/User',
      icon: <HomeIcon style={ iconStyle} />
    }
]},{
title: 'USUARIOS',
type: 'header'
},{
  title: 'Estudiante',
  icon: <PersonIcon style={iconStyle} />,
  children: [{
    title: 'Estudiante',
    href: '/estudiante',
    icon: <PersonIcon style={iconStyle} />
  }, {
    title: 'Crear Estudiante',
    href: '/estudiante/crear',
    icon: <PersonIcon style={iconStyle} />
  }
]},{
  title: 'Docente',
  icon: <PersonIcon style={iconStyle} />,
  children: [{
    title: 'Docente',
    href: '/docentes',
    icon: <PersonIcon style={iconStyle} />
  }, {
    title: 'Crear Docente',
    href: '/login/registrar',
    icon: <PersonIcon style={iconStyle} />
  }
]},{
  title: 'Administrador',
  icon: <PersonIcon style={iconStyle} />,
  children: [{
    title: 'Administrador',
    href: '/administrador',
    icon: <PersonIcon style={iconStyle} />
  }, {
    title: 'Crear Administrador',
    href: '/login/registrar1',
    icon: <PersonIcon style={iconStyle} />
  }
]},{
  title: 'Acudiente',
  icon: <PersonIcon style={iconStyle} />,
  children: [{
    title: 'Acudiente',
    href: '/acudiente',
    icon: <PersonIcon style={iconStyle} />
  }, {
    title: 'Crear Acudiente',
    href: '/acudiente/crear',
    icon: <PersonIcon style={iconStyle} />
  }
]},{
  title: 'PROGRAMACIÓN',
  type: 'header'
  },{
    title: 'Programación',
    icon: <EventNoteIcon style={iconStyle} />,
    children: [{
      title: 'Programación',
      href: '/Programacion',
      icon: <EventNoteIcon style={iconStyle} />
    }, {
      title: 'Crear programación',
      href: '/Programacion/crear',
      icon: <EventNoteIcon style={iconStyle} />
    }
  ]},{
    title: 'Grupo',
    icon: <EventNoteIcon style={iconStyle} />,
    children: [{
      title: 'Grupo',
      href: '/grupo',
      icon: <EventNoteIcon style={iconStyle} />
    }, {
      title: 'Crear Grupo',
      href: '/grupo/crear',
      icon: <EventNoteIcon style={iconStyle} />
    }
  ]},{
    title: 'Asignar salón',
    icon: <EventNoteIcon style={iconStyle} />,
    children: [{
      title: 'asignados',
      href: '/AsignarSalon',
      icon: <EventNoteIcon style={iconStyle} />
    }, {
      title: 'Asignar salón',
      href: '/AsignarSalon/crear',
      icon: <EventNoteIcon style={iconStyle} />
    }
  ]},{
    title: 'Grado',
    icon: <EventNoteIcon style={iconStyle} />,
    children: [{
      title: 'Grado',
      href: '/grado',
      icon: <EventNoteIcon style={iconStyle} />
    }, {
      title: 'Crear Grado',
      href: '/grado/crear',
      icon: <EventNoteIcon style={iconStyle} />
    }
  ]},{
    title: 'Salón',
    icon: <EventNoteIcon style={iconStyle} />,
    children: [{
      title: 'Salón',
      href: '/salon',
      icon: <EventNoteIcon style={iconStyle} />
    }, {
      title: 'Crear Salón',
      href: '/salon/crear',
      icon: <EventNoteIcon style={iconStyle} />
    }
  ]},{
    title: 'Jornada',
    icon: <EventNoteIcon style={iconStyle} />,
    children: [{
      title: 'Jornada',
      href: '/Jornada',
      icon: <EventNoteIcon style={iconStyle} />
    }, {
      title: 'Crear Jornada',
      href: '/Jornada/crear',
      icon: <EventNoteIcon style={iconStyle} />
    }
  ]},{
    title: 'Año lectivo',
    icon: <EventNoteIcon style={iconStyle} />,
    children: [{
      title: 'Año lectivo',
      href: '/anolectivo',
      icon: <EventNoteIcon style={iconStyle} />
    }, {
      title: 'Crear Año lectivo',
      href: '/anolectivo/crear',
      icon: <EventNoteIcon style={iconStyle} />
    }
  ]},{
  title: 'ÁREA',
  type: 'header'
  },{
    title: 'Área',
    icon: <ExtensionIcon style={iconStyle} />,
    children: [{
      title: 'Área',
      href: '/area',
      icon: <ExtensionIcon style={iconStyle} />
    }, {
      title: 'Crear Área',
      href: '/area/crear',
      icon: <ExtensionIcon style={iconStyle} />
    }
  ]
  },{
    title: 'ASIGNATURA  ',
    type: 'header'
    },{
      title: 'Asignatura',
      icon: <ExtensionIcon style={iconStyle} />,
      children: [{
        title: 'Asignatura',
        href: '/Materia',
        icon: <ExtensionIcon style={iconStyle} />
      }, {
        title: 'Crear Asignatura',
        href: '/Materia/crear',
        icon: <ExtensionIcon style={iconStyle} />
      }]},{
        title: 'Delegar Asignaturas',
        icon: <ExtensionIcon style={iconStyle} />,
        children: [{
          title: 'Asignaturas Delegadas',
          href: '/docente_asignatura',
          icon: <ExtensionIcon style={iconStyle} />
        }, {
          title: 'Delegar Asignatura',
          href: '/docente_asignatura/crear',
          icon: <ExtensionIcon style={iconStyle} />
        }]},{
          title: 'D.A.P',
          icon: <ExtensionIcon style={iconStyle} />,
          children: [{
            title: 'D.A.P',
            href: '/D_A_P',
            icon: <ExtensionIcon style={iconStyle} />
          }, {
            title: 'Crear D.A.P ',
            href: '/D_A_P/crear',
            icon: <ExtensionIcon style={iconStyle} />
          }]},{
    title: 'PLANEACIÓN',
    type: 'header'
    },{
      title: 'Dimensión',
      icon: <MenuIcon style={iconStyle} />,
      children: [{
        title: 'Dimensión',
        href: '/dimension',
        icon: <MenuIcon style={iconStyle} />
      }, {
        title: 'Crear Dimensión',
        href: '/dimension/crear',
        icon: <MenuIcon style={iconStyle} />
      }]},{
        title: 'Planeación',
        icon: <MenuIcon style={iconStyle} />,
        children: [{
          title: 'Planeación',
          href: '/planeacion',
          icon: <MenuIcon style={iconStyle} />
        }, {
          title: 'Crear Planeación',
          href: '/planeacion/crear',
          icon: <MenuIcon style={iconStyle} />
        }]},{
          title: 'D.A',
          icon: <MenuIcon style={iconStyle} />,
          children: [{
            title: 'D.A',
            href: '/planeacion_dimension',
            icon: <MenuIcon style={iconStyle} />
          }, {
            title: 'Crear D.A',
            href: '/planeacion_dimension/crear',
            icon: <MenuIcon style={iconStyle} />
          }]},{
    title: 'UBICACIÓN',
    type: 'header'
    },{
      title: 'Departamento',
      icon: <CheckCircleIcon style={iconStyle} />,
      children: [{
        title: 'Departamento',
        href: '/departamento',
        icon: <PinDropIcon style={iconStyle} />
      }, {
        title: 'Crear Departamento',
        href: '/departamento/crear',
        icon: <PinDropIcon style={iconStyle} />
      }]},{
        title: 'Municipio',
        icon: <CheckCircleIcon style={iconStyle} />,
        children: [{
           title: 'Municipio',
            href: '/municipio',
            icon: <PinDropIcon style={iconStyle} />
          }, {
            title: 'Crear Municipio',
            href: '/municipio/crear',
            icon: <PinDropIcon style={iconStyle} />
          }
    ]
    },{
      title: 'DOCUMENTO',
      type: 'header'
      },{
        title: 'Tipo de documento',
        icon: <DateRangeIcon style={iconStyle} />,
        children: [{
          title: 'Tipo de documento',
          href: '/tipodocumento',
          icon: <DateRangeIcon style={iconStyle} />
        }, {
          title: 'Crear Tipo de documento',
          href: '/tipodocumento/crear',
          icon: <DateRangeIcon style={iconStyle} />
        }]},{
          title: 'Cerrar sesion',
          href: '/login/cerrar',
          icon: <PaletteIcon style={iconStyle} />
        }/*{
  title: 'Dashboards',
  icon: <HomeIcon style={iconStyle} />,
  children: [{
    title: 'Analytics',
    href: '/',
    icon: <DashboardIcon style={iconStyle} />
  }, {
    title: 'Ecommerce',
    href: '/dashboards/ecommerce',
    icon: <ShoppingCartIcon style={iconStyle} />
  }, {
    title: 'Crypto',
    href: '/dashboards/crypto',
    icon: <EuroSymbolIcon style={iconStyle} />
  }, {
    title: 'Project',
    href: '/dashboards/project',
    icon: <EventNoteIcon style={iconStyle} />
  }
]
}, {
  title: 'Theming',
  href: '/theming',
  icon: <BuildIcon style={iconStyle} />
}, {
  title: 'APPS',
  type: 'header'
}, {
  title: 'Apps',
  icon: <DesktopWindowsIcon style={iconStyle} />,
  children: [{
    title: 'Email',
    href: '/apps/email',
    icon: <EmailIcon style={iconStyle} />
  }, {
    title: 'Todo',
    href: '/apps/todo',
    icon: <CheckCircleIcon style={iconStyle} />
  }, {
    title: 'Maps',
    href: '/apps/maps',
    icon: <PinDropIcon style={iconStyle} />
  }, {
    title: 'Calendar',
    href: '/apps/calendar',
    icon: <DateRangeIcon style={iconStyle} />
  }, {
    title: 'Notes',
    href: '/apps/notes',
    icon: <EventNoteIcon style={iconStyle} />
  }, {
    title: 'Contacts',
    href: '/apps/contacts',
    icon: <FaceIcon style={iconStyle} />
  }, {
    title: 'Chat',
    href: '/apps/chat',
    icon: <ChatIcon style={iconStyle} />
  }]
}, {
  title: 'USER INTERFACE',
  type: 'header'
}, {
  title: 'Typography',
  href: '/pages/typography',
  icon: <TextFormatIcon style={iconStyle} />
}, {
  title: 'Colors',
  href: '/pages/colors',
  icon: <PaletteIcon style={iconStyle} />
}, {
  title: 'ELEMENTS',
  type: 'header'
}, {
  title: 'Form Controls',
  icon: <ExtensionIcon style={iconStyle} />,
  children: [{
    title: 'Autocomplete',
    href: '/elements/autocomplete'
  }, {
    title: 'Selection Controls',
    href: '/elements/selection-controls'
  }, {
    title: 'Picker',
    href: '/elements/picker'
  }, {
    title: 'Text Fields',
    href: '/elements/text-fields'
  }, {
    title: 'Selects',
    href: '/elements/selects'
  }]
}, {
  title: 'Navigation',
  icon: <MenuIcon style={iconStyle} />,
  children: [{
    title: 'App Bar',
    href: '/elements/app-bar'
  }, {
    title: 'Menu',
    href: '/elements/menu'
  }]
}, {
  title: 'Layout',
  icon: <ViewModuleIcon style={iconStyle} />,
  children: [{
    title: 'List',
    href: '/elements/list'
  }, {
    title: 'Cards',
    href: '/elements/cards'
  }, {
    title: 'Paper',
    href: '/elements/paper'
  }, {
    title: 'Avatars',
    href: '/elements/avatars'
  }, {
    title: 'Steppers',
    href: '/elements/steppers'
  }]
}, {
  title: 'Buttons & Indicators',
  icon: <InfoIcon style={iconStyle} />,
  children: [{
    title: 'Buttons',
    href: '/elements/buttons'
  }, {
    title: 'Progress',
    href: '/elements/progress'
  }]
}, {
  title: 'PAGES',
  type: 'header'
}, {
  title: 'Authentication',
  icon: <PersonIcon style={iconStyle} />,
  children: [{
    title: 'Login',
    href: '/login'
  }, {
    title: 'Register',
    href: '/register'
  }, {
    title: 'Forgot Password',
    href: '/forgot-password'
  }, {
    title: 'Profile',
    href: '/profile'
  }, {
    title: 'Lock Screen',
    href: '/lock'
  }]
}, {
  title: 'Errors',
  icon: <InfoIcon style={iconStyle} />,
  children: [{
    title: '404',
    href: '/errors/404'
  }, {
    title: '500',
    href: '/errors/500'
  }]
}*/];
