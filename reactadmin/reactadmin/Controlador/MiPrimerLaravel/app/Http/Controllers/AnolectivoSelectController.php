<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Anolectivo;


class AnolectivoSelectController extends Controller
{
   
    public function select_ano()
    {
        $anolectivo = Anolectivo::where("anolectivo.estado","1")
        ->get();
        return response()->json([
            "ok"=>true,
            "data"=>$anolectivo
            ]);
    }
  
}