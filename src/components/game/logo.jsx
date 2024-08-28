import React from "react";
import logo from "@/assets/resource/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}>
      <img src={logo} alt="Tokio casino" className="object-cover" width={75} />
    </Link>
  );
};

export default Logo;
