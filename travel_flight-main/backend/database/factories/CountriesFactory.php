<?php

namespace Database\Factories;

use App\Models\Countries;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Countries>
 */
class CountriesFactory extends Factory
{
    protected $model = Countries::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'country_name' => $this->faker->country,
            'short_name' => $this->faker->randomElement(['US', 'DE', 'CA', 'GB', 'IN', 'AU', 'FR', 'IT', 'BR', 'JP']),
            'phone_code' => $this->faker->randomElement(['+1', '+44', '+61', '+91', '+49', '+33', '+81', '+55', '+39', '+86']),
        ];
    }
}
