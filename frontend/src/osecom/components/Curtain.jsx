import logo from "../../assets/logo-osecom.png";

export default function Curtain({ on }) {
  return (
    <div className={"curtain " + (on ? "is-on" : "")}>
      <img src={logo} alt="" className="curtain__logo" />
    </div>
  );
}
