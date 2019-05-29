<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Docente_Asignatura;


class Docente_AsignaturaSelectController extends Controller
{
   
    public function select_a()
    {
        $docente_asignatura = Docente_Asignatura::all();
        return response()->json([
            "ok"=>true,
            "data"=>$docente_asignatura
            ]);
    }
  
}