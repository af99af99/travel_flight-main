<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Reservations;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservations>
 */
class ReservationsFactory extends Factory
{
    protected $model = Reservations::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => $this->faker->numberBetween(1, 100),
            'flight_id' => $this->faker->numberBetween(1, 100),
            'seat_id' => $this->faker->numberBetween(1, 100),
            'reservation_date' => $this->faker->dateTimeThisYear()->format('Y-m-d H:i:s'),
            'status' => $this->faker->randomElement([1, 2, 3]),
        ];
    }
}
