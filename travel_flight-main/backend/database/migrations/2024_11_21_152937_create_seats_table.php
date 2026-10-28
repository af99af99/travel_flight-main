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
        Schema::create('seats', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('flight_id');
            $table->string('seat_number', 10);
            $table->tinyInteger('class');
            $table->tinyInteger('availability')->default(1);
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations. php artisan migrate:refresh --path=database/migrations/2024_11_21_152937_create_seats_table.php 
     */
    public function down(): void
    {
        Schema::dropIfExists('seats');
    }
};
