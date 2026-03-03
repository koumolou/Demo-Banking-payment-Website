<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Str;
use App\Models\Transaction;



class WalletController extends Controller
{ 
   public function topUp(Request $request)
{
    $validated = $request->validate([
        'amount' => 'required|integer|min:1|max:1000000000000'
    ]);

    $user = $request->user();

    DB::transaction(function () use ($user, $validated) {


        Transaction::create([
            'sender_id'   => null,
            'receiver_id' => $user->id,
            'amount'      => $validated['amount'],
            'type'        => 'topup',
            'status'      => 'success',
            'reference'   => $reference = generate_txn_reference('WDL')
        ]);

        $user->increment('balance', $validated['amount']);
    });

    return response()->json([
        'message'     => 'Top up successful.',
        'new_balance' => $user->fresh()->balance,
    ], 200);
}

public function transfer(Request $request)
{
    
    $validated = $request->validate([
        'receiver_email' => 'required|email|exists:users,email',
        'amount' => 'required|integer|min:1',
    ]);

    if ($validated['receiver_email'] === auth()->user()->email) {
        return response()->json([
            'message' => 'You cannot transfer to yourself.'
        ], 422);
    }
    
    return DB::transaction(function () use ($validated) {

    $sender = User::where('id', auth()->id())
        ->lockForUpdate()
        ->first();

    $receiver = User::where('email', $validated['receiver_email'])
        ->lockForUpdate()
        ->first();

    $amount = $validated['amount'];

    if ($sender->balance < $amount) {
        return response()->json([
            'message' => 'Insufficient funds.'
        ], 422);
    }

   
    $sender->balance -= $amount;
    $receiver->balance += $amount;

    $sender->save();
    $receiver->save();

    Transaction::create([
        'sender_id'   => $sender->id,
        'receiver_id' => $receiver->id,
        'amount'      => $amount,
        'type'        => 'transfer',
        'status'      => 'success',
        'reference'   =>   generate_txn_reference('WDL')
    ]);

    Transaction::create([
    'sender_id'   => $sender->id,
    'receiver_id' => $receiver->id,
    'amount'      => $amount,
    'type'        => 'credit',
    'status'      => 'success',
    'reference'   => generate_txn_reference('WDL') 
]);


    return response()->json([
        'message'        => 'Transfer successful.',
        'sender_balance' => $sender->balance,
        'receiver'       => $receiver->email
    ], 200);
});
    
    
}


public function balance(Request $request){

    $balance = $request->user()->balance;

   return response()->json([
        'balance' => $balance
    ]);

    }

public function transactions(Request $request){
    $user = auth()->user();

    $transactions = Transaction::where(function($query) use ($user) {
       
        $query->where('sender_id', $user->id)
              ->where('type', 'transfer');
    })->orWhere(function($query) use ($user) {
  
        $query->where('receiver_id', $user->id)
              ->whereIn('type', ['credit', 'topup']);
    })
    ->orderBy('created_at', 'desc')
    ->get();

    return response()->json([
        'transactions' => $transactions
    ]);
}

 
    
}

