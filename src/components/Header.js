export default function Header(props) {
  return (
    <header>
      <h4>Now playing:</h4>
      <h2>{props.song}</h2>
      <h3>{props.singer}</h3>
    </header>
  );
}
