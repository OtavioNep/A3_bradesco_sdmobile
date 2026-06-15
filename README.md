- Sistema de Prevenção: Falsas Centrais de Atendimento

Este repositório contém a entrega de Banco de Dados, Back-end e Front-end do projeto Dual Bradesco.
O sistema foi projetado com arquitetura de Microsserviços e foco em segurança, separando a leitura pública da escrita restrita.

- Estrutura do Projeto (Monorepo)

O repositório está dividido em três partes:

* banco_de_dados: Contém os scripts de criação do banco de dados relacional (MySQL) e a carga inicial de dados (Seed).
* falsas_centrais_api: Contém o código-fonte do Back-end e as configurações de contêiner.
* falsas_centrais_front: Contém o código front-end, fazendo a aplicação rodar via Expo.

- Como executar este projeto
1. Pré requisitos:
* Docker desktop (https://www.docker.com/products/docker-desktop/)
* Expo GO no smartphone Google Play: ((https://play.google.com/store/apps/details?id=host.exp.exponent); Apple App Store (iOS): (https://apps.apple.com/br/app/expo-go/id982107779))
* O smartphone e o computador devem estar conectados exatamente à mesma rede Wi-Fi.

2. Configuração do IP
* Abra o arquivo `falsas_centrais_front/src/hooks/useConsultaTelefone.js`.
* Substitua o IP existente pela numeração do IPv4 da sua máquina local.

3. Construir o ambiente
* Para subir o ambiente estamos usando o Docker, orquestrado via docker-compose. Execute o seguinte comando no seu terminal, na pasta raiz:
(bash)
docker-compose up --build

O ambiente será construído automaticamente e você poderá rodar o aplicativo via Expo GO, lendo o QR code gerado no terminal, dentro do App.
