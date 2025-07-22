"use client";

import * as React from "react";
import {
  FileText,
  Users,
  Settings,
  History,
  TrendingUp,
  BarChart3,
  Bell,
} from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavProjects } from "@/components/dashboard/nav-projects";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInput,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/useAuth";
import { useNavigate } from "react-router-dom";

// Blog platform specific data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "DevAngle",
      logo: FileText,
      plan: "Blog Platform",
    },
  ],
  navMain: [
    {
      title: "Content",
      url: "/dashboard",
      icon: FileText,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
        {
          title: "My Posts",
          url: "/dashboard/posts",
        },
        {
          title: "Create Post",
          url: "/dashboard/create",
        },
        {
          title: "Drafts",
          url: "/dashboard/drafts",
        },
      ],
    },
    {
      title: "Community",
      url: "/dashboard/community",
      icon: Users,
      items: [
        {
          title: "All Posts",
          url: "/dashboard/community",
        },
        {
          title: "Following",
          url: "/dashboard/following",
        },
        {
          title: "Bookmarks",
          url: "/dashboard/bookmarks",
        },
        {
          title: "Trending",
          url: "/dashboard/trending",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChart3,
      items: [
        {
          title: "Overview",
          url: "/dashboard/analytics",
        },
        {
          title: "Post Performance",
          url: "/dashboard/analytics/posts",
        },
        {
          title: "Engagement",
          url: "/dashboard/analytics/engagement",
        },
        {
          title: "Audience",
          url: "/dashboard/analytics/audience",
        },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/dashboard/settings/profile",
        },
        {
          title: "Account",
          url: "/dashboard/settings/account",
        },
        {
          title: "Preferences",
          url: "/dashboard/settings/preferences",
        },
        {
          title: "Security",
          url: "/dashboard/settings/security",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Recent Posts",
      url: "/dashboard/recent",
      icon: History,
    },
    {
      name: "Popular Tags",
      url: "/dashboard/tags",
      icon: TrendingUp,
    },
    {
      name: "Notifications",
      url: "/dashboard/notifications",
      icon: Bell,
    },
  ],
};

function getAvatarUrl(avatar?: string | null): string {
  if (!avatar) return "/avatar.jpg";
  if (/^https?:\/\//.test(avatar)) return avatar;
  return `${import.meta.env.VITE_BACKEND_URL}${avatar.startsWith("/") ? "" : "/"}${avatar}`;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { state } = useSidebar();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogoClick}
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              tooltip={state === "collapsed" ? "DevAngle - Go Home" : undefined}
            >
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 flex aspect-square size-8 items-center justify-center rounded-lg shadow-lg">
                <FileText className="size-4 text-white" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">DevAngle</span>
                <span className="truncate text-xs">Blog Platform</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {state === "expanded" && (
          <div className="px-3 py-2">
            <SidebarInput
              placeholder="Search posts, tags..."
              className="h-8 bg-sidebar-accent/50 border-sidebar-accent"
            />
          </div>
        )}
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.name || "No Name",
            email: user?.email || "No Email",
            avatar: getAvatarUrl(user?.avatar),
          }}
          onLogout={logout}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
