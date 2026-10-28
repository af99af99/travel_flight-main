<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Seats;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Database\Eloquent\Factories\Factory;

class SeatsTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic unit test example.
     */
    public function test_store_seats(): void
    {
        // Array of mock data for multiple seats
        $datas = [
            [
                'flight_id' => '1',
                'seat_number' => 'A21',
                'class' => '2',
                'availability' => true,
            ],
            [
                'flight_id' => '3',
                'seat_number' => 'A10',
                'class' => '3',
                'availability' => true,
            ],
        ];

        // Loop through each data set and send a POST request
        foreach ($datas as $data) {
            $response = $this->postJson('/api/seats', $data);

            // Assert response status
            $response->assertStatus(201);

            // Assert database contains the record
            $this->assertDatabaseHas('seats', $data);
        }
    }

    // Test case for update method (show a seats)
    public function test_update_seats()
    {
        $modelData = Seats::factory()->create();

        $updatedData = [
            'flight_id' => '1',
            'seat_number' => 'A24',
            'class' => '2',
            'availability' => true,
        ];

        $response = $this->putJson("/api/seats/{$modelData->id}", $updatedData);

        // Assert response status
        $response->assertStatus(200);

        // Assert that the database has the updated seats data
        $this->assertDatabaseHas('seats', $updatedData);
    }

    // Test case for show method (show a seats)
    public function test_show_seats()
    {
        $modelData = Seats::factory()->create();
 
        $response = $this->getJson("/api/seats/{$modelData->id}");
 
        // Assert response status
        $response->assertStatus(200);
 
        // Assert the response contains the seats data
        $response->assertJsonFragment([
            'id' => $modelData->id,
            'flight_id' => $modelData->flight_id,
            'seat_number' => $modelData->seat_number,
            'class' => $modelData->class,
            'availability' => $modelData->availability,
        ]);
    }

    // Test case for delete method (delete a seats)
    public function test_delete_seats()
    {
        $modelData = Seats::factory()->create();

        $response = $this->deleteJson("/api/seats/{$modelData->id}");

        // Assert response status
        $response->assertStatus(200);

        // Assert that the seats no longer exists in the database
        $this->assertDatabaseMissing('seats', [
            'id' => $modelData->id,
        ]);
    }
}
