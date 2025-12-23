import SkeletonCard from "./SkeletonCard";

export default function AdminCardSkeleton({ height = 250 }) {
  return (
    <SkeletonCard height={height} className="mb-3" />
  );
}
