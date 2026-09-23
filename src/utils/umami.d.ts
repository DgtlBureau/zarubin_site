// Umami analytics tracker loaded from cloud.umami.is in app/layout.tsx
interface Window {
  umami?: {
    track: (event: string, data?: Record<string, string | number>) => void;
  };
}
