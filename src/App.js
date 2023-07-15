import React, { useState, useEffect } from "react";
import DatePickerComponent from "./DatePickerComponent";
import MapComponent from "./MapComponent";
import CalendarComponent from "./CalendarComponent";
import EventModal from "./EventModal";
import mapImage from "./map-image.png"; // Import the map image
import calendarImage from "./calendar-image.png"; // Import the calendar image

const MapPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 31);
    return tomorrow;
  });

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [view, setView] = useState('map'); // map or calendar
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  
  const updateIsMobile = () => {
    setIsMobile(window.innerWidth <= 768);
    setScreenHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);
  
  const onAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const onRemoveEvent = (eventToRemove) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event !== eventToRemove)
    );
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleSlotSelect = (slotInfo) => {
    console.log("Selected Slot:", slotInfo);
  };

  const handleAddEvent = (newEvent) => {
    // Update the events state with the new event
    setEvents([...events, newEvent]);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const toggleView = () => {
    setView(view === 'map' ? 'calendar' : 'map');
  };

  const getTogglePosition = () => {
    if (isMobile) {
      if (view === 'map') {
        return { bottom: '50%', right: 20 };
      } else if (view === 'calendar') {
        return { bottom: '47.5%', right: 0 };
      }
    }
    return {};
  };

  const contentHeight = isMobile ? 0.75 * screenHeight : 0.85 * screenHeight;
  
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <DatePickerComponent
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <div style={{ display: "flex", height: contentHeight + "px" }}>
        {(!isMobile || view === 'map') && (
          <MapComponent
            style={{ width: isMobile ? '100vw' : '50vw' }}
            startDate={startDate}
            endDate={endDate}
            onAddEvent={onAddEvent}
          />
        )}
        {(!isMobile || view === 'calendar') && (
          <CalendarComponent
            style={{ width: isMobile ? '100vw' : '50vw' }}
            events={events}
            onEventSelect={handleEventSelect}
            onSlotSelect={handleSlotSelect}
          />
        )}
        {selectedEvent && (
          <EventModal
            isOpen={!!selectedEvent}
            closeModal={closeModal}
            event={selectedEvent}
            onAddEvent={handleAddEvent}
            onRemoveEvent={onRemoveEvent}
          />
        )}
      </div>
      {isMobile && (
        <div style={{ position: 'fixed', ...getTogglePosition(), transform: 'translateY(-50%)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
          <img
            src={view === 'map' ? calendarImage : mapImage}
            alt={view === 'map' ? 'Switch to Calendar' : 'Switch to Map'}
            style={{ width: '50px', height: 'auto', cursor: 'pointer' }} // Adjusted width to '50px'
            onClick={toggleView}
          />
        </div>
      )}
    </div>
  );
};

export default MapPage;
