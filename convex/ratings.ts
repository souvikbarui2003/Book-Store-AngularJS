import { getAuthUserId } from "@convex-dev/auth/server";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getUserRating = query({
  args: {
    userId: v.id("users"),
    bookId: v.id("books"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("ratings")
      .withIndex("by_userId_and_bookId", (q) =>
        q.eq("userId", args.userId).eq("bookId", args.bookId)
      )
      .unique();
    return existing;
  },
});

export const rate = mutation({
  args: {
    bookId: v.id("books"),
    rating: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Check if user has purchased this book
    const purchase = await ctx.db
      .query("purchases")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("bookId"), args.bookId))
      .first();

    const user = await ctx.db.get(userId);
    if (!purchase && user?.role !== "admin") {
      throw new Error("You must purchase this book before rating it");
    }

    const existing = await ctx.db
      .query("ratings")
      .withIndex("by_userId_and_bookId", (q) =>
        q.eq("userId", userId).eq("bookId", args.bookId)
      )
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { rating: args.rating });
    } else {
      await ctx.db.insert("ratings", {
        userId,
        bookId: args.bookId,
        rating: args.rating,
      });
    }

    // Recalculate average rating
    const allRatings = await ctx.db
      .query("ratings")
      .withIndex("by_bookId", (q) => q.eq("bookId", args.bookId))
      .collect();

    const totalRating = allRatings.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = allRatings.length > 0 ? totalRating / allRatings.length : 0;

    await ctx.db.patch(args.bookId, {
      rating: Math.round(avgRating * 10) / 10,
      ratingCount: allRatings.length,
    });
  },
});
