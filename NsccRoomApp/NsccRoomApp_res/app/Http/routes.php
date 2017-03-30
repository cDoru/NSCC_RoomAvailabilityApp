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
            $matchingRooms = DB::table('Rooms')->select('Rooms.Room')
                ->join('FreeRoomsNowView', 'FreeRoomsNowView.room', '=', 'Rooms.Room')
                ->where('Rooms.campus', '=', $campus)
                ->where('Rooms.Building', '=', $building)
                ->where('Rooms.RoomType', '=', $roomType)
                ->where('Rooms.Room', 'like', "'%'". $filter."%'")
                ->groupBy('Rooms.Room')->get();
        }
        elseif($roomType) {
            $matchingRooms = DB::table('Rooms')->select('Rooms.Room')
                ->join('FreeRoomsNowView', 'FreeRoomsNowView.room', '=', 'Rooms.Room')
                ->where('Rooms.campus', '=', $campus)
                ->where('Rooms.Building', '=', $building)
                ->where('Rooms.RoomType', '=', $roomType)
                ->groupBy('Rooms.Room')->get();
        }
        elseif($filter){
            $matchingRooms = DB::table('Rooms')->select('Rooms.Room')
                ->join('FreeRoomsNowView', 'FreeRoomsNowView.room', '=', 'Rooms.Room')
                ->where('Rooms.campus', '=', $campus)
                ->where('Rooms.Building', '=', $building)
                ->where('Rooms.Room', 'like', "'%'". $filter."%'")
                ->groupBy('Rooms.Room')->get();
        }
        else{
            $matchingRooms = DB::table('Rooms')->select('Rooms.Room')
                ->join('FreeRoomsNowView', 'FreeRoomsNowView.room', '=', 'Rooms.Room')
                ->where('Rooms.campus', '=', $campus)
                ->where('Rooms.Building', '=', $building)
                ->groupBy('Rooms.Room')->get();
        }
        return json_encode($matchingRooms); //$matchingFreeRooms;

}); //handles ajax calls for free rooms

Route::get('FreeRoom/roomTypeData/{building}', function($building) {
    //'FreeRoomController@retrieveRoomTypeData'
    $roomTypes = DB::table('Rooms')
        ->select('RoomType')
        ->where('Building','=', $building)
        ->distinct()->get();

    return json_encode($roomTypes);
}); //handles ajax calls for roomtype data

Route::get('FreeRoom/roomData/{roomNum}', function($roomNum){
    $until = DB::select('CALL RoomAvailableUntil(?)',array($roomNum));
    return json_encode($until);
});

//New: Clone of RoomAvailUntil via function
Route::get('FreeRoomUntil/roomData/{campus}/{building}/{fromTime?}',
    function($campus, $building, $fromTime = null){
        if($fromTime == null){
            $fromTime = date('Hi');
        }
        $str = "Room, RoomAvailableUntil(Room,'. $fromTime . ') as AvailUntil";
        //Assumes Building is Populated:
        $matchingRooms = DB::table('nsccSchedule')
                ->select(DB::raw("Room, RoomAvailableUntil(Room,'$fromTime') as AvailUntil"))
                ->where('Campus', '=',$campus)
                ->where('Building', '=', $building)
                ->distinct()
                ->get();
        return json_encode($matchingRooms);

});

Route::resource('/FreeRoom','FreeRoomController'
    ,  ['only' => ['index', 'show', 'store']]
);

//Route::post('FreeRoom/buildingList', 'FreeRoomController@retrieveBuildingList');

Route::resource('/RoomSchedule','RoomController');


Route::get('RoomSchedule/{campus}/{building}', function($campus, $building){
   $result = DB::table('Rooms')->select('Rooms.Room')
       ->where('Rooms.campus', '=', $campus)
       ->where('Rooms.Building', '=', $building)
       ->groupBy('Rooms.Room')->get();

    return json_encode($result);
});

//new: route to pass json data (for map). TEMP
Route::get('/Locate/CampusJSON', function () {
    return redirect('media/campuses.txt');
});

Route::get('CampusJSON', function () {
    return redirect('/Locate/CampusJSON');
});

Route::resource('/Locate','LocateController');

