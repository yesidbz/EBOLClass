<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Administrador extends Model
{ 
    public $table = "administrador";

    public $primaryKey = 'iddocente';

    protected $fillable = ["name", "segundo_nombre", "primer_apellido", "segundo_apellido", "celular", "telefono", "documento_docente", "direccion", "estado", "foto"];

    public $timestamps = false;
}
