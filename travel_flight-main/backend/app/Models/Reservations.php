<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reservations extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'flight_id',
        'seat_id',
        'reservation_date',
        'status',
    ];

     // A reservation belongs to a flight
     public function flight()
     {
         return $this->belongsTo(Flights::class);
     }
 
     // A reservation belongs to a seat
     public function seat()
     {
         return $this->belongsTo(Seats::class);
     }
 
     // A reservation has many passengers
     public function passengers()
     {
         return $this->hasMany(Passenger::class);
     }
}
