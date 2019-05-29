<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Planeacion;


class PlaneacionSelectController extends Controller
{
   
    public function select_pl()
    {
        $planeacion = Planeacion::all();
        return response()->json([
            "ok"=>true,
            "data"=>$planeacion
            ]);
    }
  
}