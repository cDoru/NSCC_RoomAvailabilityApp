@extends('layouts.app')

@section('content')


    <script>
        $(document).ready(function(){
            $('#campus').change(function(){
                myform.submit();
            });
        });

        $(document).ready(function(){
            $('#building').change(function(){
                myform.submit();
            });
        });

        $(document).ready(function(){
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
                            <?php if(is_array($campus))
                            {
                                foreach($campus as $c)
                                {
                                    if($c->campus == $selectedCampus){
                                        echo "<option selected='selected' value='".$c->campus."'>".$c->campus."</option>";
                                    }
                                    else{
                                        echo "<option value='".$c->campus."'>".$c->campus."</option>";
                                    }
                                }
                            }
                            ?>


                        </select>
                    </div>


                <div class="form-group">
                    <label for="building">Building</label>
                    <select name="building" id="building" class="form-control">
                        <option value="0">&#60;Select A Building&#62;</option>
                        <?php
                            if(is_array($building))
                            {
                                foreach($building as $b)
                                {
                                    if($b->building == $selectedBuilding){
                                        echo "<option selected='selected' value='".$b->building."'>".$b->building."</option>";
                                    }
                                    else{
                                        echo "<option value='".$b->building."'>".$b->building."</option>";
                                    }
                                }
                            }
                        ?>
                    </select>
                </div>




                <div class="form-group">
                    <label for="roomtype">Room Type</label>
                    <select name="roomtype" id="roomtype" class="form-control">
                        <option value="0">&#60;Select A Room Type&#62;</option>
                        <?php
                        if(is_array($roomtype))
                        {
                            foreach($roomtype as $r)
                            {
                                if($r->RoomType == $selectedRoomType){
                                    echo "<option selected='selected' value='".$r->RoomType."'>".$r->RoomType."</option>";
                                }
                                else{
                                    echo "<option value='".$r->RoomType."'>".$r->RoomType."</option>";
                                }
                            }
                        }
                        ?>
                    </select>
                </div>
            </form>
        </div>








        <?php
        if($matchingFreeRooms != null){
        ?>


        <div class="row">
            <table>
                <tr><th>Free Rooms Matching Your Criteria</th></tr>
                <?php
                foreach($matchingFreeRooms as $f){
                ?>
                <tr><td><?php echo $f ?></td></tr>
                <?php } ?>
            </table>
        </div>

        <?php
        }elseif(!empty($selectedRoomType) && empty($matchingFreeRooms)){echo "<p><strong>No free rooms matching your criteria</strong></p>";}
        ?>



    </div>



@endsection