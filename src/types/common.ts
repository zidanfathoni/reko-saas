import { Setting } from '@/config';
import { GetTools } from '@/lib/interface/tools/getTools';

export type Tlang = (typeof Setting.languageSupport)[number];

export type TTheme = (typeof Setting.themeSupport)[number];

export type Toption = {
  name?: Partial<Record<Tlang, string>>;
  label: Partial<Record<Tlang, string>>;
  value: string | number;
};

// example
export type Tpost = {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
};

export type TTools = GetTools;