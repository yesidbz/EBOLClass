<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Programacion  extends Model
{
    public $table = "programacion" ;

    public $primaryKey = 'id_programacion';

    protected $fillable = ["id_docente_asignatura","id_grado_grupo_alumno","hora_i","hora_f","dias_semana","id_jornada","idano","estado"];

    public $timestamps = false;
}