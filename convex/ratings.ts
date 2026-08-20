import { getAuthUserId } from "@convex-dev/auth/server";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const rate = mutation({
  args: {
    bookId: v.id("books"),
    rating: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    if (args.rating < 1 || args.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    const book = await ctx.db.get(args.bookId);
    if (!book) throw new Error("Book not found");

    // Check if user already rated this book
    const existing = await ctx.db
      .query("ratings")
      .withIndex("by_userId_and_bookId", (q) =>
        q.eq("userId", userId).eq("bookId", args.bookId)
      )
      .first();

    let oldRating = 0;
    if (existing) {
      oldRating = existing.rating;
      await ctx.db.patch(existing._id, { rating: args.rating });
    } else {
      await ctx.db.insert("ratings", {
        userId,
        bookId: args.bookId,
        rating: args.rating,
      });
    }

    // Update book's average rating
    const allRatings = await ctx.db
      .query("ratings")
      .withIndex("by_bookId", (q) => q.eq("bookId", args.bookId))
      .collect();

    const totalRating = allRatings.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = allRatings.length > 0 ? totalRating / allRatings.length : 0;

    await ctx.db.patch(args.bookId, {
      rating: avgRating,
      ratingCount: allRatings.length,
    });

    return { success: true };
  },
});

export const getUserRating = query({
  args: {
    userId: v.id("users"),
    bookId: v.id("books"),
  },
  handler: async (ctx, args) => {
    const rating = await ctx.db
      .query("ratings")
      .withIndex("by_userId_and_bookId", (q) =>
        q.eq("userId", args.userId).eq("bookId", args.bookId)
      )
      .first();

    return rating;
  },
});
