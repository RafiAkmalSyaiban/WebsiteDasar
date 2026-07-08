// Jalankan semua fungsi setelah DOM siap
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initContactForm();
});


function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");
  const menuToggle = document.getElementById("menuToggle");
  const navLinksWrapper = document.getElementById("navLinks");

  function goToPage(targetId) {
    // Sembunyikan semua page, tampilkan yang dipilih
    pages.forEach((page) => {
      page.classList.toggle("active", page.id === targetId);
    });

    // Update status "active" pada link navigasi
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.target === targetId);
    });

    // Tutup menu mobile setelah memilih halaman
    navLinksWrapper.classList.remove("open");

    // Update URL hash supaya bisa di-refresh / di-bookmark
    history.replaceState(null, "", `#${targetId}`);
  }

  // Klik pada link navigasi
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.dataset.target;
      goToPage(targetId);
    });
  });

  // Toggle menu hamburger (mobile)
  menuToggle.addEventListener("click", () => {
    navLinksWrapper.classList.toggle("open");
  });

  // Jika ada hash di URL saat load (misal: buka.html#about), langsung tampilkan
  const initialHash = window.location.hash.replace("#", "");
  if (initialHash && document.getElementById(initialHash)) {
    goToPage(initialHash);
  }
}


function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = "Mohon lengkapi semua field.";
      status.style.color = "#dc2626";
      return;
    }

    // Simulasi pengiriman pesan (ganti dengan API asli jika sudah ada backend)
    console.log("Data terkirim:", { name, email, message });

    status.textContent = `Terima kasih, ${name}! Pesan kamu sudah terkirim.`;
    status.style.color = "#16a34a";

    form.reset();
  });
}

function initFooterYear() {
  const yearEl = document.getElementById("year");
  yearEl.textContent = new Date().getFullYear();
}
