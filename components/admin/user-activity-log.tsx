"use client"

import { useState } from "react"
import { ArrowUpDown, MoreHorizontal, Clock, User, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function UserActivityLog() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [sortColumn, setSortColumn] = useState<"username" | "role" | "lastActive">("lastActive")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Mock data for user activity
  const users = [
    {
      id: "user-1",
      username: "dr.smith",
      name: "Dr. John Smith",
      role: "hospital",
      department: "Emergency",
      lastActive: "5 minutes ago",
      status: "online",
      actions: ["Updated patient records", "Viewed inventory", "Requested supplies"],
    },
    {
      id: "user-2",
      username: "nurse.johnson",
      name: "Sarah Johnson, RN",
      role: "hospital",
      department: "Pediatrics",
      lastActive: "15 minutes ago",
      status: "online",
      actions: ["Updated patient vitals", "Administered medication", "Checked inventory"],
    },
    {
      id: "user-3",
      username: "pharm.davis",
      name: "Robert Davis, PharmD",
      role: "pharmacy",
      department: "Central Pharmacy",
      lastActive: "30 minutes ago",
      status: "online",
      actions: ["Filled prescriptions", "Updated inventory", "Ordered supplies"],
    },
    {
      id: "user-4",
      username: "admin.wilson",
      name: "Emily Wilson",
      role: "admin",
      department: "IT Administration",
      lastActive: "1 hour ago",
      status: "online",
      actions: ["System configuration", "User management", "Generated reports"],
    },
    {
      id: "user-5",
      username: "tech.brown",
      name: "Michael Brown",
      role: "hospital",
      department: "Radiology",
      lastActive: "2 hours ago",
      status: "offline",
      actions: ["Uploaded scan results", "Updated patient records", "Equipment maintenance"],
    },
    {
      id: "user-6",
      username: "pharm.lee",
      name: "Jessica Lee, PharmD",
      role: "pharmacy",
      department: "Outpatient Pharmacy",
      lastActive: "3 hours ago",
      status: "offline",
      actions: ["Inventory management", "Filled prescriptions", "Patient counseling"],
    },
    {
      id: "user-7",
      username: "patient.martinez",
      name: "David Martinez",
      role: "patient",
      department: "N/A",
      lastActive: "4 hours ago",
      status: "offline",
      actions: ["Viewed medical records", "Scheduled appointment", "Requested prescription refill"],
    },
  ]

  const handleSort = (column: "username" | "role" | "lastActive") => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge variant="outline" className="text-purple-500 border-purple-200 bg-purple-50">
            Admin
          </Badge>
        )
      case "hospital":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
            Hospital Staff
          </Badge>
        )
      case "pharmacy":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Pharmacy Staff
          </Badge>
        )
      case "patient":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
            Patient
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Online
          </Badge>
        )
      case "offline":
        return (
          <Badge variant="outline" className="text-gray-500 border-gray-200 bg-gray-50">
            Offline
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Filter users based on search term and role filter
  const filteredUsers = users.filter(
    (user) =>
      (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (roleFilter === "all" || user.role === roleFilter),
  )

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let comparison = 0

    if (sortColumn === "username") {
      comparison = a.username.localeCompare(b.username)
    } else if (sortColumn === "role") {
      comparison = a.role.localeCompare(b.role)
    } else if (sortColumn === "lastActive") {
      // This is a simple sort based on the string representation
      // In a real app, you would parse the time strings to actual Date objects
      comparison = a.lastActive.localeCompare(b.lastActive)
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="hospital">Hospital Staff</SelectItem>
            <SelectItem value="pharmacy">Pharmacy Staff</SelectItem>
            <SelectItem value="patient">Patient</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="py-3 px-4 text-left font-medium">
                  <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("username")}>
                    User
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="py-3 px-4 text-left font-medium">
                  <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("role")}>
                    Role
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="py-3 px-4 text-left font-medium">Department</th>
                <th className="py-3 px-4 text-left font-medium">
                  <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("lastActive")}>
                    Last Active
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="py-3 px-4 text-left font-medium">Recent Activity</th>
                <th className="py-3 px-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="py-3 px-4 font-medium">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div>{user.name}</div>
                        <div className="text-xs text-muted-foreground">@{user.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{getRoleBadge(user.role)}</td>
                  <td className="py-3 px-4">{user.department}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{user.lastActive}</span>
                      <span>{getStatusBadge(user.status)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="max-w-[200px] truncate" title={user.actions.join(", ")}>
                      {user.actions[0]}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Activity Log</DropdownMenuItem>
                          <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          <DropdownMenuItem>Disable Account</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}

              {sortedUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-muted-foreground">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Showing {sortedUsers.length} of {users.length} users
      </div>
    </div>
  )
}
