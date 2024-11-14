import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from '../stores/auth'


import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home/home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/Usuarios/Index.vue')
    },    
    {
      path: '/edituser/:codigoUsuario',
      name: 'edituser',
      component: () => import('../views/Usuarios/Edit.vue')
    },
    {
      path: '/communities',
      name: 'communities',
      component: () => import('../views/Comunidad/Index.vue')
    },
    {
      path: '/createcommunity',
      name: 'createcommunity',
      component: () => import('../views/Comunidades/Create.vue')
    },
    {
      path: '/editcommunity/:codigoComunidad',
      name: 'editcommunity',
      component: () => import('../views/Comunidades/Edit.vue')
    },
    {
      path: '/usergraphs',
      name: 'usergraphs',
      component: () => import('../views/Usuarios/Graphic.vue')
    },
    {
      path: '/userreports',
      name: 'userreports',
      component: () => import('../views/Usuarios/Reports.vue')
    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('../views/Curso/Index.vue')
    },
    {
      path: '/academicLevels',
      name: 'academicLevels',
      component: () => import('../views/NivelAcademico/Index.vue')
    },
    {
      path: '/countries',
      name: 'countries',
      component: () => import('../views/Pais/Index.vue')
    },
    {
      path: '/students',
      name: 'students',
      component: () => import('../views/Estudiante/Index.vue')
    },
    {
      path: '/createstudent',
      name: 'createstudent',
      component: () => import('../views/Estudiante/Create.vue')
    },    
    {
      path: '/editstudent/:codigoEstudiante',
      name: 'editstudent',
      component: () => import('../views/Estudiante/Edit.vue')
    },
    {
      path: '/informationstudent/:codigoEstudiante',
      name: 'informationstudent',
      component: () => import('../views/Estudiante/Informacion.vue')
    },
    {
      path: '/exportreportstudents',
      name: 'exportreportstudents',
      component: () => import('../views/Estudiante/Informe.vue')
    },    
    {
      path: '/cantidadEstudiantes',
      name: 'cantidadEstudiantes',
      component: () => import('../views/Estudiante/CantidadEstudiantesPorAnio.vue')
    },    
    {
      path: '/fichaInformativa/:codigoEstudiante',
      name: 'fichaInformativa',
      component: () => import('../views/Estudiante/FichaInformativa.vue')
    },    
    {
      path: '/createFicha',
      name: 'createFicha',
      component: () => import('../views/FichaCalificacion/Create.vue')
    },    
    {
      path: '/informationcard/:codigoFichaCalificacion',
      name: 'informationcard',
      component: () => import('../views/FichaCalificacion/Informacion.vue')
    },
    {
      path: '/exportarFichaEscolar/:codigoFichaCalificacion',
      name: 'exportarFichaEscolar',
      component: () => import('../views/FichaCalificacion/ExportarFichaEstudiante.vue')
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: () => import('../views/Gasto/Index.vue')
    },
    {
      path: '/createexpense',
      name: 'createexpense',
      component: () => import('../views/Gasto/Create.vue')
    },    
    {
      path: '/editexpense/:codigoGasto',
      name: 'editexpense',
      component: () => import('../views/Gasto/Edit.vue')
    },    
    {
      path: '/informationexpense/:codigoGasto',
      name: 'informationexpense',
      component: () => import('../views/Gasto/Informacion.vue')
    },
    {
      path: '/graphicexpense',
      name: 'graphicexpense',
      component: () => import('../views/Gasto/Graphic.vue')
    },
    {
      path: '/purchases',
      name: 'purchases',
      component: () => import('../views/Compra/Index.vue')
    },
    {
      path: '/createpurchase',
      name: 'createpurchase',
      component: () => import('../views/Compra/Create.vue')
    },    
    {
      path: '/editpurchase/:codigoOrdenCompra',
      name: 'editpurchase',
      component: () => import('../views/Compra/Edit.vue')
    },    
    {
      path: '/informationpurchase/:codigoOrdenCompra',
      name: 'informationpurchase',
      component: () => import('../views/Compra/Informacion.vue')
    },    
    {
      path: '/createcard',
      name: 'createcard',
      component: () => import('../views/FichaCalificacion/Create.vue')
    },    
    {
      path: '/editcard/:codigoFichaCalificacion',
      name: 'editcard',
      component: () => import('../views/FichaCalificacion/Edit.vue')
    },    
    {
      path: '/cards',
      name: 'cards',
      component: () => import('../views/FichaCalificacion/Index.vue')
    },    
    {
      path: '/listcards',
      name: 'listcards',
      component: () => import('../views/FichaCalificacion/IndexGraphic.vue')
    }, 
    {
      path: '/graphicacademiclevels',
      name: 'graphicacademiclevels',
      component: () => import('../views/FichaCalificacion/GraphicNivelAcademico.vue')
    },    
    {
      path: '/newblock/:codigoFichaCalificacion',
      name: 'newblock',
      component: () => import('../views/FichaCalificacion/NewBloque.vue')
    },   
    {
      path: '/graphiccard/:codigoFichaCalificacion',
      name: 'graphiccard',
      component: () => import('../views/FichaCalificacion/Graphic.vue')
    },     
    {
      path: '/historial',
      name: 'historial',
      component: () => import('../views/FichaCalificacion/Historial.vue')
    },     
    {
      path: '/detalleHistorial/:codigoFichaCalificacion',
      name: 'detalleHistorial',
      component: () => import('../views/FichaCalificacion/DetalleHistorial.vue')
    },     
    {
      path: '/promediosGenerales',
      name: 'promediosGenerales',
      component: () => import('../views/FichaCalificacion/PromediosGenerales.vue')
    },     
    {
      path: '/graficaPromedioCursos',
      name: 'graficaPromedioCursos',
      component: () => import('../views/FichaCalificacion/GraficaPromedioCursos.vue')
    },     
    {
      path: '/registermenu',
      name: 'registermenu',
      component: () => import('../views/Cards/RegistroCard.vue')
    },    
    {
      path: '/purchasesmenu',
      name: 'purchasesmenu',
      component: () => import('../views/Cards/ComprasCard.vue')
    },    
    {
      path: '/assignmenu',
      name: 'assignmenu',
      component: () => import('../views/Cards/AsignacionCard.vue')
    },    
    {
      path: '/reportmenu',
      name: 'reportmenu',
      component: () => import('../views/Cards/InformesCard.vue')
    },    
    {
      path: '/graphicsmenu',
      name: 'graphicsmenu',
      component: () => import('../views/Cards/ReportesCard.vue')
    },    
    {
      path: '/sponsors',
      name: 'sponsors',
      component: () => import('../views/Patrocinador/Index.vue')
    }, 
    {
      path: '/createsponsor',
      name: 'createsponsor',
      component: () => import('../views/Patrocinador/Create.vue')
    }, 
    {
      path: '/editsponsor/:codigoPatrocinador',
      name: 'editsponsor',
      component: () => import('../views/Patrocinador/Edit.vue')
    }, 
    {
      path: '/informationsponsor/:codigoPatrocinador',
      name: 'informationsponsor',
      component: () => import('../views/Patrocinador/Informacion.vue')
    },     
    {
      path: '/studentssponsors',
      name: 'studentssponsors',
      component: () => import('../views/EstudiantePatrocinador/Index.vue')
    },    
    {
      path: '/studentswithsponsors',
      name: 'studentswithsponsors',
      component: () => import('../views/EstudiantePatrocinador/IndexEstudianteConPatrocinador.vue')
    },    
    {
      path: '/assignsponsor/:codigoEstudiante',
      name: 'assignsponsor',
      component: () => import('../views/EstudiantePatrocinador/NuevoPatrocinador.vue')
    },    
    {
      path: '/informationstudentsponsor/:codigoEstudiante',
      name: 'informationstudentsponsor',
      component: () => import('../views/EstudiantePatrocinador/Informacion.vue')
    },     
    {
      path: '/settingcard',
      name: 'settingcard',
      component: () => import('../views/Cards/MantenimientoCard.vue')
    },     
    {
      path: '/careers',
      name: 'careers',
      component: () => import('../views/Carrera/Index.vue')
    },     
    {
      path: '/establishments',
      name: 'establishments',
      component: () => import('../views/Establecimiento/Index.vue')
    },     
    {
      path: '/suppliers',
      name: 'suppliers',
      component: () => import('../views/Proveedor/Index.vue')
    },
    {
      path: '/exportreportpurchases/',
      name: 'exportreportpurchases',
      component: () => import('../views/Compra/Informe.vue')
    },
    {
      path: '/exportreportcard/',
      name: 'exportreportcard',
      component: () => import('../views/FichaCalificacion/Informe.vue')
    },
    {
      path: '/exportreportsponsor/',
      name: 'exportreportsponsor',
      component: () => import('../views/Patrocinador/Informe.vue')
    },
    {
      path: '/exportreportexpeses/',
      name: 'exportreportexpeses',
      component: () => import('../views/Gasto/Informe.vue')
    },
    {
      path: '/roles',
      name: 'roles',
      component: () => import('../views/Rol/Index.vue')
    },
    {
      path: '/promedio',
      name: 'promedio',
      component: () => import('../views/Promedio/Index.vue')
    },
    {
      path: '/grado',
      name: 'grado',
      component: () => import('../views/Grado/Index.vue')
    },
    {
      path: '/nuevoCiclo',
      name: 'nuevoCiclo',
      component: () => import('../views/NuevoCiclo/IniciarNuevoCiclo.vue')
    },
    
  ]
})

router.beforeEach(async (to) =>{
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()
  if(authRequired && !auth.user){
    auth.returnUrl = to.flullPath
    return '/login'
  }
})

export default router
