<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Seats;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Seats>
 */
class SeatsFactory extends Factory
{
    protected $model = Seats::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'flight_id' => $this->faker->numberBetween(1, 100),
            'seat_number' => $this->faker->unique()->bothify('??###'),
            'class' => $this->faker->randomElement([1, 2, 3]),
            'availability' => $this->faker->randomElement([true, false]),
        ];
    }
}
