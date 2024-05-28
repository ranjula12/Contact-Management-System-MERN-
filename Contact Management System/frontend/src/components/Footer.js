import { FaGithub, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-dark text-light py-4 fixed-bottom">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h5>Ranjula Bandara</h5>
          <p>Web and Mobile App Developer</p>
          <p>Developed by Lucifer</p>
        </div>
        <div className="col-md-6">
          <h5>Contact Me</h5>
          <ul className="list-unstyled d-flex justify-content-evenly mb-0">
            <li>
              <a
                href="https://github.com/your-github-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaGithub />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/your-facebook-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaFacebook />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/your-linkedin-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/your-instagram-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaInstagram />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
