<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Reservations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

class ReservationsTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic unit test example.
     */
    public function test_store_reservations(): void
    {
        // Array of mock data for multiple reservations
        $datas = [
            [
                'user_id' => '1',
                'flight_id' => '2',
                'seat_id' => '1',
                'reservation_date' => '2024-11-26 12:04:59',
                'status' => '1',
            ],
            [
                'user_id' => '4',
                'flight_id' => '2',
                'seat_id' => '3',
                'reservation_date' => '2024-11-26 12:04:59',
                'status' => '2',
            ],
        ];

        // Loop through each data set and send a POST request
        foreach ($datas as $data) {
            $response = $this->postJson('/api/reservations', $data);

            // Assert response status
            $response->assertStatus(201);

            // Assert database contains the record
            $this->assertDatabaseHas('reservations', $data);
        }
    }

    // Test case for update method (show a reservations)
    public function test_update_reservations()
    {
        $modelData = Reservations::factory()->create();

        $updatedData = [
            'user_id' => '1',
            'flight_id' => '2',
            'seat_id' => '4',
            'reservation_date' => '2024-11-26 12:04:59',
            'status' => '2',
        ];

        $response = $this->putJson("/api/reservations/{$modelData->id}", $updatedData);

        // Assert response status
        $response->assertStatus(200);

        // Assert that the database has the updated reservations data
        $this->assertDatabaseHas('reservations', $updatedData);
    }

    // Test case for show method (show a reservations)
    public function test_show_reservations()
    {
        $modelData = Reservations::factory()->create();
 
        $response = $this->getJson("/api/reservations/{$modelData->id}");
 
        // Assert response status
        $response->assertStatus(200);
 
        // Assert the response contains the reservations data
        $response->assertJsonFragment([
            'id' => $modelData->id,
            'user_id' => $modelData->user_id,
            'flight_id' => $modelData->flight_id,
            'seat_id' => $modelData->seat_id,
            'reservation_date' => Carbon::parse($modelData->reservation_date)->format('Y-m-d H:i:s'),
            'status' => $modelData->status,
        ]);
    }

    // Test case for delete method (delete a reservations)
    public function test_delete_reservations()
    {
        $modelData = Reservations::factory()->create();

        $response = $this->deleteJson("/api/reservations/{$modelData->id}");

        // Assert response status
        $response->assertStatus(200);

        // Assert that the reservations no longer exists in the database
        $this->assertDatabaseMissing('reservations', [
            'id' => $modelData->id,
        ]);
    }
}
