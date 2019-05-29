<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Acudiente;

use Validator, DB, Hash, Mail;

class AcudienteController extends Controller
{
 
   public function index() {
       
    $acudiente = Acudiente :: select("acudiente.*")
    ->join("municipio","acudiente.id_municipio","=","municipio.id_municipio")
    ->join("tipodocumento","acudiente.id_tipodocumento","=","tipodocumento.id_tipodocumento")
    ->get();



 

    return response()->json([
        "ok"=> true,  
        "data"=> $acudiente 

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
        'documento' => 'required', 
        'eps' => 'required', 
        'rh' => 'required', 
        'Lugar_espedicion' => 'required', 
        'fecha_expedicion' => 'required', 
        'Primer_nombre' => 'required', 
        'primer_apellido' => 'required', 
        'segundo_apellido' => 'required', 
        'celular' => 'required',
        'telefono' => 'required', 
        'direccion' => 'required', 
    
    ]);

           if($validator->fails()){
               return response()->json([
                   'ok'=> false,  
                   'error'=> $validator->messages(),
           
                ]);
               }


               $documento = $request->input('documento');
               $vali = Acudiente :: where('documento','=',$documento )
               ->first();
   
               
   
           try{
   
              
               $vali == 1 ?  "error" : Acudiente::create($input);
            
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
        $acudiente = Acudiente :: select("acudiente.*","municipio.nombre as nombre_municipio")
        ->join("municipio","acudiente.id_municipio","=","municipio.id_municipio")
        ->join("tipodocumento","acudiente.id_tipodocumento","=","tipodocumento.id_tipodocumento")
        ->where("acudiente.id",$id)
        ->first();

    
    
        return response()->json([
            "ok"=> true,  
            "data"=> $acudiente 
    
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
          'documento' => 'required', 
          'eps' => 'required', 
          'rh' => 'required', 
          'Lugar_espedicion' => 'required', 
          'fecha_expedicion' => 'required', 
          'Primer_nombre' => 'required', 
          'primer_apellido' => 'required', 
          'segundo_apellido' => 'required', 
          'celular' => 'required',
          'telefono' => 'required', 
          'direccion' => 'required', 

      ]);
  
             if($validator->fails()){
                 return response()->json([
                     'ok'=> false,  
                     'error'=> $validator->messages(),
                 ]);
          }  
  
          try{
            $acudiente = Acudiente::find($id);

            if ($acudiente == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $acudiente->update($input);


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
            $acudiente = Acudiente::find($id);

            if ($acudiente == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $acudiente->update([
                'estado'=>$acudiente->estado==1 ? 0 : 1,
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