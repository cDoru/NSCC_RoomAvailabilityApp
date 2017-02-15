//Below code handles web map widget and related for elements

$(document).ready(function () {

	//handle find room button click to highlight room on map
	$("#FindRoom").click(function (event) {
		var room = $('#RoomNo').val();
		map.setFilter('ITCampus_f3_Selection', ['==', 'Room', room]);
		map.setLayoutProperty('ITCampus_f3_Selection', 'visibility', 'visible');
		
		map.setFilter('ITCampus_f2_Selection', ['==', 'Room', room]);
		map.setLayoutProperty('ITCampus_f2_Selection', 'visibility', 'visible');
		
		map.setFilter('ITCampus_f1_Selection', ['==', 'Room', room]);
		map.setLayoutProperty('ITCampus_f1_Selection', 'visibility', 'visible');
	});

	//Handles buttons that toggle between floors of Building
	 $("#floor").on('click', null, function (e) {
        var clickedLayer = this.textContent;
		alert("clicked");
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            //map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            //this.className = '';
			
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
			//turn all other layers off
			for (var i = 0; i < toggleableLayerIds.length; i++) {
				if (toggleableLayerIds[i] != clickedLayer) {
					 map.setLayoutProperty(toggleableLayerIds[i], 'visibility', 'none');
					 toggleableLayerIds[i].className = '';
				}
			}
        }
    });
});

