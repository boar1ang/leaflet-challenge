//JavaScript file for leaflet-challenge

//Initialize map object:
 let myMap = L.map("map", {
  center: [31.5, -99.2],
  zoom: 2.5
  //layers: [lightmap, circles]
  });

  //Create & load tile layer:
  var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 9,
  minZoom: 1,
  id: "mapbox.streets",
  accessToken: accessToken
  }).addTo(myMap);
  
  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 9,
  id: "mapbox.dark",
  accessToken: accessToken
}).addTo(myMap);


//Source data endpoint:
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"
        
//API call to external USGS data
d3.json(url, function(data) {
L.geoJson(data.features);
console.log(data.features);

let quakeData = data.features;
for (var i = 0; i < quakeData.length; i++) {

        coordinates = [quakeData[i].geometry.coordinates[1], quakeData[i].geometry.coordinates[0]];
          console.log(coordinates);
        
        properties = quakeData[i].properties;
          console.log(properties);
                         
            if(properties.mag <5.5) {
                fillColor = "#ffffb2";
                }
            else if (properties.mag <6.5) {
               
              fillColor = "#fd8d3c";

                }
            else if (properties.mag<7.5) {
                
                fillColor = "#f03b20";
                }
            else {
                
                fillColor = "#bd0026";
            };

          circArr = [];  
          
          let circles = L.circle(coordinates, {
            fillOpacity: 0.7,
            color: "black",
            fillColor: fillColor,
            radius: (properties.mag * 20000)
            }).addTo(myMap)
              .bindPopup("<h3>Magnitude: " + properties.mag + " " + properties.type + "</h3><hr><h3>Location:" + properties.place + "</h3>");
            circArr.push(circles);    

    } //END of "for" loop
    
    
    let earthquakes = L.layerGroup(circArr);
    
    //Create baseMaps object:
    var baseMaps = {
    "Light Map" : lightmap,
    "Dark Map" : darkmap
      };

    //Create overlayMaps object:
    var overlayMaps = {
    "Earthquakes": earthquakes
      };    

    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
      }).addTo(myMap); 
    
      let legend = L.control({
      position: 'bottomright'});
     
    
     legend.onAdd = function(myMap) {
      
        let div = L.DomUtil.create("div", "info legend");
        
        let colorArr = ["#ffffb2", "#fd8d3c", "#f03b20", "#bd0026"];

        let labels = ["4.5 - 5.4", "5.5 - 6.4", "6.5 - 7.4", "7.5 +"];

        for (var j = 0; j < labels.length; j++) {
          div.innerHTML += '<b style="background:' + colorArr[j] + '">&nbsp;Mag.&nbsp;' + labels[j] + '&nbsp;&#124;</b>';
        }     
        return div;
    };

    legend.addTo(myMap); 
        
      

  }); //END of API/GeoJSON function(data)  ++++++++++++++++++++++++++++++++++++++++++++++++++    

  

    
  

  

