import { useState } from "react";
import PropTypes from "prop-types";

const GENDERS = ["Male", "Female", "Other"];

const EditProfileModal = ({ profile, onSave, onClose }) => {
  const [form, setForm] = useState({
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    phone: profile.phone || "",
    bio: profile.bio || "",
    dateOfBirth: profile.dateOfBirth || "",
    gender: profile.gender || "",
    language: profile.language || "",
    timezone: profile.timezone || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(form);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>Edit Profile</h3>

        {/* ---------- Personal Info ---------- */}
        <Section title="Personal Information">
          <div style={styles.row}>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              style={styles.input}
            />
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              style={styles.input}
            />
          </div>

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            style={styles.input}
          />

          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Bio"
            rows={3}
            style={styles.textarea}
          />
        </Section>

        {/* ---------- DOB & Gender ---------- */}
        <Section title="Basic Details">
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.genderGroup}>
            {GENDERS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, gender: g }))}
                style={{
                  ...styles.genderBtn,
                  ...(form.gender === g ? styles.genderActive : {}),
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </Section>

        {/* ---------- Preferences ---------- */}
        <Section title="Preferences">
          <div style={styles.row}>
            <input
              name="language"
              value={form.language}
              onChange={handleChange}
              placeholder="Language"
              style={styles.input}
            />
            <input
              name="timezone"
              value={form.timezone}
              onChange={handleChange}
              placeholder="Timezone"
              style={styles.input}
            />
          </div>
        </Section>

        {/* ---------- Actions ---------- */}
        <div style={styles.actions}>
          <button style={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button style={styles.save} onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------- Section Wrapper ---------- */
const Section = ({ title, children }) => (
  <div style={styles.section}>
    <h4 style={styles.sectionTitle}>{title}</h4>
    {children}
  </div>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  modal: {
    background: "#fff",
    padding: "28px",
    borderRadius: "20px",
    width: "460px",
    boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
  },

  title: {
    margin: "0 0 12px",
    fontSize: "20px",
    fontWeight: 600,
  },

  section: {
    marginTop: "18px",
  },

  sectionTitle: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#888",
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },

  row: {
    display: "flex",
    gap: "12px",
  },

  field: {
    flex: 1,
  },

  label: {
    fontSize: "12px",
    color: "#777",
    marginBottom: "4px",
    display: "block",
  },

  input: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "12px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },

  textarea: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "12px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "14px",
    resize: "none",
  },

  genderGroup: {
    display: "flex",
    gap: "10px",
    marginBottom: "12px",
  },

  genderBtn: {
    flex: 1,
    padding: "10px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },

  genderActive: {
    background: "#007AFF",
    color: "#fff",
    borderColor: "#007AFF",
  },

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "20px",
  },

  cancel: {
    background: "transparent",
    border: "none",
    color: "#555",
    cursor: "pointer",
  },

  save: {
    background: "#007AFF",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: 500,
  },
};

/* ---------- Props Validation ---------- */
EditProfileModal.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,

    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    avatarUrl: PropTypes.string,
    phone: PropTypes.string,
    dateOfBirth: PropTypes.string,
    gender: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    language: PropTypes.string,
    timezone: PropTypes.string,
  }).isRequired,

  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditProfileModal;
