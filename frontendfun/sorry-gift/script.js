function changeGift() {
    const giftDiv = document.getElementById("gift");
    const gifts = {
      1: { emoji: "🌹", text: "A single rose for you" },
      2: { emoji: "🍫", text: "sweet chocolates" },
      3: { emoji: "🎶", text: "love songs to brighten your day" },
      4: { emoji: "✨", text: "magical moments with you" },
      5: { emoji: "💎", text: "sparkling compliments for your beauty" },
      6: { emoji: "☕", text: "cozy coffee dates" },
      7: { emoji: "🌷", text: "tulips as fresh as you" },
      8: { emoji: "🎨", text: "beautiful colors that remind me of you"},
      9: { emoji: "💌", text: "heartfelt letters" },
      10: { emoji: "🎁", text: "thoughtful gifts" },
      11: { emoji: "🌙", text: "moonlit nights to dream of you" },
      12: { emoji: "❤️", text: "reasons why I adore you" },
      13: { emoji: "🕊️", text: "peaceful moments wrapped in your love" },
      14: { emoji: "🌅", text: "sunrises that feel warmer with you" },
      15: { emoji: "💫", text: "wishes I make with you in my heart" },
      16: { emoji: "📝", text: "poems written in the ink of my love" },
      17: { emoji: "💍", text: "promises of forever" },
      18: { emoji: "🌌", text: "a galaxy of dreams we’ll explore together" },
      19: { emoji: "🧸", text: "cuddles that last a lifetime" },
      20: { emoji: "🫶", text: "my heart shaped perfectly for you" },
      21: { emoji: "🕯️", text: "soft candlelight dinners with your smile glowing" },
      22: { emoji: "📸", text: "memories frozen in time with you" },
      23: { emoji: "🏹", text: "love that Cupid himself would envy" },
     24: { emoji: "🌻", text: "sunflowers blooming like my love for you" }

    };
  
    const days = Object.keys(gifts);
    const randomDay = days[Math.floor(Math.random() * days.length)];
    const { emoji, text } = gifts[randomDay];
  
    giftDiv.innerHTML = `<span>${emoji}<span><p>${text}</p>`;
  }
  
  document.getElementById("cube").addEventListener("click", function () {
    this.classList.toggle("active");
    if (!this.classList.contains("active")) {
      changeGift();
    }
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    changeGift();
  
    const cube = document.getElementById("cube");
    cube.classList.add("active");
    setTimeout(() => {
      cube.classList.remove("active");
    }, 3000);
  });
  