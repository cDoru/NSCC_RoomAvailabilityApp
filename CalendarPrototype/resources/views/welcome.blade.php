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
                        right: 'agendaWeek,agendaDay'
                    },

                    defaultView: 'agendaDay',

                    events: [
                        {
                            title: 'Nick\'s Event',
                            start: '2017-01-20T12:00:00',
                            end: '2017-01-20T13:00:00',
                            description: 'This is a cool event'
                        }
                        // more events here
                    ],
                    renderEvents: function(events, element) { //currently no qtip functionality installed
                        element.qtip({
                            content: events.description
                        });
                    },




                    eventClick: function(calEvent, jsEvent, view) {

                        alert('Event Description: ' + calEvent.description);
                        alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                        alert('View: ' + view.name);

                        // change the border color just for fun
                        $(this).css('border-color', 'red');

                    }



                })

            });</script>

    </head>
    <body>
        <div id='calendar'></div>
    </body>

</html>


