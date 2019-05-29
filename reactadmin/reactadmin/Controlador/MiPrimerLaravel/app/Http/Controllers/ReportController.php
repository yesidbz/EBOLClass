<?php

namespace App\Http\Controllers;


namespace App\Http\Controllers;

use Illuminate\Http\Request;




class SalonSelectController extends Controller

{
   
public function __construct()
{
    $this->middleware('guest');
}

public function generar(){

    return view('reporte');
}

  
}

?>