// This example creates a simple polygon representing the Bermuda Triangle. Note
// that the code specifies only three LatLng coordinates for the polygon. The
// API automatically draws a stroke connecting the last LatLng back to the first
// LatLng.
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: 30.27, lng: -97.74 },
    mapTypeId: "roadmap",
  });
  const geocoder = new google.maps.Geocoder();
  document.getElementById("submit").addEventListener("click", () => {
  geocodeAddress(geocoder, map);
  });



  // Define the LatLng coordinates for the polygon's path. Note that there's
  // no need to specify the final coordinates to complete the polygon, because
  // The Google Maps JavaScript API will automatically draw the closing side.
/*  const triangleCoords = [
    { lat: 25.774, lng: -80.19 },
    { lat: 20.12, lng: -73.154},
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
  ];

  const camerabounds = [

  ];

  const bermudaTriangle = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    editable: true,
    draggable: true,
    //geodesic: true,
  });
  bermudaTriangle.setMap(map); */
}

function geocodeAddress(geocoder, resultsMap) {
  const address = document.getElementById("address").value;
  geocoder
    .geocode({ address: address })
    .then(({ results }) => {
      resultsMap.setCenter(results[0].geometry.location);
      resultsMap.setZoom(18);
      new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
      });
    })
    .catch((e) =>
      alert("Geocode was not successful for the following reason: " + e)
    );
}
