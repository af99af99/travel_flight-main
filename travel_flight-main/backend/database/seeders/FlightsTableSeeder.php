<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FlightsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("flights")->insert([
            [
                'airline_id' => '1',
                'flight_num' => 'Boying 737',
                'departure_airport_code' => 'CGP',
                'arrival_airport_code' => 'DAC',
                'departure_time' => '2024-12-16 21:34:00',
                'arrival_time' => '2024-12-16 21:34:00',
                'price' => 150.00,
                'status' => '1',
            ],    
        ]);
    }
}
