import { mutation } from "./_generated/server";

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan, set against the backdrop of the Roaring Twenties. A critique of the American Dream and a masterpiece of modernist fiction.",
    price: 12.99,
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop",
    genre: "Classic Fiction",
    isbn: "978-0743273565",
    publishedYear: 1925,
    rating: 4.5,
    ratingCount: 0,
  },
  {
    title: "1984",
    author: "George Orwell",
    description:
      "A dystopian novel set in a totalitarian society ruled by Big Brother. Winston Smith fights against a system that controls every aspect of life, including thought itself.",
    price: 10.99,
    coverImage:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&h=450&fit=crop",
    genre: "Science Fiction",
    isbn: "978-0451524935",
    publishedYear: 1949,
    rating: 4.6,
    ratingCount: 0,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description:
      "Bilbo Baggins is swept into an epic quest to reclaim the lost Dwarf Kingdom of Erebor, battling trolls, goblins, and a dragon named Smaug along the way.",
    price: 14.99,
    coverImage:
      "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=300&h=450&fit=crop",
    genre: "Fantasy",
    isbn: "978-0547928227",
    publishedYear: 1937,
    rating: 4.8,
    ratingCount: 0,
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    description:
      "Set in the distant future, Paul Atreides leads the fight for control over the desert planet Arrakis, the only source of the most valuable substance in the universe.",
    price: 15.99,
    coverImage:
      "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=450&fit=crop",
    genre: "Science Fiction",
    isbn: "978-0441172719",
    publishedYear: 1965,
    rating: 4.7,
    ratingCount: 0,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description:
      "The turbulent relationship between Elizabeth Bennet and Fitzwilliam Darcy in Georgian England, exploring themes of class, reputation, and moral integrity.",
    price: 9.99,
    coverImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop",
    genre: "Classic Fiction",
    isbn: "978-0141439518",
    publishedYear: 1813,
    rating: 4.4,
    ratingCount: 0,
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description:
      "Holden Caulfield narrates his experiences in New York City after being expelled from prep school, exploring alienation and the loss of innocence.",
    price: 11.99,
    coverImage:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop",
    genre: "Coming-of-Age",
    isbn: "978-0316769488",
    publishedYear: 1951,
    rating: 4.0,
    ratingCount: 0,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "Through young Scout Finch's eyes, this novel explores racial injustice in the American South during the 1930s, as her father defends a black man falsely accused of a crime.",
    price: 12.99,
    coverImage:
      "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=300&h=450&fit=crop",
    genre: "Classic Fiction",
    isbn: "978-0061120084",
    publishedYear: 1960,
    rating: 4.7,
    ratingCount: 0,
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    description:
      "Frodo Baggins must destroy the One Ring to save Middle-earth from the Dark Lord Sauron in this epic fantasy trilogy of friendship, courage, and sacrifice.",
    price: 24.99,
    coverImage:
      "https://images.unsplash.com/photo-1629992101753-56d196c8ad9b?w=300&h=450&fit=crop",
    genre: "Fantasy",
    isbn: "978-0618640157",
    publishedYear: 1954,
    rating: 4.9,
    ratingCount: 0,
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    description:
      "A dystopian vision of a future society where technology, conditioning, and pleasure keep everyone docile, and an outsider challenges the very foundations of this world.",
    price: 11.99,
    coverImage:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=450&fit=crop",
    genre: "Science Fiction",
    isbn: "978-0060850524",
    publishedYear: 1932,
    rating: 4.3,
    ratingCount: 0,
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    description:
      "Santiago, an Andalusian shepherd boy, travels to Egypt in search of treasure buried near the Pyramids, learning about following his dreams along the way.",
    price: 13.99,
    coverImage:
      "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=300&h=450&fit=crop",
    genre: "Adventure",
    isbn: "978-0062315007",
    publishedYear: 1988,
    rating: 4.2,
    ratingCount: 0,
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    description:
      "A sweeping history of humankind from the Stone Age to the present, exploring how biology and history have shaped our societies and beliefs.",
    price: 18.99,
    coverImage:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=450&fit=crop",
    genre: "Non-Fiction",
    isbn: "978-0062316097",
    publishedYear: 2011,
    rating: 4.5,
    ratingCount: 0,
  },
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    description:
      "Raskolnikov, a destitute former student, commits murder and then grapples with guilt and redemption in this psychological masterpiece.",
    price: 10.99,
    coverImage:
      "https://images.unsplash.com/photo-1510172951991-856a654063f9?w=300&h=450&fit=crop",
    genre: "Classic Fiction",
    isbn: "978-0140449136",
    publishedYear: 1866,
    rating: 4.6,
    ratingCount: 0,
  },
];

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("books").first();
    if (existing) {
      return "Database already seeded";
    }

    for (const book of sampleBooks) {
      await ctx.db.insert("books", book);
    }

    return `Seeded ${sampleBooks.length} books`;
  },
});
