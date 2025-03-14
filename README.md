
# WorkTrack – Gerenciador de Projetos e Tarefas (Frontend)

**WorkTrack** é um sistema de gerenciamento de projetos desenvolvido com **Angular 17**, **PrimeNG 17**, **Node.js 18**, e **PrimeIcons**. Ele oferece funcionalidades para controle de projetos, tarefas, horas trabalhadas e gerenciamento de usuários, com autenticação e autorização via JWT.

Este projeto utiliza [Angular CLI](https://github.com/angular/angular-cli) na versão 17.3.11 e a biblioteca [PrimeNG](https://primeng.org/) para a construção de componentes elegantes e reutilizáveis.

## Requisitos

Antes de iniciar o projeto, verifique se você possui as seguintes versões instaladas:

- **Angular 17**
- **PrimeNG 17**
- **PrimeIcons**
- **Node.js** versão 18 ou superior
- **Angular CLI** (instalado globalmente)

## Como Executar o Projeto (Frontend)

Clone também o repositório do **backend** para a aplicação funcionar corretamente: [WorkTrack Backend (Java)](https://github.com/gabrielfcalixto/work-track-java).

### 1. Clone o Repositório

Clone o repositório do frontend:
```bash
git clone https://github.com/gabrielfcalixto/work-track-angular.git
cd work-track-angular
```

### 2. Instale as Dependências

Instale as dependências necessárias:
```bash
npm install
```

### 3. Inicie o Servidor de Desenvolvimento

Execute o comando abaixo para iniciar o servidor de desenvolvimento:
```bash
ng serve
```

Acesse a aplicação em: [http://localhost:4200/](http://localhost:4200/). O aplicativo recarregará automaticamente ao detectar alterações nos arquivos.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

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

## Build do Projeto

Para compilar o projeto, execute:
```bash
ng build
```
Os artefatos de build serão gerados no diretório `dist/`.

## Testes de Integração (e2e)

Para executar testes de ponta a ponta (e2e), instale as ferramentas necessárias e rode o comando:
```bash
ng e2e
```

## Integração com o Backend

- **URL do Backend**: `http://localhost:8080`
- O frontend se comunica com o backend para carregar dados e liberação de acesso. As informações exibidas variam conforme o tipo de usuário (USER, MANAGER, ADMIN).

## Implantar em Produção

Para criar uma versão de produção do seu projeto, execute:
```bash
ng build --configuration=production
```
Este comando otimiza o código para produção, gerando arquivos no diretório `dist/`.

## Suporte

Se precisar de mais ajuda sobre o Angular CLI, utilize o comando:
```bash
ng help
```
Ou acesse a [documentação oficial do Angular CLI](https://angular.io/cli).

## Licença

Este projeto está licenciado sob a Licença MIT. Para mais detalhes, consulte o arquivo `LICENSE`.

---

Desenvolvido por Gabriel. 🚀

---
