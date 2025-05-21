let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000);
}
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    message: document.getElementById('message').value
  };

  fetch('/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(() => {
    document.getElementById('popupOverlay').style.display = 'flex';
  });
});

document.getElementById('popupClose').addEventListener('click', function () {
  document.getElementById('popupOverlay').style.display = 'none';
  document.getElementById('contactForm').reset();
});
