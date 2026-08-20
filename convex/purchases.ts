import { getAuthUserId } from "@convex-dev/auth/server";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const purchase = mutation({
  args: {
    bookId: v.id("books"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Check if already purchased
    const existing = await ctx.db
      .query("purchases")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("bookId"), args.bookId))
      .first();

    if (existing) {
      throw new Error("You have already purchased this book");
    }

    const book = await ctx.db.get(args.bookId);
    if (!book) throw new Error("Book not found");

    await ctx.db.insert("purchases", {
      userId,
      bookId: args.bookId,
      pricePaid: book.price,
      purchasedAt: Date.now(),
    });

    // Create notification
    await ctx.db.insert("notifications", {
      userId,
      message: `You purchased "${book.title}" for $${book.price.toFixed(2)}!`,
      read: false,
      createdAt: Date.now(),
    });

    return { success: true };
  },
});

export const listByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("purchases")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const hasPurchased = query({
  args: {
    userId: v.id("users"),
    bookId: v.id("books"),
  },
  handler: async (ctx, args) => {
    const purchase = await ctx.db
      .query("purchases")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("bookId"), args.bookId))
      .first();
    return !!purchase;
  },
});
