/* =======================
   Global Share Text
======================= */
let SHARE_TEXT = "";

/* =======================
   Main App
======================= */
document.addEventListener("DOMContentLoaded", async () => {
  try {
    /* ========= Basic Elements ========= */
    const html = document.documentElement;
    const header = document.getElementById("header");
    const questionEl = document.getElementById("question");
    const solutionEl = document.getElementById("solution-text");

    if (!questionEl || !solutionEl) return;

    /* ========= Language ========= */
    const userLang = (navigator.language || "en").slice(0, 2);

    if (userLang === "ar") {
      html.lang = "ar";
      header?.style.setProperty("direction", "rtl");
    }

    /* ========= Dynamic Import ========= */
    const pageName = location.pathname.split(".")[0].split("/").pop();
    if (!pageName) return;

    const path = `./js/${pageName}.js`;

    let answerObj;
    try {
      const module = await import(path);
      answerObj = module.default;
    } catch (err) {
      console.error("خطأ في تحميل ملف السؤال:", err);
      return;
    }

    if (!answerObj) return;

    const localized =
      answerObj[userLang] || answerObj.en;

    if (!localized) return;

    /* ========= Render Content ========= */
    questionEl.textContent = localized.question;
    solutionEl.textContent = localized.answer;

    SHARE_TEXT = localized.question;

    /* ========= Countdown ========= */
    const answerBox = document.querySelector(".answer");
    const countdown = document.getElementById("countdown");
    const countText = document.getElementById("count-text");

    if (answerBox && countdown && countText) {
      answerBox.style.display = "none";
      let seconds = 5;

      const timer = setInterval(() => {
        seconds--;
        if (seconds > 0) {
          countText.textContent = seconds;
        } else {
          clearInterval(timer);
          countdown.style.display = "none";
          answerBox.style.display = "block";
        }
      }, 1000);
    }

    /* ========= Share Button ========= */
    const shareBtn = document.getElementById("iconShare");

    if (shareBtn) {
      shareBtn.addEventListener("click", async () => {
        try {
          const shareData = {
            title: document.title,
            text: SHARE_TEXT || "جرب هذا اللغز 👇",
            url: window.location.href
          };

          if (navigator.share) {
            await navigator.share(shareData);
          } else {
            await navigator.clipboard.writeText(shareData.url);
            alert("📋 تم نسخ رابط الصفحة");
          }
        } catch (err) {
          console.warn("تم إلغاء المشاركة", err);
        }
      });
    }

    /* ========= Monetag Ads ========= */
    setTimeout(() => {
      try {
        const ad1 = document.createElement("script");
        ad1.dataset.zone = "10310444";
        ad1.src = "https://groleegni.net/vignette.min.js";
        document.body.appendChild(ad1);

        const ad2 = document.createElement("script");
        ad2.dataset.zone = "10310654";
        ad2.src = "https://gizokraijaw.net/vignette.min.js";
        document.body.appendChild(ad2);
      } catch (adErr) {
        console.warn("خطأ تحميل الإعلانات:", adErr);
      }
    }, 3000); // تحميل الإعلانات بعد استقرار الصفحة

  } catch (fatal) {
    console.error("خطأ عام في الصفحة:", fatal);
  }
});
