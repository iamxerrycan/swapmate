// import { Outlet, NavLink } from "react-router-dom";

// export default function DashboardLayout() {
//   return (
//     <div style={{ display: "flex" }}>
//       {/* Sidebar */}
//       <aside style={{ width: "220px", padding: "20px", background: "#f5f5f5" }}>
//         <h2>Admin Panel</h2>
//         <nav>
//           <ul>
//             <li><NavLink to="overview">Overview</NavLink></li>
//             <li><NavLink to="users">Users</NavLink></li>
//             <li><NavLink to="profile">My Profile</NavLink></li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main style={{ flex: 1, padding: "20px" }}>
//         <Outlet />
//       </main>
//     </div>
//   );
// }

import { NavLink, Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4 space-y-4">
        <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
        <NavLink to="overview" className="hover:text-yellow-400">
          📊 Overview
        </NavLink>
        <NavLink to="users" className="hover:text-yellow-400">
          👥 Users
        </NavLink>
        <NavLink to="profile" className="hover:text-yellow-400">
          🙍 Profile
        </NavLink>
        <NavLink to="/home" className="hover:text-yellow-400 mt-auto">
          🏠 Back to App
        </NavLink>
      </aside>

      {/* Page Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
