// Profile.tsx
import React from "react";
import { useAuth } from "../hooks/useAuth";
import MaleUserSvg from "../components/allsvgs/MaleUserSvg";

const Profile: React.FC = () => {
  const { user, loading, error } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>You need to log in to view this page.</div>;
  }

  return (
    <div className="profile-container flex flex-col items-center justify-center w-full h-full gap-4 pt-5">
      <div className="relative w-[13rem] h-[13rem] z-[-1] flex justify-center items-center border-2 border-[#ff2227] rounded-full shadow-custom">
        <div className="w-[11rem] h-[11rem] rounded-full md:shadow-custom bg-red-100">
           <MaleUserSvg/>  
        </div>
        <div className="absolute w-full h-full flex items-end justify-center">
            <div className="px-3 py-2 bg-[#ff2227] w-[85%] rounded-3xl text-center text-white font-bold text-lg">{user.username}</div>
        </div>
      </div>
      <div className="profile-details">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
};

export default Profile;
