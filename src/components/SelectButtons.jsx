export default function SelectButtons(props) {
  return (
    <div className="select-btns">
      <button
        style={
          props.selectedBtn === 0
            ? { backgroundColor: "rgba(0, 0, 0, .2)", fontWeight: 700 }
            : {}
        }
        onClick={() => {
          props.handleState(0);
          props.handleAudio();
        }}
      >
        Pomodoro
      </button>
      <button
        style={
          props.selectedBtn === 1
            ? { backgroundColor: "rgba(0, 0, 0, .2)", fontWeight: 700 }
            : {}
        }
        onClick={() => {
          props.handleState(1);
          props.handleAudio();
        }}
      >
        Short Break
      </button>
      <button
        style={
          props.selectedBtn === 2
            ? { backgroundColor: "rgba(0, 0, 0, .2)", fontWeight: 700 }
            : {}
        }
        onClick={() => {
          props.handleState(2);
          props.handleAudio();
        }}
      >
        Long Break
      </button>
    </div>
  );
}
