(function () {
  var supported = ["ru", "uk", "en"];

  function pick(saved) {
    if (saved && supported.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || "en").toLowerCase();
    if (nav.indexOf("uk") === 0) return "uk";
    if (nav.indexOf("ru") === 0) return "ru";
    return "en";
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var text = el.getAttribute("data-" + lang);
      if (text !== null) el.textContent = text;
    });
    document.querySelectorAll("[data-i18n-href]").forEach(function (el) {
      var href = el.getAttribute("data-href-" + lang);
      if (href) el.setAttribute("href", href);
    });
    document.querySelectorAll(".lang-panel").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang") !== lang;
    });
    document.querySelectorAll("nav.langs button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-set-lang") === lang ? "true" : "false");
    });
    try { localStorage.setItem("bpi-lang", lang); } catch (e) {}
  }

  var lang = pick(null);
  try { lang = pick(localStorage.getItem("bpi-lang")); } catch (e) {}
  apply(lang);

  document.querySelectorAll("nav.langs button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      apply(btn.getAttribute("data-set-lang"));
    });
  });
})();
