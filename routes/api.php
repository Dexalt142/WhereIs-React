<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::get('/places', 'PlaceController@index');
Route::get('/place/{id}', 'PlaceController@show');
Route::post('/place/store', 'PlaceController@store');
Route::put('/place/update/{id}', 'PlaceController@update');
Route::delete('/place/delete/{id}', 'PlaceController@destroy');

Route::get('{any}', function() {
    $response = [
        'status' => 204,
        'data' => null
    ];

    return response()->json($response);
})->where('any', '.*');