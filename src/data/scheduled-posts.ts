import type { BlogPost } from './blog-posts';
import postsData from '../scheduled/posts.json';

export interface ScheduledBlogPost extends BlogPost {
  /** ISO datetime string — post only appears after this date */
  publishAt: string;
}

/**
 * Scheduled blog posts — 200 posts loaded from generated posts.json.
 * 5 posts per week (Mon–Fri), starting Aug 11 2026.
 * Content for each post lives in src/scheduled/<slug>.md
 *
 * To regenerate or add posts: node scripts/gen-all-posts.cjs
 */
export const scheduledPosts: ScheduledBlogPost[] = postsData as ScheduledBlogPost[];

/**
 * Returns only scheduled posts whose publishAt time has passed.
 * At build time, this filters out future posts.
 */
export function getPublishedScheduledPosts(): ScheduledBlogPost[] {
  const now = new Date().toISOString();
  return scheduledPosts.filter((post) => post.publishAt <= now);
}
