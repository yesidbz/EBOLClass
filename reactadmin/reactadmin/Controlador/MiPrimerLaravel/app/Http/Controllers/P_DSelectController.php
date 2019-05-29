<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Planeacion_dimension;


class P_DSelectController extends Controller
{
   
    public function select_pd()
    {
        $pd = planeacion_dimension::where("planeacion_dimension.estado","1")
        ->get();
        return response()->json([
            "ok"=>true,
            "data"=>$pd
            ]);
    }
  
}