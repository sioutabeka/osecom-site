import logo from "../../assets/logo-osecom.png";

export default function Loader({ done }) {
  return (
    <div className={"loader " + (done ? "loader--done" : "")}>
      <div className="loader__inner">
        <img src={logo} alt="OseCom" className="loader__logo" />
        <div className="loader__bar"><i /></div>
      </div>
    </div>
  );
}
