<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\WalletController;
use Illuminate\Http\Request;


Route::get('/test', function () {
    return response()->json(['message' => 'API working']);
});


Route::middleware('auth:sanctum')->group(function () {
 
 Route::post('/wallet/top-up', [WalletController::class, 'topUp']);
 Route::post('/wallet/transfer', [WalletController::class, 'transfer' ]);
  Route::get('/wallet/balance', [WalletController::class, 'balance' ]);
    Route::get('/transactions', [WalletController::class, 'transactions' ]);
        Route::post('/user/update', [AuthController::class, 'updateProfile' ]);
         Route::post('/user/password', [AuthController::class, 'changePassword' ]);
Route::get('/user', function(Request $request){
   return  $request->user();
});
Route::get('/dashboard', function () {


        return response()->json([
            'message' => 'Welcome to dashboard',
            'user' => auth()->user()
        ]);
    });
});


Route::post('/login',  [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/register',[AuthController::class, 'register']);
