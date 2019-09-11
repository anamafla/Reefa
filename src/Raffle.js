import React, { useEffect, useReducer } from "react";
import axios from "axios";
import Roulette from "./Roulette";
import Search from "./Search";
import queryString from "query-string";
import Spinner from "./Spinner";
import ReactGA from "react-ga";
import { animated } from "react-spring";
import RaffleReducer from "./reducers/RaffleReducer";

import {
  SET_URL_NAME,
  SET_EVENT_ID,
  SET_GROUPS,
  SET_EVENTS,
  SET_ATTENDANCE_LIST,
  SET_SIZE_ROULETTE,
  SET_STATUS_MESSAGE,
  SET_LOADING
} from "./reducers/types";

function Raffle(props) {
  const AnimatedRoulette = animated(Roulette);

  const initialState = {
    urlName: "",
    eventId: "",
    groups: [],
    events: [],
    attendanceList: [],
    sizeRoulette: 7,
    statusMessage: "",
    loading: false
  };

  const [state, dispatch] = useReducer(RaffleReducer, initialState);

  const {
    urlName,
    eventId,
    groups,
    events,
    attendanceList,
    sizeRoulette,
    statusMessage,
    loading
  } = state;

  useEffect(() => {
    const { access_token } = queryString.parse(props.location.hash);

    localStorage.setItem("access_token", access_token);

    getGroups(access_token);

    if (process.env.REACT_APP_GA_TRACKING_ID) {
      ReactGA.pageview("/raffle");
    }
  }, []);

  const getGroups = access_token => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.meetup.com/self/groups?access_token=${access_token}&sign=true&photo-host=public&page=20`
      )
      .then(response => {
        dispatch({ type: SET_GROUPS, groups: response.data });
      })
      .catch(error => {
        dispatch({
          type: SET_STATUS_MESSAGE,
          statusMessage: "An error has ocurred"
        });
      });
  };

  const handleChangeName = e => {
    dispatch({ type: SET_URL_NAME, urlName: e.target.value });
    dispatch({ type: SET_EVENTS, events: [] });
  };

  useEffect(() => {
    if (urlName) {
      getEventsByGroup();
      resetGame();
    }
  }, [urlName]);

  const handleChangeEventId = e => {
    dispatch({ type: SET_EVENT_ID, eventId: e.target.value });
  };

  useEffect(() => {
    if (eventId) {
      getAttendanceList();
      resetGame();
    }
  }, [eventId]);

  const resetGame = () => {
    dispatch({
      type: SET_ATTENDANCE_LIST,
      attendanceList: []
    });

    dispatch({
      type: SET_STATUS_MESSAGE,
      statusMessage: ""
    });
  };

  const getEventsByGroup = () => {
    dispatch({ type: SET_LOADING, loading: true });

    if (urlName) {
      const access_token = localStorage.getItem("access_token");

      const getPastEvents = () => {
        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.meetup.com/${urlName}/events?access_token=${access_token}&sign=true&photo-host=public&page=5&desc=true&status=past`
        );
      };

      const getUpcomingEvent = () => {
        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.meetup.com/${urlName}/events?access_token=${access_token}&sign=true&photo-host=public&page=1&desc=false&status=upcoming`
        );
      };

      axios
        .all([getUpcomingEvent(), getPastEvents()])
        .then(response => {
          const events = [...response[0].data, ...response[1].data];

          dispatch({ type: SET_EVENTS, events: events });

          dispatch({ type: SET_LOADING, loading: false });
        })
        .catch(error => {
          dispatch({
            type: SET_STATUS_MESSAGE,
            statusMessage: "An error has ocurred"
          });
        });
    } else {
      dispatch({ type: SET_EVENTS, events: [] });
    }
  };

  const getAttendanceList = () => {
    dispatch({ type: SET_LOADING, loading: true });

    const access_token = localStorage.getItem("access_token");

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.meetup.com/${urlName}/events/${eventId}/rsvps?access_token=${access_token}&sign=true&photo-host=public&page=20`
      )

      .then(response => {
        dispatch({
          type: SET_ATTENDANCE_LIST,
          attendanceList: response.data.filter(
            assistent => assistent.member.id !== 0 && assistent.member.photo
          )
        });

        dispatch({ type: SET_LOADING, loading: false });
      })
      .catch(error => {
        dispatch({
          type: SET_STATUS_MESSAGE,
          statusMessage: "An error has ocurred"
        });

        dispatch({ type: SET_LOADING, loading: false });
      });
  };

  useEffect(() => {
    /*Set roulette size  */

    if (attendanceList.length > 0) {
      if (attendanceList.length <= 3) {
        dispatch({
          type: SET_STATUS_MESSAGE,
          statusMessage: "The event must have at least 4 participants"
        });
      } else if (attendanceList.length <= 7) {
        dispatch({
          type: SET_SIZE_ROULETTE,
          sizeRoulette: 3
        });
      } else if (attendanceList.length > 7) {
        dispatch({
          type: SET_SIZE_ROULETTE,
          sizeRoulette: 7
        });
      }

      dispatch({
        type: SET_STATUS_MESSAGE,
        statusMessage: ""
      });
    }
  }, [attendanceList]);

  return (
    <div>
      <div className="rafle ">
        <Search
          handleChangeName={handleChangeName}
          handleChangeEventId={handleChangeEventId}
          urlName={urlName}
          eventId={eventId}
          events={events}
          groups={groups}
        />

        <br />

        {statusMessage && <p>{statusMessage}</p>}
        {loading ? <Spinner /> : null}

        {attendanceList && attendanceList.length > 0 && (
          <>
            <AnimatedRoulette
              attendanceList={attendanceList}
              sizeRoulette={sizeRoulette}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Raffle;
