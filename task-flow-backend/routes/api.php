<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->controller(UserController::class)->group(function () {
    Route::get('/users', 'index')->name('users');
    Route::get('/user', 'getUser')->name('user');
    Route::post('/logout', 'logout')->name('logout');
});

Route::controller(UserController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'store');
});

Route::middleware(['auth:sanctum'])->controller(TaskController::class)->group(function () {
    Route::get('/tasks', 'index');
    Route::get('/my-tasks', 'myTasks');
    Route::post('/tasks', 'store');
    Route::put('/tasks/{task}', 'update');
    Route::get('/tasks/{id}', 'show');
});
