"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ContentLayout } from "@/components/templates/admin-panel/content-layout"

export default function AccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const tabs = [
    { name: "Users",
        href: "/admin/access/users",
        permission: "users.view"
    },
    { name: "Roles",
        href: "/admin/access/roles",
        permission: "roles.view"
    },
    { name: "Permissions",
        href: "/admin/access/permissions",
        permission: "permissions.view"
    },
  ]

  return (
      <ContentLayout title="Access">
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Access Management</h1>
        <p className="text-muted-foreground">Manage users, roles, and permissions</p>
      </div>

      <div className="border-b">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={cn(
                  "py-4 px-1 border-b-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground",
                )}
              >
                {tab.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-6">{children}</div>
    </div>
    </ContentLayout>
  )
}
