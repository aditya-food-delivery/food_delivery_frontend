import PropTypes from "prop-types";
import { useAuth } from "../../../hooks/useAuth";
const ProfileCard = ({ profile, onEdit }) => {
  const { auth } = useAuth();
  const user = auth?.user;
  const email = user?.email || profile?.email;
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm max-w-3xl mx-auto overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between px-8 py-6 bg-gray-50">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-semibold">
            {profile.firstName?.[0]}
          </div>

          {/* Name */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-sm text-gray-500">@{profile.username}</p>
          </div>
        </div>

        <button
          onClick={onEdit}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Edit Profile
        </button>
      </div>

      {/* Content */}
      <div className="px-8 py-6 space-y-8">
        {/* Contact */}
        <div>
          <SectionTitle title="Contact Information" />
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <InfoItem label="Email" value={email} />
            <InfoItem label="Phone" value={profile.phone} />
          </div>
        </div>

        {/* Personal */}
        <div>
          <SectionTitle title="Personal Details" />
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <InfoItem label="Date of Birth" value={profile.dateOfBirth} />
            <InfoItem label="Gender" value={profile.gender} />
          </div>

          {profile.bio && (
            <div className="mt-4">
              <p className="text-xs text-gray-400 mb-1">BIO</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {profile.bio}
              </p>
            </div>
          )}
        </div>

        {/* Preferences */}
        <div>
          <SectionTitle title="Preferences" />
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <InfoItem label="Language" value={profile.language} />
            <InfoItem label="Timezone" value={profile.timezone} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Small Components ---------- */

const SectionTitle = ({ title }) => (
  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
    {title}
  </h4>
);

const InfoItem = ({ label, value }) => (
  <div className="bg-gray-50 rounded-lg px-4 py-3">
    <p className="text-xs text-gray-400 mb-1">{label}</p>
    <p className="text-sm font-medium text-gray-800">{value || "-"}</p>
  </div>
);

/* ---------- PropTypes ---------- */

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    userId: PropTypes.string.isRequired,

    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    phone: PropTypes.string,
    dateOfBirth: PropTypes.string,
    gender: PropTypes.string,
    bio: PropTypes.string,

    language: PropTypes.string,
    timezone: PropTypes.string,
  }).isRequired,

  onEdit: PropTypes.func.isRequired,
};

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SectionTitle.propTypes = {
  title: PropTypes.string,
};

export default ProfileCard;

