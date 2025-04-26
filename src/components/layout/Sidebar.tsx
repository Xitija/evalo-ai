
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings,
  Calendar,
  CheckCircle
} from 'lucide-react';

const AppSidebar = () => {
  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard'
    },
    {
      title: 'Interviews',
      icon: Users,
      href: '/interviews'
    },
    {
      title: 'New Interview',
      icon: FileText,
      href: '/interviews/new'
    },
    {
      title: 'Schedule',
      icon: Calendar,
      href: '/schedule'
    },
    {
      title: 'Reports',
      icon: CheckCircle,
      href: '/reports'
    }
  ];

  const MenuLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 transition-colors w-full",
          isActive 
            ? "bg-sidebar-accent text-sidebar-accent-foreground" 
            : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        )
      }
    >
      {children}
    </NavLink>
  );

  return (
    <Sidebar>
      <SidebarHeader className="py-4 flex items-center justify-center border-b">
        <h2 className="font-bold text-xl text-primary">
          HireZen<span className="text-aipurple-600">AI</span>
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <MenuLink href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </MenuLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="py-4 px-3 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <MenuLink href="/settings">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </MenuLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
