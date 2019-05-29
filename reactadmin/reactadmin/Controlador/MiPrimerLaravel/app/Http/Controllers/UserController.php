<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\User;
use Validator, DB, Hash, Mail;

class UserController extends Controller
{

    public function index(){
        $user = User::select("users.*")
        ->get();

        return response()->json([
            "ok"=>true,
            "data"=>$user,
        ]);
    }


 
    public function show($id)
    {
        $user = User::select("users.*")
        ->where("users.id", $id)
        ->first();

        return response()->json([
            "ok" => true,   
            "data" => $user,
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
            $user = User::find($id);

            if ($user == false) {
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro",
                ]);
            }

            $user->update($input);

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
            $user = User::find($id);

            if ($user == false) {
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro",
                ]);
            }

            $user->update([
                'estado' => $user->estado == 1 ? 0 : 1,
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
