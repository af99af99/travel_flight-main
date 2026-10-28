<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;
use Illuminate\Support\Facades\Auth;

class MemberAuthController extends Controller
{
    // Show login form
    public function showLoginForm()
    {
        return view('member.login');
    }

    // Login function to authenticate and generate token
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        // Attempt authentication with a custom guard (member)
        if (Auth::guard('member')->attempt($credentials)) {
            $user = Auth::guard('member')->user();
            $token = $user->createToken('Laravel')->plainTextToken;

            return response()->json([
                'token' => $token,
                'redirect_url' => '/admin/dashboard'
            ]);
        }

        return back()->withErrors(['email' => 'Invalid credentials'])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        $user = Auth::guard('member')->user();
        // dd($user);
        // Revoke the user's token (if using Sanctum)
        if ($user) {
            $user->tokens()->delete(); // Revoke all tokens for the user
        }

        // Log out the guard
        Auth::guard('member')->logout();

        return response()->json([
            'message' => 'Logged out successfully',
            'redirect_url' => '/signin'
        ]);
    }
}
