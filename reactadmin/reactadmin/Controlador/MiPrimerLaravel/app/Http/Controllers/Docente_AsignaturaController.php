<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Docente_Asignatura;

use Validator, DB, Hash, Mail;

class Docente_AsignaturaController extends Controller
{
 
   public function index() {
       
    $docente_asignatura = Docente_Asignatura :: select("docente_asignatura.*")
    ->join("asignatura","asignatura.idasignatura","=","docente_asignatura.idasignatura")
    ->get();

    $docente_asignatura1 = Docente_Asignatura :: select("docente_asignatura.*")
    ->join("docente","docente.iddocente","=","docente_asignatura.iddocente")
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
        'iddocente' => 'required', 
        'idasignatura' => 'required', 
    ]);

           if($validator->fails()){
               return response()->json([
                   'ok'=> false,  
                   'error'=> $validator->messages(),
           
                ]);
               }

               $id_docente = $request->input('iddocente');

               $vali = (int)  Docente_Asignatura :: where('iddocente','=',$id_docente)
               ->groupBy('iddocente')
               //->havingRaw('SUM(porcentaje) < ?',100)
               ->sum('estado');
               
               
              var_dump($vali);
           



        try{
            if ( $vali <4  and $vali >= 0 ){
            Docente_Asignatura::create($input);
            
            return response()->json([
                "ok"=> true,  
                "mensaje"=> "se registro con exito"
            
            ]);}
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
        $docente_asignatura = Docente_Asignatura :: select("docente_asignatura.*")
        ->join("asignatura","docente_asignatura.idasignatura","=","asignatura.idasignatura")
        ->join("docente","docente_asignatura.iddocente","=","docente.iddocente")
        ->where("docente_asignatura.id_docente_asignatura", $id)
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
          'iddocente' => 'required', 
          'idasignatura' => 'required', 


      ]);
  
             if($validator->fails()){
                 return response()->json([
                     'ok'=> false,  
                     'error'=> $validator->messages(),
                 ]);
          }  
  
          try{
            $docente_asignatura = Docente_Asignatura::find($id);

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
            $docente_asignatura = Docente_Asignatura::find($id);

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