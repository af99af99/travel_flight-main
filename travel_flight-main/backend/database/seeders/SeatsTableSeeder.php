<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SeatsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rows = [];
        $flights = [1, 2, 4, 5]; // Flight IDs
        $classes = [1, 2, 3, 4]; 
        $availability = 1;

        // Define row range as a variable
        $rowRange = range('A', 'G'); 

        foreach ($flights as $flight_id) {
            foreach ($classes as $class) {
                foreach ($rowRange as $row) { 
                    foreach (range(1, 6) as $seat) {
                        $rows[] = [
                            'flight_id' => $flight_id,
                            'seat_number' => $row . $seat,
                            'class' => $class,
                            'availability' => $availability,
                        ];
                    }
                }
            }
        }

        // Insert rows in chunks to handle large datasets
        foreach (array_chunk($rows, 500) as $chunk) {
            DB::table('seats')->insert($chunk);
        }

        // Log the success message
        $this->command->info('Seats table seeded successfully for flights: ' . implode(', ', $flights));
    }
}
/* 
php artisan migrate:refresh --path=database/migrations/2024_11_21_152937_create_seats_table.php
php artisan db:seed --class=SeatsTableSeeder
 */