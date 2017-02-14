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



Route::get('FreeRoom/roomData/{campus}/{building}/{roomType?}/{filter?}',
    function($campus, $building, $roomType = null, $filter = null) {
        $filter = strtoupper($filter); //convert uppercase
        if($roomType && $filter) {
            $matchingRooms = DB::table('Rooms')->select('Room')
                ->where('campus', '=', $campus)
                ->where('Building', '=', $building)
                ->where('RoomType', '=', $roomType)
                ->where('Room', 'like', "'%'". $filter."%'")
                ->groupBy('Room')->get();
        }
        elseif($roomType) {
            $matchingRooms = DB::table('Rooms')->select('Room')
                ->where('campus', '=', $campus)
                ->where('Building', '=', $building)
                ->where('RoomType', '=', $roomType)
                ->groupBy('Room')->get();
        }
        elseif($filter){
            $matchingRooms = DB::table('Rooms')->select('Room')
                ->where('campus', '=', $campus)
                ->where('Building', '=', $building)
                ->where('Room', 'like', "'%'". $filter."%'")
                ->groupBy('Room')->get();
        }
        else{
            $matchingRooms = DB::table('Rooms')->select('Room')
                ->where('campus', '=', $campus)
                ->where('Building', '=', $building)
                ->groupBy('Room')->get();
        }
        $freeRooms = DB::select('CALL `nsccschedule`.`GetFreeRoomsNow`();');
        
        $y = array();
        $z = array();

        foreach ($matchingRooms as $m) {
            $y[] = $m->Room;
        }

        foreach ($freeRooms as $f) {
            $z[] = $f->room;
        }

        $matchingFreeRooms = array_intersect($y, $z);
        return json_encode($matchingFreeRooms);

}); //handles ajax calls for free rooms

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
