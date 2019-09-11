import React from "react";
import { useSpring, animated } from "react-spring";

function MemberPhoto(props) {
  const { winner, index, style } = props;
  const propsSpringWinner = useSpring({
    opacity: winner && index === 3 ? 1 : 0.2,
    width: winner && index === 3 ? 120 : 100,
    height: winner && index === 3 ? 120 : 100,
    boxShadow: winner && index === 3 ? "5px 10px 18px #88888C" : "",

    config: {
      mass: 2,
      tension: 170,
      friction: 100,
      clamp: true,
      precision: 0.01,
      velocity: 10
    }
  });

  return (
    <>
      {!winner ? (
        <animated.img
          style={style}
          id="memberPhoto"
          alt="member"
          key={props.photo.id}
          src={props.photo.thumb_link}
        />
      ) : (
        <animated.img
          style={propsSpringWinner}
          id="memberPhoto"
          alt="member"
          key={props.photo.id}
          src={props.photo.thumb_link}
        />
      )}
    </>
  );
}

export default MemberPhoto;
