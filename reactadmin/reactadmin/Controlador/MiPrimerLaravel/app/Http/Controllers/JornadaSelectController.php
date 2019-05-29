<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Jornada;


class JornadaSelectController extends Controller
{
   
    public function select_jo()
    {
        $jornada = Jornada::where("jornada.estado","1")
        ->get();
        return response()->json([
            "ok"=>true,
            "data"=>$jornada
            ]);
    }
  
}