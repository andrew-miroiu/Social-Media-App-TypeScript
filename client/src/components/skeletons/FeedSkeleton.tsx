import PostSkeleton from "./PostSkeleton";

export default function FeedSkeleton() {
  return (
    <div className="flex justify-center w-full">
    <div className="w-full max-w-xl">
      {Array.from({ length: 4 }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
      </div>
    </div>
  );
}
