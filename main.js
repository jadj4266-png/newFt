
 const i18n = {
    ar: {
      title: "لغز اليوم",
      description: "اختبر ذكاءك مع لغز جديد وجواب مفاجئ."
    },
    en: {
      title: "Today's Puzzle",
      description: "Test your brain with a new puzzle and a surprising answer."
    },
    es: {
      title: "Acertijo de hoy",
      description: "Pon a prueba tu mente con un nuevo acertijo y una respuesta sorprendente."
    },
    fr: {
      title: "Énigme du jour",
      description: "Testez votre esprit avec une nouvelle énigme et une réponse surprenante."
    },
    de: {
      title: "Rätsel des Tages",
      description: "Teste dein Gehirn mit einem neuen Rätsel und einer überraschenden Antwort."
    },
    hi: {
      title: "आज की पहेली",
      description: "एक नई पहेली और चौंकाने वाले उत्तर के साथ अपने दिमाग का परीक्षण करें।"
    },
    pt: {
      title: "Enigma do dia",
      description: "Teste sua mente com um novo enigma e uma resposta surpreendente."
    },
    ru: {
      title: "Загадка дня",
      description: "Проверьте свой ум новой загадкой и удивительным ответом."
    },
    zh: {
      title: "今日谜题",
      description: "用新的谜题和令人惊讶的答案测试你的思维。"
    },
    tr: {
      title: "Günün Bulmacası",
      description: "Yeni bir bilmece ve şaşırtıcı bir cevapla zihnini test et."
    }
  }


document.addEventListener("DOMContentLoaded", () => {
  const answer = document.querySelector('.answer');
  const countdown = document.getElementById('countdown');
  const countText = document.getElementById('count-text');
  
const $imgEl = document.getElementById("img")

  answer.style.display = 'none';

  let seconds = 5;
  
  const userLang = (navigator.language || navigator.userLanguage || "en").toLowerCase().slice(0, 2);

  const content = i18n[userLang] || i18n["en"];


  $imgEl.setAttribute("alt", content.title);
  document.querySelector("title").innerText = content.title;
  document.querySelector('meta[name="description"]').setAttribute("content", content.description);

  document.querySelector('meta[property="og:title"]').setAttribute("content", content.title);
  document.querySelector('meta[property="og:description"]').setAttribute("content", content.description);

  document.querySelector('meta[name="twitter:title"]').setAttribute("content", content.title);
  document.querySelector('meta[name="twitter:description"]').setAttribute("content", content.description);
  
  
  const activeLang = i18n[userLang] ? userLang : "en"
  const dir = (activeLang === "ar" || activeLang === "hi") ? "rtl" : "ltr";
// تطبيقها على HTML
document.documentElement.setAttribute("lang", activeLang);
document.documentElement.setAttribute("dir", dir);


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