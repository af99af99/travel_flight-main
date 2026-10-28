<?php

namespace App\Http\Controllers;

use App\Models\FlightStatus;
use Illuminate\Http\Request;

class FlightStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return FlightStatus::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = FlightStatus::create($request->validated());
        return response()->json($data, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $data = Flights::findOrFail($id);
        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FlightStatus $flightStatus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FlightStatus $flightStatus)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FlightStatus $flightStatus)
    {
        //
    }
}
