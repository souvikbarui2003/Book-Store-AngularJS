import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const { users: authUsers, ...restAuthTables } = authTables;

export default defineSchema({
  ...restAuthTables,

  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    image: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    // Custom fields for BookNook
    role: v.optional(v.union(v.literal("user"), v.literal("admin"))),
    favoriteBookIds: v.array(v.id("books")),
  }).index("by_email", ["email"]),

  books: defineTable({
    title: v.string(),
    author: v.string(),
    description: v.string(),
    price: v.number(),
    coverImage: v.string(),
    genre: v.string(),
    isbn: v.string(),
    publishedYear: v.number(),
    rating: v.number(),
    ratingCount: v.number(),
  }).searchIndex("search_by_all", {
    searchField: "title",
    filterFields: ["genre"],
  }),

  ratings: defineTable({
    userId: v.id("users"),
    bookId: v.id("books"),
    rating: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_bookId", ["bookId"])
    .index("by_userId_and_bookId", ["userId", "bookId"]),

  comments: defineTable({
    userId: v.id("users"),
    bookId: v.id("books"),
    userName: v.string(),
    text: v.string(),
    edited: v.boolean(),
    createdAt: v.number(),
  }).index("by_bookId", ["bookId"]),

  purchases: defineTable({
    userId: v.id("users"),
    bookId: v.id("books"),
    pricePaid: v.number(),
    purchasedAt: v.number(),
  }).index("by_userId", ["userId"]),

  notifications: defineTable({
    userId: v.id("users"),
    message: v.string(),
    read: v.boolean(),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),
});
