import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

const Layout = () => {
 const { user } = useAuth();
 const isDashboard = !!user;

 return (
  <div className="min-h-screen bg-surface-50/50 flex">
   {isDashboard && <Sidebar />}
   <div className={`flex-1 flex flex-col ${isDashboard ? 'ml-72' : ''}`}>
    <Navbar />
    <main className={`flex-1 ${isDashboard ? 'p-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
     <Outlet />
    </main>
   </div>
  </div>
 );
};

export default Layout;
