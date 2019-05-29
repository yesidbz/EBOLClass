<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Planeacion_dimension extends Model
{ 
    public $table = "planeacion_dimension";

    public $primaryKey = 'id_planeacion_dimension';

    protected $fillable = ["id_planeacion","id_dimension","estado"];

    public $timestamps = false;
}

