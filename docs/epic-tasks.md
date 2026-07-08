# Epic: Redesign Hero Section & Navigation Cards

## Description
Mengubah tampilan Hero Section pada halaman utama agar tidak lagi menggunakan desain layar penuh (*full-width* & *full-height*), melainkan menggunakan desain kontainer yang proporsional dengan *padding* di sekelilingnya (mirip dengan gaya kodingakademi.id). Selain itu, ruang Hero akan dibagi menjadi dua bagian utama:
1. **Slideshow Banner**: Memakan porsi atas (sekitar 70% tinggi ruang) untuk menampilkan gambar dan teks hero.
2. **Quick Access Cards**: Memakan porsi bawah (sekitar 30%) yang memuat 4 kartu informasi sebagai navigasi cepat ke pilar-pilar utama platform.

## Goals
- Meningkatkan estetika UI dengan memberikan ruang putih (*whitespace*) di sekeliling banner.
- Mempercepat akses pengguna ke informasi kunci melalui 4 *quick access cards* tanpa harus melakukan *scroll* jauh ke bawah.
- Mengedepankan kesan modern, bersih, dan rapi.

---

# Tasks

## 1. Persiapan Struktur Layout
- [x] Buka file `src/components/sections/Hero.tsx`.
- [x] Hapus penerapan *class* `h-screen` dan `w-full` penuh yang tidak memiliki batas maksimal.
- [x] Ganti pembungkus luar section menjadi kontainer terpusat (contoh: `max-w-7xl mx-auto px-6 pt-32 pb-16`).

## 2. Modifikasi Slideshow Banner (70% Area)
- [x] Bungkus komponen `AnimatePresence` dan iterasi `frames` ke dalam *div* baru dengan tinggi spesifik (contoh: `h-[60vh] md:h-[65vh]`).
- [x] Berikan *border-radius* yang cukup besar (contoh: `rounded-3xl` atau `rounded-[2rem]`) pada pembungkus banner.
- [x] Tambahkan efek bayangan halus (`shadow-xl`) dan `overflow-hidden` agar *slideshow* terpotong rapi sesuai lengkungan sudut.
- [x] Pastikan navigasi dot *slideshow* bergeser ke dalam area *banner* yang baru, bukan di bagian bawah layar.

## 3. Pembuatan 4 Information Cards (30% Area)
- [x] Buat kontainer berbasis *CSS Grid* tepat di bawah elemen banner (`grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8`).
- [x] Buat *looping* atau struktur statis untuk 4 kartu:
  1. Lembaga Kursus
  2. Lembaga Pelatihan Kerja
  3. Sertifikasi BNSP
  4. Artikel & Acara (Sebagai pelengkap kartu ke-4)
- [x] Desain setiap kartu dengan latar belakang putih (`bg-white`), sedikit bayangan (`shadow-sm`), dan lengkungan sudut yang senada (`rounded-2xl`).
- [x] Berikan interaksi *hover* (contoh: transisi pergeseran ke atas, bayangan menebal, atau perubahan warna ikon).

## 4. Pengujian & Penyesuaian Responsif
- [x] Verifikasi tampilan di layar *Mobile* (apakah grid berubah menjadi `grid-cols-1` atau `grid-cols-2`).
- [x] Verifikasi proporsi ukuran teks (`h1`, `p`) di dalam *slideshow* karena areanya kini lebih sempit dari sebelumnya.
- [x] Pastikan tidak ada *layout shift* atau gambar yang *distorted*.
