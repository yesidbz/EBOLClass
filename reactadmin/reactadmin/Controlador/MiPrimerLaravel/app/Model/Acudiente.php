<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Acudiente extends Model
{
    public $table = "acudiente" ;

    public $primaryKey = 'id';

    protected $fillable = ["documento","id_tipodocumento","eps","rh","Lugar_espedicion","fecha_expedicion","Primer_nombre","segundo_nombre","primer_apellido","segundo_apellido","celular","telefono","id_municipio","direccion","estado"];

    public $timestamps = false;
}