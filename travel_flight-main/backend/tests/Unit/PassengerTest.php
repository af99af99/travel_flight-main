<?php

namespace Tests\Unit;

// use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use App\Models\Passenger;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PassengerTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic unit test example.
     */
    public function test_store_passenger(): void
    {
        // Array of mock data for multiple passengers
        $passengerData = [
            [
                'reservation_id' => '1',
                'first_name' => 'Pranta',
                'last_name' => 'Barua',
                'passport_number' => '153321255',
                'nationality' => '1',
            ],
            [
                'reservation_id' => '2',
                'first_name' => 'Rakib',
                'last_name' => 'Barua',
                'passport_number' => '4325342',
                'nationality' => '1',
            ],
        ];

        // Loop through each data set and send a POST request
        foreach ($passengerData as $data) {
            $response = $this->postJson('/api/passengers', $data);

            // Assert response status
            $response->assertStatus(201);

            // Assert database contains the record
            $this->assertDatabaseHas('passengers', $data);
        }
    }

    // Test case for update method (update a passenger)
    public function test_update_passenger()
    {
        $passenger = Passenger::factory()->create();

        $updatedData = [
            'reservation_id' => 2,
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'passport_number' => '987654321',
            'nationality' => 2,
        ];

        $response = $this->putJson("/api/passengers/{$passenger->id}", $updatedData);

        // Assert response status
        $response->assertStatus(200);

        // Assert that the database has the updated passenger data
        $this->assertDatabaseHas('passengers', $updatedData);
    }

     // Test case for show method (show a passenger)
     public function test_show_passenger()
     {
         $passenger = Passenger::factory()->create();
 
         $response = $this->getJson("/api/passengers/{$passenger->id}");
 
         // Assert response status
         $response->assertStatus(200);
 
         // Assert the response contains the passenger data
         $response->assertJson([
             'id' => $passenger->id,
             'reservation_id' => $passenger->reservation_id,
             'first_name' => $passenger->first_name,
             'last_name' => $passenger->last_name,
             'passport_number' => $passenger->passport_number,
             'nationality' => $passenger->nationality,
         ]);
     }

    // Test case for delete method (delete a passenger)
    public function test_delete_passenger()
    {
        $passenger = Passenger::factory()->create();

        $response = $this->deleteJson("/api/passengers/{$passenger->id}");

        // Assert response status
        $response->assertStatus(200);

        // Assert that the passenger no longer exists in the database
        $this->assertDatabaseMissing('passengers', [
            'id' => $passenger->id,
        ]);
    }
}


/* 
php artisan test --filter=PassengerTest
*/