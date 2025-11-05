import Image from "next/image"
import Link from "next/link"
import Profile from "./Profile"
const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href={'/'} className="logo">
            <Image src={'/icons/logo.png'} alt="logo" height={24} width={24}/>
            <p>DevEvent</p>
        </Link>
        <ul className="text-sm sm:text-xl">
            <Link href={"/"}>Home</Link>
            <Link href={"/#events"}>Events</Link>
            <Link href={"/create-event"}>Create Event</Link>
            <Profile/>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
