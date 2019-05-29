<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Area  extends Model
{
    public $table = "area" ;

    public $primaryKey = 'id_area';

    protected $fillable = ["nombre","estado"];

    public $timestamps = false;
}