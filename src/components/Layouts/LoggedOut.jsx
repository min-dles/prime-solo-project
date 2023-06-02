import Nav from "../Nav/Nav";
import './LoggedOut.css';

export default function LoggedOut({ component, children }) {
  const ChildComponent = component || (() => children);

  return (
    <div className="page-container">
      <div className="content-background"></div>
      <center className="content-a">
        <ChildComponent />
      </center>
      <div className="content-b">
        <Nav />
      </div>
      <div className="blank-space"></div>
    </div>
  )
}