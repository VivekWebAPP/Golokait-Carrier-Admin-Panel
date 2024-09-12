import React, { useState, useContext } from 'react';
import './meetings.css';
import { useSelector, useDispatch } from 'react-redux';
import Context from '../../Context State/ContextState';
import { action } from '../../redux';

const MeetingTable = () => {
  const [meetings, setMeetings] = useState([
    { shortName: 'Team Sync', date: '2024-09-01', time: '10:00 AM' },
    { shortName: 'Project Kickoff', date: '2024-09-03', time: '2:00 PM' },
  ]);

  const [showReschedulePopup, setShowReschedulePopup] = useState(false);
  const [selectedMeetingIndex, setSelectedMeetingIndex] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newHour, setNewHour] = useState('');
  const [newMinute, setNewMinute] = useState('');
  const [newTimePeriod, setNewTimePeriod] = useState('AM');
  const [userEmail, setuserEmail] = useState('');

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newMeetingName, setNewMeetingName] = useState('');
  const context = useContext(Context);
  const { users } = context;

  const Email = useSelector((state) => state.emailSender);
  const dispatch = useDispatch();

  const handleReschedule = (index,email) => {
    setSelectedMeetingIndex(index);
    setuserEmail(email)
    setShowReschedulePopup(true);
  };

  const handleRescheduleSubmit = () => {
    if (selectedMeetingIndex !== null) {
      const updatedMeetings = [...meetings];
      const formattedTime = `${newHour.padStart(2, '0')}:${newMinute.padStart(2, '0')} ${newTimePeriod}`;
      setShowReschedulePopup(false);
      setNewDate('');
      setNewHour('');
      setNewMinute('');
      setNewTimePeriod('AM');
      dispatch(action.sendEmailToUser(userEmail,'Updation In the meeting time',`Your Interview is scheduled at ${newDate} at ${formattedTime}`));
      console.log(Email);
    }
  };

  const handleClosePopup = () => {
    setShowReschedulePopup(false);
    setShowAddPopup(false);
    setNewDate('');
    setNewHour('');
    setNewMinute('');
    setNewMeetingName('');
    setNewTimePeriod('AM');
  };

  // Add meeting handlers
  const handleAddMeeting = () => {
    setShowAddPopup(true);
  };

  const handleAddMeetingSubmit = () => {
    const formattedTime = `${newHour.padStart(2, '0')}:${newMinute.padStart(2, '0')} ${newTimePeriod}`;
    const newMeeting = {
      shortName: newMeetingName,
      date: newDate,
      time: formattedTime,
    };
    setMeetings([...meetings, newMeeting]);
    setShowAddPopup(false);
    setNewMeetingName('');
    setNewDate('');
    setNewHour('');
    setNewMinute('');
    setNewTimePeriod('AM');
  };

  const handleDeleteMeeting = (index) => {
    const updatedMeetings = users.filter((_) => _._id !== index);
    console.log(updatedMeetings);
    setMeetings(updatedMeetings);
  };

  return (
    <div className="meeting-content">
      <div className="add-button-container">
        <button className="btn btn-add" onClick={handleAddMeeting}>
          <i className="bi bi-plus"></i> Add
        </button>
      </div>
      <table className="meeting-table">
        <thead>
          <tr>
            <th>Meeting Title</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((meeting) => (
            <tr key={meeting._id}>
              <td>{meeting.name}</td>
              <td>{meeting.date}</td>
              <td>{meeting.time}</td>
              <td>
                <button className="btn btn-reschedule" onClick={() => handleReschedule(meeting._id,meeting.email)}>Reschedule</button>
                <button className="btn btn-delete" onClick={() => handleDeleteMeeting(meeting._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showReschedulePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
            <div className="time-container">
              <input
                type="number"
                min="1"
                max="12"
                value={newHour}
                onChange={(e) => setNewHour(e.target.value)}
                placeholder="Hour"
              />
              <span>:</span>
              <input
                type="number"
                min="0"
                max="59"
                value={newMinute}
                onChange={(e) => setNewMinute(e.target.value)}
                placeholder="Minute"
              />
              <select
                value={newTimePeriod}
                onChange={(e) => setNewTimePeriod(e.target.value)}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <div className="popup-buttons">
              <button className="btn btn-confirm" onClick={handleRescheduleSubmit}>Confirm</button>
              <button className="btn btn-cancel" onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showAddPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <input
              type="text"
              placeholder="Meeting Name"
              value={newMeetingName}
              onChange={(e) => setNewMeetingName(e.target.value)}
            />
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
            <div className="time-container">
              <input
                type="number"
                min="1"
                max="12"
                value={newHour}
                onChange={(e) => setNewHour(e.target.value)}
                placeholder="Hour"
              />
              <span>:</span>
              <input
                type="number"
                min="0"
                max="59"
                value={newMinute}
                onChange={(e) => setNewMinute(e.target.value)}
                placeholder="Minute"
              />
              <select
                value={newTimePeriod}
                onChange={(e) => setNewTimePeriod(e.target.value)}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <div className="popup-buttons">
              <button className="btn btn-confirm" onClick={handleAddMeetingSubmit}>Add</button>
              <button className="btn btn-cancel" onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingTable;
