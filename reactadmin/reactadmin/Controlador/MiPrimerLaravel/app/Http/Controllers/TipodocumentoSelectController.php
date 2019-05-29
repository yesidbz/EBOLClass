<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Tipodocumento;


class TipodocumentoSelectController extends Controller
{
   
    public function select_tipo()
    {

        $estado = Tipodocumento::where("tipodocumento.estado","1")
        ->get();
   
        return response()->json([
            "ok"=>true,
            "data"=>$estado
            ]);
        }
    }