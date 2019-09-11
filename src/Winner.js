import React from "react";
import Confetti from "react-confetti";
import { useSpring, animated } from "react-spring";

function Winner(props) {
  const { winner } = props;

  const [propsSpringName] = useSpring(() => ({
    opacity: 1,
    marginBottom: 10,
    color: "#3b444b"
  }));

  const propsSpringWinner = useSpring({
    from: {
      opacity: 0,
      marginTop: 150,
      color: "#414a4c"
    },
    to: [
      { opacity: 1, marginTop: 100, color: "#3b444b" },

      {
        opacity: 1,
        marginTop: 30,
        color: "#0e1111"
      }
    ],

    config: {
      mass: 5,
      tension: 150,
      friction: 20,
      clamp: false,
      precision: 0.01,
      velocity: 50
    }
  });

  return (
    <div>
      {winner && (
        <div>
          <div className="row justify-content-center">
            <animated.h2 style={propsSpringName}> The winner is</animated.h2>
          </div>

          <div className="row justify-content-center">
            <animated.h2 style={propsSpringWinner}>
              {winner.member.name.toUpperCase()}
            </animated.h2>
          </div>
        </div>
      )}
      {winner && <Confetti numberOfPieces={200} />}
    </div>
  );
}

export default Winner;
