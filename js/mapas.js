function iniciarMap(){
    let coord = {lat:-34.58421 ,lng: -58.57449};
    let map = new google.maps.Map(document.querySelector('#mapa'),{
      zoom: 10,
      center: coord
    });
    let marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}