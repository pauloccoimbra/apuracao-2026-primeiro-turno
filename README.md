# Apuração 2026 · 1º turno

Painel e análises do primeiro turno das eleições gerais de 2026 (4 de outubro de 2026), feitos só com os arquivos públicos de divulgação de resultados do TSE. É um site estático: o navegador de cada visitante lê os dados e calcula tudo localmente, sem servidor próprio nem banco de dados.

- **Site:** https://pauloccoimbra.github.io/apuracao-2026-primeiro-turno/
- **Repositório:** https://github.com/pauloccoimbra/apuracao-2026-primeiro-turno
- **Site irmão (2º turno, 25 de outubro de 2026):** https://pauloccoimbra.github.io/apuracao-2026-segundo-turno/ · repositório `apuracao-2026-segundo-turno`
- **Blog:** https://pccoimbra.blogspot.com

<!-- Depois da primeira versão publicada no Zenodo, troque 0000000 pelo número do DOI-conceito e descomente:
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.0000000.svg)](https://doi.org/10.5281/zenodo.0000000)
-->

## Avisos

- Projeto independente de Paulo C. Coimbra (UFJF), sem vínculo com o TSE, partidos ou candidaturas.
- Cenários e projeções são hipóteses de trabalho, não previsão nem pesquisa eleitoral. O resultado oficial é o do TSE (https://resultados.tse.jus.br/).
- Cálculos, classificações por espectro e análises são do autor e podem conter erros.

## As 12 abas

A barra de navegação segue a ordem abaixo, em seis grupos. Cada aba traz uma frase "Para que serve", links "Veja também" e botões anterior/próxima. Na barra há ainda o botão **2º turno ↗**, que leva ao site do segundo turno.

### Início
- **Resumo** (`index.html`): porta de entrada. Mapa das abas com um número-chave de cada uma, números do 1º turno, calendário (o que vem pela frente), qualidade dos dados (conferências feitas na própria página), glossário, dados e licenças, limites, como citar e privacidade.

### Acompanhar a apuração
- **Painel** (`painel.html`): apuração em tempo real de presidente, governador, senador e deputados, por estado. Mostra situação do pleito, projeção aritmética de votos válidos (com a contagem "27 UFs + Exterior com voto"), diferença entre os primeiros e simulação de trocas de ritmo.
- **Mapa** (`mapa.html`): resultado do país às zonas eleitorais. As zonas são desenhadas de forma aproximada a partir das coordenadas dos locais de votação. O nível "Municípios" baixa cerca de 5,6 mil arquivos e demora.

### Reconstituir a noite
- **Evolução** (`evolucao.html`): como a contagem avançou ao longo da noite, ritmo por UF, trocas de velocidade entre estados e outros cargos. A caixa **Incluir o exterior no total nacional** fica em destaque, acima do controle de tempo, e vale para todas as abas da página.
- **Atemporal** (`atemporal.html`): exercício fictício sobre como a ordem de apuração dos estados muda o caminho dos percentuais (diferença Flávio Bolsonaro − Lula, em pontos percentuais).

### Entender o 1º turno
- **Perfil do voto** (`perfil.html`): polarização, número efetivo de candidatos, composição do voto por estado, geografia dos votos dos candidatos que não estão no 2º turno, saldo por estado (Flávio Bolsonaro − Lula), competitividade, dissimilaridade, brancos e nulos.
- **Participação** (`participacao.html`): abstenção, brancos, nulos, efeito aritmético de um comparecimento maior (por bloco de estados, de forma simétrica) e voto cruzado presidente × governador.

### Governos estaduais
- **Governadores** (`governadores.html`): os 21 governadores definidos no 1º turno, coligações, relação com o voto presidencial e os seis segundos turnos estaduais (RN, AM, AC, ES, TO e DF).

### Poder legislativo
- **Congresso** (`congresso.html`): hemiciclos do Senado e da Câmara por espectro ou partido, classificação editável, fragmentação.
- **Maiorias** (`maiorias.html`): quóruns para lei, PEC, veto, CPI e outros, e a distância de cada bloco.
- **Bancadas** (`bancadas.html`): mapa por estado, lista de eleitos, voto presidencial × bancada e peso do voto.
- **Assembleias** (`assembleias.html`): deputados estaduais e distritais por espectro; nos estados com 2º turno, os dois candidatos a governador aparecem lado a lado.

Também há `404.html` (endereço inexistente, com link para o Resumo e para o site do 2º turno).

## Convenções

- Margem entre os finalistas: **Flávio Bolsonaro − Lula** (positivo favorece Flávio). Em textos sobre um candidato específico, o sinal acompanha esse candidato.
- Unidades de contagem: 27 UFs + Exterior (28 unidades). O Exterior é tratado à parte porque os votos de brasileiros no exterior formam um bloco próprio.
- Vírgula decimal, ponto como separador de milhar, sinal de menos tipográfico (−).
- Tipografia única (IBM Plex, arquivos locais) em todas as abas.

## Estrutura dos arquivos

```
index.html ... assembleias.html   as 12 páginas; cada uma traz CSS, JavaScript e dados embutidos
404.html
fonts/                            IBM Plex Sans e Mono (woff2, fonts.css e LICENSE-fonts.md)
tools/aplicar_layout.py           aplica o layout comum a todas as páginas
tools/layout/                     gabarito do layout: abas.json (ordem, grupos, marca), layout.css, rodape.html
README.md, LICENSE, CITATION.cff, .zenodo.json, .gitignore, .nojekyll
```

Os dados do 1º turno (TSE, resultado final de 04/10/2026) ficam dentro de cada página que os usa; Painel, Evolução e Mapa leem também os arquivos JSON do TSE ao abrir. Não há dependência de rede para fontes ou bibliotecas.

### Como reaplicar o layout

O que é comum a todas as páginas (barra de navegação, "Para que serve", "Veja também", anterior/próxima, rodapé, fontes locais, transição entre páginas e contador de visitas) é escrito por `tools/aplicar_layout.py`, entre marcadores `<!-- LAYOUT:XXX:INICIO -->` e `<!-- LAYOUT:XXX:FIM -->`. Para mudar um texto, uma aba ou a ordem, edite `tools/layout/abas.json`, `layout.css` ou `rodape.html` e rode, na pasta do site:

```
python3 tools/aplicar_layout.py .
```

O script é idempotente. Não edite à mão o que fica entre os marcadores.

## Dados e licenças

Os números vêm dos arquivos públicos de divulgação de resultados do TSE (resultados.tse.jus.br), usados conforme as orientações técnicas do tribunal; o TSE não declara, nesses arquivos, uma licença específica de reutilização. As malhas são do IBGE e a lista de senadores de 2022 é do Senado Federal. Os cálculos são do autor.

A licença MIT (`LICENSE`) cobre o **código**. Os dados vêm do TSE e de outras fontes, sob os termos delas. As fontes IBM Plex têm licença SIL OFL 1.1 (`fonts/LICENSE-fonts.md`).

## Privacidade

Contagem anônima de visitas com GoatCounter, sem cookies. A escolha de espectro e o histórico de ritmo ficam só no navegador de quem usa.

## Como citar e DOI

Cada versão publicada deste repositório pode receber um DOI no Zenodo (integração GitHub → Zenodo, a cada *release*). Há dois tipos de DOI:

- **DOI-conceito:** representa o projeto como um todo e sempre aponta para a versão mais recente. Use-o para citar o projeto em geral.
- **DOI de versão:** identifica exatamente uma versão (por exemplo `v1.0.0`). Use-o quando a reprodutibilidade importar.

Enquanto o DOI não existe, cite assim (o arquivo `CITATION.cff` alimenta o botão "Cite this repository" do GitHub):

> Coimbra, P. C. *Apuração 2026 · 1º turno: painel e análises*. Site estático, outubro de 2026. https://pauloccoimbra.github.io/apuracao-2026-primeiro-turno/ (acesso em: data).

Depois de publicar a versão no Zenodo, substitua pelo formato com DOI e atualize `CITATION.cff` (campo `doi`) e o selo comentado no topo deste arquivo. O passo a passo está em `GUIA-GITHUB-ZENODO.md`.

## Outros repositórios

- `apuracao-2026-segundo-turno`: site do 2º turno (25 de outubro de 2026). Os dois sites se ligam entre si e são citados separadamente.
