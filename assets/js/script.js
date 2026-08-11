document.getElementById("year").textContent = new Date().getFullYear();

// Programa de indicação: fluxo SEPARADO dos links normais do site, de
// propósito - não mexe em nenhum href/atributo existente (WhatsApp,
// Instagram etc. continuam indo direto pro grupo/perfil de sempre, pixel
// incluso). Quem chega com ?ref=<telefone_do_afiliado> na URL só GANHA um
// cartão A MAIS, no topo da lista, que leva pra uma DM com o bot do
// WhatsApp (que confirma a indicação e manda o link do grupo de volta).
// Ver PROGRAMA_INDICACAO.md no repo robo_ofertas pro fluxo completo.
(function () {
  var ref = new URLSearchParams(window.location.search).get("ref");
  if (!ref) return;

  var BOT_WHATSAPP_NUMBER = "553598269945"; // número real da instância "Bot" (Evolution API, ownerJid)
  var text = encodeURIComponent("Quero entrar - ref:" + ref);
  var botLink = "https://wa.me/" + BOT_WHATSAPP_NUMBER + "?text=" + text;

  var links = document.querySelector(".links");
  if (!links) return;

  var card = document.createElement("a");
  card.className = "link-card";
  card.href = botLink;
  card.target = "_blank";
  card.rel = "noopener noreferrer";
  card.style.borderColor = "var(--gold)"; // destaca dos outros cartões (cyan padrão)
  card.innerHTML = "<span>🎉 Você foi convidado! Toque para entrar</span>";

  links.insertBefore(card, links.firstChild);
})();

document.querySelectorAll("[data-track]").forEach(function (el) {
  el.addEventListener("click", function () {
    if (typeof fbq !== "function") return;

    var linkId = el.getAttribute("data-track");
    var standardEvent = el.getAttribute("data-fbq-event");

    if (standardEvent) {
      fbq("track", standardEvent, { content_name: linkId });
    } else {
      fbq("trackCustom", "LinkClick", { content_name: linkId });
    }
  });
});
