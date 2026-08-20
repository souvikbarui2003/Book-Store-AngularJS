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

    // Merge auth table data with custom user data
    const authUser = await ctx.db.get(userId);

    return {
      _id: user._id,
      name: user.name ?? "",
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

    return { success: true };
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

    const favorites = user.favoriteBookIds ?? [];
    const isFavorited = favorites.includes(args.bookId);

    if (isFavorited) {
      await ctx.db.patch(userId, {
        favoriteBookIds: favorites.filter((id) => id !== args.bookId),
      });
    } else {
      await ctx.db.patch(userId, {
        favoriteBookIds: [...favorites, args.bookId],
      });
    }

    return { favorited: !isFavorited };
  },
});
