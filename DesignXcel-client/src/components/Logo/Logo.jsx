import { Link } from 'react-router-dom';
import { useState } from 'react';
import logoImg from './../../../public/logo.png';

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const logoSize = isHovered ? 120 : 100;

  return (
    <Link to="/" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img
        className={`transition-all duration-300 ${
          isHovered ? 'rounded-full' : ''
        }`}
        src="https://i.ibb.co/wgPkgFV/logo.png"
        alt="logo"
        width={logoSize}
        height={logoSize}
      />
    </Link>
  );
};

export default Logo;
