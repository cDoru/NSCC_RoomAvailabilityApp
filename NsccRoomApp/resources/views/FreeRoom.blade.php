@extends('layouts.app')

@section('content')


    <script>
        $(document).ready(function(){
            $('#campus').change(function(){
                myform.submit();
            });

            $('#building').change(function(){
                myform.submit();
            });

            $('#roomtype').change(function(){
                myform.submit();
            });
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
                        @if(is_array($campus))
                            @foreach($campus as $c)
                                @if($c->campus == $selectedCampus){
                                    <option selected="selected" value={{$c->campus}}>
                                            {{$c->campus}}
                                    </option>
                                @else
                                    <option value={{$c->campus}}>
                                        {{$c->campus}}
                                    </option>
                                @endif
                            @endforeach
                        @endif
                    </select>
                </div>


                <div class="form-group">
                    <label for="building">Building</label>
                    <select name="building" id="building" class="form-control">
                        <option value="0">&#60;Select A Building&#62;</option>
                        @if(is_array($building))
                            @foreach($building as $b)
                                @if($b->building == $selectedBuilding)
                                    <option selected='selected' value={{$b->building}}>
                                        {{$b->building}}
                                    </option>
                                @else
                                    <option value={{$b->building}}>
                                        {{$b->building}}
                                    </option>
                                @endif
                            @endforeach
                        @endif
                    </select>
                </div>


                <div class="form-group">
                    <label for="roomtype">Room Type</label>
                    <select name="roomtype" id="roomtype" class="form-control">
                        <option value="0">&#60;Select A Room Type&#62;</option>
                        @if(is_array($roomtype))
                            @foreach($roomtype as $r)
                                @if($r->RoomType == $selectedRoomType){
                                    <option selected='selected' value={{$r->RoomType}}>
                                        {{$r->RoomType}}
                                    </option>
                                @else
                                    <option value={{$r->RoomType}}>
                                        {{$r->RoomType}}
                                    </option>
                                @endif
                            @endforeach
                        @endif
                    </select>
                </div>
            </form>
        </div>

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