const requestData = () =>
  fetch(
    "http://environment.data.gov.uk/flood-monitoring/id/floodAreas/122WAC953",
    {
      method: "GET",
      headers: {
        // "X-Api-Key": "boSbGSKgKnoMtdwEjxT0a8Bymy6LaOIaJGWAX0dY ",
        // in_office: true,
      },
    }
  ).then(response => {
     return response.json();
    })
    .catch(error => {
      console.log("Something went wrong " + error);
    });

export default requestData;
