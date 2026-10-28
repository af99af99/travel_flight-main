<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flights extends Model
{
    use HasFactory;

    protected $fillable = [
        'airline_id',
        'flight_num',
        'departure_airport_code',
        'arrival_airport_code',
        'departure_time',
        'arrival_time',
        'price',
        'status',
    ];
    protected $casts = [
        'departure_time' => 'datetime:Y-m-d H:i:s',
        'arrival_time' => 'datetime:Y-m-d H:i:s',
    ];

    // A flight belongs to an airline
    public function airline()
    {
        return $this->belongsTo(Airlines::class);
    }

    // A flight has many reservations
    public function reservations()
    {
        return $this->hasMany(Reservations::class);
    }

    // A flight belongs to a flight status
    public function flightStatus()
    {
        return $this->belongsTo(FlightStatus::class, 'status', 'id');
    }

    // Custom method to join with Airline
    public static function joinWithAirline()
    {
        return self::join('airlines', 'flights.airline_id', '=', 'airlines.id')
            ->join('flight_statuses', 'flights.status', '=', 'flight_statuses.id') 
            ->select('flights.*', 'airlines.name as airline_name', 'airlines.code as airline_code', 'flight_statuses.status as flight_status')
            ->get();
    }


    public static function getFlightDetails(){
        return self::join('airlines', 'flights.airline_id', '=', 'airlines.id')
        ->join('countries', 'airlines.country_id', '=', 'countries.id')
        ->join('flight_statuses', 'flights.status', '=', 'flight_statuses.id')
        ->join('airports as departure_airport', 'flights.departure_airport_code', '=', 'departure_airport.airport_code')
        ->join('airports as arrival_airport', 'flights.arrival_airport_code', '=', 'arrival_airport.airport_code')
        ->join('countries as departure_country', 'departure_airport.country_id', '=', 'departure_country.id')
        ->join('countries as arrival_country', 'arrival_airport.country_id', '=', 'arrival_country.id')
        ->select(
            'flights.*',
            'countries.short_name as c_short_name',
            'countries.country_name as c_country_name',
            'departure_country.country_name as departure_c_name',
            'arrival_country.country_name as arrival_c_name',
            'airlines.name as airline_name',
            'airlines.code',
            'airlines.code as airline_code',
            'flight_statuses.status as flight_status',
            'departure_airport.city as departure_city',
            'arrival_airport.city as arrival_city'
        )
        ->get();
    }
    public static function getFlightDetailsWithID($id)
{
    return self::join('airlines', 'flights.airline_id', '=', 'airlines.id')
        ->join('countries', 'airlines.country_id', '=', 'countries.id')
        ->join('flight_statuses', 'flights.status', '=', 'flight_statuses.id')
        ->join('airports as departure_airport', 'flights.departure_airport_code', '=', 'departure_airport.airport_code')
        ->join('airports as arrival_airport', 'flights.arrival_airport_code', '=', 'arrival_airport.airport_code')
        ->join('countries as departure_country', 'departure_airport.country_id', '=', 'departure_country.id')
        ->join('countries as arrival_country', 'arrival_airport.country_id', '=', 'arrival_country.id')
        ->select(
            'flights.*',
            'countries.short_name as c_short_name',
            'countries.country_name as c_country_name',
            'departure_country.country_name as departure_c_name',
            'arrival_country.country_name as arrival_c_name',
            'airlines.name as airline_name',
            'airlines.code',
            'airlines.code as airline_code',
            'flight_statuses.status as flight_status',
            'departure_airport.city as departure_city',
            'arrival_airport.city as arrival_city'
        )
        ->where('flights.id', $id)
        ->first();
}

}
