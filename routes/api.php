<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\WalletController;
use Illuminate\Http\Request;


Route::get('/test', function () {
    return response()->json(['message' => 'API working']);
});


//login and register route

Route::middleware('throttle:5,1')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});

// transactions routes
Route::middleware(['auth:sanctum', 'throttle:10,1'])->group(function () {
    Route::post('/wallet/top-up', [WalletController::class, 'topUp']);
    Route::post('/wallet/transfer', [WalletController::class, 'transfer']);
    Route::get('/wallet/balance', [WalletController::class, 'balance']);
    Route::get('/transactions', [WalletController::class, 'transactions']);
    Route::get('/user', function(Request $request){ return $request->user(); });
    Route::get('/dashboard', function(){ return response()->json(['message' => 'Welcome', 'user' => auth()->user()]); });
});

// User details route
Route::middleware(['auth:sanctum', 'throttle:5,1'])->group(function () {
    Route::put('/user/update', [AuthController::class, 'updateProfile']);
    Route::put('/user/password', [AuthController::class, 'changePassword']);
});

// logout
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
