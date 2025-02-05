import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projetos = [
    { nome: 'Projeto 1', tarefas: [{ nome: 'Tarefa 1', horas: 5 }, { nome: 'Tarefa 2', horas: 3 }], status: 'Em andamento' },
    { nome: 'Projeto 2', tarefas: [{ nome: 'Tarefa 1', horas: 2 }, { nome: 'Tarefa 2', horas: 4 }], status: 'Concluído' },
    { nome: 'Projeto 3', tarefas: [{ nome: 'Tarefa 1', horas: 7 }, { nome: 'Tarefa 2', horas: 1 }], status: 'Cancelado' },



  ];

  statusOptions = [
    { label: 'Em andamento', value: 'Em andamento' },
    { label: 'Concluído', value: 'Concluído' },
    { label: 'Cancelado', value: 'Cancelado' }
  ];

  selectedStatus: string = 'Em andamento';  // ou '' se você preferir vazio inicialmente
  searchText: string = '';

  calcularHoras(tarefas: any[]): number {
    return tarefas.reduce((acc, tarefa) => acc + tarefa.horas, 0);
  }

  gerarPDF() {
    const doc = new jsPDF();
    doc.text('Relatório de Projetos', 10, 10);
    this.projetos.forEach((projeto, index) => {
      doc.text(`${projeto.nome}:`, 10, 20 + index * 10);
      projeto.tarefas.forEach(tarefa => {
        doc.text(`Tarefa: ${tarefa.nome} | Horas: ${tarefa.horas}`, 20, 30 + index * 10);
      });
    });
    doc.save('relatorio_projetos.pdf');
  }

  gerarExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.projetos.map(projeto => ({
      Projeto: projeto.nome,
      Tarefas: projeto.tarefas.map(tarefa => `${tarefa.nome} | Horas: ${tarefa.horas}`).join(', ')
    })));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Projetos');
    XLSX.writeFile(wb, 'relatorio_projetos.xlsx');
  }

  editarProjeto(projeto: any) {
    // Lógica para editar o projeto
  }

  excluirProjeto(projeto: any) {
    // Lógica para excluir o projeto
  }
}
