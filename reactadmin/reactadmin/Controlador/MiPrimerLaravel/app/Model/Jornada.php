<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Jornada extends Model
{
    public $table = "jornada" ;

    public $primaryKey = 'id_jornada';

    protected $fillable = ["nombre","hora_inicio","hora_fin","estado"];

    public $timestamps = false;
}

?>