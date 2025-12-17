export default function PostSkeleton() {
  return (
    <div className="post bg-white shadow-md rounded-xl p-4 sm:p-6 mb-6 w-full animate-pulse">
      
      {/* HEADER / MEDIA */}
      <div className="post-header mb-4">
        
        {/* media skeleton (image / video) */}
        <div className="w-full h-[300px] sm:h-[400px] bg-slate-200 rounded-lg mt-3" />

        {/* username */}
        <div className="h-4 w-32 bg-slate-200 rounded mt-3" />

        {/* content lines */}
        <div className="mt-2 space-y-2">
          <div className="h-3 w-full bg-slate-200 rounded" />
          <div className="h-3 w-5/6 bg-slate-200 rounded" />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="post-actions mt-4 pt-3 border-t border-slate-200 w-full">
        
        <div className="flex items-center gap-4 mb-3">
          
          {/* like */}
          <div className="h-4 w-10 bg-slate-200 rounded" />

          {/* comments */}
          <div className="h-4 w-14 bg-slate-200 rounded" />
        </div>
      </div>

    </div>
  );
}
