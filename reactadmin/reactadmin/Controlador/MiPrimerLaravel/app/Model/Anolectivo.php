<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Anolectivo extends Model
{
    public $table = "anolectivo";

    protected $primaryKey = 'idano';

    protected $fillable = ["anoelectivo","estado"];

    public $timestamps = false;
}
