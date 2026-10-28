<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PassengerController;
use App\Http\Controllers\FlightsController;
use App\Http\Controllers\AirlinesController;
use App\Http\Controllers\AirportsController;
use App\Http\Controllers\CountriesController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\ReservationsController;
use App\Http\Controllers\SeatsController;
use App\Http\Controllers\FlightStatusController;
use App\Http\Controllers\FlightClassController;
use App\Http\Controllers\MemberAuthController;
use App\Http\Controllers\FrontendRequsetController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/member/login', [MemberAuthController::class, 'showLoginForm'])->name('member.login');
Route::post('/member/login', [MemberAuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/member/logout', [MemberAuthController::class, 'logout']);

Route::post('/member/frontendrequest', [FrontendRequsetController::class, 'handleFrontendRequest']);


Route::apiResource('/passengers', PassengerController::class);
Route::get('/passengersdata', [PassengerController::class, 'getPassengerFullData']);

Route::apiResource('/flights', FlightsController::class);
Route::get('/flightsindex', [FlightsController::class, 'indexWithJoin']);
Route::get('/flightsdetails', [FlightsController::class, 'getFlightDetails']);
Route::get('/flightsdetails/{id}', [FlightsController::class, 'getFlightDetailsWithID']);

Route::apiResource('/airlines', AirlinesController::class);
Route::get('/airlinesindex', [AirlinesController::class, 'indexWithJoin']);

Route::apiResource('/airports', AirportsController::class);
Route::get('/airportsindex', [AirportsController::class, 'indexWithJoin']);

Route::apiResource('/countries', CountriesController::class);
Route::apiResource('/payments', PaymentsController::class);
Route::apiResource('/reservations', ReservationsController::class);
Route::apiResource('/seats', SeatsController::class);
Route::apiResource('/flight/status', FlightStatusController::class);
Route::apiResource('/flight/class', FlightClassController::class);
