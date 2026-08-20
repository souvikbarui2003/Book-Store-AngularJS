import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { useConvexAuth } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star, ShoppingCart, Heart, ArrowLeft, MessageCircle, Edit2, Trash2 } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useConvexAuth();
  const user = useQuery(api.users.getCurrentUser);
  const book = useQuery(
    api.books.get,
    id ? { bookId: id as any } : "skip"
  );
  const comments = useQuery(
    api.comments.listByBook,
    id ? { bookId: id as any } : "skip"
  );
  const userRating = useQuery(
    api.ratings.getUserRating,
    user && id ? { userId: user._id, bookId: id as any } : "skip"
  );
  const hasPurchased = useQuery(
    api.purchases.hasPurchased,
    user && id ? { userId: user._id, bookId: id as any } : "skip"
  );
  const isFavorite = user && book
    ? user.favoriteBookIds.includes(book._id)
    : false;

  const purchase = useMutation(api.purchases.purchase);
  const rateBook = useMutation(api.ratings.rate);
  const addComment = useMutation(api.comments.add);
  const editComment = useMutation(api.comments.edit);
  const removeComment = useMutation(api.comments.remove);
  const toggleFavorite = useMutation(api.users.toggleFavorite);

  const [commentText, setCommentText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const handlePurchase = async () => {
    if (!id) return;
    try {
      await purchase({ bookId: id as any });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to purchase");
    }
  };

  const handleRate = async (rating: number) => {
    if (!id) return;
    try {
      await rateBook({ bookId: id as any, rating });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to rate");
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !commentText.trim()) return;
    try {
      await addComment({ bookId: id as any, text: commentText.trim() });
      setCommentText("");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to add comment");
    }
  };

  const handleEdit = async (commentId: string) => {
    if (!editText.trim()) return;
    try {
      await editComment({ commentId: commentId as any, text: editText.trim() });
      setEditingId(null);
      setEditText("");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to edit comment");
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("Delete this comment?")) return;
    try {
      await removeComment({ commentId: commentId as any });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete comment");
    }
  };

  const handleFavorite = async () => {
    if (!id) return;
    try {
      await toggleFavorite({ bookId: id as any });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed");
    }
  };

  if (book === undefined) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="grid md:grid-cols-[300px_1fr] gap-8">
            <div className="aspect-[2/3] bg-muted rounded-lg" />
            <div className="space-y-4">
              <div className="h-10 w-64 bg-muted rounded" />
              <div className="h-6 w-32 bg-muted rounded" />
              <div className="h-24 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Book not found</h1>
        <Button onClick={() => navigate("/books")}>Back to Books</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid md:grid-cols-[300px_1fr] gap-8 lg:gap-12">
        {/* Book Cover */}
        <div className="mx-auto md:mx-0 max-w-[300px]">
          <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
            <img
              src={book.coverImage}
              alt={book.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Book Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">{book.title}</h1>
                <p className="text-lg text-muted-foreground mt-1">
                  by {book.author}
                </p>
              </div>
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleFavorite}
                >
                  <Heart
                    className={`h-6 w-6 ${
                      isFavorite
                        ? "fill-destructive text-destructive"
                        : "text-muted-foreground"
                    }`}
                  />
                </Button>
              )}
            </div>

            {/* Rating Display */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(book.rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">
                {book.rating > 0 ? book.rating.toFixed(1) : "No ratings"}
              </span>
              {book.ratingCount > 0 && (
                <span className="text-sm text-muted-foreground">
                  ({book.ratingCount} ratings)
                </span>
              )}
            </div>
          </div>

          {/* Price & Actions */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(book.price)}
            </span>
            {isAuthenticated && (
              <>
                {hasPurchased ? (
                  <Button disabled className="bg-green-600 hover:bg-green-600">
                    ✓ Purchased
                  </Button>
                ) : (
                  <Button onClick={handlePurchase}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {book.genre}
            </span>
            <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
              ISBN: {book.isbn}
            </span>
            <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
              Published {book.publishedYear}
            </span>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-2">About this book</h2>
            <p className="text-muted-foreground leading-relaxed">
              {book.description}
            </p>
          </div>

          {/* Rate this book */}
          {isAuthenticated && (hasPurchased || user?.role === "admin") && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Rate this book</h3>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => handleRate(star)}
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${
                          star <= (hoverRating || (userRating?.rating ?? 0))
                            ? "fill-primary text-primary"
                            : "text-muted-foreground/30 hover:text-primary/50"
                        }`}
                      />
                    </button>
                  ))}
                  {userRating && (
                    <span className="ml-2 text-sm text-muted-foreground">
                      Your rating: {userRating.rating}/5
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Comments ({comments?.length ?? 0})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add Comment */}
            {isAuthenticated && (
              <form onSubmit={handleComment} className="space-y-3">
                <Textarea
                  placeholder="Share your thoughts about this book..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={3}
                />
                <Button type="submit" size="sm" disabled={!commentText.trim()}>
                  Post Comment
                </Button>
              </form>
            )}

            {/* Comments List */}
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="border-b pb-4 last:border-0"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-sm">
                        {comment.userName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(comment.createdAt)}
                        {comment.edited && " (edited)"}
                      </p>
                    </div>
                    {user &&
                      (comment.userId === user._id ||
                        user.role === "admin") && (
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => {
                              setEditingId(comment._id);
                              setEditText(comment.text);
                            }}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive"
                            onClick={() => handleDelete(comment._id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                  </div>
                  {editingId === comment._id ? (
                    <div className="mt-2 space-y-2">
                      <Textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleEdit(comment._id)}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-2 text-sm">{comment.text}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No comments yet. Be the first to share your thoughts!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
