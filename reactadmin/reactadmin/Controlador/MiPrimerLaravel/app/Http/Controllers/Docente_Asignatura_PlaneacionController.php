<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Docente_asignatura_planeacion;

use Validator, DB, Hash, Mail;

class Docente_Asignatura_PlaneacionController extends Controller
{
 
   public function index() {
       
    $docente_asignatura = Docente_asignatura_planeacion  :: select("docente_asignatura_planeacion.*")
    ->join("docente_asignatura","docente_asignatura_planeacion.id_docente_asignatura","=","docente_asignatura.id_docente_asignatura")
    ->get();
    
    $docente_asignatura1 = Docente_asignatura_planeacion :: select("docente_asignatura_planeacion.*")
    ->join("planeacion_dimension","planeacion_dimension.id_planeacion_dimension","=","docente_asignatura_planeacion.id_planeacion_dimension")
    ->get();







    return response()->json([
        "ok"=> true,  
        "data"=> $docente_asignatura,$docente_asignatura1 

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
        'id_planeacion_dimension' => 'required', 
        'porcentaje' => 'required', 

    ]);

    $id_docente_asignatura = $request->input('id_docente_asignatura');

    $vali = (int) Docente_asignatura_planeacion  :: select('id_docente_asignatura')
    ->where('id_docente_asignatura','=',$id_docente_asignatura)
    ->groupBy('id_docente_asignatura')
    //->havingRaw('SUM(porcentaje) < ?',100)
    ->sum('porcentaje');
    

    


    
   var_dump($vali);




    if ($vali <= 100  ){

           if($validator->fails()){
               return response()->json([
                   'ok'=> false,  
                   'error'=> $validator->messages(),
           
                ]);
               }
        try{
            Docente_asignatura_planeacion::create($input);
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
 
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $docente_asignatura = Docente_asignatura_planeacion  :: select("docente_asignatura_planeacion.*")
        ->join("docente_asignatura","docente_asignatura_planeacion.id_docente_asignatura","=","docente_asignatura.id_docente_asignatura")
        ->join("planeacion_dimension","planeacion_dimension.id_planeacion_dimension","=","docente_asignatura_planeacion.id_planeacion_dimension")
        ->where("docente_asignatura_planeacion.id_docente_asignatura_planeacion", $id)
        ->first();
 

    
    
        return response()->json([
            "ok"=> true,  
            "data"=> $docente_asignatura
    
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
            'id_planeacion_dimension' => 'required', 
            'porcentaje' => 'required', 
    


      ]);
  
             if($validator->fails()){
                 return response()->json([
                     'ok'=> false,  
                     'error'=> $validator->messages(),
                 ]);
          }  
  
          try{
            $docente_asignatura = Docente_asignatura_planeacion::find($id);

            if ($docente_asignatura == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $docente_asignatura->update($input);


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
            $docente_asignatura = Docente_asignatura_planeacion::find($id);

            if ($docente_asignatura == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $docente_asignatura->update([
                'estado'=>$docente_asignatura->estado==1 ? 0 : 1,
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