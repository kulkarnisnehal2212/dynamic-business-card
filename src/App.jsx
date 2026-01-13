import "./App.css";
import logoImg from "./assets/logo-img.png";
import profileImg from "./assets/Aasha.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode, faCopy, faEye, faDownload, faUser } from "@fortawesome/free-solid-svg-icons";


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
import { useState } from "react";

// Client Templates - Add new clients here
const CLIENT_TEMPLATES = {
  default: {
    name: 'Asha Thakur',
    role: 'Hr and Operations Head',
    phone: '8237358995',
    email: 'hr@srgpune.in',
    instagram: 'https://www.instagram.com/swastikrealtygroup/',
    facebook: 'https://www.facebook.com/swastikbuilder',
    linkedin: 'https://www.linkedin.com/company/swastikk-realty-group/',
    location: 'https://share.google/3brpEYu7twAhBYnou',
    profileImg: profileImg,
    logoImg: logoImg,
    patternImg: '/pattern-tile.png'
  },
  john: {
    name: 'John Doe',
    role: 'Sales Manager',
    phone: '9876543210',
    email: 'john@company.com',
    instagram: 'https://instagram.com/johndoe',
    facebook: 'https://facebook.com/johnsmith',
    linkedin: 'https://linkedin.com/in/johndoe',
    location: 'https://www.google.com/maps/dir//shivajinagr%20pune',
    profileImg: 'https://i.ibb.co/XrqcgJ2R/image.png',
    logoImg: 'https://i.ibb.co/5hHpYf3b/image.png',
    patternImg: 'https://i.ibb.co/XZR2zcMS/image.png',
    layout: 'minimal'
  },
  sarah: {
    name: 'Sarah Smith',
    role: 'CEO',
    phone: '1234567890',
    email: 'sarah@business.com',
    instagram: 'https://instagram.com/sarahsmith',
    facebook: 'https://facebook.com/sarahsmith',
    linkedin: 'https://linkedin.com/in/sarahsmith',
    location: 'https://www.google.com/maps/dir//hinjawadi,pune',
    profileImg: 'https://i.ibb.co/twjrp8W5/image.png',
    logoImg: 'https://i.ibb.co/GQ5JZ1K7/image.png',
    patternImg: 'https://i.ibb.co/7tG2XSxM/image.png',
    layout: 'corporate'
  },
  snehal: {
    name: 'Snehal Kulkarni',
    role: 'Software Developer',
    phone: '9876543210',
    email: 'kulkarnisnehal2212@gmail.com',
    instagram: 'https://www.instagram.com/snehalkulkarni_531?igsh=MTBqdmwzZXV6czF1Ng==',
    facebook: 'https://facebook.com/snehal_kulkarni',
    linkedin: 'https://www.linkedin.com/in/snehal-kulkarni-74501b2b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    location: 'https://www.google.com/maps/dir//vidyarthi%20sahayak%20samiti%20pune',
    profileImg: 'https://i.ibb.co/b5x6NGnH/profile.jpg',
    logoImg: 'https://i.ibb.co/LzQRWCvT/logo-img.png',
    patternImg: 'https://i.ibb.co/DFwWP2M/pattern-1.jpg',
    layout: 'compact',
    customStyles: {
      logo: { top: '10px', width: '150px' }
    }
  }
  // ADD NEW CLIENTS HERE:
  // newclient: {
  //   name: 'Client Name',
  //   role: 'Job Title',
  //   phone: '1234567890',
  //   email: 'client@email.com',
  //   instagram: 'https://instagram.com/username',
  //   facebook: 'https://facebook.com/username',
  //   linkedin: 'https://linkedin.com/in/username',
  //   location: 'https://maps.google.com/location',
  //   profileImg: 'https://i.ibb.co/your-image.jpg',
  //   logoImg: 'https://i.ibb.co/your-logo.jpg',
  //   patternImg: '/pattern-tile.png',
  //   layout: 'default' // Options: default, compact, minimal, corporate
  // }
};

