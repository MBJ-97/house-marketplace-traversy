import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg";

function Navbar() {
  // here we use the navigate and location hooks to make the nav operational
  const navigate = useNavigate();
  const location = useLocation();

  // set color to selected when we match routes
  const pathMatchRoute = (route) => {
    if (route == location.pathname) {
      return true;
    }
  };
  return (
    <>
      <footer className="navbar">
        <div className="navbarNav">
          <ul className="navbarListItems">
            <li className="navbarListItem" onClick={() => navigate("/")}>
              <ExploreIcon
                fill={pathMatchRoute("/") ? "#2c2c2c" : "#8f8f8f"}
                width="36px"
                height="36px"
              />
              <p
                className={
                  pathMatchRoute("/")
                    ? "navbarListItemNameActive"
                    : "navbarListItemName"
                }
              >
                Explore
              </p>
            </li>
            <li className="navbarListItem" onClick={() => navigate("/offers")}>
              <OfferIcon
                fill={pathMatchRoute("/offers") ? "#2c2c2c" : "#8f8f8f"}
                width="36px"
                height="36px"
              />
              <p
                className={
                  pathMatchRoute("/offers")
                    ? "navbarListItemNameActive"
                    : "navbarListItemName"
                }
              >
                Offers
              </p>
            </li>
            <li className="navbarListItem" onClick={() => navigate("/profile")}>
              <PersonOutlineIcon
                fill={pathMatchRoute("/profile") ? "#2c2c2c" : "#8f8f8f"}
                width="36px"
                height="36px"
              />
              <p
                className={
                  pathMatchRoute("/profile")
                    ? "navbarListItemNameActive"
                    : "navbarListItemName"
                }
              >
                Profile
              </p>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Navbar;
