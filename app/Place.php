<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Place extends Model {
    
    protected $fillable = [
        'name', 'latitude', 'longitude'
    ];

}
