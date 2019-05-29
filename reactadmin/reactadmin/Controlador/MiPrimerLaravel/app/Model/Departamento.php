<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    public $table = "departamento" ;

    public $primaryKey = 'id_departamento';

    protected $fillable = ["nombre","estado"];

    public $timestamps = false;
}