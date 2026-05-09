import type { InstagramPost } from "../types/instagram";

const BEHOLD_URL = "https://feeds.behold.so/snMGZB4CaidBcYo4aY7b";

const DUMMY_POSTS: InstagramPost[] = [
  {
    id: "1",
    mediaUrl: "/src/assets/img/jornada-medica.jpg",
    permalink: "https://instagram.com/asisve_madrid_",
    caption: "Nuestra última jornada médica fue un éxito. Gracias a todos los voluntarios.",
    mediaType: "IMAGE",
  },
  {
    id: "2",
    mediaUrl: "/src/assets/img/entrega-alimentos.jpg",
    permalink: "https://instagram.com/asisve_madrid_",
    caption: "Reparto semanal de alimentos en nuestra sede.",
    mediaType: "IMAGE",
  },
  {
    id: "3",
    mediaUrl: "/src/assets/img/voluntariado.jpg",
    permalink: "https://instagram.com/asisve_madrid_",
    caption: "Únete a nuestro equipo de voluntarios y ayuda a cambiar vidas.",
    mediaType: "IMAGE",
  },
];

export class InstagramService {
  static async getFeed(limit: number = 3, reelsOnly: boolean = false): Promise<{ posts: InstagramPost[]; isDemo: boolean }> {
    if (!BEHOLD_URL) {
      return { posts: DUMMY_POSTS.slice(0, limit), isDemo: true };
    }

    try {
      const response = await fetch(`${BEHOLD_URL}?t=${Date.now()}`, {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        console.warn("Instagram feed response not OK, falling back to dummy data");
        return { posts: DUMMY_POSTS.slice(0, limit), isDemo: true };
      }

      const data = await response.json();
      
      if (data && Array.isArray(data.posts)) {
        let postsData = data.posts;

        if (reelsOnly) {
          postsData = postsData.filter((p: any) => p.mediaType === 'VIDEO' || p.isReel);
        }

        const posts = postsData
          .slice(0, limit)
          .map((post: any) => {
          // Prefer permanent Behold links from 'sizes' object to avoid Instagram CDN expiration
          const beholdMedia = post.sizes?.large?.mediaUrl || post.sizes?.full?.mediaUrl;
          const beholdThumb = post.sizes?.medium?.mediaUrl || post.sizes?.small?.mediaUrl;

          return {
            id: post.id,
            mediaUrl: beholdMedia || post.mediaUrl || post.media_url,
            thumbnailUrl: beholdThumb || post.thumbnailUrl || post.thumbnail_url || post.thumbnail,
            permalink: post.permalink,
            caption: post.caption || post.text || "",
            mediaType: post.mediaType || post.media_type || "IMAGE",
            isReel: post.mediaType === "VIDEO" || post.isReel,
            timestamp: post.timestamp,
            sizes: post.sizes,
          };
        });
        
        return { posts, isDemo: false };
      }

      return { posts: DUMMY_POSTS.slice(0, limit), isDemo: true };
    } catch (error) {
      console.error("Error fetching Instagram feed:", error);
      return { posts: DUMMY_POSTS.slice(0, limit), isDemo: true };
    }
  }
}
