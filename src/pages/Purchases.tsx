import { useQuery } from "convex/react";
import { useConvexAuth } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

export default function Purchases() {
  const { isAuthenticated } = useConvexAuth();
  const user = useQuery(api.users.getCurrentUser);
  const purchases = useQuery(
    api.purchases.listByUser,
    user ? { userId: user._id } : "skip"
  );
  const allBooks = useQuery(api.books.list, {});

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
        <Link to="/auth">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  const purchasesWithBooks =
    purchases && allBooks
      ? purchases.map((p) => ({
          ...p,
          book: allBooks.find((b) => b._id === p.bookId),
        }))
      : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <ShoppingCart className="h-8 w-8" />
        Purchase History
      </h1>

      {purchasesWithBooks.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingCart className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No purchases yet</h2>
          <p className="text-muted-foreground mb-6">
            Your purchased books will appear here.
          </p>
          <Link to="/books">
            <Button>Browse Books</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4 max-w-3xl">
          {purchasesWithBooks.map((p) => (
            <Card key={p._id}>
              <CardContent className="p-4 flex items-center gap-4">
                {p.book && (
                  <>
                    <img
                      src={p.book.coverImage}
                      alt={p.book.title}
                      className="w-16 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/books/${p.book._id}`}
                        className="font-semibold hover:underline"
                      >
                        {p.book.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        by {p.book.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Purchased {formatDate(p.purchasedAt)}
                      </p>
                    </div>
                    <span className="font-bold text-primary">
                      {formatPrice(p.pricePaid)}
                    </span>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
