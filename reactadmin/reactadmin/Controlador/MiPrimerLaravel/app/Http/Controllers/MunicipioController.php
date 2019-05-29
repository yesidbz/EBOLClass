<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Municipio;
use Validator, DB, Hash, Mail;

class MunicipioController extends Controller
{
   


    public function index() {
       
        $municipio = Municipio :: select("municipio.*")
        ->join("departamento","municipio.id_departamento","=","departamento.id_departamento")
        ->get();
    
    
        return response()->json([
            "ok"=> true,  
            "data"=> $municipio
    
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

    ]);

           if($validator->fails()){
               return response()->json([
                   'ok'=> false,  
                   'error'=> $validator->messages(),
           
                ]);
               }
        try{
            Municipio::create($input);
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
        $municipio = Municipio :: select("municipio.*")
        ->join("departamento","municipio.id_departamento","=","departamento.id_departamento")
        ->where("municipio.id_municipio",$id)
        ->first();
    
    
        return response()->json([
            "ok"=> true,  
            "data"=> $municipio
    
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
         
          
      ]);
  
             if($validator->fails()){
                 return response()->json([
                     'ok'=> false,  
                     'error'=> $validator->messages(),
                 ]);
          }  
  
          try{
            $municipio = Municipio::find($id);

            if ($municipio == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $municipio->update($input);


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
            $municipio = Municipio ::find($id);

            if ($municipio == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $municipio->update([
                'estado'=>$municipio->estado==1 ? 0 : 1,
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