<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Docente;
use Validator, DB, Hash, Mail;

class DocentesController extends Controller
{

    public function index(){
        $docentes = Docente::select("docente.*")
        ->get();

        return response()->json([
            "ok"=>true,
            "data"=>$docentes,
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
            'primer_nombre' => 'required',
            'segundo_nombre'=> '',
            'primer_apellido' => 'required',
            'segundo_apellido' => 'required',
            'celular' => 'required',  
            'telefono' => 'required',                       
            'documento_docente' => 'required',                                           
            'direccion' => 'required'                      

            

        ]);

        if($validator->fails()) {
            return response()->json([
                'ok'=> false,
                'error'=> $validator->messages(),
            ]);

            }

            $documento = $request->input('documento_docente');
            $vali = Docente :: where('documento_docente','=',$documento )
            ->first();

            

        try{

           
            $vali == 1 ?  "error" : Docente::create($input); 
        

        return response() -> json ([
            "ok"=> true,
            "mensaje"=>"Se registro con exito"
        ]);

        }catch(\exception $ex){
            return response()->json([
                "ok"=> false,
                "error"=> $ex -> getMessage(),
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
        $docentes = Docente::select("docente.*")
        ->where("docente.iddocente", $id)
        ->first();

        return response()->json([
            "ok" => true,   
            "data" => $docentes,
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
            'primer_nombre' => 'required',
            'segundo_nombre'=> '',
            'primer_apellido' => 'required',
            'segundo_apellido' => 'required',
            'celular' => 'required',  
            'telefono' => 'required',                       
            'documento_docente' => 'required',                       
            'direccion' => 'required',                       

        ]);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => $validator->messages(),
            ]);
        }

        try {
            $docentes = Docente::find($id);

            if ($docentes == false) {
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro",
                ]);
            }

            $docentes->update($input);

            return response()->json([
                "ok" => true,
                "mensaje" => "Se modifico con exito",
            ]);

        } catch (\Exception $ex) {
            return response()->json([
                "ok" => false,
                "error" => $ex->getMessage(),
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
        try {
            $docentes = Docente::find($id);

            if ($docentes == false) {
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro",
                ]);
            }

            $docentes->update([
                'estado' => $docentes->estado == 1 ? 0 : 1,
            ]);

            return response()->json([
                "ok" => true,
                "mensaje" => "Se modifico con exito",
            ]);

        } catch (\Exception $ex) {
            return response()->json([
                "ok" => false,
                "error" => $ex->getMessage(),
            ]);
        }
    }
}
