<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Passenger extends Model
{
    use HasFactory; 
    protected $fillable = [
        'reservation_id', 'title', 'first_name', 'last_name', 'passport_number', 'passport_expiry', 'email', 'date_of_birth', 'contact', 'nationality'
    ];
    
    // Define the relationship with Airline
    public function reservation()
    {
        return $this->belongsTo(Reservations::class);
    }

    // Custom method to join with Airline
    public static function getPassengerAllData()
    {
        return self::join('reservations', 'passenger.reservation_id', '=', 'reservations.id')
            ->join('flights', 'reservations.flight_id', '=', 'flights.id')
            ->join('seats', 'reservations.seat_id', '=', 'seats.id')
            ->join('airlines', 'flights.airline_id', '=', 'airlines.id')
            ->join('flight_statuses', 'flights.status', '=', 'flight_statuses.id')
            ->select(
                'passenger.*',
                'reservations.*',
                'flights.*',
                'seats.*',
                'airlines.*',
                'flight_statuses.*'
            )
            ->get();
    }
}
/* 

        'flight_id',
        'seat_id',
        'reservation_date',

        'airline_id',
        'flight_num',
        'departure_airport_code',
        'arrival_airport_code',
        'departure_time',
        'arrival_time',
        'price',
        'status',


*/