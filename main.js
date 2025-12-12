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