
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
    if($buildingsObj){
    //get a list of campuses (indexOf not supported in IE8?)
        $campusesList = [];
        for (var i = 0; i < $buildingsObj.length; i++) {
            if ($campusesList.indexOf($buildingsObj[i].campus) ==-1){
                $campusesList.push($buildingsObj[i].campus)
            }
        }
        //populate campus list
        $.each($campusesList, function() {
            $("#campus").append($("<option />").val(this).text(this));
        });
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
                $buildingDropdown.append($("<option />").val(this.building).text(this.building));
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
        $.get("/FreeRoom/roomData/" + campus + "/" + building + "/" + roomType, function(result){
            
            $roomTypesObj = JSON.parse(result);
            //$("#roomstable").html(result);

            //[todo] need to call Vue HTML component here to load table with data
            //[todo] fix link: https://vuejs.org/v2/guide/syntax.html
            Vue.component('todo-item', {
                props: ['todo'],
                template: '<tr><td><a href="/RoomSchedule/">{{ todo.Room }}</a></tr></td>'
            })
            "'/path/to/images/' + fileName"
            var app7 = new Vue({
                el: '#app-7',
                data: {
                    rooms:  $roomTypesObj
                }
            })


        });
    }
    


});