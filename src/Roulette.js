import RouletteReducer from "./reducers/RouletteReducer";
import React, { useEffect, useReducer } from "react";
import { useTransition, animated, config } from "react-spring";
import {
  SET_RUNNING_TIME,
  SET_SUSPENSE_TIME,
  SET_SUSPENSE,
  SET_INDEX_WINNER,
  SET_WINNER,
  SET_END_GAME,
  SET_ROULETTE,
  SET_INDEX_ROULETTE
} from "./reducers/types";
import Winner from "./Winner";

function Roulette(props) {
  const { attendanceList, sizeRoulette } = props;

  const initialState = {
    indexRoulette: {
      startIndex: 0,
      endIndex: sizeRoulette
    },
    runningTime: 0,
    suspenseTime: 0,
    suspense: false,

    roulette: [],
    endGame: true,
    indexWinner: null,
    winner: null
  };

  const [state, dispatch] = useReducer(RouletteReducer, initialState);

  const {
    endGame,
    winner,
    indexWinner,
    indexRoulette,
    runningTime,
    suspenseTime,
    suspense,
    roulette
  } = state;

  const transitions = useTransition(
    roulette.map((rouletteItem, i) => ({
      ...rouletteItem,
      i
    })),

    item => item.member.photo.id,
    {
      from: {
        transform: "translate3d(20px,0,0)",
        opacity: 0
      },

      enter: {
        transform: "translate3d(10px,0,0)",
        opacity: 1
      },

      leave: {
        opacity: 0,
        transform: "translate3d(-10px,0,0)"
      },

      unique: true,

      reset: true,

      config: state => (state === "leave" ? config.default : config.gentle)
    }
  );

  const startRoulette = () => {
    resetRoulette();

    dispatch({ type: SET_END_GAME, endGame: false });

    spin(0, sizeRoulette);
    getWinner();
  };

  const resetRoulette = () => {
    dispatch({ type: SET_END_GAME, endGame: true });

    dispatch({ type: SET_RUNNING_TIME, runningTime: 0 });

    dispatch({ type: SET_SUSPENSE_TIME, suspenseTime: 0 });

    dispatch({
      type: SET_INDEX_ROULETTE,
      indexRoulette: {
        startIndex: 0,
        endIndex: sizeRoulette
      }
    });

    dispatch({
      type: SET_INDEX_WINNER,
      indeWinner: null
    });

    dispatch({ type: SET_WINNER, winner: null });
  };

  const getWinner = () => {
    const indexWinner = Math.floor(
      Math.random() * Math.floor(attendanceList.length)
    );

    dispatch({ type: SET_INDEX_WINNER, indexWinner: indexWinner });
  };

  const spin = (startIndex, endIndex) => {
    if (
      startIndex < attendanceList.length - 1 &&
      endIndex < attendanceList.length - 1
    ) {
      dispatch({
        type: SET_INDEX_ROULETTE,
        indexRoulette: {
          startIndex: startIndex + 1,
          endIndex: endIndex + 1
        }
      });
    } else if (startIndex === attendanceList.length - 1) {
      dispatch({
        type: SET_INDEX_ROULETTE,
        indexRoulette: {
          startIndex: 0,
          endIndex: endIndex + 1
        }
      });
    } else if (endIndex === attendanceList.length - 1) {
      dispatch({
        type: SET_INDEX_ROULETTE,

        indexRoulette: {
          startIndex: startIndex + 1,
          endIndex: 0
        }
      });
    }

    if (!suspense) {
      dispatch({
        type: SET_RUNNING_TIME,
        runningTime: runningTime + 500
      });
    }

    if (suspense) {
      dispatch({
        type: SET_SUSPENSE_TIME,
        suspenseTime: suspenseTime + 100
      });
    }
  };

  useEffect(() => {
    /* Set the roulette */

    const { startIndex, endIndex } = indexRoulette;

    if (startIndex < endIndex) {
      const roulette = attendanceList.slice(startIndex, endIndex);

      dispatch({ type: SET_ROULETTE, roulette: roulette });
    } else {
      const roulette = attendanceList
        .slice(startIndex)
        .concat(attendanceList.slice(0, endIndex));

      dispatch({ type: SET_ROULETTE, roulette: roulette });
    }
  }, [indexRoulette]);

  useEffect(() => {
    const animationDuration =
      attendanceList.length > 50
        ? Math.round((attendanceList.length * 200) / 1000) * 3000
        : 10000;

    if (!endGame) {
      if (runningTime < animationDuration) {
        const { startIndex, endIndex } = indexRoulette;

        spin(startIndex, endIndex);
      }

      if (runningTime >= animationDuration) {
        dispatch({ type: SET_SUSPENSE, suspense: true });

        startSuspense();
      }
    }
  }, [runningTime]);

  useEffect(() => {
    /* Calculate the central index*/

    let location = null;
    let centralIndex = null;

    if (sizeRoulette === 3) location = 1;
    else location = 3;

    if (indexRoulette.endIndex - (location + 1) >= 0)
      centralIndex = indexRoulette.endIndex - (location + 1);
    else centralIndex = indexRoulette.startIndex + location;

    if (!endGame && suspense) {
      /* Find the winner */
      if (
        attendanceList[centralIndex].member.id ===
        attendanceList[indexWinner].member.id
      ) {
        stopRoulette();
        const winner = attendanceList[indexWinner];

        setTimeout(() => dispatch({ type: SET_WINNER, winner: winner }), 1000);
      } else {
        const { startIndex, endIndex } = indexRoulette;

        setTimeout(() => spin(startIndex, endIndex), suspenseTime);
      }
    }
  }, [suspenseTime]);

  const startSuspense = () => {
    let suspense = 15;
    let indexInitSuspense = null;
    let endIndexSuspense = null;

    if (attendanceList.length < suspense) {
      suspense = attendanceList.length - 1;
    }

    /* Calculate the startIndex to start suspense time */
    if (indexWinner <= suspense) {
      indexInitSuspense = attendanceList.length - 1 - (suspense - indexWinner);
    } else {
      indexInitSuspense = indexWinner - suspense;
    }

    /* Calculate the endIndex to start suspense time */
    if (indexInitSuspense + sizeRoulette < attendanceList.length) {
      endIndexSuspense = indexInitSuspense + sizeRoulette;
    } else {
      endIndexSuspense =
        indexInitSuspense + sizeRoulette - attendanceList.length;
    }

    spin(indexInitSuspense, endIndexSuspense);
  };

  const stopRoulette = () => {
    dispatch({ type: SET_SUSPENSE, suspense: false });

    dispatch({ type: SET_END_GAME, endGame: true });

    dispatch({ type: SET_RUNNING_TIME, runningTime: 0 });
  };

  return (
    <>
      <div className="wrapper">
        <div className="arrowdown" />

        <div className="wheel">
          {transitions.map(({ item, props: { x, ...rest }, key }, index) =>
            item.member.photo && item.member.photo.thumb_link ? (
              <animated.img
                style={
                  winner && index === 3
                    ? {
                        width: 120,
                        height: 120,
                        zIndex: 20,
                        opacity: 1,
                        boxShadow: `0px 10px 20px 0px gray`
                      }
                    : {
                        ...rest
                      }
                }
                id="memberPhoto"
                alt="member"
                key={item.member.photo.id}
                src={item.member.photo.thumb_link}
              />
            ) : (
              <img
                alt="default"
                key={item.member.photo.id}
                src="http://placeholder.com/300/300"
              />
            )
          )}
        </div>
      </div>

      <div className="row justify-content-center">
        <button type="button" className="btn  start" onClick={startRoulette}>
          START
        </button>
      </div>
      {winner && <Winner winner={winner} />}
    </>
  );
}

export default Roulette;
