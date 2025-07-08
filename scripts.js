document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("mainHeader");
  window.addEventListener("scroll", () => {
    window.scrollY > 50 ? header.classList.add("scrolled") : header.classList.remove("scrolled");
  });

  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
  });

  const form = document.querySelector(".booking-form");
  const dateInput = document.getElementById("calendar");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");

  const publicHolidaysApi = "https://date.nager.at/api/v3/PublicHolidays/2025/GE";
  let holidays = [];

  fetch(publicHolidaysApi)
    .then(res => res.json())
    .then(data => { holidays = data.map(day => day.date); });

  const isValidGeorgianPhone = phone => /^[5][0-9]{8}$/.test(phone);
  const isValidEmail = email => /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email);

  if (emailInput && emailError) {
    emailInput.addEventListener("input", () => {
      isValidEmail(emailInput.value) ? emailError.style.display = "none" : emailError.style.display = "block";
    });
  }

  if (dateInput) {
    dateInput.addEventListener("change", () => {
      const sel = new Date(dateInput.value);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (sel < today) {
        alert("გთხოვთ აირჩიოთ თარიღი , თქვენი არჩეული დრო წარსულშია");
        dateInput.value = "";
        return;
      }
      if (holidays.includes(dateInput.value)) {
        alert("ამ დღეს რესტორანი არ მუშაობს, რადგან საქართველოში ოფიციალური დასვენების დღეა!");
        dateInput.value = "";
      }
    });
  }

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const firstName = document.getElementById("firstname").value.trim();
      const lastName = document.getElementById("lastname").value.trim();
      const phone = phoneInput.value.trim();
      const email = emailInput.value.trim();
      const date = dateInput.value.trim();
      const time = document.getElementById("time").value;
      const totalPerson = document.getElementById("totalPerson").value.trim();

      if (!firstName || !lastName || !phone || !email || !date || !time || !totalPerson) {
        alert("გთხოვთ შეავსოთ ყველა ველი!");
        return;
      }

      if (!isValidGeorgianPhone(phone)) {
        alert("გთხოვთ მიუთითოთ სწორი ტელეფონი");
        return;
      }

      if (!isValidEmail(email)) {
        alert("გთხოვთ მიუთითოთ სწორი ელ‑ფოსტა");
        return;
      }

      const sel = new Date(date);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (sel < today || holidays.includes(date)) {
        alert("გთხოვთ აირჩიოთ არსებული თარიღი");
        return;
      }

      alert("დაჯავშნა წარმატებით გაიგზავნა!");
      form.reset();
      if (emailError) emailError.style.display = "none";
    });
  }

  const contactForm = document.getElementById("contact_Form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const firstName = document.getElementById("first_name").value.trim();
      const email = document.getElementById("contact_email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!firstName || !email || !subject || !message) {
        alert("გთხოვთ შეავსეთ ყველა ველი");
        return;
      }

      if (!emailRegex.test(email)) {
        alert("მიუთითეთ სწორი ელ-ფოსტა");
        return;
      }

      alert("შეტყობინება წარმატებით გაიგზავნა");
      contactForm.reset();
    });
  }

  
  const banner = document.getElementById("cookieBanner");
  const acceptBtn = document.getElementById("acceptCookies");

  if (banner && acceptBtn) {
    if (!localStorage.getItem("cookiesAccepted")) {
      banner.style.display = "flex";
    }

    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      banner.style.display = "none";
    });
  }

});
