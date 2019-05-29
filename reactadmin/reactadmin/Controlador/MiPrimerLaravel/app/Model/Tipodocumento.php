<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Tipodocumento extends Model
{
    public $table = "tipodocumento" ;

    public $primaryKey = 'id_tipodocumento';

    protected $fillable = ["nombre","estado"];

    public $timestamps = false;
}