import { Injectable } from '@angular/core';

export type ReportFormat = 'pdf' | 'xlsx';
export type ReportRow = Record<string, string | number>;

@Injectable({ providedIn: 'root' })
export class ReportService {
  async download(format: ReportFormat, title: string, filename: string, rows: ReportRow[]): Promise<void> {
    if (!rows.length) return;
    if (format === 'xlsx') {
      const { utils, writeFile } = await import('xlsx');
      const book = utils.book_new();
      utils.book_append_sheet(book, utils.json_to_sheet(rows), title);
      writeFile(book, `work-track-${filename}.xlsx`);
      return;
    }

    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text(title, 14, 18);
    pdf.setFontSize(10);
    let y = 29;
    for (const row of rows) {
      const lines: string[] = pdf.splitTextToSize(
        Object.entries(row).map(([label, value]) => `${label}: ${value}`).join('\n'), 182);
      const height = 5 * lines.length + 5;
      if (y + height > 282) {
        pdf.addPage();
        y = 18;
      }
      pdf.text(lines, 14, y);
      y += height;
    }
    pdf.save(`work-track-${filename}.pdf`);
  }
}
