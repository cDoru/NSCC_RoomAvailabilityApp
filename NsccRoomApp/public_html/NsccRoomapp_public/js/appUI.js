
/**
 * Created by inet2005 on 2/13/17 by RSutcliffe
 *
 * This file contains methods to update Room Form Elements
 * and related dependent blade form elements via ajax calls
 *
 *
 */
var isChrome = !!window.chrome && !!window.chrome.webstore;
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

$(document).ready(function(){
    //LOAD PAGE ACTION
    if($buildingsObj) {

        var $button1 = document.getElementById('button1');
        $button1.disabled = true;

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
                formUpdate(sessionStorage.getItem("currentCampus"), sessionStorage.getItem("currentBuilding"), sessionStorage.getItem("currentRoomType"), "");
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
        $button1.disabled = true;
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
        formUpdate($('#campus').val(), $('#building').val(), $('#roomtype').val(), "");
    });

    $('#building').change(function(){
        $button1.disabled = true;
        sessionStorage.setItem("currentBuilding", $('#building').val());
        formUpdate($('#campus').val(), $('#building').val(), $('#roomtype').val(), "");
    });

    $('#roomtype').change(function(){
        $button1.disabled = true;
        sessionStorage.setItem("currentRoomType", $('#roomtype').val());
        formUpdate($('#campus').val(), $('#building').val(), $('#roomtype').val(), "");
    });
        
    $('#roomsbox').change(function () {
        $button1.disabled = false;
        // window.location = "/RoomSchedule/" + $('#roomsbox').val().toString();
        });

    $button1.onclick = function() {
        // var $url = "/RoomSchedule/" + $('#room').val().toString();
        window.location = "/RoomSchedule/" + $('#roomsbox').val().toString();
    };
        

    function formUpdate(campus, building, roomType, filter){
        //called when all form items are populated and ready to fetch room data
        
        //get form element values
        $roomType = "";
        if(roomType != 0){
            $roomType = roomType;
        }
        $.get("/FreeRoom/roomData/" + campus + "/" + building + "/" + $roomType, function(result){
            
            var $roomsObj = JSON.parse(result);
            $("#roomsbox").html('');
           // $("#roomstable").html(result);

            // $( "#roomsbox" ).append( "<table><tr><th>Free Rooms Matching Your Criteria</th></tr>" );
            $.each($roomsObj, function() {
                $( "#roomsbox" ).append($("<option />").val(this.Room).text(this.Room));
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
            sessionStorage.setItem("scheduleCampus", $campus)
            var $selectedBuilding = scheduleBuildingUpdate($campus);
            sessionStorage.setItem("scheduleBuilding", $selectedBuilding)
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

});