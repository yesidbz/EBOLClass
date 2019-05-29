<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Estudiante;


class EstudianteSelectController extends Controller
{
   
    public function select_e()
    {
        $estudiante = Estudiante::where("estudiante.estado","1")
        ->get();
        return response()->json([
            "ok"=>true,
            "data"=>$estudiante
            ]);
    }
  
}