import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CustomTimeline.css'; // Custom CSS file for timeline styles

const localizer = momentLocalizer(moment);

const MyCalendar = props => (
  <div>
    <Calendar
      localizer={localizer}
      events={[
        {
          'title': 'DaWeasel',
          'start': new Date(2023, 6, 17, 15, 0),
          'end': new Date(2023, 6, 17, 17, 30)
        },
        {
          'title': 'Vital',
          'start': new Date(2023, 6, 17, 14, 30),
          'end': new Date(2023, 6, 17, 15, 30)
        }
        // more events...
      ]}
      startAccessor="start"
      endAccessor="end"
      defaultView="day"
      views={['day']}
      defaultDate={new Date(2023, 6, 17)}
      components={{
        toolbar: () => null,
      }}
      min={new Date(2023, 6, 17, 12, 0)}  // Start time at 12 PM
      max={new Date(2023, 6, 17, 23, 59)}  // End time at 11:59 PM
      formats={{ 
        timeGutterFormat: (date, culture, localizer) =>
          localizer.format(date, 'HH:mm', culture),
      }}
    />
  </div>
);

export default MyCalendar;