import { HttpErrorResponse } from '@angular/common/http';

export function apiError(error: unknown, fallback: string): string {
  if (!(error instanceof HttpErrorResponse)) return fallback;
  if (error.status === 0) return 'Não foi possível conectar à API.';
  return typeof error.error?.message === 'string' ? error.error.message : fallback;
}
