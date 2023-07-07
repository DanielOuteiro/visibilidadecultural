import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { format } from "date-fns";
import { parseISO } from "date-fns";
import "./event-modal.css"; // Import the event-modal.css file

const EventModal = ({
  isOpen,
  closeModal,
  event,
  onAddEvent,
  onRemoveEvent,
  thumbnail,
}) => {
  const [addedDays, setAddedDays] = useState([]);
  const [buttonState, setButtonState] = useState([]);

  useEffect(() => {
    setButtonState(new Array(event.eventDays.length).fill("red"));
  }, [event]);

  const toggleDay = (day, index) => {
    const currentIndex = addedDays.findIndex((addedDay) => addedDay === day);
    if (currentIndex !== -1) {
      setAddedDays((prevAddedDays) => [
        ...prevAddedDays.slice(0, currentIndex),
        ...prevAddedDays.slice(currentIndex + 1),
      ]);
      onRemoveEvent(event);

      setButtonState((prev) => {
        let newState = [...prev];
        newState[index] = "remove";
        return newState;
      });
    } else {
      setAddedDays((prevAddedDays) => [...prevAddedDays, day]);
      onAddEvent({
        title: event.title,
        start: day,
        end: day,
        allDay: true,
        locality: event.locality,
        eventDays: [day],
      });

      setButtonState((prev) => {
        let newState = [...prev];
        newState[index] = "green";
        return newState;
      });

      setTimeout(() => {
        setButtonState((prev) => {
          let newState = [...prev];
          newState[index] = "remove";
          return newState;
        });
      }, 2000);
    }
  };

  const isSameDate = event.event_date === event.event_end_date;
  const showEventTime = event.event_time.substring(0, 5) !== "00:00";

  function formatFollowerCount(count) {
    if (count >= 1000000) {
      return (Math.floor(count / 100000) / 10).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (Math.floor(count / 100) / 10).toFixed(1) + "K";
    } else {
      return count.toString();
    }
  }

  const getButtonLabel = (day, index) => {
    const dayNumber = index + 1;
    const isAdded = addedDays.includes(day);
  
    if (event.eventDays.length === 1) {
      return isAdded
        ? "Remove from calendar"
        : `Add ${event.title} to calendar`;
    } else {
      return isAdded
        ? "Remove from calendar"
        : `Add ${event.title} - Day ${dayNumber}`;
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Event Modal"
      style={{
        overlay: {
          zIndex: 999,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      }}
    >
      <div className="event-modal-content">
        <div className="left-content">
          <div className="content-thumbnail">
            <img src={thumbnail} alt="Thumbnail" />
          </div>{" "}
          <div className="info-container">
            <p className="venue-name">{event.venue_name}</p>
            <div className="date-time">
              <p className="event-date">
                {format(parseISO(event.event_date), "MMMM d")}
                {isSameDate
                  ? ""
                  : ` - ${format(parseISO(event.event_end_date), "MMMM d")}`}
              </p>
              {showEventTime && (
                <p className="event-time">{event.event_time.substring(0, 5)}</p>
              )}
            </div>
          </div>
        </div>

        <div className="right-content">
          <h2 className="event-title">{event.title}</h2>
          <div className="spotify-followers">
            <div className="spotify-icon">
              <img src="icons/spotify.svg" alt="Spotify Icon" />
            </div>
            <div className="followers-info">
              <p className="followers-count">
                {formatFollowerCount(event.spotify_followers)}
              </p>
              <p className="followers-label">Followers</p>
            </div>
            <div className="play-icon">
              <img src="icons/play.svg" alt="Play Icon" />
            </div>
          </div>
          <div className="event-description">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              accumsan quam non mi dignissim, vitae tempus nisl viverra. Nullam
              tristique purus sit amet finibus fermentum. Etiam consequat nisi
              non nibh lobortis, nec consectetur tellus tempus. Sed malesuada
              euismod tortor in eleifend. Aliquam quis consectetur velit. Ut
              sagittis rutrum nibh, a auctor ipsum molestie id. Proin sed magna
              vitae quam posuere ullamcorper. Mauris sagittis facilisis ex, non
              pellentesque enim dapibus vel. Sed viverra diam in sapien
              venenatis, eget ullamcorper erat semper. Curabitur mollis volutpat
              enim, sit amet dignissim risus auctor non. Proin a purus rutrum,
              scelerisque ex ut, aliquet erat. Praesent posuere magna ut rutrum
              condimentum.
            </p>
          </div>
        </div>
      </div>

      <div className="blured-bg">
        <img src={thumbnail} alt="Thumbnail" />
      </div>

      <button className="close-button" onClick={closeModal}>
        <img src="/icons/close.svg" alt="Close" />
      </button>

      <div className="button-container">
        {event.eventDays &&
          event.eventDays.map((day, index) => (
            <button
              key={index}
              className={`calendar-button ${buttonState[index]}`}
              onClick={() => toggleDay(day, index)}
            >
              {buttonState[index] === "green" ? (
                <>
                  <img
                    src="/icons/check.svg"
                    alt="Check Icon"
                    style={{
                      marginRight: "10px",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                  Added to calendar
                </>
              ) : (
                getButtonLabel(day, index)
              )}
            </button>
          ))}
      </div>
    </ReactModal>
  );
};

export default EventModal;