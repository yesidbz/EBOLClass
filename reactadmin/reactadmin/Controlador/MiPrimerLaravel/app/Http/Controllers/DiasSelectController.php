<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Dias;


class DiasSelectController extends Controller
{
   
    public function select_d()
    {
        $dias = Dias::where("dias.estado","1")
        ->get();
        return response()->json([
            "ok"=>true,
            "data"=>$dias
            ]);
    }
  
}