<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Countries;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Database\Eloquent\Factories\Factory;

class CountriesTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic unit test example.
     */
    public function test_store_countries(): void
    {
        // Array of mock data for multiple countries
        $datas = [
            [
                'country_name' => 'Bangladesh',
                'short_name' => 'BD',
                'phone_code' => '+880',
            ],
            [
                'country_name' => 'India',
                'short_name' => 'IN',
                'phone_code' => '+9',
            ],
        ];

        // Loop through each data set and send a POST request
        foreach ($datas as $data) {
            $response = $this->postJson('/api/countries', $data);

            // Assert response status
            $response->assertStatus(201);

            // Assert database contains the record
            $this->assertDatabaseHas('countries', $data);
        }
    }

    // Test case for update method (show a countries)
    public function test_update_countries()
    {
        $modelData = Countries::factory()->create();

        $updatedData = [
            'country_name' => 'Amarican',
            'short_name' => 'USA',
            'phone_code' => '+110',
        ];

        $response = $this->putJson("/api/countries/{$modelData->id}", $updatedData);

        // Assert response status
        $response->assertStatus(200);

        // Assert that the database has the updated countries data
        $this->assertDatabaseHas('countries', $updatedData);
    }

    // Test case for show method (show a countries)
    public function test_show_countries()
    {
        $modelData = Countries::factory()->create();
 
        $response = $this->getJson("/api/countries/{$modelData->id}");
 
        // Assert response status
        $response->assertStatus(200);
 
        // Assert the response contains the countries data
        $response->assertJsonFragment([
            'id' => $modelData->id,
            'country_name' => $modelData->country_name,
            'short_name' => $modelData->short_name,
            'phone_code' => $modelData->phone_code,
        ]);
    }

    // Test case for delete method (delete a countries)
    public function test_delete_countries()
    {
        $modelData = Countries::factory()->create();

        $response = $this->deleteJson("/api/countries/{$modelData->id}");

        // Assert response status
        $response->assertStatus(200);

        // Assert that the countries no longer exists in the database
        $this->assertDatabaseMissing('countries', [
            'id' => $modelData->id,
        ]);
    }
}
