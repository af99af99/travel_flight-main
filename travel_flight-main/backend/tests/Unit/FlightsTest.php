<?php

namespace Tests\Unit;

// use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use App\Models\Flights;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class FlightsTest extends TestCase
{
    use RefreshDatabase;

    protected $formetTime;
    protected function setUp(): void
    {
        parent::setUp();
        $this->formetTime = Carbon::now()->format('Y-m-d H:i:s');
    }
    /**
     * A basic unit test example.
     */
    public function test_store_flights(): void
    {
        // Array of mock data for multiple flights
        $flightData = [
            [
                'airline_id' => '1', 
                'flight_num' => 'Dash-124', 
                'departure_airport_code' => 'CXA', 
                'arrival_airport_code' => 'CTA', 
                'departure_time' => '2024-11-26 12:04:59', 
                'arrival_time' => '2024-11-26 12:04:59', 
                'price' => '2564', 
                'status' => '2'
            ],
            [
                'airline_id' => '3', 
                'flight_num' => 'Dash-423', 
                'departure_airport_code' => 'CTA', 
                'arrival_airport_code' => 'CXA', 
                'departure_time' => '2024-11-26 12:04:59', 
                'arrival_time' => '2024-11-22 12:04:59', 
                'price' => '5234', 
                'status' => '1'
            ],
        ];

        // Loop through each data set and send a POST request
        foreach ($flightData as $data) {
            $response = $this->postJson('/api/flights', $data);

            // Assert response status
            $response->assertStatus(201);

            // Assert database contains the record
            $this->assertDatabaseHas('flights', $data);
        }
    }

    // Test case for update method (update a flights)
    public function test_update_flights()
    {
        $flight = Flights::factory()->create();

        $updatedData = [
            'airline_id' => '2', 
            'flight_num' => 'Dash-434', 
            'departure_airport_code' => 'sdf', 
            'arrival_airport_code' => 'ewr', 
            'departure_time' => $this->formetTime, 
            'arrival_time' => $this->formetTime, 
            'price' => '5421', 
            'status' => '2'
        ];

        $response = $this->putJson("/api/flights/{$flight->id}", $updatedData);

        // Assert response status
        $response->assertStatus(200);

        // Assert that the database has the updated flights data
        $this->assertDatabaseHas('flights', $updatedData);
    }

     // Test case for show method (show a flights)
     public function test_show_flights()
     {
        $flight = Flights::factory()->create();
 
        $response = $this->getJson("/api/flights/{$flight->id}");
 
        // Assert response status
        $response->assertStatus(200);
 
        // Assert the response contains the flights data
        $response->assertJsonFragment([
            'id' => $flight->id,
            'airline_id' => $flight->airline_id,
            'flight_num' => $flight->flight_num,
            'departure_airport_code' => $flight->departure_airport_code,
            'arrival_airport_code' => $flight->arrival_airport_code,
            'departure_time' => Carbon::parse($flight->departure_time)->format('Y-m-d H:i:s'),
            'arrival_time' => Carbon::parse($flight->arrival_time)->format('Y-m-d H:i:s'),
            'price' => $flight->price,
            'status' => $flight->status,
        ]);
     }

    // Test case for delete method (delete a flights)
    public function test_delete_flights()
    {
        $flight = Flights::factory()->create();

        $response = $this->deleteJson("/api/flights/{$flight->id}");

        // Assert response status
        $response->assertStatus(200);

        // Assert that the flights no longer exists in the database
        $this->assertDatabaseMissing('flights', [
            'id' => $flight->id,
        ]);
    }
}
/* 
php artisan make:factory FlightsFactory --model=Flights

*/