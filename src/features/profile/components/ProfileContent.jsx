// import BasicInfoSection from "./BasicInfoSection";
import AddressCard from "./AddressCard";
import ProfileCard from "./ProfileCard";
import PropTypes from "prop-types";
const ProfileContent = ({ active, profile, addresses, onEdit, onAddAddress }) => {
  return (
    <main className="content">
      {active === "basic" && <ProfileCard profile={profile} onEdit={onEdit} />}
      {active === "address" && (
        <AddressCard addresses={addresses} onAddAddress={onAddAddress} />
      )}
    </main>
  );
};
ProfileContent.propTypes = {
  /** Active tab identifier */
  active: PropTypes.string.isRequired,

  /** Profile data (used when active === "basic") */
  profile: PropTypes.object.isRequired,

  /** Address data (used when active === "address") */
  addresses: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,

  /** Edit handler for profile */
  onEdit: PropTypes.func.isRequired,
  onAddAddress: PropTypes.func,
};

ProfileContent.defaultProps = {
  onAddAddress: () => {},
};
export default ProfileContent;
