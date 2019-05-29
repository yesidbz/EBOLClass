<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Salon;

use Validator, DB, Hash, Mail;

class SalonController extends Controller
{
 
   public function index() {
       
    $salon = Salon :: select("grado_grupo.*")
    ->join("grado","grado_grupo.id_grado","=","grado.id_grado")
    ->get();

    $salon1 = Salon :: select("grado_grupo.*")
    ->join("grupo","grado_grupo.id_grupo","=","grupo.id_grupo")
    ->get();




    return response()->json([
        "ok"=> true,  
        "data"=> $salon,$salon1

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
        'id_grupo' => 'required', 
        'id_grado' => 'required', 
    ]);

    $id_grupo = $request->input('id_grupo');
    $id_grado = $request->input('id_grado');

    $vali = Salon :: where('id_grado','=',$id_grado ,'and', 'id_grupo','=',$id_grupo )
    ->first();
    //->groupBy('id_grado_grupo');
    //->count('id_grado')
    //->count('id_grupo')
    


   
    
var_dump($vali);

 
           
   

           if($validator->fails()){
               return response()->json([
                   'ok'=> false,  
                   'error'=> $validator->messages(),
           
                ]);
               }
        try{

            $vali == 1 ?  "error" :   Salon ::create($input);
  
           
            return response()->json([
                "ok"=> true,  
                "mensaje"=> "se registro con exito"
           
            ]); }
        
        
        catch (\Exception $ex) {
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
        $salon = Salon :: select("grado_grupo.*")
        ->join("grado","grado_grupo.id_grado","=","grado.id_grado")
        ->join("grupo","grado_grupo.id_grupo","=","grupo.id_grupo")
        ->where("grado_grupo.id_grado_grupo",$id)
        ->first();



        return response()->json([
            "ok"=> true,  
            "data"=> $salon
    
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
            'id_grupo' => 'required', 
            'id_grado' => 'required',  
      ]);
  
             if($validator->fails()){
                 return response()->json([
                     'ok'=> false,  
                     'error'=> $validator->messages(),
                 ]);
          }  
  
          try{
            $salon = Salon ::find($id);

            if ($salon == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $salon->update($input);


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
            $salon  = Salon ::find($id);

            if ($salon == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $salon->update([
                'estado'=>$salon->estado==1 ? 0 : 1,
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