<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Asignatura extends Model
{
    public $table = "asignatura";

    public $primaryKey = 'idasignatura';


    protected $fillable = ["estado", "nombre" ,"id_area"];

    public $timestamps = false;
}
