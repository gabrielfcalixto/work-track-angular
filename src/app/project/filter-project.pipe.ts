import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProject'
})
export class FilterProjectPipe implements PipeTransform {
  transform(projects: any[], searchText: string): any[] {
    if (!projects || !searchText) {
      return projects;
    }
    return projects.filter(project =>
      project.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
