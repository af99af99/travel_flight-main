<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Airlines;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Database\Eloquent\Factories\Factory;

class AirlinesTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic unit test example.
     */
    public function test_store_airlines(): void
    {
        // Array of mock data for multiple airlines
        $datas = [
            [
                'name' => 'Abrod ltd', 
                'country' => '1', 
                'code' => 'BD',
            ],
            [
                'name' => 'Rakub ltd', 
                'country' => '2', 
                'code' => 'BD',
            ],
        ];

        // Loop through each data set and send a POST request
        foreach ($datas as $data) {
            $response = $this->postJson('/api/airlines', $data);

            // Assert response status
            $response->assertStatus(201);

            // Assert database contains the record
            $this->assertDatabaseHas('airlines', $data);
        }
    }

    // Test case for update method (show a airlines)
    public function test_update_airlines()
    {
        $modelData = Airlines::factory()->create();

        $updatedData = [
            'name' => 'Kabbu ltd', 
            'country' => '4', 
            'code' => 'KLB',
        ];

        $response = $this->putJson("/api/airlines/{$modelData->id}", $updatedData);

        // Assert response status
        $response->assertStatus(200);

        // Assert that the database has the updated airlines data
        $this->assertDatabaseHas('airlines', $updatedData);
    }

    // Test case for show method (show a airlines)
    public function test_show_airlines()
    {
        $modelData = Airlines::factory()->create();
 
        $response = $this->getJson("/api/airlines/{$modelData->id}");
 
        // Assert response status
        $response->assertStatus(200);
 
        // Assert the response contains the airlines data
        $response->assertJsonFragment([
            'id' => $modelData->id,
            'name' => $modelData->name,
            'country' => $modelData->country,
            'code' => $modelData->code,
        ]);
    }

    // Test case for delete method (delete a airlines)
    public function test_delete_airlines()
    {
        $modelData = airlines::factory()->create();

        $response = $this->deleteJson("/api/airlines/{$modelData->id}");

        // Assert response status
        $response->assertStatus(200);

        // Assert that the airlines no longer exists in the database
        $this->assertDatabaseMissing('airlines', [
            'id' => $modelData->id,
        ]);
    }
}
