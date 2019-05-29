<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Salon;

use Validator, DB, Hash, Mail;

class SalonDetalleController extends Controller
{
 
   public function show($id) {
       
    $salon = Salon :: select ("grado_grupo.*")
    ->join("grado","grado_grupo.id_grado","=","grado.id_grado")
    ->join("grupo","grado_grupo.id_grupo","=","grupo.id_grupo")
    ->where("grado_grupo.id_grado",$id)
    ->get();

    return response()->json([
        "ok"=> true,  
        "data"=> $salon

    ]); 
   }




  
    }
