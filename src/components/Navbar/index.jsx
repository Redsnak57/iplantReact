import React from "react";
import './index.css';
import LOGO from "../../asset/icon/leaf.png";
import {Link} from "react-router-dom";

function Navbar() {

  return (
    <>
        <div className="iplant-nav" style={{
                color: "black",
                textAlign: "right",
                padding: "32px",
                borderBottom: "2px solid black ",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
        }}>
            <img src={LOGO} style={{
                height: "45px",
                aspectRatio: "1/1",
            }}alt="logo-iplant" />

            <Link to="/">Nos produits</Link>
            <Link to="/product/add">Ajouter produits</Link>

            <h1>iPlant</h1>
        </div>
    </>
  )
}

export default Navbar