<?php

namespace App\Http\Controllers;

use App\Models\Flights;
use Illuminate\Http\Request;
use App\Http\Requests\StoreFlightsRequest;

class FlightsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Flights::all();
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
    public function store(StoreFlightsRequest $request)
    {
        $data = Flights::create($request->validated());
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
    public function edit(Flights $flights)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreFlightsRequest $request, $id)
    {
        $data = Flights::findOrFail($id);
        try {
            $data->update($request->validated());
            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Update failed: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = Flights::find($id);

        if (!$data) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $data->delete();

        return response()->json(['message' => 'Item deleted successfully'], 200);
    }

    public function indexWithJoin() {
        $flights = Flights::joinWithAirline();
        return response()->json($flights);
    }

    public function getFlightDetails() {
        $flights = Flights::getFlightDetails();
        return response()->json($flights);
    }
    public function getFlightDetailsWithID($id) {
        $flights = Flights::getFlightDetailsWithID($id);
        return response()->json($flights);
    }
}
