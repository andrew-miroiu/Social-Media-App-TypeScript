export default function ProfileSkeleton() {
  return (
    <div className="profile-page w-full max-w-xl mx-auto p-4 overflow-x-hidden animate-pulse">
      
      {/* HEADER */}
      <div className="profile-header bg-white shadow-md rounded-xl p-5 mb-6">
        
        {/* TOP */}
        <div className="flex items-center gap-4">
          
          {/* avatar */}
          <div className="h-20 w-20 rounded-full bg-slate-200" />

          {/* name */}
          <div className="space-y-2">
            <div className="h-5 w-40 bg-slate-200 rounded" />
            <div className="h-3 w-28 bg-slate-200 rounded" />
          </div>
        </div>

        {/* upload button placeholder */}
        <div className="mt-4">
          <div className="h-8 w-32 bg-slate-200 rounded" />
        </div>

        {/* STATS */}
        <div className="flex justify-around mt-6 text-center">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="h-5 w-8 bg-slate-200 rounded mx-auto" />
              <div className="h-3 w-12 bg-slate-200 rounded mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* POSTS GRID */}
      <div className="profile-grid grid grid-cols-3 gap-1 mt-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="w-full aspect-[3/4] bg-slate-200 rounded-md"
          />
        ))}
      </div>
    </div>
  );
}
