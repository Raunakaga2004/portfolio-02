import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  return (
    <nav className="fixed w-full flex justify-between items-center p-4">
      <div className="text-xl font-bold">Logo</div>
      <div className="flex gap-4">
        <Link href="/blogs">Blogs</Link>
        <Link href="#projects">Projects</Link>
        <Link href="#skills">Skills</Link>
        <Link href="#experience">Experience</Link>
        <Link href="#certifications">Certifications</Link>
        <Link href="#achievements">Achievements</Link>
        <Link href="#about">About</Link>
        <Link href="#contact">Contact</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
