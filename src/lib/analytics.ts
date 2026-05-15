import { db } from '@/lib/db';

/**
 * Track a page view in the database.
 * This is a fire-and-forget function — errors are silently ignored
 * to avoid impacting page load performance.
 */
export async function trackPageView(path: string, ip: string = ''): Promise<void> {
  try {
    await db.pageView.create({
      data: { path, ip },
    });
  } catch {
    // Silently ignore — analytics should never block the user experience
  }
}

/**
 * Track a newsletter view in the database.
 */
export async function trackNewsletterView(slug: string, ip: string = ''): Promise<void> {
  try {
    await db.newsletterView.create({
      data: { slug, ip },
    });
  } catch {
    // Silently ignore
  }
}

/**
 * Get total subscriber count.
 */
export async function getSubscriberCount(): Promise<number> {
  try {
    return await db.subscriber.count({
      where: { active: true },
    });
  } catch {
    return 0;
  }
}

/**
 * Get total page views count.
 */
export async function getTotalPageViews(): Promise<number> {
  try {
    return await db.pageView.count();
  } catch {
    return 0;
  }
}

/**
 * Get page view counts grouped by path.
 * Useful for analytics dashboards.
 */
export async function getPageViewStats(): Promise<{ path: string; views: number }[]> {
  try {
    const views = await db.pageView.groupBy({
      by: ['path'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 20,
    });
    return views.map((v) => ({ path: v.path, views: v._count.id }));
  } catch {
    return [];
  }
}

/**
 * Get total newsletter views count.
 */
export async function getTotalNewsletterViews(): Promise<number> {
  try {
    return await db.newsletterView.count();
  } catch {
    return 0;
  }
}
