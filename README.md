- Sistema de Prevenção: Falsas Centrais de Atendimento

Este repositório contém a entrega de Banco de Dados e Back-end do projeto Dual Bradesco.
O sistema foi projetado com arquitetura de Microsserviços e foco em segurança, separando a leitura pública da escrita restrita.

- Estrutura do Projeto (Monorepo)

O repositório está dividido em duas partes principais:

* /banco_de_dados: Contém os scripts de criação do banco de dados relacional (MySQL) e a carga inicial de dados (Seed).
* /falsas_centrais_api: Contém o código-fonte do Back-end e as configurações de contêiner.

- Como executar este projeto

1. Banco de Dados (Docker)
Para subir o banco de dados via Docker, execute o seguinte comando no seu terminal:
(bash)
docker run --name db-falsas-centrais -e MYSQL_ROOT_PASSWORD=senha_root -e MYSQL_DATABASE=db_golpes -p 3306:3306 -d mysql:8.0

*Após o banco iniciar, execute o script `script.sql` localizado na pasta do banco de dados para criar e popular a tabela.*

2. Back-end API (Local ou Docker)
A API foi construída em Node.js e configurada para rodar em contêineres para atender aos diferenciais do projeto.

Para rodar via Docker:
(bash)
cd falsas_centrais_api
docker build -t falsas_centrais_api .
docker run --name container-api -p 3000:3000 -d falsas_centrais_api


A API estará disponível para testes de leitura no endereço: `http://localhost:3000/api/telefone/40020022`