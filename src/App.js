import React, { useState } from "react";
import DatePickerComponent from "./DatePickerComponent";
import MapComponent from "./MapComponent";
import CalendarComponent from "./CalendarComponent";
import EventModal from "./EventModal";

const MapPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <DatePickerComponent
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <div style={{ display: "flex", height: "85vh" }}>
        <MapComponent
          style={{ width: "50vw" }}
          startDate={startDate}
          endDate={endDate}
          onAddEvent={onAddEvent}
        />
        <CalendarComponent
          style={{ width: "50vw" }}
          events={events}
          onEventSelect={handleEventSelect}
          onSlotSelect={handleSlotSelect}
        />
        {selectedEvent && (
          <EventModal
            isOpen={!!selectedEvent}
            closeModal={closeModal}
            event={selectedEvent}
            onAddEvent={handleAddEvent}
            onRemoveEvent={onRemoveEvent} // Add this prop
          />
        )}
      </div>
    </div>
  );
};

export default MapPage;
