import React, { useEffect, useState } from "react";
import requestData from "./floodapi";

function AddLayer({ map }) {
  const [coordinates, setCoordinates] = useState();

  const get = async () =>
    fetch(
      "https://www.climatenode.org/maps/data/geoJSON/UFFE_all.json",
      {
        method: "GET",
        headers: {},
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        fetch(res, {
          method: "GET",
          headers: {},
        })
          .then((r) => {
            return r.json();
          })
          .then((d) => {
            // setCoordinates(d.features[0].geometry.coordinates)

            d.map((e, i) => {
              // console.log(map)

              map.addSource(`flood-warning-${i}`, {
                type: "geojson",
                data: {
                  type: "Feature",
                  geometry: {
                    type: "Polygon",
                    // These coordinates outline Maine.
                    coordinates: [
                      [
                        e[0].map((element, index) => {
                          return element;
                        }),
                      ],
                    ],
                  },
                },
              });
              map.addLayer({
                id: `flood-warning-${i}`,
                type: "fill",
                source: `flood-warning-${i}`, // reference the data source
                layout: {},
                paint: {
                  "fill-color": "#FF0000", // blue color fill
                  "fill-opacity": 1,
                },
              });
              // Add a black outline around the polygon.
              map.addLayer({
                id: `outline-${i}`,
                type: "line",
                source: `flood-warning-${i}`,
                layout: {},
                paint: {
                  "line-color": "#FF0000",
                  "line-width": 3,
                },
              });
            });

            return d;
          });
      })
      .catch((error) => {
        console.log("Something went wrong " + error);
      });

// useEffect(()=>{
// get();
// },[])

  // if (map !== null) {

  // }
  // useEffect(() => {

  // },[])

  // useEffect(()=>{
  //   console.log(coordinates);
  // },[coordinates])
}

export default AddLayer;
