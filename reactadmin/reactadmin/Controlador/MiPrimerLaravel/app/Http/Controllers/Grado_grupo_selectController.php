<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Grado;
use App\Model\Grupo;


class Grado_grupo_selectController extends Controller
{
   
    public function select_grado()
    {
        $grado = Grado::all();
        return response()->json([
            "ok"=>true,
            "data"=>$grado
            ]);
    }

    public function select_grupo()
    {
        $grupo = Grupo::all();
        return response()->json([
            "ok"=>true,
            "data"=>$grupo
            ]);
    }

  
}