<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Asignatura;
use App\Model\Area;
use App\Model\Docente_Asignatura;
use App\Model\Planeacion;

class AsignaturasController extends Controller
{
    public function selectda(){

        
        $docente_asignatura = Docente_Asignatura::where("docente_asignatura.estado","1")
        ->get();

        return response()->json([
            "ok"=>true,
            "data"=>$docente_asignatura
        ]);

    }

    public function selectpl(){
        $planeacion = Planeacion::where("planeacion.estado","1")
        ->get();

        return response()->json([
            "ok"=>true,
            "data"=>$planeacion
        ]);

    }
    

    public function select_a()
    {
        $asignatura = Asignatura::where("asignatura.estado","1")
        ->get();

        return response()->json([
            "ok"=>true,
            "data"=>$asignatura
        ]);
    }


    public function select_area()
    {
        $area = Area::where("area.estado","1")
        ->get();

        return response()->json([
            "ok"=>true,
            "data"=>$area
        ]);
    }
    
}
