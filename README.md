# Sistema de Fluxo de Caixa

Este projeto consiste em desenvolver uma API como parte do processo de recrutamento e avaliação para a empresa [MTTechne](www.mttechne.com.br).

## O teste

Foram passadas as seguintes intruções para arealização do test:

#### DESCRITIVO DA SOLUÇÃO

Um comerciante precisa controlar o seu fluxo de caixa diário com os lançamentos
(débitos e créditos), também precisa de um relatório que disponibilize o saldo
diário consolidado.

#### REQUISITOS DE NEGÓCIO:

- Serviço que faça o controle de lançamentos;
- Serviço do consolidado diário.

#### REQUISITOS TÉCNICOS OBRIGATÓRIOS:

- Deve ser feito no Framework NodeJS;
- Obrigatório (Design Patterns,Padrões de Arquitetura, SOLID, Clean Code e etc);
- Readme com instruções de como subir a aplicação
  local, container e utilização dos serviços. Incluir desenho da solução e explicação
  não técnica da arquitetura;
- Realizar testes unitários abrangendo o maior número de cenários possíveis;
- Hospedar em repositório público (GitHub)

<br>

# Arquitetura

As principais partes da arquiterura são: Controller, Services, Repository e HTTP Response.

- **Controller** - Implementa seis (6) rotas para os respectivos endpoint, sendo um POST e cinco GET.
- **Services** - Implementa as regras de negócio para cada rota. Recebe por injeção de dependência o repository e o HTTP Response.
- **Repository** - Implementa as operações com o banco de dados e utiliza model para cada coleção. É passado do controller para os services fazendo injeção de dependência.
- **HTTP Response** - É responsável por responder as requisições dos usuários. É passado do controller para os services fazendo injeção de dependência.

A imagem a seguir exemplifica a relações entre as respectivas partes do sistema.

![Sistema de Fluxo de Caixa](./sfc.png)

## Containers

São unidades de software isoladas que contêm todos os elementos necessários para executar um aplicativo, incluindo o código, as dependências e as configurações. Eles fornecem um ambiente consistente e isolado, garantindo que o aplicativo funcione da mesma forma, independentemente do ambiente em que esteja sendo executado.
O proejeto é apresentado em dois containers Docker e gerenciado pelo Docker-compose:

- Container 1: Contem o MongoDB.
- Container 2: A aplicação implementada em NodeJS.

## Descrição dos EndPoints

Nos endpoint temos os conceitos de consolidated e transacted.

- **consolidated**: Apresenta resultados acumulados de toda série histórica ou até uma data fornecida.
- **transacted**: Apresenta resultados com totalizações por dia. Não leva em conta as transações dos outros dias.

### POST /transaction

Insere uma nova transação.

### GET /transaction

Lista todas as transações.

### GET /transaction/consolidated/until/:until?

Apresenta os totais para credit, debit e total. Resultado consolidado, ou seja, todos os três dados totalizados. Esta API retorna o total em caixa em um determinado dia.

- Se for fornecido uma data o resultado será com todos os dados até a data informada.
- Se não for informada uma data, o resultado apresentará as mesmas informações com todos os dados da base.

### GET /transaction/consolidated/daily/until/:until?

Apresenta o credit, debit e total por data. O debit e credit são totalizações do dia e o total é o acumulado da série histórica. Esta API retorna o total em caixa a cada dia.

- Se for fornecido uma data o resultado será com todos os dados da base até a data informada.
- Se não for informada uma data o resultado será com todos os dados da base.

### GET /transaction/transacted/daily/until/:until?

Apresenta a totalização por dia do credit, debit e total. A totalização não considera as transações dos outros dias. Esta API retorna o total movimentado em um determinado dia.

- Se for informado uma data o resultado será com todos os dados da base até a data informada.
- Se não for informado uma data o resultado será com todos os dados da base.

### GET /transaction/transacted/on-day/:day?

Apresenta a totalização do credit, debit e total, exclusivamente para o dia informado. Esta API retorna o total movimentado em um dia específico.

<br>

# Tecnologias utilizadas

## Qualidade de Código

- **prettier**: Ferramenta de formatação de código que ajuda a manter a consistência e a legibilidade do código-fonte.
- **eslint**: Ferramenta de análise estática de código para JavaScript. Ela ajuda a identificar problemas e erros comuns no código, além de aplicar regras de estilo e boas práticas de programação.
- **husky**: Ferramenta para automatizar ganchos (hooks) do Git no Node.js. Ele permite que você defina scripts personalizados para serem executados em momentos específicos.
  - Neste projeto, antes do commit, está sendo checado:
    - O lint para o arquivos que estão em stage.
    - E roda todos os testes.
- **lint-stageg**: Permite executar linters de código apenas nos arquivos modificados em um determinado commit.
- **test coverage**: É uma métrica usada para medir a extensão em que o código de um programa é testado pelos casos de teste. Ele indica a porcentagem de código que é executado durante a execução dos testes automatizados. Neste projeto a cobertura de testes está em 100%.

## Regra de negocio

- **decimal.js**: Biblioteca JavaScript que oferece suporte a operações matemáticas precisas e manipulação de números decimais. Ela foi projetada para superar as limitações de aritmética de ponto flutuante do JavaScript padrão, que pode resultar em imprecisões em cálculos envolvendo números decimais.
- **node-input-validator**: Biblioteca para validação de entrada de dados em aplicativos Node.js. Ela fornece uma maneira simples e flexível de validar e sanitizar dados.

