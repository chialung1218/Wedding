const weddingDate = new Date("2026-09-19T18:00:00");

function updateCountdown() {

    const now = new Date();

    const diff = weddingDate - now;

    if(diff <= 0){

    document.getElementById("countdown").innerHTML = `
        <div class="count-box">
            <span>❤️</span>
            <small>Wedding Day</small>
        </div>
    `;

    return;
}
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (diff % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (diff % (1000 * 60))
        / 1000
    );

    document.getElementById("countdown").innerHTML = `
        <div class="count-box">
            <span>${days}</span>
            <small>天</small>
        </div>

        <div class="count-box">
            <span>${hours}</span>
            <small>時</small>
        </div>

        <div class="count-box">
            <span>${minutes}</span>
            <small>分</small>
        </div>

        <div class="count-box">
            <span>${seconds}</span>
            <small>秒</small>
        </div>
    `;
}

updateCountdown();

setInterval(updateCountdown,1000);

document.getElementById("submitBtn")?.addEventListener("click", async () => {

    const data = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        attend: document.getElementById("attend").value,
        guests: document.getElementById("guests").value,
        guests_child: document.getElementById("kids").value,
        child_chair: document.getElementById("childseat").value,
        vegetarian: document.getElementById("vegetarian").value,
        paper: document.getElementById("paper").value,
        paper_address: document.getElementById("address").value,
        message: document.getElementById("message").value
    };

    if (!data.name) {
        alert("請輸入姓名");
        return;
    }
    if(data.attend === "請選擇"){
    alert("請選擇是否出席");
    return;
    }



    const btn = document.getElementById("submitBtn");

    btn.disabled = true;
    btn.innerText = "送出中...";

    try {

        await fetch(
            "https://script.google.com/macros/s/AKfycbzb2HdsccLRGPWIiGEosv9AepxopbLfG4vgmgJAx5E4NH67sbFaDIOmFmpT-PEZlKLIXw/exec",
            {
                method: "POST",
                body: JSON.stringify(data)
            }
        );

    document.getElementById("rsvpForm").reset();

    document.querySelector(".rsvp-form").innerHTML = `
        <div class="success-box">
            <h3>感謝您的回覆 ❤️</h3>
            <p>我們已收到您的出席資訊</p>
        </div>
    `;

    } catch (error) {

        alert("送出失敗，請稍後再試");

    }

    btn.disabled = false;
    btn.innerText = "送出回覆";

});




const slides = document.querySelectorAll(".slide");

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentSlide = 0;

function showSlide(index){

    slides.forEach(slide=>{
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");
}

nextBtn?.addEventListener("click",()=>{

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);
});

prevBtn?.addEventListener("click",()=>{

    currentSlide--;

    if(currentSlide < 0){
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
});



setInterval(()=>{

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);

},5000);
