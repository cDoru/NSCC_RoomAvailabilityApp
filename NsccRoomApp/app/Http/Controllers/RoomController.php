<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use DB;



class RoomController extends Controller
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
        $rooms = null;
        $matchingRooms = null;
        $selectedRoom = null;
        $matchingFreeRooms = null;
        $campus = DB::table('nsccSchedule')->select('campus')->groupBy('campus')->get();
        return view('RoomSchedule', compact('campus', 'building', 'rooms', 'selectedCampus', 'selectedBuilding', 'selectedRoom', 'matchingFreeRooms'));
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
            $rooms = null;
            $matchingRooms = null;
            $selectedRoom = null;
            $matchingFreeRooms = null;
            $selectedCampus = $request->campus;
            $building = DB::table('nsccSchedule')->select('building')->where('campus', '=', $request->campus)->groupBy('building')->get();

            if($request->building != null)
            {
                $selectedBuilding = $request->building;
                $rooms = DB::table('nsccSchedule')->select('room')->where('campus', '=', $selectedCampus)->where('building', '=', $selectedBuilding)->groupBy('room')->get();

            }

            return view('RoomSchedule', compact('building', 'campus', 'rooms', 'selectedCampus', 'selectedBuilding', 'selectedRoom', 'matchingFreeRooms'));
        }
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
