<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use DB;

class FreeRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $selectedCampus = null;
        $selectedBuilding = null;
        $building = null;
        $roomtype = null;
        $matchingRooms = null;
        $selectedRoomType = null;
        $campus = DB::table('nsccSchedule')->select('campus')->groupBy('campus')->get();
        return view('FreeRoom', compact('campus', 'building', 'roomtype', 'selectedCampus', 'selectedBuilding', 'matchingRooms', 'selectedRoomType'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {


        if($request->campus != null)
        {
            $campus = DB::table('nsccSchedule')->select('campus')->groupBy('campus')->get();
            $roomtype = null;
            $matchingRooms = null;
            $selectedRoomType = null;
            $selectedCampus = $request->campus;
            $building = DB::table('nsccSchedule')->select('building')->where('campus', '=', $request->campus)->groupBy('building')->get();

            if($request->building != null)
            {
                $selectedBuilding = $request->building;
                $roomtype = DB::table('Rooms')->select('RoomType')->where('campus', '=', $selectedCampus)->where('Building', '=', $selectedBuilding)->groupBy('RoomType')->get();
                
                if($request->roomtype != null)
                {
                    $selectedRoomType = $request->roomtype;
                    $matchingRooms = DB::table('Rooms')->select('Room')->where('campus', '=', $selectedCampus)->where('Building', '=', $selectedBuilding)->where('RoomType', '=', $selectedRoomType)->groupBy('Room')->get();
                    
                }
                
            }

            return view('FreeRoom', compact('building', 'campus', 'roomtype', 'selectedCampus', 'selectedBuilding', 'matchingRooms', 'selectedRoomType'));
        }
        //in the view, hide the select boxes instead of only creating them when needed...
        //send thru data from all boxes each time.
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
