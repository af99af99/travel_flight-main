<?php

namespace Database\Factories;

use App\Models\Airports;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Airports>
 */
class AirportsFactory extends Factory
{
    protected $model = Airports::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'airport_code' => $this->faker->unique()->lexify('???'),  
            'name' => $this->faker->company,  
            'city' => $this->faker->city,
            'country' => $this->faker->country,
            'facilites' => $this->faker->sentence,
        ];
    }
}
