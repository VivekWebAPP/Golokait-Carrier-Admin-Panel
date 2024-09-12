import React, { useState, useEffect } from 'react';
import './emails.css'; 

const EmailTemplates = () => {
  const [templates, setTemplates] = useState(() => {
    const savedTemplates = localStorage.getItem('templates');
    return savedTemplates ? JSON.parse(savedTemplates) : [];
  });
  
  const [showAddTemplatePopup, setShowAddTemplatePopup] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    subject: '',
    body: '',
    senderName: '',
    designation: '',
    companyName: '',
    companyWebsite: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('templates', JSON.stringify(templates));
  }, [templates]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTemplate({ ...newTemplate, [name]: value });
  };

  const handleAddTemplate = () => {
    if (isEditing) {
      const updatedTemplates = templates.map((template, index) =>
        index === editingIndex ? newTemplate : template
      );
      setTemplates(updatedTemplates);
      setIsEditing(false);
    } else {
      setTemplates([...templates, newTemplate]);
    }

    setShowAddTemplatePopup(false);
    setNewTemplate({
      subject: '',
      body: '',
      senderName: '',
      designation: '',
      companyName: '',
      companyWebsite: '',
    });
    setEditingIndex(null);
  };

  const handleUpdateTemplate = (index) => {
    setNewTemplate(templates[index]);
    setIsEditing(true);
    setEditingIndex(index);
    setShowAddTemplatePopup(true);
  };

  const handleDeleteTemplate = (index) => {
    const updatedTemplates = templates.filter((_, i) => i !== index);
    setTemplates(updatedTemplates);
  };

  return (
    <div className="email-templates-content">
      <div className="add-button-container">
        <button className="btn btn-add" onClick={() => setShowAddTemplatePopup(true)}>
          <i className="bi bi-plus"></i> Add Template
        </button>
      </div>

      <div className="template-list">
        {templates.map((template, index) => (
          <div key={index} className="template-item">
            <h2>{template.subject}</h2>
            <p>{template.body}</p>
            <p>{template.senderName}, {template.designation}</p>
            <p>{template.companyName}</p>
            <p>
              <a href={template.companyWebsite} target="_blank" rel="noopener noreferrer">
                {template.companyWebsite}
              </a>
            </p>
            <button className="btn btn-update" onClick={() => handleUpdateTemplate(index)}>Update</button>
            <button className="btn btn-delete" onClick={() => handleDeleteTemplate(index)}>Delete</button>
          </div>
        ))}
      </div>

      {showAddTemplatePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <input
              type="text"
              name="subject"
              placeholder="Email Subject"
              value={newTemplate.subject}
              onChange={handleInputChange}
            />
            <textarea
              name="body"
              placeholder="Email Body"
              value={newTemplate.body}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="senderName"
              placeholder="Sender Name"
              value={newTemplate.senderName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="designation"
              placeholder="Sender Designation"
              value={newTemplate.designation}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={newTemplate.companyName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="companyWebsite"
              placeholder="Company Website"
              value={newTemplate.companyWebsite}
              onChange={handleInputChange}
            />
            <div className="popup-buttons">
              <button className="btn btn-confirm" onClick={handleAddTemplate}>
                {isEditing ? 'Update' : 'Add'}
              </button>
              <button className="btn btn-cancel" onClick={() => setShowAddTemplatePopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplates;
