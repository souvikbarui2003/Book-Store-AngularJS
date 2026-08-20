import { Link, useNavigate } from "react-router-dom";
import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Search,
  ShoppingCart,
  User,
  LogOut,
  Menu,
  X,
  Bell,
  Shield,
} from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  const user = useQuery(api.users.getCurrentUser);
  const notifications = useQuery(
    api.notifications.listByUser
  );
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount =
    notifications?.filter((n) => !n.read).length ?? 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold tracking-tight">BookNook</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search books, authors, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </form>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/books">
              <Button variant="ghost" size="sm">
                Browse
              </Button>
            </Link>
            {isAuthenticated && user ? (
              <>
                <Link to="/favorites">
                  <Button variant="ghost" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Favorites
                  </Button>
                </Link>
                <Link to="/notifications" className="relative">
                  <Button variant="ghost" size="icon">
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-1" />
                    {user.name}
                  </Button>
                </Link>
                {user.role === "admin" && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm">
                      <Shield className="h-4 w-4 mr-1" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </form>
            <Link
              to="/books"
              className="block"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button variant="ghost" className="w-full justify-start">
                Browse Books
              </Button>
            </Link>
            {isAuthenticated && user ? (
              <>
                <Link
                  to="/favorites"
                  className="block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full justify-start">
                    Favorites
                  </Button>
                </Link>
                <Link
                  to="/profile"
                  className="block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full justify-start">
                    Profile
                  </Button>
                </Link>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="ghost" className="w-full justify-start">
                      Admin Dashboard
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link
                to="/auth"
                className="block"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full">Sign In</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
