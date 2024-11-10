"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { supabase } from "@/utils/supabase/client" // Update based on your Supabase client setup
import { useEffect, useState } from 'react'

function ProfileSettings() {
  const [user, setUser] = useState(null) // Holds user info from Supabase
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Fetch user data from Supabase on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error("Error fetching user:", error.message)
      } else {
        setUser(data.user)
        setName(data.user?.user_metadata?.full_name || "")
        setEmail(data.user?.email || "")
      }
    }

    fetchUser()
  }, [])

  // Update profile information (name and email) in Supabase
  const handleUpdateProfile = async () => {
    const updates = {
      id: user.id,
      email,
      data: { full_name: name },
    }

    const { error } = await supabase.auth.updateUser(updates)

    if (error) {
      alert("Error updating profile: " + error.message)
    } else {
      alert("Profile updated successfully")
    }
  }

  // Change password in Supabase
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    try {
      const { error } = await supabase.auth.api.updateUserPassword(newPassword)

      if (error) {
        alert("Error changing password: " + error.message)
      } else {
        alert("Password updated successfully")
        setIsDialogOpen(false) // Close the dialog after saving the password
      }
    } catch (error) {
      alert("An error occurred: " + error.message)
    }
  }

  if (!user) {
    return <div>Loading...</div> // Display loading state while fetching user data
  }

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-sm">
      <div className="space-y-6">
        {/* Profile Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Profile</h2>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={user.user_metadata.avatar_url || "https://via.placeholder.com/150"} alt="User Avatar" />
              <AvatarFallback>{user.user_metadata.full_name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600">Your Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
                placeholder={user.user_metadata.fullName}
              />
            </div>
          </div>
        </section>

        {/* Account Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Account</h2>
          <div>
            <label className="text-sm font-medium text-gray-600">Your Email</label>
            <Input
              type="email"
              // value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
              placeholder={email}
            />
          </div>
          <div className="mt-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Change Password</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                  <DialogDescription>Enter your new password below.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    type="password"
                    placeholder="New Password"
                    className="w-full"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button variant="primary" onClick={handleChangePassword}>
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Security Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Security</h2>
          <Button variant="outline" className="text-red-500">
            Delete Account
          </Button>
        </section>

        {/* Update Profile Button */}
        <section className="mt-6">
          <Button onClick={handleUpdateProfile} className="w-full hover:bg-indigo-900">
            Update Profile
          </Button>
        </section>
      </div>
    </div>
  )
}

export default ProfileSettings
