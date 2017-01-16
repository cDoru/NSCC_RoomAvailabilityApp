<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Calendar Prototype</title>



        <link rel='stylesheet' href='/css/fullcalendar.css' />
        <script src='/js/jquery.min.js'></script>
        <script src='/js/moment.min.js'></script>
        <script src='/js/fullcalendar.js'></script>



        <script>$(document).ready(function() {

                // page is now ready, initialize the calendar...

                $('#calendar').fullCalendar({
                    // put your options and callbacks here
                    header: {
                        left: 'prev,next today ',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },



                    dayClick: function(date, jsEvent, view) {

                        alert('Clicked on: ' + date.format());

                        alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

                        alert('Current view: ' + view.name);

                        // change the day's background color just for fun
                        $(this).css('background-color', 'red');
                        $(this).text('Sample Data');
                    }



                })




            });</script>

    </head>
    <body>
        <div id='calendar'></div>
    </body>

</html>


