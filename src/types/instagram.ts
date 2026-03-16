export interface InstagramPostSize {
  mediaUrl: string;
  height: number;
  width: number;
}

export interface InstagramPost {
  id: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  caption: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  isReel?: boolean;
  timestamp?: string;
  sizes?: {
    small: InstagramPostSize;
    medium: InstagramPostSize;
    large: InstagramPostSize;
    full: InstagramPostSize;
  };
}

export interface InstagramFeedResponse {
  posts: InstagramPost[];
}
