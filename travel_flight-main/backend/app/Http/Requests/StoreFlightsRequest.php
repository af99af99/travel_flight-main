<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFlightsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // return false;
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'airline_id' => 'required|integer', 
            'flight_num' => 'required|string', 
            'departure_airport_code' => 'required|string|max:3', 
            'arrival_airport_code' => 'required|string|max:3', 
            'departure_time' => 'required|date', 
            'arrival_time' => 'required|date', 
            'price' => 'required|numeric', 
            'status' => 'required|integer|between:1,4'
        ];
    }
}
