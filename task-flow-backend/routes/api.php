<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(UserController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'store');
});

Route::middleware(['auth:sanctum'])->controller(TaskController::class)->group(function () {
    Route::get('tasks', 'index'); // Fetch all tasks
    Route::post('tasks', 'store'); // Create a new task
    // Route::get('tasks/{task}', 'show'); // View a specific task
    Route::put('tasks/{task}', 'update'); // Update a specific task
    // Route::delete('tasks/{task}', 'destroy'); // Delete a specific task
});