<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Municipio;
use App\Model\Departamento;


class MunicipioSelectController extends Controller
{
   
    public function select_m()
    {
        

        $municipio = Municipio::where("municipio.estado","1")
        ->get();
        return response()->json([
                "ok"=>true,
                "data"=>$municipio
            ]);
    }

    public function select_d()
    {
        $departamento = Departamento::where("departamento.estado","1")
        ->get();
        return response()->json([
            "ok"=>true,
            "data"=>$departamento
            ]);
    }

  

  
}