<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FlightStatus extends Model
{
   // Define the inverse relationship with Flights
   public function flights()
   {
       return $this->hasMany(Flight::class);
   }
}
