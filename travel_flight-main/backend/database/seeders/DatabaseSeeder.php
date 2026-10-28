<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call(CountriesTableSeeder::class);
        $this->call(FlightClassTableSeeder::class);
        $this->call(FlightStatusTableSeeder::class);
        $this->call(SeatsTableSeeder::class);
        $this->call(AirporteTableSeeder::class);
        $this->call(FlightsTableSeeder::class);
        $this->call(AirlinesTableSeeder::class);
        $this->call(MembersTableSeeder::class);
    }
}
