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
            $('#rooms').change(function(){
                myform.submit();
            });
        });


    </script>



    <div class="container col-md-6 col-md-offset-3">
        <div class="row">
            <h1>NSCC Room Availability App</h1>
            <h3>Find a room's schedule</h3>
            <form action="" method="post" name="myform">
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
                    <label for="rooms">Room</label>
                    <select name="rooms" id="rooms" class="form-control">
                        <option value="0">&#60;Select A Room&#62;</option>
                        <?php
                        if(is_array($rooms))
                        {
                            foreach($rooms as $r)
                            {
                                if($r->room == $selectedRoom){
                                    echo "<option selected='selected' value='".$r->room."'>".$r->room."</option>";
                                }
                                else{
                                    echo "<option value='".$r->room."'>".$r->room."</option>";
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

        <?php } ?>



    </div>


@endsection