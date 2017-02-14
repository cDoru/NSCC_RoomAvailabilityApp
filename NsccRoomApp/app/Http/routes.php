<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::resource('/','HomeController');



Route::post('FreeRoom/roomData', 'FreeRoomController@retrieveRoomData'); //handles ajax calls for free rooms

Route::get('FreeRoom/roomTypeData/{building}', function($building) {
    //'FreeRoomController@retrieveRoomTypeData'
    $roomTypes = \DB::table('Rooms')
        ->select('RoomType')
        ->where('Building','=', $building)
        ->distinct()->get();

    return json_encode($roomTypes);
}); //handles ajax calls for roomtype data

Route::get('FreeRoom/helloworld/{id}', function ($id) {
    return 'Hello World' . $id;
});

Route::resource('/FreeRoom','FreeRoomController', ['only' => [
    'index', 'show', 'store'
]]);

Route::post('FreeRoom/buildingList', 'FreeRoomController@retrieveBuildingList');

Route::resource('/RoomSchedule','RoomController');

Route::resource('/Locate','LocateController');
