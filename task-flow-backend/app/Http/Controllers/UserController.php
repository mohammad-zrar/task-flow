<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        $users = User::all();

        return response()->json([
            "users" => $users
        ]);
    }

    public function login(LoginRequest $request)
    {

        $request->validate([
            'email' => 'required|exists:users,email',
            'password' => 'required|string'
        ]);

        $request->authenticate();

        $user = Auth::user();

        $token = $user->createToken($user->email, ['*'], now()->addWeek());

        return [
            "user" => $user,
            "token" => $token->plainTextToken,
            "expires_at" => $token->accessToken->expires_at,

        ];
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->string('password')),
        ]);

        Auth::login($user);

        $token = $user->createToken($user->email);

        return [
            "user" => $user,
            "token" => $token->plainTextToken
        ];
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return [
            'message' => 'You are logged out.',
        ];
    }

    public function getUser(Request $request)
    {
        $user = $request->user();
        return $user;
    }

    public function forgotPassword(Request $request)
    {
        $validatedData = $request->validate([
            "email" => ["required", "string", "email"],
        ]);

        $user = User::where('email', $validatedData['email'])->first();

        if (!$user) {
            return response()->json([
                'message' => 'The email address does not exist in our records.',
            ], 404);
        }

        return response()->json([
            'message' => 'Password reset link has been sent to your email.',
        ]);
    }

    public function show(User $user)
    {
        //
    }

    public function update(Request $request, User $user)
    {
        //
    }

    public function destroy(User $user)
    {

    }
}
