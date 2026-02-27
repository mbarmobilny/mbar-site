/// <reference types="vite/client" />

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "simplelightbox" {
  interface SimpleLightboxOptions {
    overlayOpacity?: number;
    captionsData?: string;
    captionPosition?: string;
    captionDelay?: number;
    animationSpeed?: number;
    widthRatio?: number;
    heightRatio?: number;
  }

  export default class SimpleLightbox {
    constructor(elements: string | NodeList, options?: SimpleLightboxOptions);
    destroy(): void;
  }
}
