import { useAuth } from "../../../hooks/useAuth";

const AuthError = () => {
  const { error, status } = useAuth();

  if (status !== "error" || !error) return null;

  return (
    <div className="bg-red-50 border border-red-300 text-red-600 text-sm p-3 rounded-lg">
      <p className="font-medium mb-2 text-center">{error.message}</p>
    </div>
  );
};

export default AuthError;

