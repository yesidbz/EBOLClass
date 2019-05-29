<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Grado;
use App\Model\Grupo;
use App\Model\Salon;


class SalonSelectController extends Controller
{
   
    public function select_grado()
    {
        
        $grado = Grado::where("grado.estado","1")
        ->get();
        return response()->json([
            "ok"=>true,
            "data"=>$grado
            ]);
    }

    public function select_grupo()
    {
        
        $grupo = Grupo::where("grupo.estado","1")
        ->get();
        return response()->json([
            "ok"=>true,
            "data"=>$grupo
            ]);
    }


    public function select_gg()
    {
        
        $grado_grupo = Salon::where("grado_grupo.estado","1")
        ->get();
        return response()->json([
            "ok"=>true,
            "data"=>$grado_grupo
            ]);
    }

  
}