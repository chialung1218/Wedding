const weddingDate = new Date("2026-09-19T17:28:00");

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
            <small>Days</small>
        </div>

        <div class="count-box">
            <span>${hours}</span>
            <small>Hours</small>
        </div>

        <div class="count-box">
            <span>${minutes}</span>
            <small>Minutes</small>
        </div>

        <div class="count-box">
            <span>${seconds}</span>
            <small>Seconds</small>
        </div>
    `;
}

updateCountdown();

setInterval(updateCountdown,1000);

document.getElementById("submitBtn")?.addEventListener("click", async () => {

    const data = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        relationship: document.getElementById("relationship").value,
        attend: document.getElementById("attend").value,
        guests: document.getElementById("guests").value,
        kids: document.getElementById("kids").value,
        childseat: document.getElementById("childseat").value,
        adult_vegetarian: document.getElementById("adult_vegetarian").value,
        kid_vegetarian: document.getElementById("kid_vegetarian").value,
        paper: document.getElementById("paper").value,
        address: document.getElementById("address").value,
        message: document.getElementById("message").value
    };

    console.log(data);
    
    if (!data.name) {
        alert("Please enter your full name.");
        return;
    }
    if(data.attend === "option"){
    alert("Please select whether you will be attending.");
    return;
    }



    const btn = document.getElementById("submitBtn");

    btn.disabled = true;
    btn.innerText = "Submitting...";

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
            <h3>Thank You ❤️</h3>
            <p>Your RSVP has been received.<br>We can't wait to celebrate with you!</p>
        </div>
    `;

    } catch (error) {

        alert("Submission failed. Please try again later.");

    }

    btn.disabled = false;
    btn.innerText = "Submit RSVP";

});




const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".slider-dots");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentSlide = 0;

//圓點

slides.forEach((_, index)=>{

    const dot = document.createElement("span");

    dot.classList.add("dot");

    if(index === 0){
        dot.classList.add("active");
    }

    dot.addEventListener("click",()=>{

        currentSlide = index;

        showSlide(currentSlide);

    });

    dotsContainer.appendChild(dot);

});

const dots = document.querySelectorAll(".dot");

//Show Slide

function showSlide(index){

    slides.forEach(slide=>{
        slide.classList.remove("active");
    });

    dots.forEach(dot=>{
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");

    dots[index].classList.add("active");
}

//左右按鈕

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

//自動輪播

setInterval(()=>{

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);

},4000);


//手機滑動功能

let touchStartX = 0;
let touchEndX = 0;

const slider = document.querySelector(".slider-track");

slider?.addEventListener("touchstart", (e) => {

    touchStartX = e.changedTouches[0].screenX;

});

slider?.addEventListener("touchend", (e) => {

    touchEndX = e.changedTouches[0].screenX;

    handleSwipe();

});

function handleSwipe(){

    const swipeDistance = touchStartX - touchEndX;

    // 左滑
    if(swipeDistance > 50){

        currentSlide++;

        if(currentSlide >= slides.length){
            currentSlide = 0;
        }

        showSlide(currentSlide);
    }

    // 右滑
    else if(swipeDistance < -50){

        currentSlide--;

        if(currentSlide < 0){
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);
    }

}
