<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Docente_asignatura_planeacion extends Model
{
    public $table = "docente_asignatura_planeacion" ;

    protected $primaryKey = 'id_docente_asignatura_planeacion';

    protected $fillable = ["id_docente_asignatura","id_planeacion_dimension","porcentaje","estado"];

    public $timestamps = false;
}