<template>
    <div class="flex flex-col w-full flex-1 h-full relative"
         @keydown.enter="applyArea">
        <div id="map"
             class="flex-1"></div>

        <div class="search-facets__submit p-10 border-t border-solid border-gray-100 bottom-0 z-10 bg-white-100 lg:mt-auto">
            <button class="btn -btn-small -btn-block"
                    :disabled="!dirty"
                    @click="applyArea">
                {{ $t("Labels.Catalog.Facets.Buttons.ApplyFilter") }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Loader } from '@googlemaps/js-api-loader';
import environment from '../../../../core/environment';
import productListStore from '../store/productListStore';
import { getCurrentQueryParam, setQueryParam, IRegionFacets } from '../regionQuerymethods';
import { defineComponent, ref, onBeforeUnmount } from 'vue-demi';

interface googleMapsCirclePartialViewModel {
    center: {
        lat: () => number,
        lng: () => number,
    },
    radius: number
}

const mapOptions: any = {
    center: {
        //Needs to be changed to user lat lng information - PHASE 2
        lat: 50.984768,
        lng: 11.02988,
    },
    zoom: 6,
    zoomControl: true,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
};
const loader: Loader = new Loader({
    apiKey: environment.googleApi.apiKey,
    version: '3.47', // https://developers.google.com/maps/documentation/javascript/releases#3.48.1 Running an old version so it will work in internet explorer until november 2022
    libraries: [],
});

export default defineComponent({
    name: 'GoogleMapsRadius',
    setup() {
        const dirty = ref(false);
        const circle = ref<googleMapsCirclePartialViewModel>();
        const googleMap = ref();
        const regionFacets = getCurrentQueryParam();
        productListStore.setSelectedRegion(regionFacets);

        // overwrite default start position if URL says something else
        setMapLocationFromStore();

        markAsDirty();
        
        function applyArea() {
            dirty.value = false;
            if (!circle.value) {
                return;
            }

            const facets: IRegionFacets = {
                geopoint: `${circle.value.center.lat()},${circle.value.center.lng()}`,
                radius: circle.value.radius.toString(),
            };

            setQueryParam(facets);
            productListStore.setSelectedRegion(facets);
        }

        function markAsDirty() {
            dirty.value = true;
        }

        let radius = 50000;
        if (productListStore.regionFacets?.radius) {
            radius = Number(productListStore.regionFacets?.radius);
        }

        loader.load().then(google => {
            googleMap.value = google;
            const map = new google.maps.Map(document.getElementById('map'), mapOptions);

            circle.value = new google.maps.Circle({
                strokeColor: '#000000',
                strokeOpacity: 0.8,
                strokeWeight: 3,
                fillColor: '#000000',
                fillOpacity: 0.35,
                map: map,
                center: map.center,
                radius: radius,
                editable: true,
            });

            const radiusBox = document.createElement('div');
            radiusBox.classList.add('radius-container');

            updateRadiusContainer(radiusBox);

            googleMap.value.maps.event.addListener(circle.value, 'radius_changed', function() {
                if (!circle.value) {
                    return;
                }
                updateRadiusContainer(radiusBox);
                markAsDirty();
            });

            googleMap.value.maps.event.addListener(circle.value, 'center_changed', markAsDirty);

            map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(radiusBox);

            //PHASE 2 - GEOLOCATION LOOKUP - START
            /*this.infoWindow = new google.maps.InfoWindow();

            const locationButton = document.createElement("button");

            locationButton.textContent = "Pan to Current Location";
            locationButton.classList.add("custom-map-control-button");

            this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
                locationButton
            );

            locationButton.addEventListener("click", () => {
                // Try HTML5 geolocation.
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };

                            this.infoWindow.setPosition(pos);
                            this.infoWindow.setContent("Location found.");
                            this.infoWindow.open(this.map);
                            this.map.setCenter(pos);
                        },
                        () => {
                            this.handleLocationError(
                                true,
                                this.infoWindow,
                                this.map.getCenter()
                            );
                        }
                    );
                } else {
                    // Browser doesn't support Geolocation
                    this.handleLocationError(
                        false,
                        this.infoWindow,
                        this.map.getCenter()
                    );
                }
            });*/
        }).catch((e) => {
            console.error(e);
        });

        function updateRadiusContainer(radiusBox: HTMLElement): void {
            if (circle.value) {
                const radiusKilometer = circle.value.radius / 1000;
    
                radiusBox.textContent = `${radiusKilometer.toFixed(0)} km`;
            }
        }

        function setMapLocationFromStore() {
            if (productListStore.regionFacets?.geopoint) {
                const lngAndLat = productListStore.regionFacets?.geopoint.split(',');
                mapOptions.center.lat = Number.parseFloat(lngAndLat[0]);
                mapOptions.center.lng = Number.parseFloat(lngAndLat[1]);
            }
        }

        onBeforeUnmount(() => {
            googleMap.value.maps.event.clearInstanceListeners(googleMap.value);
        });

        return {
            dirty,
            applyArea,
        };
    },
});
</script>

<style>
    .radius-container {
        border: 2px solid #000000;
        border-radius: 9999px;
        color: white;
        font-weight: 400;
        font-size: 15px;
        line-height: 19px;
        background: rgba(0, 0, 0, 0.5);
        padding: 10px;
        margin-left: 30px;
        margin-bottom: 20px;
    }
</style>
