
export default class GoogleMapObj {
	constructor(editor) {
		this.editor = editor;
		this.GOOGLE_API_KEY = this.editor.config.get("mapapi").googleApiKey;
		this.map = null;
		this.mapOptions = this.editor.config.get("mapapi").defaultOption;
		this.markers = [];
	}

	init() {
		let self = this;
		let script = document.createElement('script');
		script.src = `https://maps.googleapis.com/maps/api/js?key=${this.GOOGLE_API_KEY}&libraries=places&region=KR`;
		script.onload = function () {
			self.setApi();
			window.getImg=self.getImg;
		}
		document.head.appendChild(script);


	}
	setApi () {
		let self = this;
		this.map = new google.maps.Map(document.getElementById("ck-google-map"), this.mapOptions);

		const initialMarker = new google.maps.Marker({
			map: this.map,
			title: 'Initial position',
			position: this.mapOptions.center,
		});

		this.markers.push(initialMarker);
		// Create the search box and link it to the UI element.
		const input = document.getElementById("ck-pac-input");
		const searchBox = new google.maps.places.SearchBox(input);

		this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

		// Bias the SearchBox results towards current map's viewport.
		this.map.addListener("bounds_changed", () => {
			searchBox.setBounds(this.map.getBounds());
		});

		// Listen for the event fired when the user selects a prediction and retrieve
		// more details for that place.
		searchBox.addListener("places_changed", () => {
			this.mapOptions.center = { lat: this.map.center.lat(), lng: this.map.center.lng() }
			console.log("change Center", this.mapOptions.center);
			const places = searchBox.getPlaces();
			if (places.length == 0) {
				return;
			}

			// Clear out the old markers.
			this.markers.forEach((marker) => {
				marker.setMap(null);
			});
			this.markers = [];

			// For each place, get the icon, name and location.
			const bounds = new google.maps.LatLngBounds();
			places.forEach((place) => {
			if (!place.geometry || !place.geometry.location) {
				console.log("Returned place contains no geometry");
				return;
			}

			// Create a marker for each place.
			this.markers.push(
				new google.maps.Marker({
					map : this.map,
					// icon,
					title: place.name,
					position: place.geometry.location,
				})
			);
			if (place.geometry.viewport) {
				// Only geocodes have viewport.
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
			});
			this.map.fitBounds(bounds);


		});
		google.maps.event.addListener(this.map, 'idle',function (){
			self.mapOptions.zoom = this.getZoom();
			self.mapOptions.center = { lat: this.getCenter().lat() , lng: this.getCenter().lng() }
		});
	}
	getImgUrl () {
		let divmap = document.getElementById('ck-google-map');
		let staticOptions = {
			size : `${divmap.offsetWidth}x${divmap.offsetHeight}`,
			zoom : this.map.zoom,
			center : `${this.map.center.lat()},${this.map.center.lng()}`,
			markers : ''
		}
		for(let item of this.markers){
			if(staticOptions.markers) staticOptions.markers += '|';
			staticOptions.markers+= `${item.getPosition().lat()},${item.getPosition().lng()}`;
		}
		let url = `https://maps.googleapis.com/maps/api/staticmap?key=${this.GOOGLE_API_KEY}&${new URLSearchParams(staticOptions)}`;
		// const response = await fetch(url);
		// const data = await response.blob();
		// const metadata = { type : data.type };
		// const file = new File([data],"MapImage",metadata);
		// // const img = document.createElement('img');

		// let img = document.createElement("img");
		// img.src = url;
		return url;
	}
	async getImgBlob(imageUrl) {
		const response = await fetch(imageUrl);
		const blob = await response.blob();
		const file = new File([blob], 'google-map', { type: 'image/png' });

		return file;
	}
}
