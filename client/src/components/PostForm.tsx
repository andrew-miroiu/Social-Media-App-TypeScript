import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { API_BASE_URL } from "../lib/apiConfig";
import ClipLoader from "react-spinners/ClipLoader";

export default function PostForm() {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  

  // Get logged-in user
  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUserId(data.user.id);
    }
    getUser();
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("content", content);
    formData.append("user_id", userId);
    if (file) formData.append("file", file);

    const res = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Post created:", data);

    setContent("");
    setFile(null);
    setPreview(null);
    window.location.reload();
    setIsSubmitting(false);
  }

  if (!userId) return <p>Please log in to post.</p>;

  return (
    <form 
      onSubmit={handleSubmit}
      className="postform flex flex-col gap-4 p-4 bg-white rounded-xl shadow-md mb-6"
    >

      {/* TEXTAREA */}
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="postform-textarea w-full p-3 rounded-lg border border-slate-300 bg-slate-50 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        rows={3}
      />

      {/* PREVIEW (image OR video) */}
      {preview && file && (
        <div className="postform-preview w-full flex justify-center">
          {file.type.startsWith("image/") && (
            <img 
              src={preview} 
              alt="preview" 
              className="max-h-64 object-contain rounded-lg"
            />
          )}

          {file.type.startsWith("video/") && (
            <video 
              controls 
              className="max-h-64 object-contain rounded-lg"
            >
              <source src={preview} />
            </video>
          )}
        </div>
      )}

      {/* FILE INPUT */}
      <input 
        type="file" 
        accept="image/*,video/*" 
        onChange={handleFileChange}
        className="postform-file block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
      />

      {/* BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting || (!content.trim() && !file)}
        className="postform-button flex items-center gap-2 self-end px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <ClipLoader size={16} color="#fff" />
            Posting...
          </>
        ) : (
          "Post"
        )}
      </button>

    </form>

  );
}
