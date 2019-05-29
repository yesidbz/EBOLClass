<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Docente;


class DocenteSelectController extends Controller
{
   
    public function select_a()
    {
        $docente = Docente::where("docente.estado","1")
        ->get();
        return response()->json([
            "ok"=>true,
            "data"=>$docente
            ]);
    }
  
}