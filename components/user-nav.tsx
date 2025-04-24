"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"
import { LogOut, Settings, User, Hospital, Pill, ShieldCheck } from "lucide-react"

export function UserNav() {
  const { user, logout, selectedHospital } = useAuth()

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (user.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    }
    return user.email.substring(0, 2).toUpperCase()
  }

  // Get user type icon
  const getUserTypeIcon = () => {
    switch (user.type) {
      case "patient":
        return <User className="h-4 w-4 mr-2" />
      case "hospital":
        return <Hospital className="h-4 w-4 mr-2" />
      case "pharmacy":
        return <Pill className="h-4 w-4 mr-2" />
      case "admin":
        return <ShieldCheck className="h-4 w-4 mr-2" />
      default:
        return <User className="h-4 w-4 mr-2" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.profileImage || ""} alt={user.name || user.email} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name || user.email}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {getUserTypeIcon()}
            <span>{user.type?.charAt(0).toUpperCase() + user.type?.slice(1)} Account</span>
          </DropdownMenuItem>
          {user.role && (
            <DropdownMenuItem>
              <ShieldCheck className="h-4 w-4 mr-2" />
              <span>{user.role}</span>
            </DropdownMenuItem>
          )}
          {selectedHospital && (
            <DropdownMenuItem>
              <Hospital className="h-4 w-4 mr-2" />
              <span>{selectedHospital.name}</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Settings className="h-4 w-4 mr-2" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="h-4 w-4 mr-2" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
