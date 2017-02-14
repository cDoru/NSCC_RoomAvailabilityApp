@extends('layouts.app')

@section('content')

    <script>
        $(document).ready(function(){
            var $buildingsList = '{!! json_encode($buildingsList)!!}';
            $buildingsObj = JSON.parse($buildingsList); //global variable
        });


    </script>

    <div class="container col-md-6 col-md-offset-3">
        <div class="row">
            <h1>NSCC Room Availability App</h1>
            <h3>Find a free room</h3>
            <form method="post" name="myform" id="myform">
                {{ csrf_field() }}
                <div class="form-group">
                    <label for="campus">Campus</label>
                    <select name="campus" id="campus" class="form-control">
                        <option value="0">&#60;Select Your Campus&#62;</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="building">Building</label>
                    <select name="building" id="building" class="form-control">
                    </select>
                </div>

                <div class="form-group">
                    <label for="roomtype">Room Type</label>
                    <select name="roomtype" id="roomtype" class="form-control">
                    </select>
                </div>
            </form>
        </div>

        {{--THIS SHOULD BE SEPERATE BLADE COMPONENT --}}}
        @if($matchingFreeRooms)
            <div class="row">
                <table>
                    <tr><th>Free Rooms Matching Your Criteria</th></tr>
                    @foreach($matchingFreeRooms as $matchingFreeRoom)
                        <tr><td>
                            <a href={{"/RoomSchedule/$matchingFreeRoom"}}>
                                {{$matchingFreeRoom}}
                            </a>
                        </td></tr>
                    @endforeach
                </table>
            </div>
        @elseif(!empty($selectedRoomType) && empty($matchingFreeRooms))
            <p><strong>No free rooms matching your criteria</strong></p>
        @endif

    </div>

@endsection