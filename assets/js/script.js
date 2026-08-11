document.getElementById("year").textContent = new Date().getFullYear();

// Programa de afiliados: quem chega com ?ref=telefone no link é
// redirecionado pro bot do WhatsApp (que confirma a indicação e só então
// manda o link real do grupo), em vez de ir direto pro grupo.
var BOT_WHATSAPP_NUMBER = "553598269945"; // número real da instância "Bot" (Evolution API, ownerJid)

(function () {
  var ref = new URLSearchParams(window.location.search).get("ref");
  if (!ref) return;

  var text = encodeURIComponent("Quero entrar - ref:" + ref);
  var botLink = "https://wa.me/" + BOT_WHATSAPP_NUMBER + "?text=" + text;

  document.querySelectorAll('a[href*="chat.whatsapp.com"]').forEach(function (el) {
    el.setAttribute("href", botLink);
  });
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
