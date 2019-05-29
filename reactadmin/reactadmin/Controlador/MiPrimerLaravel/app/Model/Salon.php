<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Salon extends Model
{
    public $table = "grado_grupo" ;

    public $primaryKey = 'id_grado_grupo';

    protected $fillable = ["id_grupo","id_grado","estado"];

    public $timestamps = false;
}