<?php

namespace Database\Factories;

use App\Models\Passenger;
use Illuminate\Database\Eloquent\Factories\Factory;

class PassengerFactory extends Factory
{
    protected $model = Passenger::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'reservation_id' => $this->faker->numberBetween(1, 100),
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            // 'passport_number' => $this->faker->unique()->numberBetween(100000000, 999999999),
            'passport_number' => $this->faker->numerify('##########'),
            'nationality' => $this->faker->numberBetween(1, 10), // Adjust based on your requirements
        ];
    }
}
