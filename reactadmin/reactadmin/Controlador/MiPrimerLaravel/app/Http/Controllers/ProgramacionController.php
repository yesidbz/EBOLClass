<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Programacion;

use Validator, DB, Hash, Mail;

class ProgramacionController extends Controller
{
 
   public function index() {
       
    $programacion = Programacion :: select("programacion.*")
    ->join("docente_asignatura","programacion.id_docente_asignatura","=","docente_asignatura.id_docente_asignatura")
    ->get();

    $programacion1 = Programacion :: select("programacion.*")
    ->join("grado_grupo_alumno","programacion.id_grado_grupo_alumno","=","grado_grupo_alumno.id_grado_grupo_alumno")
    ->get();

    $programacion2 = Programacion :: select("programacion.*")
    ->join("jornada","programacion.id_jornada","=","jornada.id_jornada")
    ->get();

    $programacion3 = Programacion :: select("programacion.*")
    ->join("anolectivo","programacion.idano","=","anolectivo.idano")
    ->get();




 

    return response()->json([
        "ok"=> true,  
        "data"=> $programacion, $programacion1, $programacion2, $programacion3

    ]); 
   }




   /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $input = $request->all(); 

      $validator = Validator::make($input, [
        'id_docente_asignatura' => 'required', 
        'id_grado_grupo_alumno' => 'required', 
        'hora_i' => 'required', 
        'hora_f' => 'required', 
        'dias_semana' => 'required', 
        'idano' => 'required', 
        'id_jornada' => 'required',
    
    ]);

           if($validator->fails()){
               return response()->json([
                   'ok'=> false,  
                   'error'=> $validator->messages(),
           
                ]);
               }
        try{
            Programacion::create($input);
            return response()->json([
                "ok"=> true,  
                "mensaje"=> "se registro con exito"

            ]);
        } catch (\Exception $ex) {
            return response()->json([
                "ok"=> false,  
                "error"=> $ex->getMessage()

            ]);
        }
                 
                 
               
    }
 



    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $programacion = Programacion :: select("programacion.*")
        ->join("docente_asignatura","programacion.id_docente_asignatura","=","docente_asignatura.id_docente_asignatura")
        ->join("grado_grupo_alumno","programacion.id_grado_grupo_alumno","=","grado_grupo_alumno.id_grado_grupo_alumno")
        ->join("jornada","programacion.id_jornada","=","jornada.id_jornada")
        ->join("anolectivo","programacion.idano","=","anolectivo.idano")
        ->where("programacion.id_programacion",$id)
        ->first();

    
    
        return response()->json([   
            "ok"=> true,  
            "data"=> $programacion 
    
        ]); 
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    public function update(Request $request, $id)
    {
        $input = $request->all(); 

        $validator = Validator::make($input, [
            'id_docente_asignatura' => 'required', 
            'id_grado_grupo_alumno' => 'required', 
            'hora_i' => 'required', 
            'hora_f' => 'required', 
            'dias_semana' => 'required', 
            'id_jornada' => 'required',
            'idano' => 'required',
      ]);
  
             if($validator->fails()){
                 return response()->json([
                     'ok'=> false,  
                     'error'=> $validator->messages(),
                 ]);
          }  
  
          try{
            $programacion = Programacion::find($id);

            if ($programacion == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $programacion->update($input);


              return response()->json([
                  "ok"=> true,  
                  "mensaje"=> "se modifico con exito"
  
              ]);
          } catch (\Exception $ex) {
              return response()->json([
                  "ok"=> false,  
                  "error"=> $ex->getMessage()
  
              ]);
          }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            $programacion = Programacion::find($id);

            if ($programacion == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $programacion->update([
                'estado'=>$programacion->estado==1 ? 0 : 1,
            ]);


              return response()->json([
                  "ok"=> true,  
                  "mensaje"=> "se modifico con exito"
  
              ]);
          } catch (\Exception $ex) {
              return response()->json([
                  "ok"=> false,  
                  "error"=> $ex->getMessage()
  
              ]);
          }
    }
}