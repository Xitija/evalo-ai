
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, User, Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useSidebar, SidebarContext } from '@/components/ui/sidebar';

interface HeaderProps {
  transparent?: boolean;
}

const Header = ({ transparent = false }: HeaderProps) => {
  // Use try/catch to safely use the sidebar context
  // This allows the Header to work both inside and outside of SidebarProvider
  const sidebarContext = (() => {
    try {
      return useSidebar();
    } catch (e) {
      return { 
        state: "expanded",
        open: true,
        setOpen: () => {},
        openMobile: false,
        setOpenMobile: () => {},
        isMobile: false,
        toggleSidebar: () => {}
      } as SidebarContext;
    }
  })();

  const { toggleSidebar } = sidebarContext;

  return (
    <header className={`w-full py-4 px-4 md:px-8 border-b ${
      transparent ? 'bg-transparent border-transparent' : 'bg-background border-border'
    }`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl text-primary">
              HireZen<span className="text-aipurple-600">AI</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-aiorange-500 text-white rounded-full text-xs flex items-center justify-center">
              3
            </span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarFallback className="bg-aiblue-100 text-aiblue-700">
                    JP
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
