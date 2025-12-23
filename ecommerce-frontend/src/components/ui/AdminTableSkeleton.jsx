import SkeletonCard from "./SkeletonCard";

export default function AdminTableSkeleton({ rows = 5 }) {
  return (
    <>
      {/* Page title placeholder */}
      <SkeletonCard height={32} width="40%" className="mb-3" />

      {/* Table header */}
      <SkeletonCard height={22} className="mb-2" />

      {/* Table rows */}
      {[...Array(rows)].map((_, i) => (
        <SkeletonCard key={i} height={50} className="mb-2" />
      ))}
    </>
  );
}
