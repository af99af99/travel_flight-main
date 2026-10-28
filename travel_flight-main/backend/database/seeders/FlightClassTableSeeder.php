<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FlightClassTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("flight_classes")->insert([
            ['cl_name' => 'Economy'],
            ['cl_name' => 'Premium Economy'],
            ['cl_name' => 'Business'],
            ['cl_name' => 'First Class'],
        ]);
    }
}
