<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payments extends Model
{
    use HasFactory;

    protected $fillable = [
        'reservation_id',
        'user_id',
        'amount',
        'payment_date',
        'payment_method',
    ];
}
