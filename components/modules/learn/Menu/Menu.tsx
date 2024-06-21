import Link from 'next/link'
import { Icon } from '@mozilla/lilypad-ui'

type MenuPropsT = {}

const Menu = ({}: MenuPropsT) => {
  return (
    <section>
      <nav>
        <ul>
          <li>
            <Link href="/learn">Home</Link>
          </li>
          <li>
            <Link href="/learn">History</Link>
          </li>
          <li>
            <Link href="/learn">Flashcards</Link>
          </li>
          <li>
            <Link href="/learn">Highlights</Link>
          </li>
          <hr />
          <li>
            <Link href="/learn">
              <div className="items-center gap-4 body-sm">Profile</div>
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default Menu
