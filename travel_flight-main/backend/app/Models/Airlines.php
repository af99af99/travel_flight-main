<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Airlines extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'country_id',
        'code',
    ];

    // Define the inverse relationship with Flights
    public function flights()
    {
        return $this->hasMany(Flights::class);
    }

    // Define the relationship with Airline
    public function countries()
    {
        return $this->belongsTo(Countries::class);
    }

    // Custom method to join with Airline
    public static function joinWithAirline()
    {
        return self::join('countries', 'airlines.country_id', '=', 'countries.id')
            ->select(
                'airlines.*', 
                'countries.country_name as countries_name',
            )
            ->get();
    }
}
