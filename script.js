const weddingDate = new Date("2026-09-19T18:00:00");

function updateCountdown() {

    const now = new Date();

    const diff = weddingDate - now;

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
