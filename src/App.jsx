import "./App.css";
import logoImg from "./assets/logo-img.png";
import profileImg from "./assets/Aasha.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  
  // Default values (your current client)
  const clientData = {
    name: urlParams.get('name') || 'Asha Thakur',
    role: urlParams.get('role') || 'Hr and Operations Head',
    phone: urlParams.get('phone') || '8237358995',
    email: urlParams.get('email') || 'hr@srgpune.in',
    instagram: urlParams.get('instagram') || '',
    facebook: urlParams.get('facebook') || '',
    linkedin: urlParams.get('linkedin') || '',
    location: urlParams.get('location') || '',
    profileImg: urlParams.get('profile') || profileImg,
    logoImg: urlParams.get('logo') || logoImg,
    patternImg: urlParams.get('pattern') || '/pattern-tile.png'
  };

  return (
    <div className="screen">
      <div className="card">
        <img src={clientData.logoImg} className="logo" alt="Logo" />
        <img src={clientData.profileImg} className="profile" alt="Profile" />

        <h1 className="name">{clientData.name}</h1>
        <p className="role">{clientData.role}</p>

        <a href={`tel:${clientData.phone}`} className="action-btn phone">
          <FontAwesomeIcon icon={faPhone} />
          {clientData.phone}
        </a>

        <a href={`mailto:${clientData.email}`} className="action-btn email">
          <FontAwesomeIcon icon={faEnvelope} />
          {clientData.email}
        </a>

        <div className="social-row">
          {clientData.instagram && (
            <a href={clientData.instagram} className="social-icon" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          )}
          {clientData.facebook && (
            <a href={clientData.facebook} className="social-icon" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          )}
          {clientData.linkedin && (
            <a href={clientData.linkedin} className="social-icon" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          )}
          {clientData.location && (
            <a href={clientData.location} className="social-icon" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLocationDot} />
            </a>
          )}
        </div>

        <div className="pattern" style={{
          backgroundImage: `url(${clientData.patternImg})`
        }}></div>
      </div>
    </div>
  );
}

export default App;
