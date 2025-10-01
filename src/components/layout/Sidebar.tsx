import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MapPin, 
  Users, 
  Calendar, 
  AlertTriangle, 
  Download,
  Settings,
  BarChart3
} from 'lucide-react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  roles: ('admin' | 'franchise')[];
}

const navigation: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
    roles: ['admin', 'franchise']
  },
  {
    title: 'Territoires',
    href: '/territories',
    icon: <MapPin className="h-4 w-4" />,
    roles: ['admin', 'franchise']
  },
  {
    title: 'Campagnes',
    href: '/campaigns',
    icon: <Calendar className="h-4 w-4" />,
    roles: ['admin', 'franchise']
  },
  {
    title: 'Franchises',
    href: '/franchises',
    icon: <Users className="h-4 w-4" />,
    roles: ['admin']
  },
  {
    title: 'Alertes',
    href: '/alerts',
    icon: <AlertTriangle className="h-4 w-4" />,
    roles: ['admin', 'franchise']
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: <BarChart3 className="h-4 w-4" />,
    roles: ['admin']
  },
  {
    title: 'Exports',
    href: '/exports',
    icon: <Download className="h-4 w-4" />,
    roles: ['admin', 'franchise']
  },
  {
    title: 'Paramètres',
    href: '/settings',
    icon: <Settings className="h-4 w-4" />,
    roles: ['admin']
  }
];

export function Sidebar({ className }: SidebarProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role || 'franchise')
  );

  return (
    <div className={cn('flex h-full w-64 flex-col bg-card border-r', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {filteredNavigation.map((item) => (
              <Button
                key={item.href}
                variant={currentPath === item.href ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => navigate(item.href)}
              >
                {item.icon}
                {item.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}