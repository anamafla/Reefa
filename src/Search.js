import React from "react";
import Spinner from "./Spinner";
import { useSpring, animated } from "react-spring";

function Search(props) {
  const propsSpringGroups = useSpring({
    from: {
      opacity: 0,
      marginLeft: -400
    },
    opacity: 1,
    marginLeft: 0,
    marginRight: 0,
    config: {
      mass: 2,
      tension: 170,
      friction: 30,
      clamp: true,
      precision: 0.01,
      velocity: 10
    }
  });

  const propsSpringEvents = useSpring({
    opacity: props.events.length > 0 ? 1 : 0,
    marginLeft: 0,
    marginRight: 0,
    config: {
      mass: 2,
      tension: 170,
      friction: 30,
      clamp: true,
      precision: 0.01,
      velocity: 10
    }
  });

  return props.groups.length === 0 ? (
    <section>
      <Spinner />
    </section>
  ) : (
    <section className="section-search">
      <form>
        <div className="row justify-content-center">
          <animated.div
            style={propsSpringGroups}
            className="input-group mb-3 col-md-5 col-sm-8"
          >
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="groupName">
                Group
              </label>
            </div>
            <select
              onChange={props.handleChangeName}
              className="custom-select"
              id="urlName"
              value={props.urlname}
              placeholder="url name"
            >
              <option defaultValue>Choose...</option>
              {props.groups.map(group => (
                <option key={group.id} value={group.urlname}>
                  {group.name}
                </option>
              ))}
            </select>
          </animated.div>
        </div>

        <div className="row justify-content-center">
          <animated.div
            style={propsSpringEvents}
            className="input-group mb-3 col-md-5 col-sm-8"
          >
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Event
              </label>
            </div>
            <select
              className="custom-select"
              id="eventId"
              value={props.eventId}
              onChange={props.handleChangeEventId}
              placeholder="Choose the Event"
            >
              <option defaultValue>Choose...</option>

              {props.events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
          </animated.div>
        </div>
      </form>
    </section>
  );
}

export default Search;
