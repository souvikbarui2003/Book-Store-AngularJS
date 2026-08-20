import { Link } from "react-router-dom";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Star,
  Shield,
  Users,
  ArrowRight,
  Sparkles,
  Quote,
} from "lucide-react";

const featuredBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop",
    rating: 4.5,
  },
  {
    title: "1984",
    author: "George Orwell",
    cover:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&h=450&fit=crop",
    rating: 4.6,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    cover:
      "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=300&h=450&fit=crop",
    rating: 4.8,
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    cover:
      "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=450&fit=crop",
    rating: 4.7,
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Vast Collection",
    description:
      "Browse hundreds of carefully curated books across every genre imaginable.",
  },
  {
    icon: Star,
    title: "Rate & Review",
    description:
      "Share your thoughts with our community by rating and commenting on books.",
  },
  {
    icon: Shield,
    title: "Secure Purchases",
    description:
      "Buy books with confidence using our secure checkout system.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Connect with fellow readers, build favorites, and discover hidden gems.",
  },
];

export default function Landing() {
  const { isAuthenticated } = useConvexAuth();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              Welcome to BookNook
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Discover Your Next
              <span className="text-primary"> Great Read</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A curated digital bookstore where every page turns into an
              adventure. Browse, buy, rate, and share the books that move you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/books">
                <Button size="lg" className="text-base px-8">
                  Browse Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              {!isAuthenticated && (
                <Link to="/auth">
                  <Button variant="outline" size="lg" className="text-base px-8">
                    Get Started Free
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Books</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Hand-picked selections that our readers can't put down.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {featuredBooks.map((book, i) => (
              <Link
                key={i}
                to="/books"
                className="group"
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="aspect-[2/3] overflow-hidden">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm truncate">
                      {book.title}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {book.author}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span className="text-xs font-medium">{book.rating}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why BookNook?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need for a complete reading experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="text-center p-6 hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="h-12 w-12 text-primary/30 mx-auto mb-6" />
            <blockquote className="text-xl md:text-2xl italic mb-6">
              "BookNook has completely transformed how I discover and organize
              my reading list. The community reviews are incredibly helpful!"
            </blockquote>
            <div>
              <p className="font-semibold">Sarah Mitchell</p>
              <p className="text-sm text-muted-foreground">
                Avid Reader & Book Club Leader
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/80 p-12 text-center text-primary-foreground">
              <h2 className="text-3xl font-bold mb-4">
                Start Your Reading Journey
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
                Join thousands of readers who've found their next favorite book
                on BookNook.
              </p>
              <Link to={isAuthenticated ? "/books" : "/auth"}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-base px-8"
                >
                  {isAuthenticated ? "Browse Books" : "Create Free Account"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
