const images = document.querySelectorAll('.gallery img');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const closeBtn = document.getElementById('closeBtn');
const downloadBtn = document.getElementById('downloadBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');

let currentIndex = 0;
let currentImages = Array.from(images);

function openModal(index) {
  currentIndex = index;
  modalImage.src = currentImages[currentIndex].src;
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  openModal(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  openModal(currentIndex);
}

images.forEach((img, i) => {
  img.addEventListener('click', () => openModal(i));
});

closeBtn.addEventListener('click', closeModal);
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

// Filter functionality
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const category = button.getAttribute('data-category');
    currentImages = [];

    images.forEach(img => {
      const match = category === 'all' || img.dataset.category === category;
      img.style.display = match ? 'block' : 'none';
      if (match) currentImages.push(img);
    });
  });
});

// Search functionality
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  currentImages = [];

  images.forEach(img => {
    const match = img.dataset.title.toLowerCase().includes(query);
    img.style.display = match ? 'block' : 'none';
    if (match) currentImages.push(img);
  });
});
// Close modal on background click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  