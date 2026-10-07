# Apuração 2026

Painel em tempo real da apuração das eleições gerais de 2026 (1º turno, 4 de outubro): presidente no país e por estado, governador, senador, deputado federal e deputado estadual.

**Página:** https://pauloccoimbra.github.io/apuracao-2026/

## Páginas

Apuração e visualização (leem os JSON do TSE ao abrir):

- `index.html`: painel em tempo real (presidente, governador, senador, deputado federal e estadual).
- `evolucao.html`: evolução da apuração minuto a minuto, ritmo de totalização por UF e simulador de trocas de velocidade entre estados (método do notebook de 2022). Horários por seção capturados do TSE às 22h20 de 04/10 (15 UFs com horários reais, 12 com curva estimada); marca a interrupção da totalização de 19h32 a 19h59.
- `atemporal.html`: exercício fictício e atemporal: estados somados em sequência, cada um apurado de forma homogênea, com a evolução do percentual de cada candidato a cada 1% dos votos do país.
- `mapa.html`: mapa de presidente e governador por país, região, estado, município e zona eleitoral (zonas desenhadas de forma aproximada a partir das coordenadas dos locais de votação; municípios de uma só zona usam o contorno do município). O nível "Municípios do Brasil" baixa cerca de 5,6 mil arquivos e demora.

Análises do resultado final do 1º turno (dados embutidos em `assets/dados.js`, funcionam offline):

- `perfil.html`: polarização Lula × Flávio, número efetivo de candidatos, composição do voto por estado, geografia dos votos dos candidatos eliminados, regiões, brancos e nulos.
- `participacao.html`: abstenção por estado e região, associação com o voto, quanto valeria mobilizar eleitores (simulador e convergência de abstenção) e voto cruzado presidente × governador.
- `segundo-turno.html`: simulador do 2º turno presidencial: transferência por candidato eliminado, retenção, comparecimento adicional, resultado por estado, grade de sensibilidade e fração de transferência necessária em cada estado. Os cenários A, B e C reproduzem os do estudo; é possível copiar o link de um cenário.
- `governadores.html`: os 20 governadores eleitos no 1º turno, coligações (PT/PL), relação com o voto presidencial e simulador dos sete segundos turnos estaduais (RN, AM, AC, ES, RJ, TO, DF).

## Dados e método

- Fonte oficial: https://resultados.tse.jus.br/oficial/app/index.html · informações técnicas: https://www.tse.jus.br/eleicoes/informacoes-tecnicas-sobre-a-divulgacao-de-resultados
- Posição usada nas análises: 05/10/2026, 12h51, 100% das seções (499.248).
- Eleitorado e abstenção por UF foram reconstituídos a partir do percentual de abstenção e do comparecimento, com erro inferior a mil votos por estado; a soma dos estados difere do comparecimento oficial em 5,2 mil votos (0,004%).
- "Coligação com PT/PL" vem da lista de partidos registrada no TSE; não mede apoio declarado a candidato a presidente.
- Cenários e projeções são hipóteses de trabalho, não previsões nem resultado oficial.

## Estrutura

`assets/` reúne dados (`dados.js`), utilitários e gráficos (`common.js`), estilos (`base.css`, `page.css`) e a barra de navegação (`nav.js`). As quatro primeiras páginas são autocontidas e só carregam a barra de navegação.

## Avisos

- Projeto independente, sem vínculo com o TSE.
- Projeções extrapolam a apuração parcial e não são resultado oficial. Vale apenas o que o TSE divulga.
- O histórico do ritmo de apuração é gravado no navegador de quem abre a página, a partir do momento em que ela é aberta.

## Licença

MIT.

