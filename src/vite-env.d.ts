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
    captionSelector?: string;
    captionsData?: string;
    captionPosition?: string;
    captionDelay?: number;
    captionClass?: string;
    animationSpeed?: number;
    widthRatio?: number;
    heightRatio?: number;
    disableScroll?: boolean;
    scrollZoom?: boolean;
  }

  export default class SimpleLightbox {
    constructor(elements: string | NodeList, options?: SimpleLightboxOptions);
    destroy(): void;
  }
}
