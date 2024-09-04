import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "../styles/layout.scss";
import { MenuIcon } from "lucide-react";
import { Modal } from "./Modal";

interface Props {
  className?: string;
}

export const Layout: React.FC<Props> = () => {
  const [popup, setPopup] = useState(false);

  const handlerModal = () => {
    setPopup(!popup);
  };

  return (
    <>
      <header className="header">
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Link to={"/"} className="title">
              AnimeTime
            </Link>
          </div>
          <nav className="header_list">
            <NavLink to={"/serials"}>Serials</NavLink>
            <NavLink to={"/genres"}>Genres</NavLink>
            <NavLink to={"/random"}>Random</NavLink>
          </nav>
          {!popup ? (
            <MenuIcon className="menu-icon" onClick={() => handlerModal()} />
          ) : (
            <Modal handlerModal={handlerModal} />
          )}
        </div>
      </header>

      <Outlet />
      <footer>soon</footer>
    </>
  );
};
