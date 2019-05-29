<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class AsignarSalon extends Model
{
    public $table = "grado_grupo_alumno" ;

    public $primaryKey = 'id_grado_grupo_alumno';

    protected $fillable = ["id_grupo_grupo","idano","id_grado_grupo","iddocente","idestudiante","estado"];

    public $timestamps = false;
}