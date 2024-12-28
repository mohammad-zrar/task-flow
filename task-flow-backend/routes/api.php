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
    Route::get('/users', 'index');
});

Route::middleware(['auth:sanctum'])->controller(TaskController::class)->group(function () {
    Route::get('tasks', 'index');
    Route::get('my-tasks', 'myTasks');
    Route::post('tasks', 'store');
    Route::put('tasks/{task}', 'update');
    Route::get('tasks/{task}', 'show');
});