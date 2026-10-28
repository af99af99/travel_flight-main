<?php

namespace Database\Factories;

use App\Models\Payments;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payments>
 */
class PaymentsFactory extends Factory
{
    protected $model = Payments::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'reservation_id' => $this->faker->numberBetween(1, 100),
            'user_id' => $this->faker->numberBetween(1, 100),
            'amount' => number_format($this->faker->numberBetween(1000, 5000),  2, '.', ''),
            'payment_date' => $this->faker->dateTimeThisYear()->format('Y-m-d H:i:s'),
            'payment_method'  => $this->faker->randomElement([1, 2, 3]),
        ];
    }
}