## Outras tecnologias

- **Express**: Framework para desenvolvimento de aplicações web em Node.js. Ele fornece uma camada de abstração sobre o servidor HTTP do Node.js.
- **MongoDB**: Banco de dados orientado a documentos, classificado como um banco de dados NoSQL (não relacional). Ele foi projetado para armazenar e gerenciar grandes volumes de dados de forma eficiente, fornecendo alta escalabilidade e desempenho.
- **Mongoose**: Biblioteca de modelagem de objetos do MongoDB para aplicativos Node.js. Ela fornece uma camada de abstração sobre o driver nativo do MongoDB, facilitando a interação com o banco de dados e a definição de esquemas de dados.
- **Docker-compose**: Ferramenta que permite definir e gerenciar vários contêineres Docker como uma única aplicação. Com ele, você pode criar, configurar e executar aplicativos multi-container.
- **NodeJS**: Ambiente de tempo de execução de código aberto baseado no motor JavaScript V8 do Google Chrome. Ele permite que você execute JavaScript no lado do servidor.
- **NPM**: Node Package Manager é o gerenciador de pacotes padrão para o ecossistema do Node.js. Ele permite que os desenvolvedores instalem, gerenciem e compartilhem pacotes de código reutilizáveis ​​(módulos) para seus projetos.
- **Jest**: Framework de teste de código aberto para JavaScript, projetado principalmente para testar aplicativos e bibliotecas do Node.js.
- **winston**: Biblioteca de registro (logging) para o Node.js. Ela fornece uma interface flexível e extensível para registrar mensagens e eventos nos aplicativos Node.js.
- **Nodemon**: É uma ferramenta muito que agiliza o desenvolvimento, pois economiza tempo e esforço ao automatizar o processo de reinicialização do servidor sempre que necessário.

<br>

# Instalação

Passo 1: Clone o projeto. Na sua pasta de projetos execute o seguinte comando.

```
git clone https://github.com/martinmoraes/sfc.git
```

Passo 2: Instale as dependências. Na pasta raiz do projeto, execute os seguintes comando.

```
cd sfc
npm install
```

## Execução em modo de produção

Passo 1: Iniciar a aplicação - Ainda na pasta raiz do projeto execute o comando abaixo.

Obs.:

- É necessário ter instalado o Docker e Docker-compose.
- Certifique-se que nenhum serviço ou container esteja utilizando as portas 3001 e 27017.
- Se estiver executando o Docker da seção "Execução em modo desenvolvimento", execute o passo 5 da referida seção.

```
docker-compose up -d
```

Passo 2: Parar a aplicação - Para parar a aplicação, estando na pasta raiz do projeto execute o seguinte comando.

```
docker-compose stop
```

## Execução em modo desenvolvimento

Passo 1: Criar o arquivo .env, na raiz do projeto, com o seguinte conteudo

P.S.: A variável de ambiente "LOG_DIR" deve conter o path completo para a pasta "log".

```
APP_PORT=3001

MONGO_HOST=mongodb://admin:admin@localhost:27017/?authMechanism=DEFAULT
MONGO_DATABASE=mttechne
MONGO_POOLSIZE=5

LOG_DIR=~/log
```

Passo 2: MongoDB em Docker - Para executar o MongoDB em um Docker, execute o comando abaixo.

Obs.:

- É necessário ter instalado o Docker e Docker-compose.
- Certifique-se que nenhum serviço ou container esteja utilizando as portas 3001 e 27017.
- Se estiver executando o Docker-compose da seção "Execução em modo de produção" execute o "Passo 2: Parar a aplicação", da referida seção.

```
docker run -d --rm --name mongodb \
	-p 27017:27017 \
	-v data:/data/db \
	-e MONGO_INITDB_ROOT_USERNAME=admin \
	-e MONGO_INITDB_ROOT_PASSWORD=admin \
	mongo:6.0.6
```

Passo 3: Rodar o projeto - Certifique-se de estar na pasta raiz do projeto e execute o seguinte comando.

```
npm run start:dev
```

Passo 4: Parar a aplicação - Para parar a aplicação execute o seguinte comando no console em que estiver rodando a aplicação (nodemon).

```
Ctrl + C

ou

Command + C
```

Passo 5: Parar o container - Para parar o container do MongoDB execute o seguinte comando.

```
docker stop mongodb
```

## Postman: Testar os endpoint

Pode ser utilizado o aplicativo [Postman](https://www.postman.com/) para fazer requisições nos endpoints.
Na raiz do projeto, na pasta "postman" tem os arquivos que podem ser importados no Postman. Importe o environment e collection.

<br>

# Testes

Os testes de unidade são uma prática de desenvolvimento de software em que unidades individuais de código são testadas para verificar se funcionam conforme o esperado.

- Para rodar todos os teste, certifique-se de estar na raiz do projeto e execute o seguinte comando:

```
npm run test
```

<br>

# Comandos

## Linter

Executa o ESLint e faz alterações nos arquivos. Estando na raiz do projeto execute o seguinte comando:

```
npm run lint:fix
```

## Prettier

Formata os arquivos JavaScript (com extensão .js) no diretório 'src' e em todos dentro dele. Estando na raiz do projeto execute o seguinte comando:

```
npm run format
```

## Coverage

Verifica a cobertura de teste, Estando na raiz do projeto execute o seguinte comando:

```
npm run test:coverage
```
