<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Planeacion;
use Validator, DB, Hash, Mail;

class PlaneacionController extends Controller
{

    public function index(){

        

        $planeacion = Planeacion::select("planeacion.*")
        ->get();

        return response()->json([
            "ok"=>true,
            "data"=>$planeacion
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
            'descri' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json([
                'ok'=> false,
                'error'=> $validator,
            ]);

            }

        try{
            Planeacion::create($input); 

        return response()->json ([
            "ok"=> true,
            "mensaje"=>"Se registro con exito"
        ]);

        }catch(\Exception $ex){
            return response()->json([
                "ok"=> false,
                "error"=> $ex->getMessage(),
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
             
     


        $planeacion = Planeacion::select("planeacion.*")        
        ->where("planeacion.idplaneacion", $id)
        ->first();

        return response()->json([
            "ok" => true,
            "data" => $planeacion,
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
            'descri' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => $validator->messages(),
            ]);
        }

        try {
            $planeacion = Planeacion::find($id);

            if ($planeacion == false) {
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro",
                ]);
            }

            $planeacion->update($input);

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
            $planeacion = Planeacion::find($id);

            if ($planeacion == false) {
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro",
                ]);
            }

            $planeacion->update([
                'estado' => $planeacion->estado == 1 ? 0 : 1,
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
