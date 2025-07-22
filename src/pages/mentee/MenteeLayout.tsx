// src/pages/mentee/MenteeLayout.tsx
import { Outlet } from 'react-router-dom';
import MenteeNavbar from '../mentee/MenteeNavbar'; 

const MenteeLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <MenteeNavbar />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MenteeLayout;
