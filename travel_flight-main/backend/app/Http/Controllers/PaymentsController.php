<?php

namespace App\Http\Controllers;

use App\Models\Payments;
use Illuminate\Http\Request;
use App\Http\Requests\StorePaymentsRequest;

class PaymentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Payments::all();
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
    public function store(StorePaymentsRequest $request)
    {
        try {
            $data = Payments::create($request->validated());
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
        $data = Payments::findOrFail($id);
        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payments $payments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorePaymentsRequest $request, $id)
    {
        $data = Payments::findOrFail($id);
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
        $data = Payments::find($id);

        if (!$data) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $data->delete();

        return response()->json(['message' => 'Item deleted successfully'], 200);
    }
}
