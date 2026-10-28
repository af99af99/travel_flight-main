<?php

namespace Database\Factories;

use App\Models\Airlines;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Airlines>
 */
class AirlinesFactory extends Factory
{
    protected $model = Airlines::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company, 
            'country' => $this->faker->country, 
            'code' => $this->faker->unique()->bothify('??????'),
        ];
    }
}
