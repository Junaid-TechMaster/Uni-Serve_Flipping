import Skeleton from './Skeleton';

export default function ReviewSkeleton() {
  return (
    <div className="p-8 rounded-xl bg-white dark:bg-gray-900 shadow-lg space-y-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />

      <div className="flex items-center mt-6">
        <Skeleton className="h-12 w-12 rounded-full mr-4" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}
