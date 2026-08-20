import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { useConvexAuth } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Shield,
  Plus,
  Edit2,
  Trash2,
  BookOpen,
  Users,
  Star,
  X,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function Admin() {
  const { isAuthenticated } = useConvexAuth();
  const user = useQuery(api.users.getCurrentUser);
  const books = useQuery(api.books.list, {});
  const createBook = useMutation(api.books.create);
  const updateBook = useMutation(api.books.update);
  const removeBook = useMutation(api.books.remove);

  const [showForm, setShowForm] = useState(false);
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    coverImage: "",
    genre: "",
    isbn: "",
    publishedYear: "",
  });

  if (!isAuthenticated || !user || user.role !== "admin") {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Shield className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
        <p className="text-muted-foreground">
          You don't have permission to access this page.
        </p>
      </div>
    );
  }

  const resetForm = () => {
    setForm({
      title: "",
      author: "",
      description: "",
      price: "",
      coverImage: "",
      genre: "",
      isbn: "",
      publishedYear: "",
    });
    setEditingBookId(null);
    setShowForm(false);
  };

  const handleEdit = (book: (typeof books extends (infer T)[] | undefined ? T : never)) => {
    setForm({
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price.toString(),
      coverImage: book.coverImage,
      genre: book.genre,
      isbn: book.isbn,
      publishedYear: book.publishedYear.toString(),
    });
    setEditingBookId(book._id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        title: form.title,
        author: form.author,
        description: form.description,
        price: parseFloat(form.price),
        coverImage: form.coverImage,
        genre: form.genre,
        isbn: form.isbn,
        publishedYear: parseInt(form.publishedYear),
      };

      if (editingBookId) {
        await updateBook({ bookId: editingBookId as any, ...data });
      } else {
        await createBook(data);
      }
      resetForm();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed");
    }
  };

  const handleDelete = async (bookId: string) => {
    if (!confirm("Delete this book? This cannot be undone.")) return;
    try {
      await removeBook({ bookId: bookId as any });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          Admin Dashboard
        </h1>
        <Button onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Book
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{books?.length ?? 0}</p>
              <p className="text-sm text-muted-foreground">Total Books</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Star className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {books
                  ? (books.reduce((sum, b) => sum + b.rating, 0) / books.length || 0).toFixed(1)
                  : "—"}
              </p>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
              <Users className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {books
                  ? [...new Set(books.map((b) => b.genre))].length
                  : 0}
              </p>
              <p className="text-sm text-muted-foreground">Genres</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              {editingBookId ? "Edit Book" : "Add New Book"}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={resetForm}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Author</label>
                <Input
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price ($)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Genre</label>
                <Input
                  value={form.genre}
                  onChange={(e) => setForm({ ...form, genre: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ISBN</label>
                <Input
                  value={form.isbn}
                  onChange={(e) => setForm({ ...form, isbn: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Published Year</label>
                <Input
                  type="number"
                  value={form.publishedYear}
                  onChange={(e) =>
                    setForm({ ...form, publishedYear: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Cover Image URL</label>
                <Input
                  value={form.coverImage}
                  onChange={(e) =>
                    setForm({ ...form, coverImage: e.target.value })
                  }
                  placeholder="https://..."
                  required
                />
              </div>
              <div className="md:col-span-2 flex gap-2">
                <Button type="submit">
                  {editingBookId ? "Update Book" : "Add Book"}
                </Button>
                <Button type="button" variant="ghost" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Books Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Books</CardTitle>
        </CardHeader>
        <CardContent>
          {books && books.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 font-medium">Book</th>
                    <th className="pb-3 font-medium">Genre</th>
                    <th className="pb-3 font-medium">Price</th>
                    <th className="pb-3 font-medium">Rating</th>
                    <th className="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book._id} className="border-b last:border-0">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-10 h-14 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{book.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {book.author}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                          {book.genre}
                        </span>
                      </td>
                      <td className="py-3">{formatPrice(book.price)}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-primary text-primary" />
                          <span>{book.rating.toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex gap-1 justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleEdit(book)}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleDelete(book._id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No books in the store yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
