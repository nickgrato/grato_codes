import Image from 'next/image'
import chatPNG from 'public/logo.png'

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
    height: 60,
    width: 60,
  }

  const { height, width } = size === 'medium' ? mediumDem : smallDem

  return (
    <div className="items-center">
      <Image
        src={chatPNG}
        alt="logo"
        height={height}
        width={width}
        className="mr-12"
      />
      {/* <span className="heading-xl color color-logo">HIPPO CHAT</span> */}
    </div>
  )
}

export default Logo
