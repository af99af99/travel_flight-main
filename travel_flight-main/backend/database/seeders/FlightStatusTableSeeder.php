<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FlightStatusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("flight_statuses")->insert([
            ['status' => 'Scheduled'],
            ['status' => 'Delayed'],
            ['status' => 'Canceled'],
            ['status' => 'Completed'],
        ]);
    }
}
