import Image from 'next/image'
import chatPNG from 'public/reptar.png'

type LogoPropsT = {
  size?: 'small' | 'medium'
  color?: 'white' | 'black'
}

const Logo = ({ size = 'small', color = 'white' }: LogoPropsT) => {
  const mediumDem = {
    height: 200,
    width: 200,
  }
  const smallDem = {
    height: 50,
    width: 50,
  }

  const { height, width } = size === 'medium' ? mediumDem : smallDem

  return <Image src={chatPNG} alt="logo" height={height} width={width} />
}

export default Logo
