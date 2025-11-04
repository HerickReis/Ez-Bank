
# Ez-Bank-Final-Project
Projeto desenvolvido para estudos da faculdade de Análise e desenvolvimento de sistemas na Faculdade de informática e administração Paulista [FIAP](https://www.fiap.com.br/)

## Stack utilizada

**Front-end:** NextJs, LucideReact, Tailwindcss, Typescript

**Back-end:** Java, SpringBoot, Oracle Database.


## Como Instalar

Para garantir que o programa rode corretamente, granta que tenha os seguintes softwares:


- **Java JDK 21:** O backend foi desenvolvido utilizando SpringBoot com Java na versão 21

- **Node.Js:** o front-end NextJs requer o NodeJs (que inclui o gerenciador de pacotes npm)

- **Acesso à rede:** O back-end construído para se conectar a uma instância do banco de dados **Oracle** externo hospedado na FIAP (exclusivo faculdade)

### 1. Configurações do back-end

**Passo 1 Navegar até o diretório da API:** Abra um terminal e navegue até a pasta API:

```cd caminho/para/o/projeto/apps/api```

**Passo 2:** O projeto foi pré-configurado para usar um banco de dados Oracle da Fiap, As credenciais estão no arquivo:

```apps/api/src/main/resources/application.properties``` e são:

    URL: jdbc:oracle:thin:@oracle.fiap.com.br:1521:orcl

    Username: RM563259

    Password: 020206
<sup>Informação exclusiva para entrega do projeto</sup>

<sup>*Obs: Nenhum Script de banco de dados (DDL) é necesário, pois o Spring Data JPA (configurado em `pom.xml`) irá gerenciar automaticamente a criação das tabelas.*</sup>

**Passo 3: Executar a Aplicação Spring Boot** O Projeto utiliza Maven Wrapper, então não é necessário ter o Maven instalado globalmente.

- Linux / macOS:
```bash
./mvnw spring-boot:run
```

- Windows:
```bash
mvnw.cmd spring-boot:run
```

Após inicialização, o back-end estará sendo executado em:
`http://localhost:8080`


### 2. Configuração do Frontend (Web)
O frontend é a interface com o usuário, construída em NextJs, que consome os dados da API.

**Passo 1: Navegar até o diretório do Frontend** abra um terminal e navegue até a pasta `web/ez-bank` :

```bash
cd caminho/para/o/projeto/web/ez-bank
```

**Passo 2: Instalar as dependências do projeto:** Use `npm` para instalar todas as dependências listadas no `package.json`

```bash
npm install
```

**Passo 3: Executar o servidor de Desenvolvimento** Inicie a aplicação NextJs em modo de Desenvolvimento, conforme definido nos scripts do `package.json` e no `README.md` do frontend:

```bash
npm run dev
```

Após a inicialização, o frontend estará em execução e acessível em http://localhost:3000.

### Como Utilizar?

Com ambos os servidores (backend e frontend) em execução (Seguindo os passos da instalação):

    1. Acesse `http://localhost:3000` no seu navegador.

    2. Você será direcionado para a página inicial.

    3. Como é um primeiro acesso, clique em "Acesse sua conta" e depois em "Criar uma conta" para ir para a página de registro (`/registerPage`).

    4. Após se registrar, o sistema irá direcioná-lo para criar sua primeira conta (Física ou Jurídica) na página `/createAccountPage`.

    5. om o usuário e a conta criados, volte para a página de login (`/loginPage`), insira suas credenciais e acesse o dashboard.
    
## Funcionalidades


**Dashbord**
- Listagem de últimas transações.
- Menu de navegação lateral retrativo.
- Aba de transações.
- Aba de Categorias.
- Aba de Perfil.

**Transações**
- Criação de nova transação
- Modal de criação das novas transações

**Categorias**
- Criação de nova categoria de gastos.
- Exclusão de categoria existente
- Listagem de categorias existentes

**Perfil**
- Listagem de informações pessoas
  * Nome do usuário
  * Data de nascimento
  * Email
  * Renda Mensal

- Gerenciar Contas
  * Criação da conta Pj ou Fisica
