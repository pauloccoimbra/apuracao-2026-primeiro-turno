# Apuração 2026

Painel em tempo real da apuração das eleições gerais de 2026 (1º turno, 4 de outubro): presidente no país e por estado, governador, senador, deputado federal e deputado estadual.

**Página:** https://SEU-USUARIO.github.io/apuracao-2026/

## Páginas

- `index.html`: painel em tempo real (presidente, governador, senador, deputados).
- `evolucao.html`: evolução da apuração de presidente minuto a minuto, por estado, no método do notebook de 2022 (velocidade por UF, trocas entre estados). Usa horários por seção capturados do TSE às 22h20 de 04/10 (15 UFs com horários reais, 12 com curva estimada), marca a interrupção da totalização de 19h32 a 19h59 e inclui governador, senador e deputados (resultados finais lidos do TSE ao abrir a aba).

- `atemporal.html`: exercício fictício e atemporal: estados somados em sequência, cada um apurado de forma homogênea, com a evolução do percentual de cada candidato a cada 1% dos votos do país (votos finais do TSE).
- `mapa.html`: mapa da apuração de presidente por país, região, estado, município e zona eleitoral (zonas desenhadas de forma aproximada a partir das coordenadas dos locais de votação do TSE, embutidas na página; municípios com uma só zona usam o contorno do município). Lê os JSON públicos do TSE e as malhas do IBGE direto no navegador; o nível "Municípios do Brasil" baixa cerca de 5,6 mil arquivos e demora.

Endereço da segunda página: https://SEU-USUARIO.github.io/apuracao-2026/evolucao.html

## Como funciona

Uma única página estática (`index.html`). O navegador de cada visitante lê, a cada minuto, os arquivos JSON públicos do TSE e calcula tudo localmente. Não há servidor, banco de dados nem rastreamento.

- Fonte oficial: https://resultados.tse.jus.br/oficial/app/index.html
- Informações técnicas dos arquivos: https://www.tse.jus.br/eleicoes/informacoes-tecnicas-sobre-a-divulgacao-de-resultados

## Análises

- Resultado e projeção nacional para presidente, com evolução do percentual ao longo da noite.
- Ritmo de totalização por UF e simulador de trocas de velocidade entre estados.
- Governador, senador e deputados por UF, com partidos, quociente estimado e busca de candidatos.

## Avisos

- Projeto independente, sem vínculo com o TSE.
- Projeções extrapolam a apuração parcial e não são resultado oficial. Vale apenas o que o TSE divulga.
- O histórico do ritmo de apuração é gravado no navegador de quem abre a página, a partir do momento em que ela é aberta.

## Licença

MIT.

