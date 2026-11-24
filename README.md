# Work Track · Angular

Interface do Work Track para acompanhar projetos, tarefas e horas trabalhadas. Use a API do repositório irmão `work-track-api`.

## Executar localmente

1. Inicie a API no perfil `demo` conforme o README do backend. O perfil fornece projetos, tarefas e lançamentos fictícios.
2. Neste repositório, com Node.js e npm instalados, execute:

   ```sh
   npm ci
   npm start
   ```

3. Abra [localhost:4200](http://localhost:4200). No modo demo, entre como `admin`, `gestor` ou `dev` com a senha `WorktrackDemo!`.

| Acesso | O que pode fazer |
| --- | --- |
| Colaborador | Consultar suas tarefas, acompanhar o painel, lançar e exportar suas horas |
| Gestor | Cadastrar clientes e administrar projetos e tarefas |
| Administrador | Usar os fluxos de gestão e administrar usuários |

## Build e publicação

```sh
npm run build
```

O build fica em `dist/work-track/browser`. Configure o servidor estático para servir `index.html` nas rotas do Angular. Encaminhe as chamadas em `/api/*` para a API retirando o prefixo `/api`. O servidor local usa `proxy.conf.json` para encaminhar essas requisições à porta 8080.

As telas são carregadas por rota. As bibliotecas de PDF e Excel são carregadas ao exportar um relatório.

## Testes

Com o Chrome instalado, execute `npm test -- --watch=false --browsers=ChromeHeadless` para verificar a sessão, a expiração do token e o logout.
