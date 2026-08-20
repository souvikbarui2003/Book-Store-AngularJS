import { mutation } from "./_generated/server";

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, set against the backdrop of the Roaring Twenties. A masterpiece of American literature that explores themes of decadence, idealism, and social upheaval.",
    price: 12.99,
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop",
    genre: "Classic Fiction",
    isbn: "9780743273565",
    publishedYear: 1925,
    rating: 4.5,
    ratingCount: 24,
  },
  {
    title: "1984",
    author: "George Orwell",
    description:
      "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism. Winston Smith struggles against a society where Big Brother watches everything and independent thought is a crime.",
    price: 11.99,
    coverImage:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&h=450&fit=crop",
    genre: "Science Fiction",
    isbn: "9780451524935",
    publishedYear: 1949,
    rating: 4.7,
    ratingCount: 31,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description:
      "Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when Gandalf the wizard arrives with an unexpected adventure.",
    price: 14.99,
    coverImage:
      "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=300&h=450&fit=crop",
    genre: "Fantasy",
    isbn: "9780547928227",
    publishedYear: 1937,
    rating: 4.8,
    ratingCount: 42,
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    description:
      "Set in the distant future amidst a feudal interstellar society, Dune tells the story of young Paul Atreides, heir to a noble family tasked with ruling the inhospitable desert planet Arrakis.",
    price: 15.99,
    coverImage:
      "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=450&fit=crop",
    genre: "Science Fiction",
    isbn: "9780441172719",
    publishedYear: 1965,
    rating: 4.6,
    ratingCount: 28,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description:
      "The story follows the main character, Elizabeth Bennet, as she deals with issues of manners, upbringing, morality, education, and marriage in the society of the landed gentry of the British Regency.",
    price: 9.99,
    coverImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop",
    genre: "Classic Fiction",
    isbn: "9780141439518",
    publishedYear: 1813,
    rating: 4.4,
    ratingCount: 35,
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description:
      "The novel details two days in the sixteen-year-old life of Holden Caulfield after he has been expelled from prep school, in a story that has been both hugely popular and controversial.",
    price: 10.99,
    coverImage:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop",
    genre: "Coming-of-Age",
    isbn: "9780316769488",
    publishedYear: 1951,
    rating: 4.2,
    ratingCount: 19,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "Through the young eyes of Scout and Jem Finch, Harper Lee explores with rich humor and unswerving honesty the irrationality of adult attitudes to race and class in the Deep South of the 1930s.",
    price: 12.99,
    coverImage:
      "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=300&h=450&fit=crop",
    genre: "Classic Fiction",
    isbn: "9780061120084",
    publishedYear: 1960,
    rating: 4.8,
    ratingCount: 45,
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    description:
      "One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them. A sweeping epic of good versus evil set in a richly imagined fantasy world.",
    price: 18.99,
    coverImage:
      "https://images.unsplash.com/photo-1535666669445-e8ac03987a4b?w=300&h=450&fit=crop",
    genre: "Fantasy",
    isbn: "9780544003415",
    publishedYear: 1954,
    rating: 4.9,
    ratingCount: 52,
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    description:
      "Aldous Huxley's profoundly important classic of world literature, Brave New World is a searching vision of an unequal, technologically-advanced future where humans are genetically bred.",
    price: 11.99,
    coverImage:
      "https://images.unsplash.com/photo-1529473021030-f1ee0bbfe2d9?w=300&h=450&fit=crop",
    genre: "Science Fiction",
    isbn: "9780060850524",
    publishedYear: 1932,
    rating: 4.3,
    ratingCount: 22,
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    description:
      "Paulo Coelho's masterwork tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure as extravagant as any ever found.",
    price: 13.99,
    coverImage:
      "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=450&fit=crop",
    genre: "Adventure",
    isbn: "9780062315007",
    publishedYear: 1988,
    rating: 4.5,
    ratingCount: 38,
  },
  {
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    description:
      "The writings of Anne Frank from 1942 to 1944, when she was in hiding for fear of being captured by the Nazis during World War II. A powerful testimony to the human spirit.",
    price: 8.99,
    coverImage:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=450&fit=crop",
    genre: "Non-Fiction",
    isbn: "9780553296983",
    publishedYear: 1947,
    rating: 4.7,
    ratingCount: 29,
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    description:
      "The saga of Captain Ahab and his obsessive quest to hunt the white whale Moby Dick. A sweeping narrative of adventure, obsession, and the conflict between man and nature.",
    price: 10.99,
    coverImage:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&h=450&fit=crop",
    genre: "Classic Fiction",
    isbn: "9780142437247",
    publishedYear: 1851,
    rating: 4.1,
    ratingCount: 18,
  },
  {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    description:
      "Guy Montag is a fireman. His job is to destroy the most illegal of commodities, the printed book, along with the houses in which they are hidden. But when he meets a young neighbor who introduces him to a past where people didn't live in fear, Montag begins to question everything.",
    price: 11.99,
    coverImage:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=450&fit=crop",
    genre: "Science Fiction",
    isbn: "9781451673319",
    publishedYear: 1953,
    rating: 4.4,
    ratingCount: 26,
  },
  {
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    description:
      "A pilot stranded in the Sahara Desert encounters a young prince fallen to Earth from a tiny asteroid. Their conversation reveals insights about love, loss, and what it means to be human.",
    price: 7.99,
    coverImage:
      "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=300&h=450&fit=crop",
    genre: "Fantasy",
    isbn: "9780156012195",
    publishedYear: 1943,
    rating: 4.8,
    ratingCount: 41,
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    description:
      "Seconds before the Earth is demolished to make way for a galactic freeway, Arthur Dent is plucked off the planet by his friend Ford Prefect, a researcher for the revised edition of The Hitchhiker's Guide to the Galaxy.",
    price: 12.99,
    coverImage:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=450&fit=crop",
    genre: "Science Fiction",
    isbn: "9780345391803",
    publishedYear: 1979,
    rating: 4.6,
    ratingCount: 33,
  },
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    description:
      "Raskolnikov, a destitute and desperate former student, wanders through the slums of St Petersburg and commits a random murder without remorse or regret. He imagines himself to be a great man, above the law.",
    price: 13.99,
    coverImage:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop",
    genre: "Classic Fiction",
    isbn: "9780143058144",
    publishedYear: 1866,
    rating: 4.5,
    ratingCount: 27,
  },
];

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if books already exist
    const existing = await ctx.db.query("books").first();
    if (existing) {
      return { message: "Books already seeded" };
    }

    for (const book of sampleBooks) {
      await ctx.db.insert("books", book);
    }

    return { message: `Seeded ${sampleBooks.length} books` };
  },
});
