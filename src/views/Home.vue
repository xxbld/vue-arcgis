<template>
  <div id="map" class="home"></div>
</template>

<script>
// const MapView = require('esri/views/MapView');
// const Map = require('esri/Map');
import MapView from "esri/views/MapView";
import SceneView from "esri/views/SceneView";
import Map from "esri/Map";

export default {
  name: "home",
  components: {},
  mounted() {
    var map = new Map({
      basemap: "streets",
      ground: "world-elevation"
    });
    // var view = new MapView({
    //   container: "map",
    //   map: map,
    //   center: [-118.71511, 34.09042],
    //   zoom: 11
    // });
    var view = new SceneView({
      container: "map", // Reference to the DOM node that will contain the view
      map: map // References the map object created in step 3
    });
  }
};
</script>
<style lang="scss">
.home {
  width: 100%;
  height: 600px;
}
</style>
