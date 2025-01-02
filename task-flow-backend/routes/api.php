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
    Route::post('/login', 'login')->name('login');
    Route::post('/register', 'store')->name('register');
    Route::post('/forgot-password', 'forgotPassword')->name("forgotPassword");
    Route::post("/reset-password", 'resetPassword')->name('resetPassword');
});

Route::middleware(['auth:sanctum'])->controller(TaskController::class)->group(function () {
    Route::get('/tasks', 'index');
    Route::get('/my-tasks', 'myTasks');
    Route::post('/tasks', 'store');
    Route::put('/tasks/{task}', 'update');
    Route::get('/tasks/{id}', 'show');
    Route::delete('/tasks/{id}', 'destroy');
});
