import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeUtilityService {
  formatTime(value: any): string {
    if (!value) return ''; // Evita erros com valores nulos
    if (typeof value === 'string') return value; // Se já for string, retorna como está

    const hours = value.getHours().toString().padStart(2, '0');
    const minutes = value.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}:00`;
  }

  calculateTotalHours(startTime: Date, endTime: Date): number {
    const diff = endTime.getTime() - startTime.getTime();
    return diff / (1000 * 60 * 60); // Converte milissegundos para horas
  }

  autoFormatTime(value: string): string {
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Formata automaticamente HH:mm
    if (value.length >= 2) {
      value = value.substring(0, 2) + ':' + value.substring(2, 4);
    }

    return value.substring(0, 5); // Limita a 5 caracteres
  }
}
