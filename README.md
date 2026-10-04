# Apuração 2026

Painel em tempo real da apuração das eleições gerais de 2026 (1º turno, 4 de outubro): presidente no país e por estado, governador, senador, deputado federal e deputado estadual.

**Página:** https://pauloccoimbra.github.io/apuracao-2026/

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
