<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{ 
    public $table = "docente";

    public $primaryKey = 'iddocente';

    protected $fillable = ["primer_nombre", "segundo_nombre", "primer_apellido", "segundo_apellido", "celular", "telefono", "documento_docente", "direccion", "estado"];

    public $timestamps = false;
}
