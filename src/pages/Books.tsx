import { useState } from "react";
import { useQuery } from "convex/react";
import { useSearchParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Search, Filter } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const genres = [
  "All",
  "Classic Fiction",
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Coming-of-Age",
  "Adventure",
  "Non-Fiction",
];

export default function Books() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [selectedGenre, setSelectedGenre] = useState(
    searchParams.get("genre") || "All"
  );
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const books = useQuery(
    api.books.search,
    searchQuery ? { query: searchQuery } : "skip"
  );

  const allBooks = useQuery(
    api.books.list,
    !searchQuery ? {} : "skip"
  );

  const displayBooks = searchQuery
    ? (books ?? [])
    : (allBooks ?? []);

  const filteredBooks =
    selectedGenre === "All"
      ? displayBooks
      : displayBooks.filter((b) => b.genre === selectedGenre);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (localSearch.trim()) params.set("search", localSearch.trim());
    if (selectedGenre !== "All") params.set("genre", selectedGenre);
    setSearchParams(params);
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    const params = new URLSearchParams();
    if (localSearch.trim()) params.set("search", localSearch.trim());
    if (genre !== "All") params.set("genre", genre);
    setSearchParams(params);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {searchQuery ? `Results for "${searchQuery}"` : "Browse Books"}
        </h1>
        <p className="text-muted-foreground">
          {filteredBooks.length} book{filteredBooks.length !== 1 ? "s" : ""} available
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by title, author, or genre..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </form>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => handleGenreChange(genre)}
            >
              {genre}
            </Button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-20">
          <Search className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No books found</h2>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
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
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {book.author}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span className="text-xs font-medium">
                        {book.rating > 0 ? book.rating.toFixed(1) : "New"}
                      </span>
                      {book.ratingCount > 0 && (
                        <span className="text-xs text-muted-foreground">
                          ({book.ratingCount})
                        </span>
                      )}
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
