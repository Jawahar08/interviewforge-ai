"use client";

import { useState } from "react";

import { ProtectedRoute } from "@/shared/components/auth/ProtectedRoute";
import { AppSidebar } from "@/shared/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/shared/components/dashboard/DashboardHeader";
import { MobileSidebar } from "@/shared/components/dashboard/MobileSidebar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#050816] text-white">
        <div className="fixed inset-y-0 left-0 z-50 hidden w-72 lg:block">
          <AppSidebar />
        </div>

        <MobileSidebar
          open={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />

        <div className="min-h-screen lg:pl-72">
          <DashboardHeader
            onMenuClick={() =>
              setMobileSidebarOpen(true)
            }
          />

          <main className="min-h-[calc(100vh-5rem)]">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}