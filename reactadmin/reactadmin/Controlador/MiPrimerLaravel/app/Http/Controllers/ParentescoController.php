<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Parentesco;

class ParentescoController extends Controller
{
   
    public function select_p()
    {
        
        $parentesco = Parentesco::where("parentesco.estado","1")
        ->get();
        return response()->json([
            "ok"=>true,
            "data"=>$parentesco
            ]);
    }

  
}