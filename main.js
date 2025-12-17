document.addEventListener("DOMContentLoaded", async () => {
  let answerObj;
  const userLang = (navigator.language || "en").slice(0, 2);
  const solutionSpan = document.getElementById('solution-text');

  const html = document.documentElement;
  const h2Question = document.getElementById("question");

  if (userLang === "ar") {
    html.lang = "ar";
    h2Question.style.direction = "rtl";
  }

  const name = location.pathname.split(".")[0].split("/").pop();
  const path = `./js/${name}.js`;


  try {
    const module = await import(path);
    answerObj = module.default;
  } catch (err) {
    console.error("خطأ في الاستيراد:", err);
  }

  const localizedAnswer = answerObj[userLang] || answerObj.en;

  h2Question.innerHTML = localizedAnswer.question
  solutionSpan.textContent = localizedAnswer.answer;

  /* ========= Countdown ========= */
  const answer = document.querySelector('.answer');
  const countdown = document.getElementById('countdown');
  const countText = document.getElementById('count-text');

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

});
