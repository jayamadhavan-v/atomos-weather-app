import { Link } from 'react-router-dom';
import { Instagram, Mail, GithubIcon, LinkedinIcon, UserStar } from 'lucide-react';
import Logo from '../assets/favicons.png';
export function Footer() {
  return (
    <footer className="full-width rounded-t-xl bg-surface-container-lowest/10 backdrop-blur-2xl border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin  max-w-[1440px] mx-auto gap-8 py-6">
        <div className="flex flex-col items-center md:items-start">
          <Link to="/" >
            <div className="flex items-center gap-2 mb-2">
              <img src={Logo} alt="Atmos Logo" width="40" height="40" />
              <span className="font-headline text-[24px] text-secondary font-bold">atmos</span>
            </div>
          </Link>

          <p className="font-body text-[16px] text-outline">Cinematic climate intelligence.</p>
        </div>
        <div className="flex gap-gutter text-on-surface-variant dark:text-outline font-body text-[16px]">
          <Link className="hover:text-primary dark:hover:text-primary-fixed transition-colors" to="/dashboard">Dashboard</Link>
          <Link className="hover:text-primary dark:hover:text-primary-fixed transition-colors" to="/maps">Maps</Link>
          <Link className="hover:text-primary dark:hover:text-primary-fixed transition-colors" to="/features">Features</Link>
        </div>
        <div className="flex gap-gutter opacity-80 hover:opacity-100 transition-all">
          <a href="#" className="text-on-surface hover:text-secondary transition-colors">
            <UserStar size={20} />

          </a>
          
          <a href="https://github.com/jayamadhavan-v" target='_black' className="text-on-surface hover:text-secondary transition-colors">
            <GithubIcon size={20} />
          </a>
          <a href="https://www.linkedin.com/in/jayamadhavan-v/"  target="_black"className="text-on-surface hover:text-secondary transition-colors">
            <LinkedinIcon size={20} />
          </a>
        </div>
      </div>
      <div className="w-full text-center pb-4 border-t border-white/5 opacity-50">
        <p className="text-[12px] font-[600] tracking-widest uppercase">© {new Date().getFullYear()} atmos. All rights reserved.</p>
      </div>
    </footer>
  );
}
 