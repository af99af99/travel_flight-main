<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Payments;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

class PaymentsTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic unit test example.
     */
    public function test_store_payments(): void
    {
        // Array of mock data for multiple payments
        $datas = [
            [
                'reservation_id' => '1',
                'user_id' => '2',
                'amount' => '1342',
                'payment_date' => '2024-11-26 12:04:59',
                'payment_method'  => '3',
            ],
            [
                'reservation_id' => '2',
                'user_id' => '1',
                'amount' => '2421',
                'payment_date' => '2024-11-26 12:04:59',
                'payment_method'  => '1',
            ],
        ];

        // Loop through each data set and send a POST request
        foreach ($datas as $data) {
            $response = $this->postJson('/api/payments', $data);

            // Assert response status
            $response->assertStatus(201);

            // Assert database contains the record
            $this->assertDatabaseHas('payments', $data);
        }
    }

    // Test case for update method (show a payments)
    public function test_update_payments()
    {
        $modelData = Payments::factory()->create();

        $updatedData = [
            'reservation_id' => '1',
            'user_id' => '2',
            'amount' => '1342',
            'payment_date' => '2024-11-26 12:04:59',
            'payment_method'  => '3',
        ];

        $response = $this->putJson("/api/payments/{$modelData->id}", $updatedData);

        // Assert response status
        $response->assertStatus(200);

        // Assert that the database has the updated payments data
        $this->assertDatabaseHas('payments', $updatedData);
    }

    // Test case for show method (show a payments)
    public function test_show_payments()
    {
        $modelData = Payments::factory()->create();
 
        $response = $this->getJson("/api/payments/{$modelData->id}");
 
        // Assert response status
        $response->assertStatus(200);
 
        // Assert the response contains the payments data
        $response->assertJsonFragment([
            'id' => $modelData->id,
            'reservation_id' => $modelData->reservation_id,
            'user_id' => $modelData->user_id,
            'amount' => $modelData->amount,
            'payment_date' => Carbon::parse($modelData->payment_date)->format('Y-m-d H:i:s'),
            'payment_method'  => $modelData->payment_method,
        ]);
    }

    // Test case for delete method (delete a payments)
    public function test_delete_payments()
    {
        $modelData = Payments::factory()->create();

        $response = $this->deleteJson("/api/payments/{$modelData->id}");

        // Assert response status
        $response->assertStatus(200);

        // Assert that the payments no longer exists in the database
        $this->assertDatabaseMissing('payments', [
            'id' => $modelData->id,
        ]);
    }
}
