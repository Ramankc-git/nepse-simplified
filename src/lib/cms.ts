import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

interface CmsFrontmatter {
  title: string;
  volume?: string;
  dateRange?: string;
  asOfDate?: string;
  category?: string;
  date?: string;
  summary?: string;
  readTime?: string;
  tags?: string[];
  status?: "published" | "draft";
  body?: string;
  type?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  details?: string;
}

interface CmsContent {
  slug: string;
  frontmatter: CmsFrontmatter;
  content: string;
}

/**
 * Read all markdown files from a CMS content folder.
 * Returns only published content.
 */
function readContentFolder(folder: string): CmsContent[] {
  const dir = path.join(contentDir, folder);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const filePath = path.join(dir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug: filename.replace(/\.(md|mdx)$/, ""),
        frontmatter: data as CmsFrontmatter,
        content,
      };
    })
    .filter((item) => item.frontmatter.status !== "draft");
}

/**
 * Get all CMS newsletter entries.
 */
export function getCmsNewsletters() {
  return readContentFolder("newsletters");
}

/**
 * Get all CMS analysis articles.
 */
export function getCmsAnalysis() {
  return readContentFolder("analysis");
}

/**
 * Get all CMS learning articles.
 */
export function getCmsLearning() {
  return readContentFolder("learning");
}

/**
 * Get all CMS market events.
 */
export function getCmsEvents() {
  return readContentFolder("events");
}

/**
 * Check if CMS content is available for a given collection.
 */
export function hasCmsContent(): boolean {
  if (!fs.existsSync(contentDir)) return false;
  const folders = fs.readdirSync(contentDir);
  return folders.some((folder) => {
    const dir = path.join(contentDir, folder);
    return fs.statSync(dir).isDirectory() && fs.readdirSync(dir).length > 0;
  });
}
