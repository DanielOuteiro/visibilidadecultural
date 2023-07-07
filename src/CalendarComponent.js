import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment"; // Import moment library
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendarStyles.css"; // Import the custom CSS file

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events, onEventSelect, onSlotSelect }) => {
  return (
    <div className="dark-calendar"> {/* Apply the dark-calendar class */}
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectEvent={onEventSelect}
        onSelectSlot={onSlotSelect}
      />
    </div>
  );
};

export default CalendarComponent;