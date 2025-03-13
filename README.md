# Project Manager (Frontend)

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) na versão 17.3.11 e utiliza a biblioteca [PrimeNG](https://primeng.org/) para a construção de componentes elegantes e reutilizáveis.

## Requisitos
- Node.js (versão 18 ou superior)
- Angular CLI (instalado globalmente)
- Backend em Java 21 com Spring Boot

## Configuração do Projeto
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/project-manager.git
   cd project-manager/frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Servidor de Desenvolvimento
Execute o comando abaixo para iniciar o servidor de desenvolvimento:
```bash
ng serve
```
Acesse a aplicação em: [http://localhost:4200/](http://localhost:4200/). O aplicativo recarregará automaticamente ao detectar alterações nos arquivos.

## Estrutura do Projeto
- **src/app**: Contém os módulos, componentes, serviços e modelos.
- **services**: Responsável pela comunicação com o backend.
- **models**: Define as interfaces das entidades (Projetos, Usuários, Tarefas, Registros de Horas).
- **components**: Contém os componentes reutilizáveis.
- **pages**: Contém as páginas principais do sistema.

## Gerar Novos Componentes
Para criar um novo componente, utilize o comando:
```bash
ng generate component nome-do-componente
```

## Build
Para compilar o projeto, execute:
```bash
ng build
```
Os artefatos de build serão gerados no diretório `dist/`.

## Testes Unitários
Para executar os testes unitários com o [Karma](https://karma-runner.github.io):
```bash
ng test
```

## Testes de Integração
Para executar testes de ponta a ponta (e2e), instale a ferramenta necessária e rode o comando:
```bash
ng e2e
```

## Integração com o Backend
- URL do backend: `http://localhost:8080`
- Os dados dos gráficos e da dashboard são carregados diretamente do backend, exibindo informações conforme o tipo de usuário (USER, MANAGER, ADMIN).

## Implantar em Produção
Para criar uma versão para produção:
```bash
ng build --configuration=production
```

## Suporte
Para obter mais ajuda sobre a CLI do Angular, utilize:
```bash
ng help
```
Ou acesse a [documentação oficial do Angular CLI](https://angular.io/cli).

## Licença
Este projeto está licenciado sob a Licença MIT.

---
Desenvolvido por Gabriel. 🚀

