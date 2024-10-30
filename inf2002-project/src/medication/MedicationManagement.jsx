import { useState } from 'react';
import PropTypes from 'prop-types';
import './MedicationManagement.css';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router';

const MedicationManagement = () => {
  const navigate = useNavigate();
  const [medications, setMedications] = useState([]);
  const [showAddMedicine, setShowAddMedicine] = useState(false);

  const handleAddMedication = () => {
    setShowAddMedicine(true);
  };

  const handleBack = () => {
    if (showAddMedicine) {
      setShowAddMedicine(false); // Go back to the medication list
    } else {
      navigate('/homepage'); // Navigate to the homepage
    }
  };

  return (
    <div className="medication-management">
      <Navbar />

      {/* Back button - appears in both views */}
      <button className="back-button" onClick={handleBack}>
      <i className="fas fa-arrow-left"></i> Back
      </button>

      {!showAddMedicine ? (
        <div className="medication-list-view">
          <div className="header">
            <h1>Medication</h1>
            <button className="add-button" onClick={handleAddMedication}>
              +
            </button>
          </div>

          <input
            type="text"
            placeholder="SEARCH MEDICATION"
            className="search-bar"
          />

          <div className="medication-list">
            {medications.map((med, index) => (
              <div key={index} className="medication-item">
                <p>Name</p>
                <p>Dosage</p>
                <p>Frequency</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <AddMedicine
          setShowAddMedicine={setShowAddMedicine}
          setMedications={setMedications}
        />
      )}
    </div>
  );
};

const AddMedicine = ({ setShowAddMedicine, setMedications }) => {
  const [newMedication, setNewMedication] = useState({
    name: '',
    form: '',
    dosage: '',
    duration: '',
  });

  const handleAdd = () => {
    setMedications((prev) => [...prev, newMedication]);
    setShowAddMedicine(false);
  };

  return (
    <div className="add-medication">
      <h2>New Medicine</h2>

      <label>
        Name:
        <input
          type="text"
          value={newMedication.name}
          onChange={(e) =>
            setNewMedication({ ...newMedication, name: e.target.value })
          }
        />
      </label>

      <div className="form-selection">
        <button
          onClick={() => setNewMedication({ ...newMedication, form: 'Tablet' })}
        >
          Tablet
        </button>
        <button
          onClick={() => setNewMedication({ ...newMedication, form: 'Pill' })}
        >
          Pill
        </button>
        <button
          onClick={() => setNewMedication({ ...newMedication, form: 'Bottle' })}
        >
          Bottle
        </button>
      </div>

      <label>
        Dosage:
        <input
          type="text"
          placeholder="Amt"
          value={newMedication.dosage}
          onChange={(e) =>
            setNewMedication({ ...newMedication, dosage: e.target.value })
          }
        />
        <input type="text" placeholder="Unit" />
      </label>

      <label>
        Duration:
        <input
          type="text"
          placeholder="Start date"
          value={newMedication.duration}
          onChange={(e) =>
            setNewMedication({ ...newMedication, duration: e.target.value })
          }
        />
        <input type="text" placeholder="End date" />
      </label>

      <button className="add-medication-button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

AddMedicine.propTypes = {
  setShowAddMedicine: PropTypes.func.isRequired,
  setMedications: PropTypes.func.isRequired,
};

export default MedicationManagement;
