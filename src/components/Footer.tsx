import { BookOpen, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">BookNook</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your digital sanctuary for discovering, purchasing, and sharing
              the world's greatest books.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/books" className="hover:text-foreground transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link to="/books?genre=Classic Fiction" className="hover:text-foreground transition-colors">
                  Classic Fiction
                </Link>
              </li>
              <li>
                <Link to="/books?genre=Science Fiction" className="hover:text-foreground transition-colors">
                  Science Fiction
                </Link>
              </li>
              <li>
                <Link to="/books?genre=Fantasy" className="hover:text-foreground transition-colors">
                  Fantasy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Account</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/profile" className="hover:text-foreground transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-foreground transition-colors">
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/purchases" className="hover:text-foreground transition-colors">
                  Purchase History
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">About</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="hover:text-foreground transition-colors cursor-pointer">
                  About BookNook
                </span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-3 w-3 text-destructive fill-destructive" /> by BookNook &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
