<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Anolectivo;

use Validator, DB, Hash, Mail;

class AnolectivoController extends Controller
{
 
    public function index() {
       
        $anolectivo = Anolectivo :: select("anolectivo.*")
        ->get();
    
    
        return response()->json([
            "ok"=> true,  
            "data"=> $anolectivo
    
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
        'anoelectivo' => 'required', 
    ]);

           if($validator->fails()){
               return response()->json([
                   'ok'=> false,  
                   'error'=> $validator->messages(),
           
                ]);
               }
               $documento = $request->input('anoelectivo');
               $vali = Anolectivo:: where('anoelectivo','=',$documento )
               ->first();
   
               
   
           try{
   
              
               $vali == 1 ?  "error" :Anolectivo::create($input);
            Anolectivo::create($input);
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
        $anolectivo = Anolectivo :: select("anolectivo.*")
        ->where("anolectivo.idano",$id)
        ->first();
    
    
        return response()->json([
            "ok"=> true,  
            "data"=> $anolectivo
    
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
          'anoelectivo' => 'required', 
          
      ]);
  
             if($validator->fails()){
                 return response()->json([
                     'ok'=> false,  
                     'error'=> $validator->messages(),
                 ]);
          }  
  
          try{
            $anolectivo = Anolectivo::find($id);

            if ($anolectivo == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $anolectivo->update($input);


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
     * @param  int  $ida
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            $anolectivo = Anolectivo ::find($id);

            if ($anolectivo == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $anolectivo->update([
                'estado'=>$anolectivo->estado==1 ? 0 : 1,
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