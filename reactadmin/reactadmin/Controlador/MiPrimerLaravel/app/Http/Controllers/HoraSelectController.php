<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Hora;


class HoraSelectController extends Controller
{
   
    public function select_h()
    {
        $hora = Hora::where("hora.estado","1")
        ->get();
        return response()->json([
            "ok"=>true,
            "data"=>$hora
            ]);
    }
  
}