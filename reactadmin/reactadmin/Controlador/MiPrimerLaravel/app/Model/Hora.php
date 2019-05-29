<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Hora extends Model
{
    public $table = "hora";

    public $primaryKey = 'id_hora';

    protected $fillable = ["Hora", "Descripcion"];

    public $timestamps = false;
}
