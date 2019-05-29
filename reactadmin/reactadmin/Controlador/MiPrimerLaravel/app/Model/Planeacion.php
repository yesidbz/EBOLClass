<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Planeacion extends Model
{ 
    public $table = "planeacion";

    public $primaryKey = 'idplaneacion';

    protected $fillable = ["descri","estado"];

    public $timestamps = false;
}

