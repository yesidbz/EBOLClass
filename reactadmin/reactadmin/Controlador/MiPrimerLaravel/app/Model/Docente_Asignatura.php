<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Docente_Asignatura extends Model
{
    public $table = "docente_asignatura" ;

    protected $primaryKey = 'id_docente_asignatura';

    protected $fillable = ["iddocente","idasignatura","estado"];

    public $timestamps = false;
}