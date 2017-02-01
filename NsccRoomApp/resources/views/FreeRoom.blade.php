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
            <form action="" method="post" name="myform">
                {{ csrf_field() }}


                    <div class="form-group">
                        <label for="campus">Campus</label>
                        <select name="campus" id="campus" class="form-control">
                            <option value="0"></option>
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
                        <option value="0"></option>
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
                        <option value="0"></option>
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
            if($matchingRooms != null){
        ?>


        NOTE: THESE ARE NOT ACTUALLY THE AVAILABLE ROOMS...
        <div class="row">
            <table>
                <tr><th>Available Rooms</th></tr>
                <?php
                    foreach($matchingRooms as $m){
                ?>
                <tr><td><?php echo $m->Room ?></td></tr>
                <?php } ?>
            </table>
        </div>

        <?php } ?>

    </div>

@endsection