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
        // Add foreign keys for flights table
        // Schema::table('flights', function (Blueprint $table) {
        //     $table->foreign('airline_id')->references('id')->on('airlines')->onDelete('cascade');
        //     $table->foreign('departure_airport_code')->references('airport_code')->on('airports')->onDelete('cascade');
        //     $table->foreign('arrival_airport_code')->references('airport_code')->on('airports')->onDelete('cascade');
        // });

        // // Add foreign keys for reservations table
        // Schema::table('reservations', function (Blueprint $table) {
        //     $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        //     $table->foreign('flight_id')->references('id')->on('flights')->onDelete('cascade');
        //     $table->foreign('seat_id')->references('id')->on('seats')->onDelete('cascade');
        // });

        // // Add foreign keys for passengers table
        // Schema::table('passengers', function (Blueprint $table) {
        //     $table->foreign('reservation_id')->references('id')->on('reservations')->onDelete('cascade');
        //     $table->foreign('nationality')->references('id')->on('countries')->onDelete('cascade');
        // });

        // // Add foreign keys for payments table
        // Schema::table('payments', function (Blueprint $table) {
        //     $table->foreign('reservation_id')->references('id')->on('reservations')->onDelete('cascade');
        //     $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        // });

        // // Add foreign keys for seats table
        // Schema::table('seats', function (Blueprint $table) {
        //     $table->foreign('flight_id')->references('id')->on('flights')->onDelete('cascade');
        // });

        // $table->foreign('country_id')->references('id')->on('countries')->onDelete('cascade'); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         // Drop foreign keys for flights table
        // Schema::table('flights', function (Blueprint $table) {
        //     $table->dropForeign(['airline_id']);
        //     $table->dropForeign(['departure_airport_code']);
        //     $table->dropForeign(['arrival_airport_code']);
        // });

        // // Drop foreign keys for reservations table
        // Schema::table('reservations', function (Blueprint $table) {
        //     $table->dropForeign(['user_id']);
        //     $table->dropForeign(['flight_id']);
        //     $table->dropForeign(['seat_id']);
        // });

        // // Drop foreign keys for passengers table
        // Schema::table('passengers', function (Blueprint $table) {
        //     $table->dropForeign(['reservation_id']);
        //     $table->dropForeign(['nationality']);
        // });

        // // Drop foreign keys for payments table
        // Schema::table('payments', function (Blueprint $table) {
        //     $table->dropForeign(['reservation_id']);
        //     $table->dropForeign(['user_id']);
        // });

        // // Drop foreign keys for seats table
        // Schema::table('seats', function (Blueprint $table) {
        //     $table->dropForeign(['flight_id']);
        // });
    }
};
