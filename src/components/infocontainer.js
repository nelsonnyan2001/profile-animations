import '../App.css';

function InfoContainer(props) {
  return (
    <div onClick={props.customClickEvent} className={props.user.id === props.activeClass ? "active" : ""}>
      <h3>
        {props.user.name}
      </h3>
      <div>
        {props.user.age} | {props.user.location}
      </div>

    </div >
  );
}

export default InfoContainer;
