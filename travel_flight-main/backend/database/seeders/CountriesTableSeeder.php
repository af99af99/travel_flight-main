<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("countries")->insert([
            [
                'country_name' => 'Bangladesh',
                'short_name' => 'BD',
                'phone_code' => '+880',
            ],
            [
                'country_name' => 'China',
                'short_name' => 'CN',
                'phone_code' => '+86',
            ],
            [
                'country_name' => 'India',
                'short_name' => 'IN',
                'phone_code' => '+91',
            ],
            [
                'country_name' => 'Pakistan',
                'short_name' => 'PK',
                'phone_code' => '+92',
            ],
            [
                'country_name' => 'Japan',
                'short_name' => 'JP',
                'phone_code' => '+81',
            ],
            [
                'country_name' => 'South Korea',
                'short_name' => 'KR',
                'phone_code' => '+82',
            ],
            [
                'country_name' => 'Indonesia',
                'short_name' => 'ID',
                'phone_code' => '+62',
            ],
            [
                'country_name' => 'Malaysia',
                'short_name' => 'MY',
                'phone_code' => '+60',
            ],
            [
                'country_name' => 'Singapore',
                'short_name' => 'SG',
                'phone_code' => '+65',
            ],
            [
                'country_name' => 'Thailand',
                'short_name' => 'TH',
                'phone_code' => '+66',
            ],
            [
                'country_name' => 'Vietnam',
                'short_name' => 'VN',
                'phone_code' => '+84',
            ],
            [
                'country_name' => 'Philippines',
                'short_name' => 'PH',
                'phone_code' => '+63',
            ],
            [
                'country_name' => 'Sri Lanka',
                'short_name' => 'LK',
                'phone_code' => '+94',
            ],
            [
                'country_name' => 'Nepal',
                'short_name' => 'NP',
                'phone_code' => '+977',
            ],
            [
                'country_name' => 'Myanmar',
                'short_name' => 'MM',
                'phone_code' => '+95',
            ],
        ]);
    }
}
