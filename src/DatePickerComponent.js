import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css"; // Import the custom CSS file

const DatePickerComponent = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      type="text"
      className="custom-input"
      value={value}
      onClick={onClick}
      readOnly
      ref={ref}
    />
  ));

  const setStartDateAndUpdateEndDate = (date) => {
    if (endDate && date > endDate) {
      setEndDate(date);
    }
    setStartDate(date);
  };


  return (
    <div className="picker-div">
      <div className="start-picker">
        <DatePicker
          selected={startDate}
          onChange={setStartDateAndUpdateEndDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="MMM d" // Format the date as "July 12"
          customInput={<CustomInput />}
        />
      </div>
      <div className="end-picker">
        <DatePicker
          selected={endDate}
          onChange={setEndDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="MMM d" // Format the date as "July 12"
          customInput={<CustomInput />}
        />
      </div>
    </div>
  );
};

export default DatePickerComponent;
