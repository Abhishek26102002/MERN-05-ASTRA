import { LoaderCircle } from "lucide-react";

export default function NotificationsSkeleton() {
  const skeletonItems = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="space-y-4">
      <div className="bg-base-100 shadow rounded-box">
        <div className="border-b px-4 py-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <div className="w-20 h-4 bg-base-300 rounded animate-pulse"></div>
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-12rem)]">
          {skeletonItems.map((index) => (
            <div key={index} className="flex items-start gap-4 p-4 border-b border-base-200">
              <div className="w-10 h-10 rounded-full bg-base-300 animate-pulse"></div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-base-300 rounded animate-pulse"></div>
                  <div className="w-40 h-4 bg-base-300 rounded animate-pulse"></div>
                </div>

                <div className="pl-6 space-y-2">
                  <div className="h-20 w-full bg-base-300 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-base-300 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
