<?php

namespace App\Http\Controllers;

use App\Models\Airports;
use Illuminate\Http\Request;
use App\Http\Requests\StoreAirportsRequest;

class AirportsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Airports::all();
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
    public function store(StoreAirportsRequest $request)
    {
        $data = Airports::create($request->validated());
        return response()->json($data, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $data = Airports::findOrFail($id);
        try {
            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Store failed: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Airports $airports)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreAirportsRequest $request, $id)
    {
        $data = Airports::findOrFail($id);
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
        $data = Airports::find($id);

        if (!$data) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $data->delete();

        return response()->json(['message' => 'Item deleted successfully'], 200);
    }

    public function indexWithJoin() {
        $airports = Airports::joinWithCountry();
        return response()->json($airports);
    }
}
