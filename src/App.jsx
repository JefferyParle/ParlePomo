import React from "react";
import "./App.scss";

import SelectButtons from "./components/SelectButtons";
import Counter from "./components/Counter";

const possibleStates = [
  {
    state: "pomodoro",
    time: 1380,
    bg: "#588157",
    text: "Let's get to work!",
  },
  {
    state: "short break",
    time: 420,
    bg: "#3a5a40",
    text: "It's time for a short break! Be sure to stretch!",
  },
  {
    state: "long break",
    time: 1020,
    bg: "#344e41",
    text: "It's time for a long break!",
  },
];

function App() {
  const [isCounting, setIsCounting] = React.useState(false);
  const [currentState, setCurrentState] = React.useState(possibleStates[0]);
  const [currentTime, setCurrentTime] = React.useState(currentState.time);
  const [pomoCount, setPomoCount] = React.useState(0);
  const timerId = React.useRef();

  document.body.style.backgroundColor = currentState.bg;

  function changeState(number) {
    clearInterval(timerId.current);
    setIsCounting(false);
    if (number === 0) {
      setCurrentState(possibleStates[0]);
    } else if (number === 1) {
      setCurrentState(possibleStates[1]);
    } else {
      setCurrentState(possibleStates[2]);
    }
  }

  function pausePlayHandler() {
    if (isCounting) {
      clearInterval(timerId.current);
      setIsCounting((prevIsCounting) => !prevIsCounting);
    } else {
      timerId.current = setInterval(() => {
        setCurrentTime((prevCurrentTime) => prevCurrentTime - 1);
      }, 1000);
      setIsCounting((prevIsCounting) => !prevIsCounting);
    }
  }

  function nextState() {
    const lastState = possibleStates.indexOf(currentState);
    clearInterval(timerId.current);
    setIsCounting(false);
    if (lastState === 0) {
      sendNotif("Break time!");
      setPomoCount((prevPomoCount) => {
        const newPomo = prevPomoCount + 1;
        if (newPomo % 4 === 0 && newPomo) {
          setCurrentState(possibleStates[2]);
        } else {
          setCurrentState(possibleStates[1]);
        }
        return newPomo;
      });
    } else {
      setCurrentState(possibleStates[0]);
      sendNotif(possibleStates[0].text);
    }
  }

  const notifsAllowed = Notification.requestPermission();

  function sendNotif(nextStateText) {
    notifsAllowed.then((perm) => {
      if (perm === "granted") {
        new Notification("Time's up!", {
          body: nextStateText,
          icon: "/notif-icon.svg",
        });
        playAudio("/src/assets/alarm-sound.wav");
      }
    });
  }

  function playAudio(audioName) {
    let audio = new Audio(audioName);
    audio.play();
  }

  React.useEffect(() => {
    if (currentTime <= 0) {
      nextState();
    }
  }, [currentTime]);

  React.useEffect(() => {
    setCurrentTime(currentState.time);
  }, [currentState]);

  return (
    <div className="app">
      <h1 className="logo">ParlePomo</h1>
      <div className="counter-container">
        <SelectButtons
          handleState={changeState}
          selectedBtn={possibleStates.indexOf(currentState)}
          handleAudio={() => playAudio("/src/assets/states-click.wav")}
        />
        <Counter seconds={currentTime} />
        <button
          onClick={() => {
            pausePlayHandler();
            playAudio("/src/assets/ss-click.wav");
          }}
          className="pause-btn"
          style={{ color: currentState.bg }}
        >
          {isCounting ? "STOP" : "START"}
        </button>
        {isCounting && (
          <button
            onClick={() => {
              if (isCounting) {
                nextState();
                playAudio("/src/assets/next-click.wav");
              }
            }}
            className="next-btn"
          >
            &gt;
          </button>
        )}
      </div>
      <h4 className="pomo-count">#{pomoCount}</h4>
      <p className="state-text">{currentState.text}</p>
    </div>
  );
}

export default App;
