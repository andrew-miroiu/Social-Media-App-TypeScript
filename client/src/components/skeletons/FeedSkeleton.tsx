import PostSkeleton from "./PostSkeleton";

export default function FeedSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </>
  );
}
