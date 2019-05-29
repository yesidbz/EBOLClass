<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{
    public $table = "grupo" ;

    public $primaryKey = 'id_grupo';

    protected $fillable = ["descripcion","estado"];

    public $timestamps = false;
}