<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Grado_grupo;

use Validator, DB, Hash, Mail;

class Grado_grupoController extends Controller
{
 
   public function index() {
       
    $grado_grupo = Grado_grupo :: select("gradogrupo.*","grado.descripcion as nombre_grado")
    ->join("grado","grado_grupo.idgrado","=","grado.idgrado")
    ->get();

    $grado_grupo = Grado_grupo :: select("gradogrupo.*","grupo.descripcion as nombre_grupo")
    ->join("grupo","grado_grupo.idgrupo","=","grupo.idgrupo")
    ->get();

    return response()->json([
        "ok"=> true,  
        "data"=> $grado_grupo

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
        'idgrupo' => 'required', 
        'idgrado' => 'required', 
    ]);

           if($validator->fails()){
               return response()->json([
                   'ok'=> false,  
                   'error'=> $validator->messages(),
           
                ]);
               }
        try{
            Grado_grupo::create($input);
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
        $grado_grupo = Grado_grupo :: select("gradogrupo.*","grado.descripcion as nombre_grado")
        ->join("grado","grado_grupo.idgrado","=","grado.idgrado")
        ->where("grado_grupo.id_grado_grupo",$id)
        ->first();
    
        $grado_grupo = Grado_grupo :: select("gradogrupo.*","grupo.descripcion as nombre_grupo")
        ->join("grupo","grado_grupo.idgrupo","=","grupo.idgrupo")
        ->where("grado_grupo.id_grado_grupo",$id)
        ->first();
    
        return response()->json([
            "ok"=> true,  
            "data"=> $grado_grupo
    
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
            'idgrupo' => 'required', 
            'idgrado' => 'required',  
      ]);
  
             if($validator->fails()){
                 return response()->json([
                     'ok'=> false,  
                     'error'=> $validator->messages(),
                 ]);
          }  
  
          try{
            $grado_grupo = Grado_grupo::find($id);

            if ($grado_grupo == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $grado_grupo->update($input);


              return response()->json([
                  "ok"=> true,  
                  "mensaje"=> "se mofifico con exito"
  
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
            $grado_grupo = Grado_grupo ::find($id);

            if ($grado_grupo == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $grado_grupo->update([
                'estado'=>$grado_grupo->estado==1 ? 0 : 1,
            ]);


              return response()->json([
                  "ok"=> true,  
                  "mensaje"=> "se mofifico con exito"
  
              ]);
          } catch (\Exception $ex) {
              return response()->json([
                  "ok"=> false,  
                  "error"=> $ex->getMessage()
  
              ]);
          }
    }
}