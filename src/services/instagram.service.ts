import type { InstagramPost } from "../types/instagram";

const BEHOLD_URL = import.meta.env.PUBLIC_BEHOLD_URL;

const DUMMY_POSTS: InstagramPost[] = [
  {
    id: "1",
    mediaUrl: "/img/jornada_medica.JPG",
    permalink: "https://instagram.com",
    caption: "Nuestra última jornada médica fue un éxito. Gracias a todos los voluntarios.",
    mediaType: "IMAGE",
  },
  {
    id: "2",
    mediaUrl: "/img/entrega_alimentos.JPG",
    permalink: "https://instagram.com",
    caption: "Reparto semanal de alimentos en nuestra sede.",
    mediaType: "IMAGE",
  },
  {
    id: "3",
    mediaUrl: "/img/voluntariado.JPG",
    permalink: "https://instagram.com",
    caption: "Únete a nuestro equipo de voluntarios y ayuda a cambiar vidas.",
    mediaType: "IMAGE",
  },
];

export class InstagramService {
  static async getFeed(limit: number = 3): Promise<{ posts: InstagramPost[]; isDemo: boolean }> {
    if (!BEHOLD_URL) {
      return { posts: DUMMY_POSTS.slice(0, limit), isDemo: true };
    }

    try {
      const response = await fetch(BEHOLD_URL);
      
      if (!response.ok) {
        console.warn("Instagram feed response not OK, falling back to dummy data");
        return { posts: DUMMY_POSTS.slice(0, limit), isDemo: true };
      }

      const data = await response.json();
      
      if (data && Array.isArray(data.posts)) {
        const posts = data.posts.slice(0, limit).map((post: any) => ({
          id: post.id,
          mediaUrl: post.mediaUrl || post.media_url,
          thumbnailUrl: post.thumbnailUrl || post.thumbnail_url || post.thumbnail,
          permalink: post.permalink,
          caption: post.caption || post.text || "",
          mediaType: post.mediaType || post.media_type || "IMAGE",
          isReel: post.isReel,
          timestamp: post.timestamp,
          sizes: post.sizes,
        }));
        
        return { posts, isDemo: false };
      }

      return { posts: DUMMY_POSTS.slice(0, limit), isDemo: true };
    } catch (error) {
      console.error("Error fetching Instagram feed:", error);
      return { posts: DUMMY_POSTS.slice(0, limit), isDemo: true };
    }
  }
}
