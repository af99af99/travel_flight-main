<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('airports', function (Blueprint $table) {
            $table->id();
            $table->string('airport_code', 3)->unique();
            $table->string('name', 100);
            $table->string('city', 50);
            $table->unsignedBigInteger('country_id');
            $table->string('facilites');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('airports');
    }
};

/* 
php artisan migrate:refresh --path=database/migrations/2024_11_21_154319_create_airports_table.php 
php artisan db:seed --class=AirporteTableSeeder
*/
