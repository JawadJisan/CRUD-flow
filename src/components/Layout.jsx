import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, BookOpen, UserPlus, Search } from 'lucide-react';
import { Outlet } from "react-router-dom";


const Layout = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: GraduationCap },
    { path: '/students', label: 'Students (Loader)', icon: Users },
    { path: '/courses', label: 'Courses (useEffect)', icon: BookOpen },
    { path: '/enrollments', label: 'Enrollments (Axios)', icon: UserPlus },
    { path: '/search', label: 'Search', icon: Search },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <GraduationCap className="h-6 w-6" />
            <span>EduManager</span>
          </Link>
          <nav className="flex gap-2 ml-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden md:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="container py-6 px-4">
        {/* {children} */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
