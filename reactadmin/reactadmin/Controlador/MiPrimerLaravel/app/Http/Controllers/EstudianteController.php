<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Estudiante;

use Validator, DB, Hash, Mail;

class EstudianteController extends Controller
{
 
   public function index() {
       
    $estudiantes = Estudiante :: select("estudiante.*","municipio.nombre as nombre_municipio")
    ->join("municipio","estudiante.id_municipio","=","municipio.id_municipio")
    ->join("acudiente","estudiante.id_acudiente","=","acudiente.id")
    ->join("parentesco","estudiante.id_parentesco","=","parentesco.id_parentesco")
    ->join("tipodocumento","estudiante.id_tipodocumento","=","tipodocumento.id_tipodocumento")
    ->get();


    return response()->json([
        "ok"=> true,  
        "data"=> $estudiantes

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
            $vali = Estudiante :: where('documento','=',$documento )
            ->first();

            

        try{

           
            $vali == 1 ?  "error" : Estudiante::create($input);
            
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
        $estudiantes = Estudiante :: select("estudiante.*","municipio.nombre as nombre_municipio")
        ->join("municipio","estudiante.id_municipio","=","municipio.id_municipio")
        ->join("acudiente","estudiante.id_acudiente","=","acudiente.id")
        ->join("parentesco","estudiante.id_parentesco","=","parentesco.id_parentesco")
        ->join("tipodocumento","estudiante.id_tipodocumento","=","tipodocumento.id_tipodocumento")
        ->where("estudiante.id",$id)
        ->first();
    
    
        return response()->json([
            "ok"=> true,  
            "data"=> $estudiantes
    
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
            $estudiantes = Estudiante::find($id);

            if ($estudiantes == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $estudiantes->update($input);


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
            $estudiantes = Estudiante::find($id);

            if ($estudiantes == false ){

                return response()->json([
                    "ok"=> false,  
                    "error"=> "No se encontro",
    
                ]);
            }

            $estudiantes->update([
                'estado'=>$estudiantes->estado==1 ? 0 : 1,
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