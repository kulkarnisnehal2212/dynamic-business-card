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
    facebook: '',
    linkedin: 'https://linkedin.com/in/johndoe',
    location: '',
    profileImg: 'https://i.ibb.co/7XqVPRT/default-profile.jpg',
    logoImg: 'https://i.ibb.co/9yKKpQs/default-logo.png',
    patternImg: '/pattern-tile.png',
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
    location: 'https://maps.google.com/sarah-location',
    profileImg: 'https://i.ibb.co/7XqVPRT/default-profile.jpg',
    logoImg: 'https://i.ibb.co/9yKKpQs/default-logo.png',
    patternImg: '/pattern-tile.png',
    layout: 'corporate'
  },
  snehal: {
    name: 'Snehal Kulkarni',
    role: 'Software Developer',
    phone: '9876543210',
    email: 'kulkarnisnehal2212@gmail.com',
    instagram: 'https://www.instagram.com/snehalkulkarni_531?igsh=MTBqdmwzZXV6czF1Ng==',
    facebook: '',
    linkedin: 'https://www.linkedin.com/in/snehal-kulkarni-74501b2b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    location: '',
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
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#4f3a39', textAlign: 'center', marginBottom: '20px' }}>🎯 Business Card Generator</h1>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Select Client:</label>
          <select 
            value={selectedClient} 
            onChange={(e) => setSelectedClient(e.target.value)}
            style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '5px', width: '100%', fontSize: '16px' }}
          >
            {Object.entries(CLIENT_TEMPLATES).map(([key, client]) => (
              <option key={key} value={key}>{client.name} - {client.role}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={generateURL}
          style={{ 
            backgroundColor: '#4f3a39', 
            color: 'white', 
            padding: '15px 30px', 
            border: 'none', 
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '20px'
          }}
        >
          🚀 Generate URL & QR Code
        </button>

        {generatedURL && (
          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '5px', borderLeft: '4px solid #4f3a39' }}>
            <h3>✅ Generated Business Card:</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', marginTop: '15px' }}>
              <div>
                <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Card URL:</p>
                <div style={{ 
                  background: 'white', 
                  padding: '10px', 
                  border: '1px solid #ddd', 
                  borderRadius: '5px', 
                  wordBreak: 'break-all', 
                  fontSize: '12px',
                  marginBottom: '10px'
                }}>
                  {generatedURL}
                </div>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                  <button onClick={copyURL} style={{ 
                    background: '#28a745', 
                    color: 'white', 
                    padding: '8px 15px', 
                    border: 'none', 
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}>
                    📋 Copy URL
                  </button>
                  
                  <button onClick={() => window.open(generatedURL, '_blank')} style={{ 
                    background: '#007bff', 
                    color: 'white', 
                    padding: '8px 15px', 
                    border: 'none', 
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}>
                    👀 Preview Card
                  </button>
                </div>
              </div>
              
              {qrCodeURL && (
                <div style={{ textAlign: 'center' }}>
                  <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>QR Code:</p>
                  <img src={qrCodeURL} alt="QR Code" style={{ maxWidth: '100%', border: '1px solid #ddd' }} />
                  <br/>
                  <button onClick={downloadQR} style={{ 
                    background: '#6f42c1', 
                    color: 'white', 
                    padding: '8px 15px', 
                    border: 'none', 
                    borderRadius: '3px',
                    cursor: 'pointer',
                    marginTop: '10px'
                  }}>
                    💾 Download QR
                  </button>
                </div>
              )}
            </div>
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
}} />
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