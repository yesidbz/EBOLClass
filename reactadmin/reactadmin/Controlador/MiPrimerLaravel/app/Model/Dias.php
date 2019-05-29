<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Dias extends Model
{
    public $table = "dias";

    public $primaryKey = 'id_dia';

    protected $fillable = ["Nombre", "estado"];

    public $timestamps = false;
}
