<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Grado extends Model
{
    public $table = "grado_grupo" ;

    public $primaryKey = 'id_grado_grupo';

    protected $fillable = ["idgrupo","idgrado"];

    public $timestamps = false;
}