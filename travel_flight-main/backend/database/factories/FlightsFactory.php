<?php

namespace Database\Factories;

use App\Models\Flights;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Flights>
 */
class FlightsFactory extends Factory
{
    protected $model = Flights::class;
    
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'airline_id' => $this->faker->numberBetween(1, 100), 
            'flight_num' => $this->faker->bothify('Dash-###'),
            'departure_airport_code' => $this->faker->regexify('[A-Z]{3}'), 
            'arrival_airport_code' => $this->faker->regexify('[A-Z]{3}'),
            'departure_time' => $this->faker->dateTimeThisYear()->format('Y-m-d H:i:s'),
            'arrival_time' => $this->faker->dateTimeThisYear('+1 week')->format('Y-m-d H:i:s'), 
            'price' => number_format($this->faker->numberBetween(1000, 5000),  2, '.', ''), 
            'status' => $this->faker->randomElement([1, 2, 3])
        ];
    }
}
