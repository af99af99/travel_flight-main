<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Seats extends Model
{
    use HasFactory;

    protected $fillable = [
        'flight_id',
        'seat_number',
        'class',
        'availability',
    ];
}
