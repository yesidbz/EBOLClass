<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Dimension;

class DimensionesController extends Controller
{
    
    public function select()
    {
        $estado = Dimension::where("dimension.estado","1")
        ->get();
        return response()->json([
            "ok"=>true,
            "data"=>$estado
        ]);
    }
}
