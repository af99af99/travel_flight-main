<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Airports extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'airport_code',
        'name',
        'city',
        'country_id',
        'facilites',
    ];

    // Define the relationship with Airline
    public function countries()
    {
        return $this->belongsTo(Countries::class);
    }

    // Custom method to join with Airline
    public static function joinWithCountry()
    {
        return self::join('countries', 'airports.country_id', '=', 'countries.id')
            ->select(
                'airports.*', 
                'countries.country_name as countries_name', 
            )
            ->get();
    }
}
