document.addEventListener("DOMContentLoaded", () => {
  // استهداف العناصر
  const answer = document.querySelector('.answer');
  const countdown = document.getElementById('countdown');
  const countText = document.getElementById('count-text');

  // اخفاء الإجابة في البداية
  answer.style.display = 'none';

  // بدء العد
  let seconds = 5;
  countText.textContent = seconds; // عرض الرقم الأول مباشرة

  const interval = setInterval(() => {
    seconds--;
    if (seconds > 0) {
      countText.textContent = seconds;
    } else {
      clearInterval(interval);       // إيقاف العد
      countdown.style.display = 'none'; // اخفاء العداد
      answer.style.display = 'block';   // اظهار الإجابة
    }
  }, 1000);
});
