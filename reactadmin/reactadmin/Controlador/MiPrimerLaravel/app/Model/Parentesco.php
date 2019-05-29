<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Parentesco extends Model
{
    public $table = "parentesco" ;

    public $primaryKey = 'id_parentesco';

    protected $fillable = ["nombre","estado"];

    public $timestamps = false;
}   