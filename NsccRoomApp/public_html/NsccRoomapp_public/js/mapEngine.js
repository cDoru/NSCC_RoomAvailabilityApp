//Below code handles web map widget and related for elements

$(document).ready(function(){

    /*
     Function to get coordinates of selected building.
     Takes a building value as a parameter and returns
     the coordinates of the building.

     Makes a call to the geoJSON data file via ajax
     and then sorts through the data client side to get
     the coordinates it needs.

     [todo] This will later be optimized to be a server side request
     [todo] to a database which will return coordinates.

    */
    function getBuildingCoordinates(building){
        $coords = "";
        jQuery.ajaxSetup({async:false});
        $.get("/Locate/CampusJSON", function(data) {
            var $buildingsObj = JSON.parse(data);
            $.each($buildingsObj.features, function() {
                if(this.properties.BUILDING == building) {
                    $coords = this.geometry.coordinates;
                    return false;

                }
            });
        });
        jQuery.ajaxSetup({async:true});
        return $coords;

    }

    /*
    Function to pan the map to the updated building.
    Called by both campus and building dropdown
    change events
     */
    function panMap(){
        $zoom = 14;
        var $featureCoords = getBuildingCoordinates($('#building').val());
        /*
         var selectedCampusFeature = map.querySourceFeatures('campuses', {
         filter: ['==', 'BUILDING', $('#campus').val()]
         });

         //$('#feature').html = '';
         if (selectedCampusFeature[0] == null){
         alert("could not find record with Building = " + $('#campus').val());
         }
         var $feature = $.parseJSON(JSON.stringify(selectedCampusFeature[0]));
         var $featureCoords = $feature.geometry.coordinates;

         document.getElementById('feature').innerHTML = JSON.stringify(selectedCampusFeature[0], null,2);
         */
        if($featureCoords == '') {
            $featureCoords = [-62.7826,45.1313];
            $zoom = 6;
        }
        map.flyTo({
            // These options control the ending camera position: centered at
            // the target, at zoom level 9, and north up.
            center: $featureCoords,
            zoom: $zoom,
            bearing: 0,

            // These options control the flight curve, making it move
            // slowly and zoom out almost completely before starting
            // to pan.
            speed: 0.6, // make the flying slow
            curve: 1, // change the speed at which it zooms out

            // This can be any easing function: it takes a number between
            // 0 and 1 and returns another number between 0 and 1.
            easing: function (t) {
                return t;
            }
        });
    }

    mapboxgl.accessToken = 'pk.eyJ1IjoicnlhbnN1dGMiLCJhIjoiY2l5MGhpZHBpMDA3eTJxbzl1cjI2aTNuZCJ9.vdbwWHcBIJmFQ383dVstXg';
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
        center: [-63.28,45.359], // starting position
        zoom: 6 // starting zoom
    });
    
    map.on('load', function () {

        map.addSource('ITCampus_f3', {
            type: 'vector',
            url: 'mapbox://ryansutc.74v4z534'
        });

        map.addSource('ITCampus_f2', {
            type: 'vector',
            url: 'mapbox://ryansutc.87s8r2jj'
        });

        map.addSource('ITCampus_f1', {
            type: 'vector',
            url: 'mapbox://ryansutc.be3w2hls'
        });

        map.addLayer({
            'id': 'ITCampus_f3_Selection',
            'type': 'fill',
            'source': 'ITCampus_f3',
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-outline-color': 'rgba(54,0,0,2.5)',
                'fill-color': 'rgba(255,0,0,0.55)'
            },
            'source-layer': 'Floor3-abu27v'
        });

        map.addLayer({
            'id': 'ITCampus_f3_All',
            'type': 'fill',
            'source': 'ITCampus_f3',
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'fill-outline-color': 'rgba(40,40,40,1)',
                'fill-color': 'rgba(80,80,80,0.2)'
            },
            'source-layer': 'Floor3-abu27v'
        });

        map.addLayer({
            'id': 'ITCampus_f2_Selection',
            'type': 'fill',
            'source': 'ITCampus_f2',
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-outline-color': 'rgba(54,0,0,2.5)',
                'fill-color': 'rgba(255,0,0,0.55)'
            },
            'source-layer': 'Floor2-4f0e42'
        });

        map.addLayer({
            'id': 'ITCampus_f2_All',
            'type': 'fill',
            'source': 'ITCampus_f2',
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-outline-color': 'rgba(40,40,40,1)',
                'fill-color': 'rgba(80,80,80,0.2)'
            },
            'source-layer': 'Floor2-4f0e42'
        });

        map.addLayer({
            'id': 'ITCampus_f1_Selection',
            'type': 'fill',
            'source': 'ITCampus_f1',
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-outline-color': 'rgba(54,0,0,2.5)',
                'fill-color': 'rgba(255,0,0,0.55)'
            },
            'source-layer': 'Floor1-8dqbwx'
        });

        map.addLayer({
            'id': 'ITCampus_f1_All',
            'type': 'fill',
            'source': 'ITCampus_f1',
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-outline-color': 'rgba(40,40,40,1)',
                'fill-color': 'rgba(80,80,80,0.2)'
            },
            'source-layer': 'Floor1-8dqbwx'
        });

        map.addLayer({
            'id': 'campuses',
            'type': 'symbol',
            'source': {
                'type': 'geojson',
                'data': './media/campuses.geoJSON',
                'layout': {
                    "text-field": "{BUILDING}",
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    "text-offset": [0, 0.6],
                    "text-anchor": "top",
                    'visibility': 'visible'
                }
            }
        });
    }); //end map.onLoad

    map.on('click', function(e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ['ITCampus_f3_All'] // replace this with the name of the layer
        });
        if (!features.length) {
            return;
        }

        var feature = features[0];
        //alert(features[0].properties.Text);
        var popup = new mapboxgl.Popup({ offset: [0, -15] })
            .setLngLat(feature.geometry.coordinates[0][0])
            .setHTML('<h3>' + feature.properties.BUILDING + '</h3><p>' + feature.properties.CAMPUS + '</p>')
            //.setLngLat(feature.geometry.coordinates)
            .addTo(map);
    });

    $('#building').change(function(){
        panMap();
        loadBuildingToggle();
    });
    $('#campus').change(function(){
        loadBuildingToggle();
        panMap();

    });

    function loadFLoors(){

        //zoom in a bit and restrict panning map to area
        var bounds = [
            [-63.616,44.664], // Southwest coordinates
            [-63.611, 44.68]  // Northeast coordinates
        ];
        map.setMinZoom(12);
        map.setMaxBounds(bounds);
        map.setCenter([-63.614, 44.669]);
        //switch background style to the empty one
        map.setStyle('mapbox://styles/ryansutc/cizmrlzl7001j2sp8909nbwel');

        var toggleableLayerIds = [ 'ITCampus_f3_All', 'ITCampus_f2_All', 'ITCampus_f1_All' ];

        for (var i = 0; i < toggleableLayerIds.length; i++) {
            var id = toggleableLayerIds[i];

            var link = document.createElement('a');
            link.href = '#';
            link.className = ' ';
            link.textContent = id;

            if (i == 0){
                link.className = 'active';
            }

            link.onclick = function (e) {
                var clickedLayer = this.textContent;
                e.preventDefault();
                e.stopPropagation();

                var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

                if (visibility === 'visible') {
                    //alert("already visible");
                } else {
                    this.className = 'active';
                    map.setLayoutProperty(clickedLayer, 'visibility', 'visible');

                    for (var i = 0; i < toggleableLayerIds.length; i++) {
                        if (toggleableLayerIds[i] != clickedLayer) {
                            map.setLayoutProperty(toggleableLayerIds[i], 'visibility', 'none');
                            $('#mapmenu').children('a').each(function() {

                                if(this.text == toggleableLayerIds[i]) {
                                    this.className = '';
                                }
                            });
                        }
                    }

                }
            };

            var layers = document.getElementById('mapmenu');
            layers.appendChild(link);
        }

    } //end loadFloors Function

    /*
    This loads the "Step into Building" button
    that is toggled in map when user has panned
    to a campus building that has a mapped floor plan
     */
    function loadBuildingToggle(){
        var link = document.createElement('a');
        link.href = '#';
        link.className = ' ';
        link.textContent = "Step into Building";

        link.onclick = function (e) {
            //var clickedLayer = this.textContent;
            e.preventDefault();
            e.stopPropagation();

            loadFLoors(); //load the floors button
        };

        var layers = document.getElementById('mapmenu');
        layers.html = "";
        layers.appendChild(link);
    } // loadBuildingToggle






});
