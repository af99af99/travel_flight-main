<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Passenger;
use App\Models\Payments;
use App\Models\Reservations;
use App\Models\Seats;
use App\Models\Countries;

class FrontendRequsetController extends Controller
{
    public function handleFrontendRequest(Request $request) {
        $data = $request->all();

        $reservation = Reservations::create([
            'user_id' => 1,
            'flight_id' => $request->flightID,
            'seat_id' => 1,
            'reservation_date' => $request->departure_date[0],
            'status' => 1,
        ]);

        // Select a random seat with availability = 0 (available)
        $availableSeat = Seats::where('availability', 1)->inRandomOrder()->first();

        if ($availableSeat) {
            // Update the availability of the selected seat
            $availableSeat->update([
                'availability' => 0,  // Mark the seat as booked
            ]);

            // Update the reservation with the selected seat_id
            $reservation->update([
                'seat_id' => $availableSeat->id,
            ]);
        }

        $payments = Payments::create([
            'reservation_id' => $reservation->id,
            'user_id' => 1,
            'amount' => $request->totalPayment,
            'payment_date' => now()->toDateString(),
            'payment_method' => $request->payments['paymentMethod'],
        ]);

        foreach ($request->passengers as $passenger) {
            $country = Countries::where('country_name', $passenger['nationality'] ?? null)->first();

            Passenger::create([
                'reservation_id' => $reservation->id,
                'title' => $passenger['title'] ?? null,
                'first_name' => $passenger['first_name'] ?? null,
                'last_name' => $passenger['last_name'] ?? null,
                'passport_number' => $passenger['passport_number'] ?? null,
                'passport_expiry' => $passenger['passport_expiry'] ?? null,
                'email' => $passenger['email'] ?? null,
                'date_of_birth' => $passenger['date_of_birth'] ?? null,
                'contact' => $passenger['contact'] ?? null,
                'nationality' => $country?->id,
            ]);
        }
   
        return response()->json([
            'message' => 'Data received successfully',
            'data' => $data,
            'selected_seat' => $availableSeat,
            'payment' => $payments,
        ]);
    }
}
