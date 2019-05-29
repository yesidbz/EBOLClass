<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\AsignarSalon;


class AsignarSalonSelectController extends Controller
{
   

    public function select_as()
    {
        $asignarsalon = AsignarSalon::where("grado_grupo_alumno.estado","1")
        ->get();
        return response()->json([
            "ok"=>true,
            "data"=>$asignarsalon
            ]);
    }

  
}