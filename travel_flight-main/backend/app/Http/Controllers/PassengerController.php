<?php

namespace App\Http\Controllers;

use App\Models\Passenger;
use Illuminate\Http\Request;
use App\Http\Requests\StorePassengerRequest;

class PassengerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Passenger::all();
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
    public function store(StorePassengerRequest $request)
    {
        $data = Passenger::create($request->validated());
        return response()->json($data, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $data = Passenger::findOrFail($id);
        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Passenger $passenger)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorePassengerRequest $request, $id)
    {
        $data = Passenger::findOrFail($id);
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
        $data = Passenger::find($id);

        if (!$data) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $data->delete();

        return response()->json(['message' => 'Item deleted successfully'], 200);
    }

    public function getPassengerFullData(){
        $data = Passenger::getPassengerAllData();
        return response()->json($data);
    }
}
