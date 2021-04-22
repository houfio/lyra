import { buildQuery } from './buildQuery';

export function buildUrl(url: string, params: Record<string, string>) {
  return `${url}?${buildQuery(params)}`;
}
