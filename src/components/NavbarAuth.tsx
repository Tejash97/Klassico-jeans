
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LogOut, User, ShieldCheck } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const NavbarAuth: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();

  if (!user) {
    return (
      <Button asChild variant="outline" size="sm" className="rounded-full">
        <Link to="/auth" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Login</span>
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full">
          <User className="h-4 w-4 mr-2" />
          <span className="max-w-[100px] truncate">{user.email}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
              <ShieldCheck className="h-4 w-4" />
              <span>Admin Panel</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => logout()} className="text-destructive focus:text-destructive">
          <LogOut className="h-4 w-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarAuth;
