<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Airports;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Database\Eloquent\Factories\Factory;

class AirportsTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic unit test example.
     */
    public function test_store_airports(): void
    {
        // Array of mock data for multiple airports
        $datas = [
            [
                'airport_code' => 'BGT',
                'name' => 'Sahojalal',
                'city' => 'Chittagong',
                'country' => '3',
                'facilites' => 'switable chair',
            ],
            [
                'airport_code' => 'CXB',
                'name' => 'Cox bazar airport',
                'city' => 'Cox bazar',
                'country' => '3',
                'facilites' => 'switable chair',
            ],
        ];

        // Loop through each data set and send a POST request
        foreach ($datas as $data) {
            $response = $this->postJson('/api/airports', $data);

            // Assert response status
            $response->assertStatus(201);

            // Assert database contains the record
            $this->assertDatabaseHas('airports', $data);
        }
    }

    // Test case for update method (show a airports)
    public function test_update_airports()
    {
        $modelData = Airports::factory()->create();

        $updatedData = [
            'airport_code' => 'BCX',
            'name' => 'CtG airport',
            'city' => 'CTg',
            'country' => '3',
            'facilites' => 'switable chair',
        ];

        $response = $this->putJson("/api/airports/{$modelData->id}", $updatedData);

        // Assert response status
        $response->assertStatus(200);

        // Assert that the database has the updated airports data
        $this->assertDatabaseHas('airports', $updatedData);
    }

    // Test case for show method (show a airports)
    public function test_show_airports()
    {
        $modelData = Airports::factory()->create();
 
        $response = $this->getJson("/api/airports/{$modelData->id}");
 
        // Assert response status
        $response->assertStatus(200);
 
        // Assert the response contains the airports data
        $response->assertJsonFragment([
            'id' => $modelData->id,
            'airport_code' =>  $modelData->airport_code,
            'name' =>  $modelData->name,
            'city' =>  $modelData->city,
            'country' =>  $modelData->country,
            'facilites' =>  $modelData->facilites,
        ]);
    }

    // Test case for delete method (delete a airports)
    public function test_delete_airports()
    {
        $modelData = Airports::factory()->create();

        $response = $this->deleteJson("/api/airports/{$modelData->id}");

        // Assert response status
        $response->assertStatus(200);

        // Assert that the airports no longer exists in the database
        $this->assertDatabaseMissing('airports', [
            'id' => $modelData->id,
        ]);
    }
} 
