import { getAuthUserId } from "@convex-dev/auth/server";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const user = await ctx.db.get(userId);
    if (!user) return null;
    return {
      _id: user._id,
      name: user.name ?? "Anonymous",
      email: user.email ?? "",
      image: user.image,
      role: user.role ?? "user",
      favoriteBookIds: user.favoriteBookIds ?? [],
    };
  },
});

export const updateProfile = mutation({
  args: {
    name: v.string(),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    await ctx.db.patch(userId, {
      name: args.name,
      image: args.image,
    });
  },
});

export const toggleFavorite = mutation({
  args: {
    bookId: v.id("books"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const user = await ctx.db.get(userId);
    if (!user) throw new Error("User not found");

    const currentFavorites = user.favoriteBookIds ?? [];
    const isFavorited = currentFavorites.includes(args.bookId);

    await ctx.db.patch(userId, {
      favoriteBookIds: isFavorited
        ? currentFavorites.filter((id) => id !== args.bookId)
        : [...currentFavorites, args.bookId],
    });
  },
});

export const ensureUser = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const user = await ctx.db.get(userId);
    if (user) return user._id;
    // User doesn't exist yet, create it
    const authUser = await ctx.db.get(userId);
    await ctx.db.insert("users", {
      name: authUser?.name ?? "Anonymous",
      email: authUser?.email,
      image: authUser?.image,
      role: "user",
      favoriteBookIds: [],
    });
    return userId;
  },
});
