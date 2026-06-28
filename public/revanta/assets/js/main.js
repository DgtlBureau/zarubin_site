/* ==========================================================================
   Revanta — shared client scripts
   Every block is guarded by element existence, so this one file can be loaded
   by all pages (landing + legal) without errors.
   Loaded at the end of <body>, after the Lucide CDN script.
   ========================================================================== */
(function () {
  "use strict";

  /* Render Lucide icons -------------------------------------------------- */
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }

  /* Scroll reveal with per-grid stagger (0asis-style appearance) --------- */
  (function reveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!els.length) return;

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window) || reduce) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }

    // Stagger siblings inside the same grid/parent for a cascading effect.
    els.forEach(function (el) {
      var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) {
        return c.classList && c.classList.contains("reveal");
      });
      var idx = sibs.indexOf(el);
      if (idx > 0) el.style.transitionDelay = Math.min(idx, 8) * 70 + "ms";
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    els.forEach(function (el) { io.observe(el); });
  })();

  /* Sticky header — transparent over the hero, backdrop once scrolled past */
  (function header() {
    var h = document.getElementById("siteHeader");
    if (!h) return;
    var hero = document.getElementById("hero");

    function threshold() {
      return hero ? Math.max(80, hero.offsetHeight - h.offsetHeight) : 80;
    }
    function onScroll() {
      h.classList.toggle("is-stuck", window.scrollY > threshold());
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  })();

  /* Platform modules carousel — auto-advancing video tour ---------------- */
  (function moduleCarousel() {
    var root = document.getElementById("modCarousel");
    var video = document.getElementById("modVideo");
    if (!root || !video) return;

    var DURATION = 10000; // 10s per module

    var MODULES = [
      { cat: "Command center", title: "Your loyalty program at a glance",
        desc: "A real-time command center for the whole program — KPIs, revenue, RFM segments and channel performance in one view.",
        bullets: ["Live KPIs: active members, revenue and points accrued", "RFM segmentation and customer mix", "Channel performance and top clients by LTV", "Custom date ranges and period compare"],
        tags: ["KPIs", "RFM", "Real-time"], caption: "Revanta · Dashboard", video: "/revanta/assets/video/sections/dashboard.mp4" },
      { cat: "Customer data", title: "A unified profile for every customer",
        desc: "Every shopper in one place — purchases, points, tiers and behavior. Filter, segment and act on the whole base.",
        bullets: ["Unified customer profiles (CDP)", "Tiers, points and lifetime value", "Powerful filters and saved segments", "Drill into any customer’s full history"],
        tags: ["CDP", "Segments", "Profiles"], caption: "Revanta · Customers", video: "/revanta/assets/video/sections/customers.mp4" },
      { cat: "Recurring revenue", title: "Subscriptions, fully managed",
        desc: "Track and manage customer subscriptions — statuses, renewals and churn — without spreadsheets.",
        bullets: ["Active, scheduled and cancelled states", "Renewals and billing at a glance", "Churn and reactivation signals", "Bulk actions and export"],
        tags: ["Subscriptions", "Renewals", "Churn"], caption: "Revanta · Subscriptions", video: "/revanta/assets/video/sections/subscriptions.mp4" },
      { cat: "Customer experience", title: "Hear every customer",
        desc: "Collect, triage and resolve customer feedback and NPS in one inbox — with statuses, owners and history.",
        bullets: ["Unified feedback and NPS inbox", "Statuses: new, in progress, resolved", "Assign, comment and track", "Trends and sentiment over time"],
        tags: ["NPS", "Inbox", "CX"], caption: "Revanta · Feedback", video: "/revanta/assets/video/sections/feedback.mp4" },
      { cat: "Loyalty", title: "Loyalty mechanics that convert",
        desc: "Run tiers, bonuses and rewards from one dashboard — and watch active cards and engagement grow.",
        bullets: ["Tiers, bonuses, clubs and rewards", "Active cards and engagement metrics", "Configurable accrual and burn rules", "Built for retail at scale"],
        tags: ["Tiers", "Bonuses", "Rewards"], caption: "Revanta · Loyalty", video: "/revanta/assets/video/sections/loyalty-program.mp4" },
      { cat: "Transparency", title: "Every point, fully traceable",
        desc: "A transparent ledger of every accrual and redemption — searchable, filterable and audit-ready.",
        bullets: ["Full accrual and redemption ledger", "Filter by customer, period and type", "Transparent, audit-ready trail", "Export for finance"],
        tags: ["Ledger", "Audit", "Points"], caption: "Revanta · Accrual history", video: "/revanta/assets/video/sections/accrual-history.mp4" },
      { cat: "Automation", title: "Automate the customer journey",
        desc: "Build trigger-based and cascading flows across push, email, SMS and chatbots — no code, no IT.",
        bullets: ["Visual no-code flow builder", "Triggers, branches and delays", "Push, email, SMS and chatbots", "Best-time-to-send optimization"],
        tags: ["Flows", "No-code", "Omnichannel"], caption: "Revanta · Campaign flows", video: "/revanta/assets/video/sections/campaign-flows.mp4" },
      { cat: "Analytics (BI)", title: "Decisions backed by data",
        desc: "Deep analytics on program performance — cohorts, revenue and campaign ROI, in real time.",
        bullets: ["Program KPIs and cohort analysis", "Revenue and points dynamics", "Campaign and promo ROI", "Real-time, drill-down charts"],
        tags: ["BI", "Cohorts", "ROI"], caption: "Revanta · Analytics", video: "/revanta/assets/video/sections/analytics-bi.mp4" },
    ];

    var el = function (id) { return document.getElementById(id); };
    var cat = el("modCategory"), title = el("modTitle"), desc = el("modDesc"),
        bulletsEl = el("modBullets"), tagsEl = el("modTags"), caption = el("modCaption"),
        counter = el("modCounter"), dotsWrap = el("modDots"), left = el("modLeft"),
        progress = el("modProgress");
    var cur = -1, timer = null;
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };

    var dots = MODULES.map(function (m, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", m.caption);
      b.className = "h-2 w-2 rounded-full bg-line transition-all duration-300";
      b.addEventListener("click", function () { go(i); });
      dotsWrap.appendChild(b);
      return b;
    });

    function render(i) {
      var m = MODULES[i];
      cat.textContent = m.cat;
      title.textContent = m.title;
      desc.textContent = m.desc;
      bulletsEl.innerHTML = m.bullets.map(function (t) {
        return '<li class="flex items-start gap-3 text-sm leading-relaxed text-white/85 md:text-base"><span class="mt-[0.5em] h-1.5 w-1.5 flex-shrink-0 rounded-full" style="background:var(--accent)" aria-hidden="true"></span><span>' + t + "</span></li>";
      }).join("");
      tagsEl.innerHTML = m.tags.map(function (t) {
        return '<span class="rounded-full border border-[var(--hairline)] bg-white/[0.04] px-3 py-1 text-xs text-[var(--muted)]">' + t + "</span>";
      }).join("");
      caption.textContent = m.caption;
      counter.textContent = pad(i + 1) + " / " + pad(MODULES.length);
      dots.forEach(function (d, j) {
        d.className = "h-2 rounded-full transition-all duration-300 " + (j === i ? "w-6 bg-brand" : "w-2 bg-line hover:bg-mute");
      });
    }

    function applyVideo(i) {
      var ready = function () {
        video.removeEventListener("loadeddata", ready);
        video.style.opacity = "1";
      };
      video.addEventListener("loadeddata", ready);
      video.src = MODULES[i].video;
      video.load();
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
      // fallback if loadeddata is delayed/cached
      setTimeout(function () { video.style.opacity = "1"; }, 700);
    }

    function restartProgress() {
      progress.style.transition = "none";
      progress.style.width = "0%";
      void progress.offsetWidth; // reflow
      progress.style.transition = "width " + DURATION + "ms linear";
      progress.style.width = "100%";
    }

    function schedule() { clearTimeout(timer); timer = setTimeout(function () { go(cur + 1); }, DURATION); }

    function go(i) {
      i = ((i % MODULES.length) + MODULES.length) % MODULES.length;
      if (i === cur) return;
      clearTimeout(timer);
      // fade everything out, swap once fully faded, then crossfade back in
      left.style.opacity = "0";
      video.style.opacity = "0";
      setTimeout(function () {
        cur = i;
        render(i);
        left.style.opacity = "1";
        applyVideo(i);   // fades the video back in only when its first frame is ready
        restartProgress();
        schedule();
      }, 450);
    }

    el("modNext").addEventListener("click", function () { go(cur + 1); });
    el("modPrev").addEventListener("click", function () { go(cur - 1); });

    // first slide (shown immediately, no fade-out)
    cur = 0;
    render(0);
    applyVideo(0);
    restartProgress();
    schedule();
  })();

  /* Demo request — custom validation + open the visitor's email client --- */
  (function demoForm() {
    var form = document.getElementById("demoForm");
    if (!form) return;

    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var fields = [
      { id: "demoName", test: function (v) { return v.length > 0; }, msg: "Please enter your full name" },
      { id: "demoPhone", test: function (v) { return v.length > 0; }, msg: "Please enter your work phone" },
      { id: "demoEmail", test: function (v) { return EMAIL_RE.test(v); }, msg: "Please enter a valid work email" },
    ];

    function errorBox(input) {
      var box = input.parentNode.querySelector(".field-error");
      if (!box) {
        box = document.createElement("p");
        box.className = "field-error";
        box.setAttribute("role", "alert");
        input.parentNode.appendChild(box);
      }
      return box;
    }
    function showError(input, msg) {
      input.classList.add("invalid");
      input.setAttribute("aria-invalid", "true");
      var box = errorBox(input);
      box.textContent = msg;
      box.classList.add("show");
    }
    function clearError(input) {
      input.classList.remove("invalid");
      input.removeAttribute("aria-invalid");
      var box = input.parentNode.querySelector(".field-error");
      if (box) { box.textContent = ""; box.classList.remove("show"); }
    }

    // Clear a field's error as soon as it becomes valid while typing.
    fields.forEach(function (f) {
      var el = document.getElementById(f.id);
      if (el) {
        el.addEventListener("input", function () {
          if (f.test(el.value.trim())) clearError(el);
        });
      }
    });

    var consent = document.getElementById("demoConsent");
    var consentErr = document.getElementById("consentError");
    function clearConsent() {
      if (consentErr) { consentErr.textContent = ""; consentErr.classList.remove("show"); }
    }
    if (consent) {
      consent.addEventListener("change", function () {
        if (consent.checked) clearConsent();
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstInvalid = null;

      fields.forEach(function (f) {
        var el = document.getElementById(f.id);
        if (!el) return;
        if (f.test(el.value.trim())) {
          clearError(el);
        } else {
          showError(el, f.msg);
          if (!firstInvalid) firstInvalid = el;
        }
      });

      if (consent && !consent.checked) {
        if (consentErr) {
          consentErr.textContent = "Please accept the Privacy Policy";
          consentErr.classList.add("show");
        }
        if (!firstInvalid) firstInvalid = consent;
      } else {
        clearConsent();
      }

      if (firstInvalid) { firstInvalid.focus(); return; }

      function val(id) {
        var el = document.getElementById(id);
        return el ? (el.value || "").trim() : "";
      }
      var subject = "Revanta demo request";
      var body =
        "Name: " + val("demoName") + "\n" +
        "Phone: " + val("demoPhone") + "\n" +
        "Email: " + val("demoEmail") + "\n" +
        "Company: " + val("demoCompany") + "\n";

      var hint = document.getElementById("demoHint");
      if (hint) hint.classList.remove("hidden");

      window.location.href =
        "mailto:welcome@revanta.tech?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  })();
})();
