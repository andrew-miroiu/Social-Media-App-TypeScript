import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function PostForm() {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Get logged-in user
  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUserId(data.user.id);
    }
    getUser();
  }, []);

  function handleFileChange(e: any) {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    console.log("Submitting post:", { content, file });
    console.log("User ID:", userId);

    if (!userId) {
      alert("You must be logged in.");
      return;
    }

    if (!content && !file) {
      alert("Write something or upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("user_id", userId);
    if (file) formData.append("file", file);

    const res = await fetch("http://localhost:5000/posts", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Post created:", data);

    setContent("");
    setFile(null);
    setPreview(null);
    window.location.reload();
  }

  if (!userId) return <p>Please log in to post.</p>;

  return (
    <form onSubmit={handleSubmit}>

      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {preview && file && (
        <div>
          {file.type.startsWith("image/") && (
            <img src={preview} alt="preview" width="200" />
          )}

          {file.type.startsWith("video/") && (
            <video width="300" controls>
              <source src={preview} />
            </video>
          )}
        </div>
      )}

      <input type="file" accept="image/*,video/*" onChange={handleFileChange} />

      <button type="submit">Post</button>
    </form>
  );
}
