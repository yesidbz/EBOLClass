<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Acudiente;


class AcudienteSelectController extends Controller
{
   
    public function select_a()
    {



        $acudiente = Acudiente::where("acudiente.estado","1")
        ->get();
        return response()->json([
            "ok"=>true,
            "data"=>$acudiente
            ]);
    }
  
}