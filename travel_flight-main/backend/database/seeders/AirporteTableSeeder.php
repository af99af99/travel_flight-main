<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AirporteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("airports")->insert([
                [
                    "city" => "Dhaka",
                    "country_id" => "1",
                    "name" => "Hazrat Shahjalal International Airport",
                    "airport_code" => "DAC",
                    "facilites" => "Test",
                ],
                [
                    "city" => "Chittagong",
                    "country_id" => "1",
                    "name" => "Cox's Bazar",
                    "airport_code" => "CGP",
                    "facilites" => "Test",
                ],
                [
                    "city" => "Cox's Bazar",
                    "country_id" => "1",
                    "name" => "Shah Amanat International",
                    "airport_code" => "CXB",
                    "facilites" => "Test",
                ],
                [
                    "city" => "Sylhet",
                    "country_id" => "1",
                    "name" => "Sylhet Civil",
                    "airport_code" => "ZYL",
                    "facilites" => "Test",
                ],
                [
                    "city" => "Saidpur",
                    "country_id" => "1",
                    "name" => "Saidpur",
                    "airport_code" => "SPD",
                    "facilites" => "Test",
                ],
                [
                    "city" => "Rajshahi",
                    "country_id" => "1",
                    "name" => "Rajshahi",
                    "airport_code" => "RJH",
                    "facilites" => "Test",
                ],
                [
                    "city" => "Barisal",
                    "country_id" => "1",
                    "name" => "Barisal Barisal Airport",
                    "airport_code" => "BZL",
                    "facilites" => "Test",
                ],
                [
                    "city" => "Jessore",
                    "country_id" => "1",
                    "name" => "Jessore",
                    "airport_code" => "JSR",
                    "facilites" => "Test",
                ],
                [
                    "city" => "Kalkata",
                    "country_id" => "3",
                    "name" => "Calcutta",
                    "airport_code" => "CCU",
                    "facilites" => "Test",
                ],
                [
                    "city" => "Delhi",
                    "country_id" => "3",
                    "name" => "Indira Gandhi Airport",
                    "airport_code" => "DEL",
                    "facilites" => "Test",
                ],
                [
                    "city" => "Dubai",
                    "country_id" => "7",
                    "name" => "Dubai",
                    "airport_code" => "DXB",
                    "facilites" => "Test",
                ],
                [
                    "name" => "Hartsfield Jackson Atlanta International Airport",
                    "country_id" => "6",
                    "city" => "Atlanta",
                    "airport_code" => "ATL",
                    "facilites" => "Test",
                ],
                [
                    "name" => "Beijing Capital International Airport",
                    "country_id" => "2",
                    "city" => "Beijing",
                    "airport_code" => "PEK",
                    "facilites" => "Test",
                ],
                [
                    "name" => "Tokyo Haneda Airport",
                    "country_id" => "5",
                    "city" => "Tokyo",
                    "airport_code" => "HND",
                    "facilites" => "Test",
                ],
                [
                    "name" => "Dubai International Airport",
                    "country_id" => "7",
                    "city" => "Dubai",
                    "airport_code" => "DIB",
                    "facilites" => "Test",
                ]
        ]);
    }
}
