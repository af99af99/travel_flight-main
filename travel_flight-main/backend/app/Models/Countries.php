<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Countries extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'country_name',
        'short_name',
        'phone_code',
    ];
     // Define the inverse relationship with Flights
     public function flights()
     {
         return $this->hasMany(Airlines::class);
     }
     // Define the inverse relationship with Flights
     public function airports()
     {
         return $this->hasMany(Airports::class);
     }
}
