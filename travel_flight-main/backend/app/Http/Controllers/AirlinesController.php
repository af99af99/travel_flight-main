<?php

namespace App\Http\Controllers;

use App\Models\Airlines;
use Illuminate\Http\Request;
use App\Http\Requests\StoreAirlinesRequest;

class AirlinesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Airlines::all();
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
    public function store(StoreAirlinesRequest $request)
    {
        $data = Airlines::create($request->validated());
        return response()->json($data, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $data = Airlines::findOrFail($id);
        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Airlines $airlines)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreAirlinesRequest $request, $id)
    {
        $data = Airlines::findOrFail($id);
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
        $data = Airlines::find($id);

        if (!$data) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $data->delete();

        return response()->json(['message' => 'Item deleted successfully'], 200);
    }

    public function indexWithJoin() {
        $airlines = Airlines::joinWithAirline();
        return response()->json($airlines);
    }
}
