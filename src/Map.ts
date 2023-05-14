export interface Mappable {
    location: {
        lat: number;
        lng: number;
    },
    markerContent(): string
}

export class Map {
    private googleMap: google.maps.Map;

    constructor(divId) {
        this.googleMap = new google.maps.Map(document.getElementById(divId) as HTMLElement, {
            center: { lat: 0, lng: 0 },
            zoom: 2,
        });
    }

    addMarker(mappable: Mappable) {
        const marker = new google.maps.Marker({
            position: mappable.location,
            map: this.googleMap
        });
          
        marker.addListener('click', function () {
            const infowindow = new google.maps.InfoWindow({
                content: mappable.markerContent()
            });
            
            infowindow.open(this.googleMap, marker);
        });
    }

}