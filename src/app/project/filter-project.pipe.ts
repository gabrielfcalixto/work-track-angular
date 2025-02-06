import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProject'
})
export class FilterProjectPipe implements PipeTransform {
  transform(projetos: any[], searchText: string): any[] {
    if (!projetos || !searchText) {
      return projetos;
    }

    return projetos.filter(projeto =>
      projeto.nome.toLowerCase().includes(searchText.toLowerCase()) ||
      projeto.status.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
