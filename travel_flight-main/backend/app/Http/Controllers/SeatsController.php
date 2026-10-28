<?php

namespace App\Http\Controllers;

use App\Models\Seats;
use Illuminate\Http\Request;
use App\Http\Requests\StoreSeatsRequest;

class SeatsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Seats::all();
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
    public function store(StoreSeatsRequest $request)
    {
        try {
            $data = Seats::create($request->validated());
            return response()->json($data, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Store failed: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $data = Seats::findOrFail($id);
        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Seats $seats)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreSeatsRequest $request, $id)
    {
        $data = Seats::findOrFail($id);
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
        $data = Seats::find($id);

        if (!$data) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $data->delete();

        return response()->json(['message' => 'Item deleted successfully'], 200);
    }
}
