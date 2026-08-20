import { useQuery } from "convex/react";
import { useConvexAuth } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Favorites() {
  const { isAuthenticated } = useConvexAuth();
  const user = useQuery(api.users.getCurrentUser);
  const allBooks = useQuery(api.books.list, {});

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
        <p className="text-muted-foreground mb-6">
          Sign in to view your favorite books.
        </p>
        <Link to="/auth">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  const favoriteBooks =
    user && allBooks
      ? allBooks.filter((book) => user.favoriteBookIds.includes(book._id))
      : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Heart className="h-8 w-8 text-destructive" />
          My Favorites
        </h1>
        <p className="text-muted-foreground">
          {favoriteBooks.length} book{favoriteBooks.length !== 1 ? "s" : ""} in
          your collection
        </p>
      </div>

      {favoriteBooks.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
          <p className="text-muted-foreground mb-6">
            Start adding books to your favorites list!
          </p>
          <Link to="/books">
            <Button>Browse Books</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteBooks.map((book) => (
            <Link key={book._id} to={`/books/${book._id}`}>
              <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                <div className="aspect-[2/3] overflow-hidden">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-semibold text-sm line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {book.author}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span className="text-xs font-medium">
                        {book.rating > 0 ? book.rating.toFixed(1) : "New"}
                      </span>
                    </div>
                    <span className="font-bold text-sm text-primary">
                      {formatPrice(book.price)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
