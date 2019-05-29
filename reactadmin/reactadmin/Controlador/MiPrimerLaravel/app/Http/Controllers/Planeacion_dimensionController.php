<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Planeacion_dimension;

use Validator, DB, Hash, Mail;

class Planeacion_dimensionController extends Controller
{
 
    public function index() {
       
        $p_d = Planeacion_dimension :: select("planeacion_dimension.*")
        ->join("planeacion","planeacion_dimension.id_planeacion","=","planeacion.idplaneacion")
        ->join("dimension","planeacion_dimension.id_dimension","=","dimension.iddimension")
        ->get();
    
    
        return response()->json([
            "ok"=> true,  
            "data"=> $p_d
    
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
        'id_planeacion' => 'required', 
        'id_dimension' => 'required', 
    ]);

           if($validator->fails()){
               return response()->json([
                   'ok'=> false,  
                   'error'=> $validator->messages(),
           
                ]);
               }
        try{
            Planeacion_dimension::create($input);
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
        $p_d = Planeacion_dimension :: select("planeacion_dimension.*")
        ->join("planeacion","planeacion_dimension.id_planeacion","=","planeacion.idplaneacion")
        ->join("dimension","planeacion_dimension.id_dimension","=","dimension.iddimension")
        ->where("planeacion_dimension.id_planeacion_dimension",$id)
        ->first();
    
    
        return response()->json([
            "ok"=> true,  
            "data"=> $p_d
    
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
            'id_planeacion' => 'required', 
            'id_dimension' => 'required', 
          
      ]);
  
             if($validator->fails()){
                 return response()->json([
                     'ok'=> false,  
                     'error'=> $validator->messages(),
                 ]);
          }  
  
          try{
            $p_d = Planeacion_dimension::find($id);

            if ($p_d == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $p_d->update($input);


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
            $p_d = Planeacion_dimension::find($id);

            if ($p_d == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $p_d->update([
                'estado'=> $p_d->estado==1 ? 0 : 1,
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