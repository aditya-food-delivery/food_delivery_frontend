// import { useAuth } from "../../../hooks/useAuth";
import PropTypes from "prop-types";
const ProfileHeader = ({ profile }) => {
  // const { auth } = useAuth();
  // const user = auth.user;
  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.4),transparent_60%)]" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-[2px]">
              <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center">
                <span className="text-4xl font-semibold text-white">
                  {profile.firstName?.[0]}
                </span>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                {profile.firstName} {profile.lastName}
              </h1>

              <span className="text-blue-400 hover:text-blue-300 cursor-pointer text-lg">
                ↗
              </span>
            </div>

            <p className="text-sm text-gray-300 mt-1">
              {" "}
              <span className="text-gray-200 font-medium">
                {profile.username}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
ProfileHeader.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
};
export default ProfileHeader;

