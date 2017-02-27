
/**
 * Created by inet2005 on 2/13/17 by RSutcliffe
 *
 * This file contains methods to update Room Form Elements
 * and related dependent blade form elements via ajax calls
 *
 *
 */

$(document).ready(function(){
    //LOAD PAGE ACTION
    if($buildingsObj) {
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
        //campus item change
        if($("#campus option[value='0']").length > 0){
            $("#campus option[value='0']").remove();
        }
        var $campus = $('#campus').val();
        var $selectedBuilding = buildingUpdate($campus);
        var $prevSelectedRoomType = $('#roomtype').val();
        var $selectedRoomType = roomTypeUpdate($selectedBuilding, $prevSelectedRoomType);
        formUpdate($('#campus').val(), $('#building').val(), $('#roomtype').val(), "");
    });

    $('#building').change(function(){
        formUpdate($('#campus').val(), $('#building').val(), $('#roomtype').val(), "");
    });

    $('#roomtype').change(function(){
        formUpdate($('#campus').val(), $('#building').val(), $('#roomtype').val(), "");
    });

    function formUpdate(campus, building, roomType, filter){
        //called when all form items are populated and ready to fetch room data
        
        //get form element values
        $roomType = "";
        if(roomType != 0){
            $roomType = roomType;
        }
        $.get("/FreeRoom/roomData/" + campus + "/" + building + "/" + $roomType, function(result){
            
            var $roomsObj = JSON.parse(result);
            $("#roomstable").html('');
           // $("#roomstable").html(result);

            $( "#roomstable" ).append( "<table><tr><th>Free Rooms Matching Your Criteria</th></tr>" );
            $.each($roomsObj, function() {
                $( "#roomstable" ).append("<tr><td><a href='/RoomSchedule/" +
                    this.Room + "'>" + this.Room + "</a></td></tr>");

            });

            });
        }

    }///////////////////////////////////////////////////////
    else if($scheduleBuildingsObj){

        var $submitBtn = document.getElementById('button');
        $submitBtn.disabled = 'true';

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


        $('#scheduleCampus').change(function () {
            $submitBtn.disabled = 'true';
            //campus item change
            if ($("#scheduleCampus option[value='0']").length > 0) {
                $("#scheduleCampus option[value='0']").remove();
            }
            var $campus = $('#scheduleCampus').val();
            var $selectedBuilding = scheduleBuildingUpdate($campus);
            roomUpdate($('#scheduleCampus').val(), $selectedBuilding);
            // var $prevSelectedRoomType = $('#roomtype').val();
        });

        $('#scheduleBuilding').change(function () {
            $submitBtn.disabled = 'true';
            roomUpdate($('#scheduleCampus').val(), $('#scheduleBuilding').val());
        });

        $('#room').change(function (){
           if($('#room').val() != 0){
               $submitBtn.disabled = !$submitBtn.disabled;
           }
            else{
               $submitBtn.disabled = 'true';
           }
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