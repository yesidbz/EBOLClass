<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Grado extends Model
{
    public $table = "grado" ;

    public $primaryKey = 'id_grado';

    protected $fillable = ["descripcion","estado"];

    public $timestamps = false;
}