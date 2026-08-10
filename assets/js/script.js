document.getElementById("year").textContent = new Date().getFullYear();

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
