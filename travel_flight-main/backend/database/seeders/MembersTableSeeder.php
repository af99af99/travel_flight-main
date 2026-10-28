<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class MembersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        DB::table("members")->insert([
            [
                'email' => 'admin@gmail.com',
                'password' => Hash::make('1234'),
                'role' => 'admin',
            ],
            [
                'email' => 'user@gmail.com',
                'password' => Hash::make('1234'),
                'role' => 'user',
            ],
        ]);
    }
} 
// php artisan db:seed --class=MembersTableSeeder
