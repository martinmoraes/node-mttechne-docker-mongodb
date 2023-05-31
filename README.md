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

  <br><br>

# Arquitetura

As principais partes da API são: Controller, Services, Repository e Presenter (HTTP Response).

- **Controller** - Implementa seis (6) rotas para os respectivos endpoint, sendo um POST e cinco GET.
- **Services** - Implementa as regras de negócio para cada rota. Recebe por inversão de dependência o repository e o presenter.
- **Repository** - Implementa as operações com o banco de dados e implementa model para cada coleção. É passado do controller para os services fazendo inversão de dependência.
- **Presenter** - É responsável para responder as requisições dos usuários. É passado do controller para os services fazendo inversão de dependência.

A imagem a seguir exemplifica a relações entre as respectivas partes do sistema.

![Logo do Markdown](./sfc.png)

<br>

## Descrição dos EndPoints

Nos endpoint temos os conceitos de consolidated e transacted.

- **consolidated**: Apresenta resultados acumulados de toda série histórica ou até uma data fornecida.
- **transacted**: Apresenta resultados com totalizações por dia. Não leva em conta as transações dos outros dias.
  <br><br>

Insere uma nova transação.

```
POST /transaction
```

<br>
Lista todas as transações.

```
GET /transaction
```

<br>
Apresenta os totais para credit, debit e total. Resultado consolidado, ou seja, todos os três dados totalizados.

- Se for fornecido uma data o resultado será com todos os dados até a data informada.
- Se não for informada uma data, o resultado apresentará as mesmas informações com todos os dados da base.

```
GET /transaction/consolidated/until/:until?

ou

GET /transaction/consolidated/until/
```

<br>
Apresenta o credit, debit e total por data. O debit e credit são totalizações do dia e o total é o acumulado da série histórica.

- Se for fornecido uma data o resultado será com todos os dados da base até a data informada.
- Se não for informada uma data o resultado será com todos os dados da base.

```
GET /transaction/consolidated/daily/until/:until?

ou

GET /transaction/consolidated/daily/until/
```

<br>
Apresenta a totalização por dia do credit, debit e total. A totalização não considera as transações dos outros dias.

- Se for informado uma data o resultado será com todos os dados da base até a data informada.
- Se não for informado uma data o resultado será com todos os dados da base.

```
GET /transaction/transacted/daily/until/:until?

ou

GET /transaction/transacted/daily/until/
```

<br>
Apresenta a totalização do credit, debit e total, exclusivamente para o dia informado.

```
GET /transaction/transacted/on-day/:day?
```

<br><br>

# Tecnologias utilizadas

## Qualidade de Código

- **prettier**: Ferramenta de formatação de código que ajuda a manter a consistência e a legibilidade do código-fonte.
- **eslint**: Ferramenta de análise estática de código para JavaScript. Ela ajuda a identificar problemas e erros comuns no código, além de aplicar regras de estilo e boas práticas de programação.
- **husky**: Ferramenta para automatizar ganchos (hooks) do Git no Node.js. Ele permite que você defina scripts personalizados para serem executados em momentos específicos.
- **lint-stageg**: Permite executar linters de código apenas nos arquivos modificados em um determinado commit.
- **winston**: Biblioteca de registro (logging) para o Node.js. Ela fornece uma interface flexível e extensível para registrar mensagens e eventos em seus aplicativos Node.js.

## Regra de negocio

- **decimal.js**: Biblioteca JavaScript que oferece suporte a operações matemáticas precisas e manipulação de números decimais. Ela foi projetada para superar as limitações de aritmética de ponto flutuante do JavaScript padrão, que pode resultar em imprecisões em cálculos envolvendo números decimais.
- **node-input-validator**: Biblioteca para validação de entrada de dados em aplicativos Node.js. Ela fornece uma maneira simples e flexível de validar e sanitizar dados.

# Instalação

- setup (index.js/express.js)

```

```

# Testes
