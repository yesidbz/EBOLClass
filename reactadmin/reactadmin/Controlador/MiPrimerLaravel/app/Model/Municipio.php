<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Municipio extends Model
{
    public $table = "municipio" ;

    public $primaryKey = 'id_municipio';

    protected $fillable = ["nombre","id_departamento","estado"];

    public $timestamps = false;
}   