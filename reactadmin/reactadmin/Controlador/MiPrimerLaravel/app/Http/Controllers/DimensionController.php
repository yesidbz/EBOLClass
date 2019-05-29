<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Dimension;
use Validator, DB, Hash, Mail;

class DimensionController extends Controller
{
    
    

    
    public function index(){
        $dimension = Dimension::select("dimension.*")

        ->get();

        return response()->json([
            "ok"=>true,
            "data"=>$dimension,
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
            'porcentaje' => 'required'

        ]);

        if($validator->fails()) {
            return response()->json([
                'ok'=> false,
                'error'=> $validator->messages(),
            ]);

            }

        try{
            Dimension::create($input); 

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
        $dimension = Dimension::select("dimension.*")
        ->where("dimension.iddimension", $id)
        ->first();

        return response()->json([
            "ok" => true,
            "data" => $dimension,
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

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => $validator->messages(),
            ]);
        }

        try {
            $dimension = Dimension::find($id);

            if ($dimension == false) {
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro",
                ]);
            }

            $dimension->update($input);

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
            $dimension = Dimension::find($id);

            if ($dimension == false) {
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro",
                ]);
            }

            $dimension->update([
                'estado' => $dimension->estado == 1 ? 0 : 1,
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
