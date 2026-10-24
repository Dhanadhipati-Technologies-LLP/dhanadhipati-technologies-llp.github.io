/* Ludo Wordo — shared site script (no libraries, loads with "defer"). */
(function () {
  "use strict";

  /* ---------- Google Analytics 4 (website data stream) ----------
     To change or turn off tracking, edit GA_ID below.
     Set it to "" to disable analytics on the whole site.            */
  var GA_ID = "G-3KCT3QZ5BV";

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };

  if (GA_ID) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    gtag("js", new Date());
    // Our audience includes school students, so no ad personalisation
    // and no Google signals on the website.
    gtag("config", GA_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
  }

  function track(name, params) {
    if (GA_ID) gtag("event", name, params || {});
  }

  /* ---------- Play Store button clicks ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[data-cta]");
    if (a) track("play_store_click", { cta_location: a.getAttribute("data-cta") });
  });

  /* ---------- YouTube facade ----------
     Each video is a plain link to YouTube with a thumbnail.
     Clicking it swaps in the privacy-enhanced player, so YouTube
     only loads when someone actually wants to watch.                */
  function thumb(id) { return "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg"; }

  document.querySelectorAll("a.yt[data-id]").forEach(function (link) {
    var id = link.getAttribute("data-id");
    var title = link.getAttribute("data-title") || "Ludo Wordo video";

    if (!link.querySelector("img")) {
      var img = document.createElement("img");
      img.src = thumb(id);
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      link.prepend(img);
    }

    link.addEventListener("click", function (e) {
      if (e.ctrlKey || e.metaKey || e.shiftKey) return; // let people open YouTube in a new tab
      e.preventDefault();
      var frame = document.createElement("iframe");
      frame.src = "https://www.youtube-nocookie.com/embed/" + id +
        "?autoplay=1&playsinline=1&rel=0&modestbranding=1";
      frame.title = title;
      frame.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen";
      frame.allowFullscreen = true;
      var box = document.createElement("div");
      box.className = link.className;
      box.appendChild(frame);
      link.replaceWith(box);
      track("video_play", { video_id: id, video_title: title });
    });
  });

  /* ---------- Screenshots ----------
     Hide any screenshot whose file is not uploaded yet, and hide the
     whole section if none exist, so the page never shows broken images. */
  var gallery = document.querySelector("[data-screenshots]");
  if (gallery) {
    var hideSection = function () {
      var section = gallery.closest("section");
      if (section) section.hidden = true;
      var navLink = document.querySelector('a[href="#screenshots"]');
      if (navLink && navLink.parentElement) navLink.parentElement.hidden = true;
    };
    var figs = gallery.querySelectorAll("figure");
    // Check the first file straight away: if it is missing, none have been uploaded yet.
    var probe = new Image();
    probe.onerror = hideSection;
    probe.src = figs.length ? figs[0].querySelector("img").getAttribute("src") : "";
    if (!figs.length) hideSection();
    figs.forEach(function (fig) {
      fig.querySelector("img").addEventListener("error", function () { fig.hidden = true; });
    });
  }
})();
