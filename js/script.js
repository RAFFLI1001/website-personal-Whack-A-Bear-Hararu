const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const papanSkor = document.querySelector('.papan-skor');
const pop = new Audio('path/to/pop.mp3'); // Ganti dengan path ke file suara Anda

let tanahSebelumnya;
let selesai;
let skor;
let waktu = 30; // Waktu permainan dalam detik (ubah dari 10 menjadi 30)
let timerId; // Variabel untuk menyimpan ID interval
let gameBerjalan = false; // Menentukan apakah game sedang berlangsung

function randomTanah(tanah) {
  const t = Math.floor(Math.random() * tanah.length);
  const tRandom = tanah[t];
  if (tRandom == tanahSebelumnya) {
    randomTanah(tanah);
  }
  tanahSebelumnya = tRandom;
  return tRandom;
}

function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function munculkanTikus() {
  const tRandom = randomTanah(tanah);
  const wRandom = randomWaktu(300, 1000);
  tRandom.classList.add('muncul');

  setTimeout(() => {
    tRandom.classList.remove('muncul');
    if (!selesai) {
      munculkanTikus();
    }
  }, wRandom);
}

function mulai() {
  selesai = false;
  skor = 0;
  papanSkor.textContent = 0;
  munculkanTikus();
  setTimeout(() => {
    selesai = true;
  }, 30000); // Ubah dari 10000 (10 detik) menjadi 30000 (30 detik)
  waktu = 30; // Set waktu permainan menjadi 30 detik
  document.getElementById("waktu").textContent = waktu;
  timer(); 
  mulaiGame();
}

function timer() {
  timerId = setInterval(() => {
    waktu--;
    document.getElementById("waktu").textContent = waktu;

    if (waktu <= 0) {
      clearInterval(timerId);
      gameBerjalan = false;
      alert("Waktu habis! Skor akhir Anda: " + document.querySelector(".papan-skor").textContent);
      resetGame(); 
    }
  }, 1000); 
}

function resetGame() {
  // Reset skor
  document.querySelector(".papan-skor").textContent = "0";
  // Reset waktu
  document.getElementById("waktu").textContent = "30"; // Ubah waktu kembali ke 30 detik
  // Mengakhiri interval yang ada
  clearInterval(timerId);
  gameBerjalan = false;
}

function pukul() {
  if (this.parentNode.classList.contains('muncul')) { // Cek jika tikus sedang muncul
    skor++;
    this.parentNode.classList.remove('muncul');
    pop.currentTime = 0; // Reset waktu audio ke awal
    pop.play(); // Mainkan suara
    papanSkor.textContent = skor;
  }
}

tikus.forEach(t => {
  t.addEventListener('click', pukul);
});

// Tambahkan event listener untuk tombol mulai
document.querySelector('#start-button').addEventListener('click', () => {
  pop.load(); // Memuat audio saat permainan dimulai
  mulai();
});