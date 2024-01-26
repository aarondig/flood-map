
import './App.css';
import { useState, useEffect, useRef } from 'react';
import requestData from './apis/floodapi';
import mapboxgl from 'mapbox-gl';
import AddLayer from './apis/addlayer';

function App() {
// Pulling Data

  // useEffect(() => {
  //   const data = async () => {
  //     const res = await requestData();
  //     console.log(res);
  //   } 
  //   data();
  // },[])
  


  // var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');


  const mapContainer = useRef(null);
const map = useRef(null);
const [lat, setLat] = useState(51.5072);
const [lng, setLng] = useState(-.12);
const [zoom, setZoom] = useState(9);

  mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyb25kaWciLCJhIjoiY2tobnMzNnYwMDR1ejM1bzU1b2cyNnljNCJ9.qtupNlfb7Jam-q_Gdg0z2Q';

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/aarondig/clp5rp7fd00i701qtcx4lf9oy',
    center: [lng, lat],
    zoom: zoom
    });
      //  map.current.on('move', () => {
      // setLng(map.current.getCenter().lng.toFixed(4));
      // setLat(map.current.getCenter().lat.toFixed(4));
      // setZoom(map.current.getZoom().toFixed(2));
      // });
    
      map.current.on('load', () => {
        
        
        fetch(
          "https://environment.data.gov.uk/flood-monitoring/id/floods",
          {
            method: "GET",
            headers: {},
          }
        )
          .then((response) => {
            
            return response.json();
          })
          .then((res) => {
            
            return res.items.map((e, i)=>{
              map.current.addSource(`flood-warning-${i}`, {
                type: "geojson",
                data: e.floodArea.polygon,
              });
              map.current.addLayer({
                id: `flood-warning-${i}`,
                type: "fill",
                source: `flood-warning-${i}`, // reference the data source
                layout: {},
                paint: {
                  'fill-color': '#0080ff', // blue color fill
                  'fill-opacity': 0.5
                },
              })
              // Add a black outline around the polygon.
              // map.current.addLayer({
              //   id: `outline-${i}`,
              //   type: "line",
              //   source: `flood-warning-${i}`,
              //   layout: {},
              //   paint: {
              //     'line-color': '#000',
              //     'line-width': 1
              //   },
              // });

            })


        
          })
          .catch((error) => {
            console.log("Something went wrong " + error);
          });
        
        

        // Add a custom vector tileset source. This tileset contains
        // point features representing museums. Each feature contains
        // three properties. For example:
        // {
        //     alt_name: "Museo Arqueologico",
        //     name: "Museo Inka",
        //     tourism: "museum"
        // }
        map.current.addSource('recorded', {
        type: 'vector',
        url: 'mapbox://aarondig.3bhbkets'
        });
        map.current.addLayer({
          'id': 'recorded',
          'type': 'fill',
          'source': 'recorded',
          'source-layer': 'Recorded_Flood_Outlines-2-5hl4jw',
          'layout': {
          // Make the layer visible by default.
          'visibility': 'visible',
          // 'line-join': 'round',
          // 'line-cap': 'round'
          },
          
          'paint': {
            'fill-color': '#3BA8A7',
            "fill-opacity": .5,
            
          // 'line-color': '#877b59',
          // 'line-width': 1
          }
      })
    })
    

    map.current.on('idle', () => {
      // If these two layers were not added to the map, abort
      if (!map.current.getLayer('recorded')) {
      return;
      }
       
      // Enumerate ids of the layers.
      const toggleableLayerIds = ['recorded'];
       
      // Set up the corresponding toggle button for each layer.
      for (const id of toggleableLayerIds) {
      // Skip layers that already have a button set up.
      if (document.getElementById(id)) {
      continue;
      }
       
      // Create a link.
      const link = document.createElement('a');
      link.id = id;
      link.href = '#';
      link.textContent = id;
      link.className = 'active';
       
      // Show or hide layer when the toggle is clicked.
      link.onclick = function (e) {
      const clickedLayer = this.textContent;
      e.preventDefault();
      e.stopPropagation();
       
      const visibility = map.current.getLayoutProperty(
      clickedLayer,
      'visibility'
      );
       
      // Toggle layer visibility by changing the layout object's visibility property.
      if (visibility === 'visible') {
      map.current.setLayoutProperty(clickedLayer, 'visibility', 'none');
      this.className = '';
      } else {
      this.className = 'active';
      map.current.setLayoutProperty(
      clickedLayer,
      'visibility',
      'visible'
      );
      }
      };
       
      const layers = document.getElementById('menu');
      layers.appendChild(link);
      }
      });

    });

    useEffect(() => {
    
    
  
    },[])


    const [flood, setFlood] = useState(false);

    const onClick = () =>{
      console.log(flood)
      setFlood(!flood);
    }

  return (
    <div id="App" className="App" >
      
<nav id="menu" ></nav>

      <div id="map" ref={mapContainer} onClick={()=> onClick()}>

      </div>

      {/* {flood && <AddLayer map={map.current}/>} */}
      
    </div>
  );
}

export default App;
