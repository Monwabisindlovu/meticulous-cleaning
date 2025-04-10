import { useState } from 'react';
import { FaMapMarkerAlt, FaRedoAlt } from 'react-icons/fa'; // Importing location and reload icon
import './ZipCodeChecker.css';

// Gauteng ZIP codes
const serviceAreas = [
  '2000', // Johannesburg Central
  '2191', // Bryanston
  '2196', // Sandton
  '2021', // Auckland Park
  '2190', // Rosettenville
  '1685', // Midrand
  '0046', // Centurion
  '0181', // Pretoria East
  '0002', // Pretoria Central
  '0084', // Mamelodi
];

function ZipCodeChecker() {
  const [zip, setZip] = useState('');
  const [result, setResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkAvailability = () => {
    if (zip.trim() === '') return setResult(null);

    setIsChecking(true); // Start loading

    // Simulate a delay (like calling an API)
    setTimeout(() => {
      const available = serviceAreas.includes(zip.trim());
      setResult(
        available
          ? '✅ Our services are available in this area! 😊'
          : '❌ Sorry, we do not currently serve this area. 😞'
      );
      setIsChecking(false); // Stop loading
    }, 2000); // Simulate 2-second delay
  };

  const handleRetry = () => {
    setResult(null); // Reset result
    setZip(''); // Reset input
  };

  return (
    <div className="zip-code-checker-container">
      {/* Only show "Check Service Availability" if result is not set */}
      {!result && (
        <h3>
          <FaMapMarkerAlt className="location-icon" /> Check Service Availability
        </h3>
      )}

      {/* Only show input and button if result is not set */}
      {!result && (
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter ZIP code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="zip-input"
          />
          <button
            onClick={checkAvailability}
            className={`check-btn ${isChecking ? 'loading' : ''}`}
          >
            {isChecking ? 'Checking...' : 'Check'}
          </button>
        </div>
      )}

      {/* Show the result once available */}
      {result && (
        <p className={`mt-3 font-medium ${result.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
          <FaMapMarkerAlt className="location-icon" /> {result}
          
          {/* Retry icon */}
          <FaRedoAlt 
            className="retry-icon" 
            onClick={handleRetry} 
            title="Retry"
          />
        </p>
      )}
    </div>
  );
}

export default ZipCodeChecker;
