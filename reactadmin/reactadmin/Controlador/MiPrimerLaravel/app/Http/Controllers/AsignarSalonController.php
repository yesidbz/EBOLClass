<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\AsignarSalon;

use Validator, DB, Hash, Mail;

class AsignarSalonController extends Controller
{
 
   public function index() {
       
    $grado_grupo_alumno = AsignarSalon :: select("grado_grupo_alumno.*")
    ->join("anolectivo","grado_grupo_alumno.idano","=","anolectivo.idano")
    ->get();

    $grado_grupo_alumno1 = AsignarSalon :: select("grado_grupo_alumno.*")
    ->join("grado_grupo","grado_grupo_alumno.id_grado_grupo","=","grado_grupo.id_grado_grupo")
    ->get();

    $grado_grupo_alumno2 = AsignarSalon :: select("grado_grupo_alumno.*")
    ->join("docente","grado_grupo_alumno.iddocente","=","docente.iddocente")
    ->get();

    $grado_grupo_alumno3 = AsignarSalon :: select("grado_grupo_alumno.*")
    ->join("estudiante","grado_grupo_alumno.idestudiante","=","estudiante.id")
    ->get();





    return response()->json([
        "ok"=> true,  
        "data"=> $grado_grupo_alumno,$grado_grupo_alumno1,$grado_grupo_alumno2,$grado_grupo_alumno3

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
        'idano' => 'required', 
        'id_grado_grupo' => 'required', 
        'iddocente' => 'required', 
        'id estudiante' => 'required', 
    ]);

           if($validator->fails()){
               return response()->json([
                   'ok'=> false,  
                   'error'=> $validator->messages(),
           
                ]);
               }
        try{
            AsignarSalon ::create($input);
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
        $grado_grupo_alumno = AsignarSalon :: select("grado_grupo_alumno.*")
        ->join("anolectivo","grado_grupo_alumno.idano","=","anolectivo.idano")
        ->join("grado_grupo","grado_grupo_alumno.id_grado_grupo","=","grado_grupo.id_grado_grupo")
        ->join("docente","grado_grupo_alumno.iddocente","=","docente.iddocente")
        ->join("estudiante","grado_grupo_alumno.idestudiante","=","estudiante.id")
        ->where("grado_grupo_alumno.id_grado_grupo_alumno",$id)
        ->first();



        return response()->json([
            "ok"=> true,  
            "data"=> $grado_grupo_alumno
    
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
            'idano' => 'required', 
            'id_grado_grupo' => 'required', 
            'iddocente' => 'required', 
            'idestudiante' => 'required', 
      ]);
  
             if($validator->fails()){
                 return response()->json([
                     'ok'=> false,  
                     'error'=> $validator->messages(),
                 ]);
          }  
  
          try{
            $grado_grupo_alumno = AsignarSalon ::find($id);

            if ($grado_grupo_alumno == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $grado_grupo_alumno->update($input);


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
            $grado_grupo_alumno  = Salon ::find($id);

            if ($grado_grupo_alumno == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $grado_grupo_alumno->update([
                'estado'=>$grado_grupo_alumno->estado==1 ? 0 : 1,
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