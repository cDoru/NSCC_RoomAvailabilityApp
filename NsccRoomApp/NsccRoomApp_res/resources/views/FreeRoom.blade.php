@extends('layouts.app')

@section('content')

    <link rel='stylesheet' href='/css/fullcalendar.css' />
    <link rel="stylesheet" href="/css/bootstrap-timepicker.css" />
    {{--<script src='{{asset('/js/jquery.min.js')}}'></script>--}}

    <script src='{{asset('/js/moment.min.js')}}'></script>
    <script src='{{asset('/js/fullcalendar.js')}}'></script>
    <script src=" {{ asset('js/bootstrap-timepicker.js') }}"></script>

    <script>
        $(document).ready(function(){
            var $buildingsList = '{!! json_encode($buildingsList)!!}';
            $buildingsObj = JSON.parse($buildingsList); //global variable
        });

    </script>

    <div class="container col-md-6 col-md-offset-3">
        <div class="row">
            {{--<h1>NSCC Room Availability App</h1>--}}
            <h3>Find Rooms Available Now</h3>
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

                <div class="input-group bootstrap-timepicker timepicker">

                    <input id="timepicker1" type="text" class="form-control input-small">
                    <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                </div>

                <script type="text/javascript">
                    $('#timepicker1').timepicker();
                </script>

                <div class="form-group">
                    <label for="roomsbox">Rooms Available Now</label>
                    <select size="6" name="roomsbox" id="roomsbox" class="form-control">
                    </select>
                </div>

                <div align="center" class="form-group">
                    <button type="button" name="button1" id="button1" class="btn btn-primary">View Room Schedule</button>
                </div>

            </form>
        </div>

    </div>

    <script src="{{ asset('js/appUI.js') }}"></script>

@endsection