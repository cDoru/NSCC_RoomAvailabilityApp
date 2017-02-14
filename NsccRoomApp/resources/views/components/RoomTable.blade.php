
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