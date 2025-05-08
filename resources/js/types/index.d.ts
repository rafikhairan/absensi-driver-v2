import type { Config } from 'ziggy-js';

export interface Flash {
  success?: string;
  error?: string;
}

export interface SharedData {
  name: string;
  quote: { message: string; author: string };
  ziggy: Config & { location: string };
  sidebarOpen: boolean;
  flash: Flash;
  [key: string]: unknown;
}
