# achadinhosecupons — página de ofertas

Página única (estilo "link na bio"), em HTML/CSS/JS puro, sem build e sem
dependências, feita para ser publicada no GitHub Pages. Reúne os links do
grupo de WhatsApp, Instagram, TikTok e Telegram, com o Meta Pixel instalado
para rastrear visitas e cliques.

## Estrutura

```
index.html            página principal
assets/css/style.css  estilo (tema neon: ciano/magenta/dourado sobre fundo escuro)
assets/js/script.js    ano do rodapé + disparo de eventos do Meta Pixel nos cliques
assets/img/avatar.jpg  foto de perfil
```

## Editar conteúdo

- **Links**: cada botão e ícone fica em `index.html`, dentro de `<nav class="socials">`
  (ícones pequenos do topo) e `<div class="links">` (cartões grandes). Basta trocar o
  `href`.
- **Textos**: o texto de cada cartão está na tag `<span>` dentro do link.
- **Foto de perfil**: substitua `assets/img/avatar.jpg` por outra imagem (de
  preferência quadrada, mínimo 320×320px) mantendo o mesmo nome, ou ajuste o
  caminho em `index.html`.
- **Cores**: as cores do tema ficam no topo de `assets/css/style.css`, nas
  variáveis `--cyan`, `--pink`, `--gold`, `--bg-1` e `--bg-2`.

## Meta Pixel

O Pixel (`ID 1722065535725536`) está no `<head>` do `index.html` e dispara
`PageView` automaticamente a cada visita (isso é global, não dá pra restringir
a um link só — é o que faz o Meta considerar o Pixel "instalado" na página).

Já o rastreamento de **cliques** é feito por `assets/js/script.js`, que só
escuta os elementos com o atributo `data-track`. Hoje isso está configurado
**somente para o WhatsApp** (o ícone do topo e o cartão grande): ao clicar,
dispara o evento padrão `Contact` do Meta, indicado para quando alguém tenta
falar com o negócio — bom para otimizar campanhas de anúncio para entradas no
grupo. Instagram, TikTok e Telegram não têm `data-track`, então não geram
nenhum evento de clique.

Para voltar a rastrear outro link, adicione `data-track="algum-nome"` na tag
`<a>` correspondente; para usar um evento padrão do Meta (`Lead`, `Contact`
etc.) em vez do customizado `LinkClick`, some `data-fbq-event="NomeDoEvento"`.

### Como conferir se o Pixel está funcionando

1. Instale a extensão **Meta Pixel Helper** no Chrome.
2. Abra o site publicado e veja se o Pixel Helper mostra o evento `PageView`.
3. No [Gerenciador de Eventos](https://business.facebook.com/events_manager2)
   do Meta, use a aba **Testar eventos** para ver os cliques chegando em
   tempo real.

## Rodar localmente

Não precisa de instalação — é só abrir o `index.html` no navegador. Para
testar como o navegador vai carregar em produção (com caminhos relativos),
rode um servidor local simples, por exemplo:

```
python3 -m http.server 8000
```

e acesse `http://localhost:8000`.

## Publicar no GitHub Pages

1. Suba este repositório para o GitHub.
2. No repositório, vá em **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch `main` e a pasta `/ (root)`.
5. Salve. O GitHub publica em alguns minutos em
   `https://<seu-usuario>.github.io/<nome-do-repo>/`.

Se quiser usar um domínio próprio, adicione um arquivo `CNAME` na raiz do
repositório com o domínio (ex.: `ofertas.seudominio.com`) e configure o DNS
conforme a [documentação do GitHub Pages](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).
