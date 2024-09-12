import React, { useContext, useState } from 'react';
import './applicants.css';
import Context from '../../Context State/ContextState';
import { useDispatch, useSelector } from 'react-redux';
import { action } from '../../redux';
import { useNavigate } from 'react-router-dom';

const ApplicantTable = () => {
  const [applications, setApplications] = useState([
    { name: 'John Doe', resumeLink: '#', status: 'Pending' },
    { name: 'Jane Smith', resumeLink: '#', status: 'Pending' },
  ]);
  const context = useContext(Context);
  const { users } = context;
  const resume = useSelector((state) => state.userResumeDownload);
  const Email = useSelector((state) => state.emailSender);
  const dispatch = useDispatch();

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newApplicant, setNewApplicant] = useState({ name: '', resumeLink: '', status: 'Pending' });

  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [userEmail, setuserEmail] = useState('')


  const updateStatus = (newStatus, email) => {
    setApplications(newStatus);
    if (newStatus === 'Shortlist for Round 1') {
      dispatch(action.sendEmailToUser(email, 'Shortlist for Round 1', 'Congratulations you are selected in round 1'))
    }
    else if (newStatus === 'Shortlist for Round 2') {
      dispatch(action.sendEmailToUser(email, 'Shortlist for Round 2', 'Congratulations you are selected in round 2'))
    }
    else if (newStatus === 'Shortlist for Round 3') {
      dispatch(action.sendEmailToUser(email, 'Shortlist for Round 3', 'Congratulations you are selected in round 3'))
    }
    else if (newStatus === 'Approved') {
      dispatch(action.sendEmailToUser(email, 'Approved', 'Congratulations you are Approved'))
    }
    else if (newStatus === 'Rejected in Round 1') {
      dispatch(action.sendEmailToUser(email, 'Rejected in Round 1', 'Sorry You are rejected in Round 1'))
    }
    else if (newStatus === 'Rejected in Round 2') {
      dispatch(action.sendEmailToUser(email, 'Rejected in Round 2', 'Sorry You are rejected in Round 2'))
    }
    else if (newStatus === 'Rejected in Round 3') {
      dispatch(action.sendEmailToUser(email, 'Rejected in Round 3', 'Sorry You are rejected in Round 3'))
    }
    console.log(Email);
  };

  const nagivate = useNavigate();

  const handleReject = (index,email) => {
    setSelectedIndex(index);
    setShowRejectPopup(true);
    setuserEmail(email);
  };

  const handleRejectSubmit = (email) => {
    if (selectedIndex !== null) {
      setApplications('Rejected');
      setShowRejectPopup(false);
      dispatch(action.sendEmailToUser(userEmail, 'Rejected', rejectionReason));
      setRejectionReason('');
    }
  };

  const handleClosePopup = () => {
    setShowRejectPopup(false);
    setRejectionReason('');
  };

  const handleAddApplicant = () => {
    setShowAddPopup(true);
  };

  const handleAddSubmit = () => {
    setApplications([...applications, newApplicant]);
    setNewApplicant({ name: '', resumeLink: '', status: 'Pending' });
    setShowAddPopup(false);
  };

  const handleAddPopupClose = () => {
    setShowAddPopup(false);
  };

  const downloadResume = (id) => {
    const token = localStorage.getItem('AuthToken');
    dispatch(action.downloadResume(id, token));
  }

  return (
    <div className="applicant-content">
      <div className="add-button-container">
        <button className="btn btn-add" onClick={handleAddApplicant}>
          <i className="bi bi-plus"></i> Add
        </button>
      </div>
      <table className="applicant-table">
        <thead>
          <tr>
            <th>Applicant Name</th>
            <th>Resume</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((app) => (
            <tr key={app._id}>
              <td>{app.name}</td>
              <td>
                <div className="resume-buttons">
                  <button className="btn btn-download" onClick={() => downloadResume(app._id)}>Download</button>
                </div>
              </td>
              <td>
                <select
                  value={app.status}
                  onChange={(e) => updateStatus(e.target.value, app.email)}
                >
                  <option value="Shortlist for Round 1">Shortlist for Round 1</option>
                  <option value="Shortlist for Round 2">Shortlist for Round 2</option>
                  <option value="Shortlist for Round 3">Shortlist for Round 3</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected in Round 1">Rejected in Round 1</option>
                  <option value="Rejected in Round 2">Rejected in Round 2</option>
                  <option value="Rejected in Round 3">Rejected in Round 3</option>
                </select>
              </td>
              <td>
                <button className="btn btn-reject" onClick={() => handleReject(app._id,app.email)}>Rejected</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Applicant Popup */}
      {showAddPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <input
              type="text"
              value={newApplicant.name}
              onChange={(e) => setNewApplicant({ ...newApplicant, name: e.target.value })}
              placeholder="Applicant Name"
            />
            <input
              type="text"
              value={newApplicant.resumeLink}
              onChange={(e) => setNewApplicant({ ...newApplicant, resumeLink: e.target.value })}
              placeholder="Resume Link"
            />
            <select
              value={newApplicant.status}
              onChange={(e) => setNewApplicant({ ...newApplicant, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Rejected">Rejected</option>
            </select>
            <div className="popup-buttons">
              <button className="btn btn-confirm" onClick={handleAddSubmit}>Add</button>
              <button className="btn btn-cancel" onClick={handleAddPopupClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Applicant Popup */}
      {showRejectPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Reject Applicant</h2>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Optional: Reason for rejection"
            />
            <div className="popup-buttons">
              <button className="btn btn-confirm" onClick={handleRejectSubmit}>Confirm</button>
              <button className="btn btn-cancel" onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantTable;
