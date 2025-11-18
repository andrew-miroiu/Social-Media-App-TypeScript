import React, { useEffect, useState } from "react";

interface ProfileProps {
  userId?: string | null;
}

interface LoadedUser {
  id: string;
  email?: string | null;
  username?: string | null;
  full_name?: string | null;
}

export default function Profile({ userId }: ProfileProps) {
  const [loadedUser, setLoadedUser] = useState<LoadedUser | null>(null);

  useEffect(() => {
    async function loadProfile() {
      if (!userId) return;

      const res = await fetch(`http://localhost:5000/profile/${userId}`);
      const data = await res.json();
      setLoadedUser(data.profile);
    }
    loadProfile();
  }, [userId]);

    console.log("loaded user: " + loadedUser);

  if (!loadedUser) return <p>Loading profile...</p>;

  return (
    <div>
      <h1>Profile Page</h1>
      <p><strong>Email:</strong> {loadedUser.email}</p>
      <p><strong>User ID:</strong> {loadedUser.id}</p>
      <p>
        Username: <strong>{loadedUser.full_name || loadedUser.username}</strong>
      </p>
    </div>
  );
}
