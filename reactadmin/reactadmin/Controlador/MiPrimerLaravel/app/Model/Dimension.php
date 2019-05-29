<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Dimension extends Model
{ 
    public $table = "dimension";

    protected $primaryKey = 'iddimension';

    protected $fillable = ["porcentaje","estado"];

    public $timestamps = false;
}
