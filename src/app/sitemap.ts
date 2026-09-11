import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/** Every public route. Priority ranks the home page above the inner pages. */
const routes = [
  { path: "", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/services", priority: 0.8 },
  { path: "/products", priority: 0.8 },
  { path: "/portfolio", priority: 0.8 },
  { path: "/gallery", priority: 0.6 },
  { path: "/testimonials", priority: 0.6 },
  { path: "/faq", priority: 0.6 },
  { path: "/contact", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified,
    priority,
  }));
}
