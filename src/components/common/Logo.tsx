import Image from "next/image";
import React from "react";
import LogoPath from "../../../public/assets/Logo1.jpg";

type LogoProps = {
  width?: number;
  height?: number;
};

const Logo: React.FC<LogoProps> = ({ width = 150, height }) => {
  return (
    <Image
      src={LogoPath}
      alt="logo"
      width={width}
      height={height}
      unselectable="on"
    />
  );
};

export default Logo;
