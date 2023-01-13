const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);

  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  return `${minutes}:${seconds}`;
};

export default function Counter(props) {
  return (
    <div className="counter">
      <h2>{formatTime(props.seconds)}</h2>
    </div>
  );
}
