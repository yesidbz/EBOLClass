<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Jornada;

use Validator, DB, Hash, Mail;

class JornadaController extends Controller
{
 
    public function index() {
       
        $jornada = Jornada :: select("jornada.*")
        ->get();
    
    
        return response()->json([
            "ok"=> true,  
            "data"=> $jornada
    
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
        'nombre' => 'required', 
        'hora_inicio' => 'required', 
        'hora_fin' => 'required', 
    ]);

           if($validator->fails()){
               return response()->json([
                   'ok'=> false,  
                   'error'=> $validator->messages(),
           
                ]);
               }


               $documento = $request->input('nombre');
               $vali = Jornada:: where('nombre','=',$documento )
               ->first();
   
               
   
           try{
   
              
               $vali == 1 ?  "error" : Jornada::create($input);
            
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
        $jornada = Jornada :: select("jornada.*")
        ->where("jornada.id_jornada",$id)
        ->first();
    
    
        return response()->json([
            "ok"=> true,  
            "data"=> $jornada
    
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
            'nombre' => 'required', 
            'hora_inicio' => 'required', 
            'hora_fin' => 'required', 
          
      ]);
  
             if($validator->fails()){
                 return response()->json([
                     'ok'=> false,  
                     'error'=> $validator->messages(),
                 ]);
          }  
  
          try{
            $jornada = Jornada::find($id);

            if ($jornada == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $jornada->update($input);


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
            $jornada = Jornada ::find($id);

            if ($jornada == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $jornada->update([
                'estado'=>$jornada->estado==1 ? 0 : 1,
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