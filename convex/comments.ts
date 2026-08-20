import { getAuthUserId } from "@convex-dev/auth/server";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listByBook = query({
  args: {
    bookId: v.id("books"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("comments")
      .withIndex("by_bookId", (q) => q.eq("bookId", args.bookId))
      .order("desc")
      .collect();
  },
});

export const add = mutation({
  args: {
    bookId: v.id("books"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (!user) throw new Error("User not found");

    if (!args.text.trim()) {
      throw new Error("Comment text cannot be empty");
    }

    await ctx.db.insert("comments", {
      userId,
      bookId: args.bookId,
      userName: user.name || "Anonymous",
      text: args.text.trim(),
      edited: false,
      createdAt: Date.now(),
    });

    return { success: true };
  },
});

export const edit = mutation({
  args: {
    commentId: v.id("comments"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const comment = await ctx.db.get(args.commentId);
    if (!comment) throw new Error("Comment not found");

    if (comment.userId !== userId) {
      throw new Error("You can only edit your own comments");
    }

    if (!args.text.trim()) {
      throw new Error("Comment text cannot be empty");
    }

    await ctx.db.patch(args.commentId, {
      text: args.text.trim(),
      edited: true,
    });

    return { success: true };
  },
});

export const remove = mutation({
  args: {
    commentId: v.id("comments"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const comment = await ctx.db.get(args.commentId);
    if (!comment) throw new Error("Comment not found");

    const user = await ctx.db.get(userId);
    if (!user) throw new Error("User not found");

    // Allow deletion if owner or admin
    if (comment.userId !== userId && user.role !== "admin") {
      throw new Error("Not authorized to delete this comment");
    }

    await ctx.db.delete(args.commentId);

    return { success: true };
  },
});
