import '../styles/footer.css';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>volontiRAJ</h3>
      </div>
      <div className="footer-icons">
        <a href="https://linkedin.com/in/ivona-im" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://github.com/imlina00" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://instagram.com/digitalnadalmacija" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div>
      <hr></hr>
      <div className="footer-content">
        <h4>&copy; Copyright 2024, JuniorDEV, Ivona Mlinarević</h4>
      </div>
    </footer>
  );
};

export default Footer;
