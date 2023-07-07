import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  parseISO,
  format,
  eachDayOfInterval,
} from "date-fns";
import "./MapComponent.css";
import EventModal from "./EventModal";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGFuaWVsb3V0ZWlybyIsImEiOiJja2FmNGtqd2YyNmUwMnRtdDV0dmQ3b3YzIn0.z2KLfHt8YuHzQ3v50au8yg";

const MapComponent = ({ startDate, endDate, onAddEvent }) => {
  const mapContainerRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [visibleMarkers, setVisibleMarkers] = useState([]);

  function formatEventDate(dateString) {
    const eventDate = parseISO(dateString);
    return format(eventDate, "dd MMMM yyyy");
  }

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-8, 39],
      zoom: 6.2,
      minZoom: 5,

    });

    map.on("load", async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/DanielOuteiro/drop/main/all_posts_PT.json");
        const data = await response.json();

        const filteredData = data.filter((marker) => {
          const eventStartDate = parseISO(marker.event_date);
          const eventEndDate = parseISO(marker.event_end_date);
        
          if (selectedType === "both") {
            return (
              (startDate <= eventEndDate && endDate >= eventStartDate) ||
              (eventStartDate <= endDate && eventEndDate >= startDate)
            );
          } else if (selectedType === "festival") {
            return (
              ((startDate <= eventEndDate && endDate >= eventStartDate) ||
                (eventStartDate <= endDate && eventEndDate >= startDate)) &&
              marker.type === "festival"
            );
          } else if (selectedType === "show") {
            return (
              ((startDate <= eventEndDate && endDate >= eventStartDate) ||
                (eventStartDate <= endDate && eventEndDate >= startDate)) &&
              marker.type === "show"
            );
          }
          return false; // add this line

        });
        
        

        // Update visible markers on map load
        const bounds = map.getBounds();
        const initialVisibleMarkers = filteredData.filter((marker) => {
          const lngLat = [parseFloat(marker.lng), parseFloat(marker.lat)];
          return bounds.contains(lngLat);
        });
        setVisibleMarkers(initialVisibleMarkers);

        filteredData.forEach((marker) => {
          const eventStartDate = parseISO(marker.event_date);
          const eventEndDate = parseISO(marker.event_end_date);
          const eventDays = eachDayOfInterval({
            start: eventStartDate,
            end: eventEndDate,
          });

          marker.eventDays = eventDays;

          const customMarkerEl = document.createElement("div");
          customMarkerEl.className = "custom-marker";

          const markerImg = document.createElement("img");
          markerImg.src = marker.thumbnail;

          markerImg.style.width = "50px"; // Set appropriate size
          markerImg.style.height = "50px"; // Set appropriate size

          customMarkerEl.appendChild(markerImg);

          const [offsetLng, offsetLat] = getRandomOffset(); // Get random offset

          const markerInstance = new mapboxgl.Marker(customMarkerEl)
            .setLngLat([
              parseFloat(marker.lng) + offsetLng, // Apply offset to longitude
              parseFloat(marker.lat) + offsetLat, // Apply offset to latitude
            ])
            .addTo(map);

          markerInstance.getElement().addEventListener("click", () => {
            setSelectedMarker(marker);
          });
        });

        function getRandomOffset() {
          const offsetRange = 0.005; // Adjust this value to control the offset range

          // Generate random offsets within the specified range
          const offsetLng = Math.random() * (offsetRange * 2) - offsetRange;
          const offsetLat = Math.random() * (offsetRange * 2) - offsetRange;

          return [offsetLng, offsetLat];
        }

        // Update visible markers on map move
        map.on("moveend", () => {
          const bounds = map.getBounds();
          const visibleMarkers = filteredData.filter((marker) => {
            const lngLat = [parseFloat(marker.lng), parseFloat(marker.lat)];
            return bounds.contains(lngLat);
          });
          setVisibleMarkers(visibleMarkers);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });

    return () => map.remove();
  }, [startDate, endDate, selectedType, onAddEvent]);


  return (
    <div className="map-container">
      <div ref={mapContainerRef} className="map" />

      {selectedMarker && (
        <EventModal
          isOpen={!!selectedMarker}
          event={selectedMarker}
          closeModal={() => setSelectedMarker(null)}
          onAddEvent={onAddEvent}
          thumbnail={selectedMarker.thumbnail} // Pass the thumbnail property
        />
      )}

      <div className="list-container">
        {visibleMarkers.length === 0 ? (
          <div className="no-events">No events found, please change your dates or search in a different area</div>
        ) : (
          <div className="list">
            {visibleMarkers.map((marker) => (
              <div
                key={marker.id}
                className="event-item"
                onClick={() => setSelectedMarker(marker)}
              >
                <div className="event-date-thumb">
                  {formatEventDate(marker.event_date)}
                </div>
                <div className="event-thumbnail">
                  <img src={marker.thumbnail} alt="Event Thumbnail" />
                </div>
                <div className="event-title-thumb">{marker.title}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
