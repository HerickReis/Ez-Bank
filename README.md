# Ez-Bank — Projeto Final FIAP

> Projeto acadêmico desenvolvido como parte do curso de **Análise e Desenvolvimento de Sistemas** na [FIAP](https://www.fiap.com.br/).
>
> O **Ez-Bank** é uma aplicação **full stack** que simula um sistema bancário digital, permitindo o cadastro de usuários, criação de contas (PF/PJ), controle de categorias e registro de transações financeiras.

---

<p align="center">
  <img src="https://img.shields.io/badge/Java-21-orange" alt="Java 21" />
  <img src="https://img.shields.io/badge/Spring%20Boot-3.5.7-green" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Next.js-16-black" alt="Next.js" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-blue" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blueviolet" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Oracle%20DB-cloud-red" alt="Oracle DB" />
  <img src="https://img.shields.io/badge/Status-Acad%C3%AAmico-lightgrey" alt="Status" />
</p>

---

## Stack Utilizada

| Camada        | Tecnologias                                        |
| :------------ | :------------------------------------------------- |
| **Front-end** | Next.js • Lucide React • Tailwind CSS • TypeScript |
| **Back-end**  | Java 21 • Spring Boot • Oracle Database            |

---

## Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes softwares instalados:

- **Java JDK 21:** necessário para executar o back-end (Spring Boot).
- **Node.js:** inclui o npm, necessário para rodar o front-end (Next.js).
- **Acesso à rede FIAP:** o back-end se conecta a uma instância Oracle hospedada na infraestrutura da faculdade.

---

## Instalação e Execução

### 1. Configuração do Back-end

#### Passo 1 — Acessar o diretório da API

```bash
cd caminho/para/o/projeto/apps/api
```

#### Passo 2 — Verificar credenciais do banco Oracle (FIAP)

O arquivo de configuração está localizado em:

```
apps/api/src/main/resources/application.properties
```

Credenciais de acesso (exclusivas para entrega acadêmica):

```
URL: jdbc:oracle:thin:@oracle.fiap.com.br:1521:orcl
Username: RM563259
Password: 020206
```

> O Spring Data JPA, configurado via `pom.xml`, gerencia automaticamente a criação das tabelas.
> Nenhum script DDL adicional é necessário.

#### Passo 3 — Executar o servidor Spring Boot

O projeto utiliza **Maven Wrapper**, portanto o Maven não precisa estar instalado globalmente.

```bash
# Linux / macOS
./mvnw spring-boot:run

# Windows
mvnw.cmd spring-boot:run
```

Após a inicialização, o back-end estará disponível em:
`http://localhost:8080`

---

### 2. Configuração do Front-end

#### Passo 1 — Acessar o diretório do Front-end

```bash
cd caminho/para/o/projeto/web/ez-bank
```

#### Passo 2 — Instalar as dependências

```bash
npm install
```

#### Passo 3 — Executar o servidor de desenvolvimento

```bash
npm run dev
```

Após a inicialização, o front-end estará acessível em:
`http://localhost:3000`

---

## Como Utilizar

Com ambos os servidores (front-end e back-end) ativos:

1. Acesse `http://localhost:3000` no navegador.
2. Clique em **“Acesse sua conta”** e, em seguida, em **“Criar uma conta”** para acessar a página `/registerPage`.
3. Após o registro, crie sua primeira conta **Física ou Jurídica** em `/createAccountPage`.
4. Retorne à tela de login (`/loginPage`), insira suas credenciais e acesse o **Dashboard**.

Para facilitar o acesso use as credenciais de teste ja cadastrado:

```
Email: teste.fintech@ezbank.teste
Senha: Teste123.
```

    5. om o usuário e a conta criados, volte para a página de login (`/loginPage`), insira suas credenciais e acesse o dashboard.
    
## Funcionalidades

### Dashboard

- Exibição das últimas transações.
- Menu lateral retrátil.
- Navegação por abas:

  - Transações
  - Categorias
  - Perfil

### Transações

- Criação de novas transações.
- Modal dedicado à inserção de dados.

### Categorias

- Criação e exclusão de categorias.
- Listagem de categorias existentes.

### Perfil

- Exibição de informações pessoais:

  - Nome do usuário
  - Data de nascimento
  - E-mail
  - Renda mensal

- Gerenciamento de contas (Pessoa Física ou Jurídica).

---

## Estrutura do Projeto

```
Ez-Bank-Final-Project/
│
├── apps/
│   ├── api/          → Back-end (Spring Boot)
│   └── web/ez-bank/  → Front-end (Next.js)
│
└── README.md
```

---

## Observações

- Projeto desenvolvido exclusivamente para **fins acadêmicos (FIAP)**.
- As credenciais e o banco Oracle utilizados são **de uso restrito**.
- O código segue boas práticas de organização e estrutura modular **full stack**.

---

## Autor

**Herick Reis - RM563259:**
Desenvolvido como parte do curso de **Análise e Desenvolvimento de Sistemas — FIAP**