// QR Generator Component
function QRGenerator() {
  const [selectedClient, setSelectedClient] = useState('default');
  const [generatedURL, setGeneratedURL] = useState('');
  const [qrCodeURL, setQrCodeURL] = useState('');

  const generateURL = () => {
    const shortURL = `https://dynamic-business-card-blond.vercel.app?client=${selectedClient}`;
    setGeneratedURL(shortURL);
    const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shortURL)}`;
    setQrCodeURL(qrURL);
  };

  const copyURL = () => {
    navigator.clipboard.writeText(generatedURL);
    alert('✅ URL copied to clipboard!');
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeURL;
    link.download = `${CLIENT_TEMPLATES[selectedClient].name.replace(' ', '-')}-qr.png`;
    link.click();
  };

  return (
  <div className="admin-container">
    <div className="admin-card">
      <h1 className="admin-title"><FontAwesomeIcon icon={faQrcode} /> Business Card Generator</h1>

      <label style={{ fontWeight: "600", marginBottom: "8px", display: "block" }}>  <FontAwesomeIcon icon={faUser} /> 
        Select Client:
      </label>

      <select
        className="admin-select"
        value={selectedClient}
        onChange={(e) => setSelectedClient(e.target.value)}
      >
        {Object.entries(CLIENT_TEMPLATES).map(([key, client]) => (
          <option key={key} value={key}>
            {client.name} - {client.role}
          </option>
        ))}
      </select>

      <button className="admin-button" onClick={generateURL}>
        <FontAwesomeIcon icon={faQrcode} /> Generate URL & QR Code
      </button>

      {generatedURL && (
        <div className="admin-box">
          <h3> Generated Business Card</h3>

          <p style={{ fontWeight: "600", marginTop: "10px" }}>Card URL:</p>
          <div className="admin-url">{generatedURL}</div>

          <div className="admin-actions">
            <button className="admin-copy" onClick={copyURL}>
                 <FontAwesomeIcon icon={faCopy} /> Copy URL
            </button>
            <button
              className="admin-preview"
              onClick={() => window.open(generatedURL, "_blank")}
            >
              <FontAwesomeIcon icon={faEye} /> Preview
            </button>
          </div>

          {qrCodeURL && (
            <div style={{ textAlign: "center", marginTop: "15px" }}>
              <p style={{ fontWeight: "600" }}>QR Code:</p>
              <img
                src={qrCodeURL}
                alt="QR Code"
                style={{ maxWidth: "200px", marginTop: "10px" }}
              />
              <br />
              <button className="admin-download" onClick={downloadQR} style={{ marginTop: "10px" }}>
                  <FontAwesomeIcon icon={faDownload} /> Download QR
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);

}

// Business Card Component
function BusinessCard() {
  const urlParams = new URLSearchParams(window.location.search);
  const clientParam = urlParams.get('client');
  
  const clientData = CLIENT_TEMPLATES[clientParam] || CLIENT_TEMPLATES.default;
  const layoutClass = `layout-${clientData.layout || 'default'}`;

  return (
    <div className="screen">
      <div className={`card ${layoutClass}`}>
        <img 
          src={clientData.logoImg} 
          className="logo" 
          alt="Logo" 
          style={clientData.customStyles?.logo || {}}
        />
        <img 
          src={clientData.profileImg} 
          className="profile" 
          alt="Profile" 
          style={clientData.customStyles?.profile || {}}
        />

        <h1 
          className="name" 
          style={clientData.customStyles?.name || {}}
        >
          {clientData.name}
        </h1>
        <p 
          className="role" 
          style={clientData.customStyles?.role || {}}
        >
          {clientData.role}
        </p>

        <a 
          href={`tel:${clientData.phone}`} 
          className="action-btn phone"
          style={clientData.customStyles?.phone || {}}
        >
          <FontAwesomeIcon icon={faPhone} />
          {clientData.phone}
        </a>

        <a 
          href={`mailto:${clientData.email}`} 
          className="action-btn email"
          style={clientData.customStyles?.email || {}}
        >
          <FontAwesomeIcon icon={faEnvelope} />
          {clientData.email}
        </a>

        <div 
          className="social-row"
          style={clientData.customStyles?.socialRow || {}}
        >
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

// Main App Component
function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.get('admin') === 'true';
  
  // Admin generator access: ?admin=true
  if (isAdmin) {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    return <QRGenerator />;
  }
  
  // Client card view: ?client=name or default
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  return <BusinessCard />;
}

export default App;