import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("books").collect();
  },
});

export const get = query({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.bookId);
  },
});

export const search = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    if (!args.query.trim()) return [];
    const results = await ctx.db
      .query("books")
      .withSearchIndex("search_by_all", (q) => q.search("title", args.query))
      .collect();
    return results;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    author: v.string(),
    description: v.string(),
    price: v.number(),
    coverImage: v.string(),
    genre: v.string(),
    isbn: v.string(),
    publishedYear: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("books", {
      ...args,
      rating: 0,
      ratingCount: 0,
    });
  },
});

export const update = mutation({
  args: {
    bookId: v.id("books"),
    title: v.string(),
    author: v.string(),
    description: v.string(),
    price: v.number(),
    coverImage: v.string(),
    genre: v.string(),
    isbn: v.string(),
    publishedYear: v.number(),
  },
  handler: async (ctx, args) => {
    const { bookId, ...data } = args;
    await ctx.db.patch(bookId, data);
  },
});

export const remove = mutation({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.bookId);
  },
});
