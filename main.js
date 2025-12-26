document.addEventListener("DOMContentLoaded", async () => {
  try {
    let answerObj;

    const userLang = (navigator.language || "en").slice(0, 2);
    const solutionSpan = document.getElementById('solution-text');
    const pQuestion = document.getElementById("question");
    const header = document.getElementById("header");
    const html = document.documentElement;

    if (!solutionSpan || !pQuestion) return;

    if (userLang === "ar") {
      html.lang = "ar";
      header?.style.setProperty("direction", "rtl");
    }

    const name = location.pathname
      .split(".")[0]
      .split("/")
      .pop();

    if (!name) throw new Error("اسم الصفحة غير صالح");

    const path = `./js/${name}.js`;

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

    pQuestion.textContent = localized.question;
    solutionSpan.textContent = localized.answer;

    /* ========= Countdown ========= */
    const answer = document.querySelector('.answer');
    const countdown = document.getElementById('countdown');
    const countText = document.getElementById('count-text');

    if (!answer || !countdown || !countText) return;

    answer.style.display = 'none';
    let seconds = 5;

    const interval = setInterval(() => {
      seconds--;
      if (seconds > 0) {
        countText.textContent = seconds;
      } else {
        clearInterval(interval);
        countdown.style.display = 'none';
        answer.style.display = 'block';
      }
    }, 1000);

    /* ========= Ads (Monetag) ========= */
    setTimeout(() => {
      try {
        const s1 = document.createElement('script');
        s1.dataset.zone = '10310444';
        s1.src = 'https://groleegni.net/vignette.min.js';
        document.body.appendChild(s1);

        const s2 = document.createElement('script');
        s2.dataset.zone = '10310654';
        s2.src = 'https://gizokraijaw.net/vignette.min.js';
        document.body.appendChild(s2);
      } catch (adErr) {
        console.warn("خطأ في تحميل الإعلانات:", adErr);
      }
    }, 300); // ⬅️ مهم جدًا

  } catch (fatal) {
    console.error("خطأ عام في الصفحة:", fatal);
  }
});

document.getElementById("iconShare").addEventListener("click",async() => {
  const shareData = {
  title: document.title,
  text: localized.question,
  url: window.location.href
};

try {
  if (navigator.share) {
    await navigator.share(shareData);
  } else {
    alert("❌❌❌❌❌❌❌❌❌")
  }
} catch (err) {
  console.warn("تم إلغاء المشاركة", err);
}
})
