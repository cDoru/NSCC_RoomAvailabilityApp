/**
 * Created by inet2005 on 2/13/17 by RSutcliffe
 *
 * This file contains methods to update Room Form Elements
 * and related dependent blade form elements via ajax calls
 *
 *
 */
var isChrome = !!window.chrome && !!window.chrome.webstore;
var isSafari = /constructor/i.test(window.HTMLElement) ||
    (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })
    (!window['safari'] || safari.pushNotification);

$(document).ready(function(){
    //LOAD PAGE ACTION
    if($buildingsObj) {
        //Button only on FreeRoom Page
        if($('#button1').length) {
            $('#button1').prop("disabled",true);
        }

        //get a list of campuses (indexOf not supported in IE8?)
        $campusesList = [];
        $list = [];
        for (var i = 0; i < $buildingsObj.length; i++) {
            // if ($campusesList.indexOf($buildingsObj[i]) ==-1){
            $campusesList.push($buildingsObj[i]);

            // }
        }

        //populate campus list
        $.each($campusesList, function () {

            if (!$list.includes(this.campus)) {
                $("#campus").append($("<option />").val(this.campus).text(this.campusName));
                $list.push(this.campus);
            }
        });

        if(isChrome || isSafari) {
            if (sessionStorage.getItem("currentCampus") != null) {
                document.getElementById('campus').value = sessionStorage.getItem("currentCampus");
                buildingUpdate(sessionStorage.getItem("currentCampus"));
                document.getElementById('building').value = sessionStorage.getItem("currentBuilding");
                roomTypeUpdate(sessionStorage.getItem("currentBuilding"), sessionStorage.getItem("currentRoomType"));
                document.getElementById('roomtype').value = sessionStorage.getItem("currentRoomType");
                formUpdate(sessionStorage.getItem("currentCampus"), sessionStorage.getItem("currentBuilding"),
                    ConvertTimeformat("24", $('#timepicker1')).val(), "Monday", sessionStorage.getItem("currentRoomType"), "");
            }
        }



        //FORM ELEMENT CHANGE ACTION
        /*
         repopulate the building dropdown when campus is updated
         */
        function buildingUpdate(campus){

            var $buildingDropdown = $("#building");
            $buildingDropdown.html(''); //remove existing values

            $.each($buildingsObj, function() {
                if(this.campus == $("#campus").val()){
                    $buildingDropdown.append($("<option />").val(this.building).text(this.buildingName));
                }
            });
            return $buildingDropdown.val();
        }

        /*
         Get Updated RoomType values based on updated building
         Try to keep the selected RoomType the same if it still is avail
         */
        function roomTypeUpdate(building, prevRoomType){
            var $roomTypeDropdown = $("#roomtype");
            $roomTypeDropdown.html(''); //remove existing
            $roomTypeDropdown.append($("<option />").val("0").text("<< Any RoomType >>"));
            $.get("FreeRoom/roomTypeData/" + building, function(data){
                $roomTypesObj = JSON.parse(data);
                $.each($roomTypesObj, function() {
                    if(this.RoomType == prevRoomType){
                        $roomTypeDropdown.append($("<option selected='selected'/>").val(this.RoomType).text(this.RoomType));
                    }
                    else {
                        $roomTypeDropdown.append($("<option />").val(this.RoomType).text(this.RoomType));
                    }

                });

                return $roomTypeDropdown.val();
            });
            return $roomTypeDropdown.val();
        }


        $('#campus').change(function(){
            if($('#button1').length) {
                $('#button1').prop("disabled",true);
            }
            //campus item change
            if($("#campus option[value='0']").length > 0){
                $("#campus option[value='0']").remove();
            }
            var $campus = $('#campus').val();
            sessionStorage.setItem("currentCampus", $campus)
            var $selectedBuilding = buildingUpdate(sessionStorage.getItem("currentCampus"));
            sessionStorage.setItem("currentBuilding", $selectedBuilding);
            var $prevSelectedRoomType = $('#roomtype').val();
            var $selectedRoomType = roomTypeUpdate($selectedBuilding, $prevSelectedRoomType);
            formUpdate($('#campus').val(), $('#building').val(), ConvertTimeformat("24", $('#timepicker1').val()), getDayofWeek(new Date()), $prevSelectedRoomType, "");
        });

        $('#building').change(function(){
            if($('#button1').length) {
                $('#button1').prop("disabled",true);
            }
            sessionStorage.setItem("currentBuilding", $('#building').val());
            var $prevSelectedRoomType = $('#roomtype').val();
            var $selectedRoomType = roomTypeUpdate($('#building').val(), $prevSelectedRoomType);
            formUpdate($('#campus').val(), $('#building').val(), ConvertTimeformat("24", $('#timepicker1').val()), getDayofWeek(new Date()), $('#roomtype').val(), "");
        });

        $('#roomtype').change(function(){
            if($('#button1').length) {
                $('#button1').prop("disabled",true);
            }
            sessionStorage.setItem("currentRoomType", $('#roomtype').val());
            formUpdate($('#campus').val(), $('#building').val(), ConvertTimeformat("24", $('#timepicker1').val()), getDayofWeek(new Date()), $('#roomtype').val(), "");
        });

        $('#timepicker1').change(function(){

            sessionStorage.setItem("currentTime", $('#timepicker1').val());
            var $prevSelectedTime = $('#timepicker1').val();
            formUpdate($('#campus').val(), $('#building').val(),  ConvertTimeformat("24", $('#timepicker1').val()), getDayofWeek(new Date()), $('#roomtype').val(), "");

        })
        $('#roomsbox').change(function () {
            if($('#button1').length) {
                $('#button1').prop("disabled",false);
            }
            // window.location = "/RoomSchedule/" + $('#roomsbox').val().toString();
        });

        if($('#button1').length) {
            $('#button1').click(function() {
                window.location = "/RoomSchedule/" + $('#roomsbox').val().toString();
            });
        }


        function formUpdate(campus, building, fromTime, onStrDate, roomType, filter){
            //called when all form items are populated and ready to fetch room data

            //get form element values
            $roomType = "";
            if(roomType != 0 && roomType != null){
                $roomType = roomType;
            }
            $.get("/FreeRoom/roomData/" + campus + "/" + building + "/" + $roomType, function(result){

                var $roomsObj = JSON.parse(result);
                $("#roomsbox").html('');
                // $("#roomstable").html(result);

                // $( "#roomsbox" ).append( "<table><tr><th>Free Rooms Matching Your Criteria</th></tr>" );
                $.each($roomsObj, function() {
                    $( "#roomsbox" ).append($("<option />").val(this.Room).text(this.Room));
                })
                
                //New: Count amount of records returned and getAvailableUntil from that
                var $roomsWUntilObj;
                //If lots of records do a big batch request
                $.get("/FreeRoomUntil/roomData/" + campus + "/" + building + "/" + fromTime + "/" +
                            onStrDate + "/" + $roomType, function(result) {
                    $roomsWUntilObj = JSON.parse(result);
                })
                //When done update records
                .done(function() {
                    $("#roomsbox").html('');
                    $.each($roomsWUntilObj, function() {
                        var $AvailMsg;

                        if(this.AvailUntil != null){
                            var $timeLength = getTimeLength(fromTime, this.AvailUntil);
                            var $hrLength = Math.floor($timeLength/60);
                            var $minLength = $timeLength % 60;
                            if($timeLength >= 120){
                                $AvailMsg = "Available for next ~" + $hrLength + " hours";
                            }
                            else if($timeLength > 60) {
                                $AvailMsg = "Available for next hour and " + $minLength + " mins";
                            }
                            else if($timeLength == 60){
                                $AvailMsg = "Available for next hour";
                            }
                            else {
                                $AvailMsg = "Available for next " + $minLength + " minutes";
                            }
                        }
                        else {
                            $AvailMsg = "Available rest of day";
                        }

                        $( "#roomsbox" ).append($("<option />").val(this.Room).text(this.Room + " | " + $AvailMsg));
                    })
                });



            });


        }

    }///////////////////////////////////////////////////////
    else if($scheduleBuildingsObj){

        var $submitBtn = document.getElementById('button');
        $submitBtn.disabled = true;

        $campusesList = [];
        $list = [];
        for (var i = 0; i < $scheduleBuildingsObj.length; i++) {
            // if ($campusesList.indexOf($buildingsObj[i]) ==-1){
            $campusesList.push($scheduleBuildingsObj[i]);

            // }
        }

        //populate campus list
        $.each($campusesList, function () {

            if (!$list.includes(this.campus)) {
                $("#scheduleCampus").append($("<option />").val(this.campus).text(this.campusName));
                $list.push(this.campus);
            }
        });

        if(isChrome || isSafari) {
            if (sessionStorage.getItem("scheduleCampus") != null) {
                document.getElementById('scheduleCampus').value = sessionStorage.getItem("scheduleCampus");
                scheduleBuildingUpdate(sessionStorage.getItem("scheduleCampus"));
                document.getElementById('scheduleBuilding').value = sessionStorage.getItem("scheduleBuilding");
                roomUpdate(sessionStorage.getItem("scheduleCampus"), sessionStorage.getItem("scheduleBuilding"));
                // document.getElementById('room').value = sessionStorage.getItem("room");
            }
        }



        $('#scheduleCampus').change(function () {
            $submitBtn.disabled = true;
            //campus item change
            if ($("#scheduleCampus option[value='0']").length > 0) {
                $("#scheduleCampus option[value='0']").remove();
            }
            var $campus = $('#scheduleCampus').val();
            sessionStorage.setItem("scheduleCampus", $campus);
            var $selectedBuilding = scheduleBuildingUpdate($campus);
            sessionStorage.setItem("scheduleBuilding", $selectedBuilding);
            roomUpdate(sessionStorage.getItem("scheduleCampus"), sessionStorage.getItem("scheduleBuilding"));
            // var $prevSelectedRoomType = $('#roomtype').val();
        });

        $('#scheduleBuilding').change(function () {
            $submitBtn.disabled = true;
            sessionStorage.setItem("scheduleBuilding", $('#scheduleBuilding').val());
            roomUpdate(sessionStorage.getItem("scheduleCampus"), sessionStorage.getItem("scheduleBuilding"));
        });

        $('#room').change(function (){
            if($('#room').val() != 0){
                $submitBtn.disabled = false;
            }
            else{
                $submitBtn.disabled = true;
            }
            sessionStorage.setItem("room", $('#room').val());
        });

        $submitBtn.onclick = function() {
            // var $url = "/RoomSchedule/" + $('#room').val().toString();
            window.location = "/RoomSchedule/" + $('#room').val().toString();
        };




        function scheduleBuildingUpdate(campus) {

            var $buildingDropdown = $("#scheduleBuilding");
            $buildingDropdown.html(''); //remove existing values

            $.each($scheduleBuildingsObj, function () {
                if (this.campus == $("#scheduleCampus").val()) {
                    $buildingDropdown.append($("<option />").val(this.building).text(this.buildingName));
                }
            });
            return $buildingDropdown.val();
        }


        function roomUpdate(campus, building) {
            $.get("/RoomSchedule/" + campus + "/" + building, function (result) {

                var $roomDropdown = $("#room");
                $roomDropdown.html('');
                $roomDropdown.append($("<option />").val("0").text("<< Select a Room >>"));
                var $roomsObj = JSON.parse(result);


                $.each($roomsObj, function () {

                    $roomDropdown.append($("<option />").val(this.Room).text(this.Room));

                })


            })
        }
    }

    //Parse time to 24 hours: http://stackoverflow.com/questions/15083548/convert-12-hour-hhmm-am-pm-to-24-hour-hhmm
    function ConvertTimeformat(format, str) {
        var time = str;
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM == "PM" && hours < 12) hours = hours + 12;
        if (AMPM == "AM" && hours == 12) hours = hours - 12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;
        return (sHours + "" + sMinutes);
    }
    //Get timelength difference
    //this is a hack. It should use real date diff functionality
    function getTimeLength(startTime, endTime) {
        var $endTimeStr = endTime.toString();
        var hours = Number($endTimeStr.match(/^(\d+)/)[1]);
        var minutes = Number($endTimeStr.match(/:(\d+)/)[1]);
        var $endTimeDate =  new Date(1,1,1,hours,minutes);
        var $startTimeDate = new Date(1,1,1, startTime.toString().substr(0,2), startTime.toString().substr(2,2));
        var $diff = ($endTimeDate - $startTimeDate) / 36000;
        return $diff;
    }

    function getDayofWeek(time){
        var $day = time.getDay();
        //return "Wednesday";
        if($day === 0){
            return "Sunday";
        }
        else if($day === 1){
            return "Monday";
        }
        else if($day === 2){
            return "Tuesday";
        }
        else if($day === 3){
            return "Wednesday";
        }
        else if($day === 4){
            return "Thursday";
        }
        else if($day === 5){
            return "Friday";
        }
        else if($day === 6){
            return "Saturday";
        }
        else {
            return null;
        }
    }
});