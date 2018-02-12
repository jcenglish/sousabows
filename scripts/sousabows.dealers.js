$(document).ready(function () {
// TODO Load map with all markers from the start... instead of loading them when you click on a directory link.
// That way, the directory links can center on the city with a radius of 30 (about the square root of Jacksonville's total area)
// Right now, the map is centering between the markers in that area... eg. Tampa centers between Gainesville and Tampa.
    var map;
    var markers = [];
    var allMarkers = [];
    var infoWindow;
    var $dealers;
    var radius = 15;

    loadMap();

    // Init map
    function loadMap() {

        var mapStyle = [
            {
                "featureType": "all",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "gamma": 0.5
                    },
                    {
                        "lightness": "42"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "lightness": "0"
                    }
                ]
            }
        ];
        map = new google.maps.Map(document.getElementById("map"), {
            center: new google.maps.LatLng(0, 0),
            zoom: 3,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
            styles: mapStyle,
            scrollwheel: false,
            mapTypeControl: false
        });

        infoWindow = new google.maps.InfoWindow();
        $dealers = $('#dealers');
        $dealers.onchange = function () {
            var markerNum = $dealers.options[$dealers.selectedIndex].value;
            if (markerNum != "none") {
                google.maps.event.trigger(markers[markerNum], 'click');
            }
        };

        loadAllDealers();
    }

//    $('.searchbox_radii').find('div').on('click', function () {
//        if (!$(this).hasClass('selected')) {
//            $(this).toggleClass('selected');
//            $(this).siblings().removeClass('selected');
//        }
//        radius = $(this).data('radius');
//    });

//    $('#map_search').find('.placeholder').on('click', function () {
//        // hide placeholder
//        $(this).hide();
//        // show input
//        $('.searchbox_radii, .searchbox').show().find('input').focus();
//    });

//    $('#pac-button').on('click', function (e) {
//        e.preventDefault();
//        $('#map_search').animate({'top': '-85%'}, 'slow', function () {
//            searchLocations($('#pac-input').val(), radius);
//        });
//    });
//
//    $('#pac-input').keypress(function (e) {
//        if (e.which == 13) {
//            $('#map_search').animate({'top': '-85%'}, 'slow', function () {
//                searchLocations($('#pac-input').val(), radius);
//            });
//            return false;    //<---- Add this line
//        }
//    });

    $('.action_close').on('click', function () {
        $('#dealers').addClass('hidden');
        clearLocations();
        $('#map').css('height', '85vh');
        google.maps.event.trigger(map, "resize");
    });

    $('.dir_city').on('click', function () {
        //$('#map_search').animate({'top': '-85%'}, 'slow');
        $('#map').css('height', '45vh');
        google.maps.event.trigger(map, "resize");
        radius = 15;
        searchLocations($(this).data('city') + ', ' + $(this).parent('.dir_state').data('state'));
    });

    function searchLocations(address) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({address: address}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                searchLocationsNear(results[0].geometry.location);
            } else {
                alert(address + ' not found'); //TODO REPLACE WITH OVERLAY
            }
        });
    }
    function clearLocations() {
        infoWindow.close();
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers.length = 0;

        $('#dealers >div').html("");
    }

    function loadAllDealers() {
        var searchUrl = './scripts/dealers_all.php';
        downloadUrl(searchUrl, function (data) {
            var xml = parseXml(data);
            var markerNodes = xml.documentElement.getElementsByTagName("marker");
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < markerNodes.length; i++) {
                var name = markerNodes[i].getAttribute("name");
                //var address = markerNodes[i].getAttribute("address");
                var address1 = markerNodes[i].getAttribute("address_1");
                var city = markerNodes[i].getAttribute("city");
                var state = markerNodes[i].getAttribute("state");
                var zipcode = markerNodes[i].getAttribute("zipcode");
                var phone = markerNodes[i].getAttribute("phone");
                //var distance = parseFloat(markerNodes[i].getAttribute("distance"));
                var latlng = new google.maps.LatLng(
                        parseFloat(markerNodes[i].getAttribute("lat")),
                        parseFloat(markerNodes[i].getAttribute("lng")));

                createOption(name, address1, city, state, zipcode, phone);
                createMarker(true, latlng, name, address1, city, state, zipcode, phone);
                //bounds.extend(latlng);
            }
        });
    }

    function searchLocationsNear(center) {
        
        clearLocations();
        var searchUrl = './scripts/dealers_nearest.php?lat=' + center.lat() + '&lng=' + center.lng() + '&radius=' + radius;
        downloadUrl(searchUrl, function (data) {
            var xml = parseXml(data);
            var markerNodes = xml.documentElement.getElementsByTagName("marker");
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < markerNodes.length; i++) {
                var name = markerNodes[i].getAttribute("name");
                //var address = markerNodes[i].getAttribute("address");
                var address1 = markerNodes[i].getAttribute("address_1");
                var city = markerNodes[i].getAttribute("city");
                var state = markerNodes[i].getAttribute("state");
                var zipcode = markerNodes[i].getAttribute("zipcode");
                var phone = markerNodes[i].getAttribute("phone");
                //var distance = parseFloat(markerNodes[i].getAttribute("distance"));
                var latlng = new google.maps.LatLng(
                        parseFloat(markerNodes[i].getAttribute("lat")),
                        parseFloat(markerNodes[i].getAttribute("lng")));

                createOption(name, address1, city, state, zipcode, phone);
                createMarker(false, latlng, name, address1, city, state, zipcode, phone);
                bounds.extend(latlng);
            }
            
            map.fitBounds(bounds);
            if (markerNodes.length == '1') {
                map.setZoom(17);
            }
            $dealers.removeClass('hidden');
            $dealers.onchange = function () {
                var markerNum = $dealers.options[$dealers.selectedIndex].value;
                google.maps.event.trigger(markers[markerNum], 'click');
            };
            
        });
    }
    function createMarker(all, latlng, name, address1, city, state, zipcode, phone) {
        var html = "<div class='dealer'><span class='dealer_name'>" + name + "</span>" + "<span class='dealer_address'>Address:<br>" + address1 + "<br>" + city + ", " + state + " " + zipcode + "</span>"
                + "<span class='dealer_phone'>Phone Number:<br>" + phone + "</span></div>";
        var marker = new google.maps.Marker({
            map: map,
            position: latlng,
            icon: 'img/icon_place.png'
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent(html);
            infoWindow.open(map, marker);
        });
        if (all == false) {
            markers.push(marker);
        }
        else {
            allMarkers.push(marker);
        }
    }

    function createOption(name, address1, city, state, zipcode, phone) {
        var option = document.createElement("div");
        option.className = "dealer";
        option.innerHTML = "<span class='dealer_name'>" + name + "</span>" + "<span class='dealer_address'>Address:<br>" + address1 + "<br>" + city + ", " + state + " " + zipcode + "</span>"
                + "<span class='dealer_phone'>Phone Number:<br>" + phone + "</span>";
        $dealers.children('div').append(option);
    }

    function downloadUrl(url, callback) {
        var request = window.ActiveXObject ?
                new ActiveXObject('Microsoft.XMLHTTP') :
                new XMLHttpRequest;

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                request.onreadystatechange = doNothing;
                callback(request.responseText, request.status);
            }
        };

        request.open('GET', url, true);
        request.send(null);
    }

    function parseXml(str) {
        if (window.ActiveXObject) {
            var doc = new ActiveXObject('Microsoft.XMLDOM');
            doc.loadXML(str);
            return doc;
        } else if (window.DOMParser) {
            return (new DOMParser).parseFromString(str, 'text/xml');
        }
    }

    function doNothing() {
    }
});