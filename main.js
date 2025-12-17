
  const shareBtn = document.getElementById("shareBtn");

  shareBtn.addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "شاهد هذا اللغز الممتع 👇",
          url: window.location.href
        });
      } catch (err) {
        console.log("تم إلغاء المشاركة");
      }
    } else {
      alert("المشاركة غير مدعومة على هذا المتصفح");
    }
  });



document.addEventListener("DOMContentLoaded", () => {
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