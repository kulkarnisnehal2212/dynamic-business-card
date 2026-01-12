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

// QR Generator Component
function QRGenerator() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    phone: '',
    email: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    location: '',
    profileUrl: '',
    logoUrl: ''
  });
  const [generatedURL, setGeneratedURL] = useState('');
  const [qrCodeURL, setQrCodeURL] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateURL = () => {
    // Validate required fields
    if (!formData.name || !formData.role || !formData.phone || !formData.email) {
      alert('Please fill all required fields (Name, Role, Phone, Email)');
      return;
    }

    // Create a unique hash for this data
    const dataString = JSON.stringify(formData);
    const hash = btoa(dataString).replace(/[+/=]/g, '').substring(0, 8);
    
    // Store data in localStorage with hash as key
    localStorage.setItem(`card_${hash}`, dataString);
    
    // Create very short URL with just the hash
    const shortURL = `https://dynamic-business-card-blond.vercel.app?id=${hash}`;
    
    console.log('Original data:', formData);
    console.log('Compressed URL:', shortURL);
    console.log('URL Length:', shortURL.length);
    
    setGeneratedURL(shortURL);
    
    // Generate QR code using compressed URL
    const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shortURL)}`;
    console.log('QR URL:', qrURL);
    setQrCodeURL(qrURL);
  };

  const copyURL = () => {
    navigator.clipboard.writeText(generatedURL);
    alert('✅ URL copied to clipboard!');
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeURL;
    link.download = `${formData.name || 'business-card'}-qr.png`;
    link.click();
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '800px', 
      margin: '0 auto', 
      background: '#f5f5f5', 
      minHeight: '100vh',
      overflow: 'auto'
    }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#4f3a39', textAlign: 'center', marginBottom: '10px' }}>🎯 Business Card Generator</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>Create custom business cards with QR codes</p>
        
        <div style={{ background: '#e8f4fd', padding: '15px', borderRadius: '5px', marginBottom: '20px', fontSize: '14px' }}>
          <strong>📸 For Custom Images:</strong><br/>
          1. Go to <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>imgbb.com</a><br/>
          2. Upload your profile photo and company logo<br/>
          3. Copy the "Direct Link" URLs<br/>
          4. Paste them in the fields below<br/><br/>
          <strong>✨ URL Compression:</strong> Long URLs are automatically shortened for better QR codes!
        </div>
        
        <div style={{ display: 'grid', gap: '15px', marginBottom: '20px' }}>
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            value={formData.name}
            onChange={handleInputChange}
            style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '5px' }}
            required
          />
          
          <input
            type="text"
            name="role"
            placeholder="Job Title/Role *"
            value={formData.role}
            onChange={handleInputChange}
            style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '5px' }}
            required
          />
          
          <input
            type="text"
            name="phone"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={handleInputChange}
            style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '5px' }}
            required
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleInputChange}
            style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '5px' }}
            required
          />
          
          <input
            type="url"
            name="instagram"
            placeholder="Instagram URL (Optional)"
            value={formData.instagram}
            onChange={handleInputChange}
            style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '5px' }}
          />
          
          <input
            type="url"
            name="facebook"
            placeholder="Facebook URL (Optional)"
            value={formData.facebook}
            onChange={handleInputChange}
            style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '5px' }}
          />
          
          <input
            type="url"
            name="linkedin"
            placeholder="LinkedIn URL (Optional)"
            value={formData.linkedin}
            onChange={handleInputChange}
            style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '5px' }}
          />
          
          <input
            type="url"
            name="location"
            placeholder="Location/Google Maps URL (Optional)"
            value={formData.location}
            onChange={handleInputChange}
            style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '5px' }}
          />
          
          <input
            type="url"
            name="profileUrl"
            placeholder="Profile Image URL - Use imgbb.com (Optional)"
            value={formData.profileUrl}
            onChange={handleInputChange}
            style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '5px' }}
          />
          
          <input
            type="url"
            name="logoUrl"
            placeholder="Company Logo URL - Use imgbb.com (Optional)"
            value={formData.logoUrl}
            onChange={handleInputChange}
            style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '5px' }}
          />
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
          🚀 Generate Short URL & QR Code
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
              
              <div style={{ textAlign: 'center' }}>
                <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>QR Code:</p>
                {qrCodeURL && (
                  <div>
                    <img 
                      src={qrCodeURL} 
                      alt="QR Code" 
                      style={{ border: '1px solid #ddd', borderRadius: '5px', maxWidth: '100%' }}
                      onLoad={() => console.log('✅ QR code displayed successfully')}
                      onError={() => console.error('❌ QR code failed to display')}
                    />
                    <br />
                    <button onClick={downloadQR} style={{ 
                      background: '#6f42c1', 
                      color: 'white', 
                      padding: '8px 15px', 
                      border: 'none', 
                      borderRadius: '3px',
                      cursor: 'pointer',
                      marginTop: '10px'
                    }}>
                      📥 Download QR
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <p style={{ fontSize: '14px', color: '#666', marginTop: '15px' }}>
              <strong>Next Steps:</strong><br/>
              1. Preview your card to make sure it looks good<br/>
              2. Download the QR code image<br/>
              3. Share the QR code with your client<br/>
              4. When someone scans it, they'll see the business card!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Business Card Component
function BusinessCard() {
  const urlParams = new URLSearchParams(window.location.search);
  
  // Check if using compressed URL with ID
  const compressedId = urlParams.get('id');
  let clientData;
  
  if (compressedId) {
    // Load data from localStorage using the ID
    const storedData = localStorage.getItem(`card_${compressedId}`);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      clientData = {
        name: parsedData.name || 'Asha Thakur',
        role: parsedData.role || 'Hr and Operations Head',
        phone: parsedData.phone || '8237358995',
        email: parsedData.email || 'hr@srgpune.in',
        instagram: parsedData.instagram || '',
        facebook: parsedData.facebook || '',
        linkedin: parsedData.linkedin || '',
        location: parsedData.location || '',
        profileImg: parsedData.profileUrl || profileImg,
        logoImg: parsedData.logoUrl || logoImg,
        patternImg: '/pattern-tile.png'
      };
    } else {
      // Fallback to default if data not found
      clientData = {
        name: 'Asha Thakur',
        role: 'Hr and Operations Head',
        phone: '8237358995',
        email: 'hr@srgpune.in',
        instagram: '',
        facebook: '',
        linkedin: '',
        location: '',
        profileImg: profileImg,
        logoImg: logoImg,
        patternImg: '/pattern-tile.png'
      };
    }
  } else {
    // Original URL parameter method
    clientData = {
      name: urlParams.get('name') || 'Asha Thakur',
      role: urlParams.get('role') || 'Hr and Operations Head',
      phone: urlParams.get('phone') || '8237358995',
      email: urlParams.get('email') || 'hr@srgpune.in',
      instagram: urlParams.get('instagram') || '',
      facebook: urlParams.get('facebook') || '',
      linkedin: urlParams.get('linkedin') || '',
      location: urlParams.get('location') || '',
      profileImg: urlParams.get('profileUrl') || profileImg,
      logoImg: urlParams.get('logoUrl') || logoImg,
      patternImg: '/pattern-tile.png'
    };
  }

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

// Main App Component
function App() {
  const urlParams = new URLSearchParams(window.location.search);
  
  // If no parameters, show generator
  const hasParams = Array.from(urlParams.keys()).length > 0;
  
  // Override CSS for generator page
  if (!hasParams) {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    return <QRGenerator />;
  }
  
  // Reset to original CSS for business card
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  return <BusinessCard />;
}

export default App;