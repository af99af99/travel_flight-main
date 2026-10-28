<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AirlinesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("airlines")->insert([
            [
                'name' => 'Bangadesh Biman',
                'country_id' => '1',
                'code' => 'BD434',
            ], 
        ]);
    }
}
