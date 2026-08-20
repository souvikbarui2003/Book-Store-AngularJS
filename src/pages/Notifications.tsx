import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCheck } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function Notifications() {
  const notifications = useQuery(api.notifications.listByUser);
  const markAllRead = useMutation(api.notifications.markAllRead);

  const unreadCount = notifications?.filter((n) => !n.read).length ?? 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bell className="h-8 w-8" />
          Notifications
        </h1>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={() => markAllRead()}>
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark all read
          </Button>
        )}
      </div>

      {notifications && notifications.length > 0 ? (
        <div className="space-y-3 max-w-2xl">
          {notifications.map((notif) => (
            <Card
              key={notif._id}
              className={!notif.read ? "border-primary/50 bg-primary/5" : ""}
            >
              <CardContent className="p-4 flex items-start gap-3">
                <div
                  className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                    notif.read ? "bg-muted-foreground/30" : "bg-primary"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(notif.createdAt)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Bell className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No notifications</h2>
          <p className="text-muted-foreground">
            You're all caught up! Notifications will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
