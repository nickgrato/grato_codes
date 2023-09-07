import Image from 'next/image';
import logoBlack from 'public/g-logo-black.png';
import logoWhite from 'public/g-logo-white.png';

type LogoPropsT = {
  size?: 'small' | 'medium';
  color?: 'white' | 'black';
};

const Logo = ({ size = 'small', color = 'white' }: LogoPropsT) => {
  const mediumDem = {
    height: 200,
    width: 200,
  };
  const smallDem = {
    height: 50,
    width: 50,
  };

  const { height, width } = size === 'medium' ? mediumDem : smallDem;

  return (
    <Image
      src={color === 'white' ? logoWhite : logoBlack}
      alt="logo"
      height={height}
      width={width}
    />
  );
};

export default Logo;
