    <?php

Route::post('register', 'AuthController@register');

Route::post('recover', 'AuthController@recover');




Route::post('login', 'AuthController@login');

Route::post('reset', 'AuthController@reset');

Route::group(['middleware' => ['jwt.auth']], function() {

    Route::get('logout', 'AuthController@logout');
   
    Route::get('test', function(){
        return response()->json(['foo'=>'bar']);
    });

    route::resource('/Estudiante', 'EstudianteController')->except([
        'create', 'edit'
    ]);


    route::resource('/Grupo', 'GrupoController')->except([
        'create', 'edit'
    ]);

    route::resource('/Grado', 'GradoController')->except([
        'create', 'edit'
    ]);

    route::resource('/Salon', 'SalonController')->except([
        'create', 'edit'
    ]);

    route::resource('/DetalleSalon', 'SalonDetalleController')->except([
        'create', 'edit'
    ]);

    route::resource('/Jornada', 'JornadaController')->except([
        'create', 'edit'
    ]);

    route::resource('/Departamento', 'DepartamentoController')->except([
        'create', 'edit'
        ]);

     route::resource('/Acudiente', 'AcudienteController')->except([
            'create', 'edit'
        ]);

    route::resource('/Municipio', 'MunicipioController')->except([
            'create', 'edit'
            ]);


    route::resource('/Tipodocumento', 'TipodocumentoController')->except([
                'create', 'edit'
                ]);


     route::resource('/Docente', 'DocentesController')->except([
                    'create', 'edit'
                ]);


                route::resource('/User', 'UserController')->except([
                    'create', 'edit'
                ]);


                route::resource('/Administrador', 'administradorController')->except([
                    'create', 'edit'
                ]);
            
        route::resource('/Area', 'AreaController')->except([
                    'create', 'edit'
                ]);
            
        route::resource('/Materia', 'MateriaController')->except([
                    'create', 'edit'
                 ]);

       route::resource('/Planeacion', 'PlaneacionController')->except([
                    'create', 'edit'
                ]);
            
        route::resource('/Dimension', 'DimensionController')->except([
                    'create', 'edit'
                ]);


        route::resource('/Anolectivo', 'AnolectivoController')->except([
                    'create', 'edit'
                ]);
            
        route::resource('/Docente_Asignatura', 'Docente_AsignaturaController')->except([
                    'create', 'edit'
                ]);
            
        route::resource('/AsignarSalon', 'AsignarSalonController')->except([
                    'create', 'edit'
                ]);

        route::resource('/Docente_Asignatura_Planeacion', 'Docente_Asignatura_PlaneacionController')->except([
            'create', 'edit'
        ]);

        route::resource('/Programacion', 'ProgramacionController')->except([
            'create', 'edit'
        ]);

        route::resource('/Planeacion_Dimension', 'Planeacion_dimensionController')->except([
            'create', 'edit'
        ]);

            

    Route::get('/Dimensiones/select', 'DimensionesController@select');
    Route::get('/Parentesco/select_p', 'ParentescoController@select_p');
    Route::get('/SalonSelect/select_grado', 'SalonSelectController@select_grado');
    Route::get('/SalonSelect/select_grupo', 'SalonSelectController@select_grupo');
    Route::get('/MunicipioSelect/select_m', 'MunicipioSelectController@select_m');
    Route::get('/MunicipioSelect/select_d', 'MunicipioSelectController@select_d');
    Route::get('/AcudienteSelect/select_a', 'AcudienteSelectController@select_a');
    Route::get('/TipodocumentoSelect/select_tipo', 'TipodocumentoSelectController@select_tipo');
    Route::get('/Asignatura/select_a', 'AsignaturasController@select_a');
    Route::get('/Asignatura/select_area', 'AsignaturasController@select_area');
    Route::get('/AnolectivoSelect/select_ano', 'AnolectivoSelectController@select_ano');
    Route::get('/DocenteSelect/select_a', 'DocenteSelectController@select_a');
    Route::get('/SalonSelect/select_gg', 'SalonSelectController@select_gg');
    Route::get('/EstudianteSelect/select_e', 'EstudianteSelectController@select_e');
    Route::get('/Asignatura/selectda', 'AsignaturasController@selectda');
    Route::get('/Asignatura/selectpl', 'AsignaturasController@selectpl');
    Route::get('/Anolectivo/select_ano', 'AsignaturasController@select_ano');
    Route::get('/Jornadas/select_jo', 'JornadaSelectController@select_jo');
    Route::get('/AsignarSalonSelect/select_as', 'AsignarSalonSelectController@select_as');
    Route::get('/Hora/select_h', 'HoraSelectController@select_h');
    Route::get('/Dias/select_d', 'DiasSelectController@select_d');
    Route::get('/PlaneacionDimension/select_pd', 'P_DSelectController@select_pd');



        
});


