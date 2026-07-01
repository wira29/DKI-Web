# Product Requirements Document (PRD)

## Landing Page Website — Digital Kompetensi Indonesia

| Field            | Detail                                             |
| ---------------- | -------------------------------------------------- |
| **Nama Produk**  | Website Digital Kompetensi Indonesia                |
| **Versi**        | 1.0                                                |
| **Tanggal**      | 29 Juni 2026                                       |
| **Status**       | Draft                                              |
| **Tipe Produk**  | Landing Page Website + Admin Panel (CMS)            |

---

## 1. Ringkasan Produk

Website ini merupakan **landing page** untuk lembaga pelatihan **Digital Kompetensi Indonesia (DKI)** — sebuah lembaga pelatihan dan sertifikasi di bidang Desain Grafis, Digital Marketing, IoT, dan Coding Anak Usia Dini.

Website dilengkapi dengan **Admin Panel (CMS)** yang memungkinkan admin mengelola **seluruh konten** tanpa perlu mengubah kode. Semua teks, gambar, data program, testimoni, artikel, dan pengaturan tampilan dapat dikustomisasi melalui dashboard admin.

---

## 2. Tujuan & Sasaran

### 2.1 Tujuan Bisnis
- Meningkatkan visibilitas dan kredibilitas lembaga DKI secara online
- Menyediakan informasi lengkap tentang program pelatihan, sertifikasi, dan kemitraan
- Menarik calon peserta baru melalui tampilan website yang profesional dan informatif
- Membangun kepercayaan melalui testimoni alumni dan artikel edukasi

### 2.2 Target Audiens
| Segmen                        | Kebutuhan                                         |
| ----------------------------- | ------------------------------------------------- |
| Calon peserta pelatihan       | Informasi program, jadwal, biaya, cara mendaftar   |
| Calon peserta sertifikasi     | Jenis sertifikasi, persyaratan, biaya             |
| Calon mitra/partner           | Informasi program kemitraan, syarat & benefit      |
| Masyarakat umum               | Mengenal DKI, membaca artikel/berita terkait        |

---

## 3. Arsitektur Sistem

### 3.1 Komponen Utama

Pendekatan sistem menggunakan arsitektur **Next.js Fullstack** (App Router/Pages Router), di mana Frontend (Landing Page), Admin Panel (CMS), dan Backend (API) dikembangkan dalam satu *codebase* tunggal.

```text
┌─────────────────────────────────────────────────┐
│                 NEXT.JS APP                     │
│                                                 │
│  ┌─────────────────┐       ┌─────────────────┐  │
│  │    FRONTEND     │       │   ADMIN PANEL   │  │
│  │ (Landing Page)  │       │ (Dashboard CMS) │  │
│  └─────────────────┘       └─────────────────┘  │
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │               BACKEND API                 │  │
│  │    (Next.js Route Handlers / Actions)     │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────┐
│                  DATABASE                       │
│     Menyimpan seluruh konten & konfigurasi      │
└─────────────────────────────────────────────────┘
```

### 3.2 Tech Stack

Website dan CMS ini akan dibangun sepenuhnya (Fullstack) menggunakan ekosistem Next.js.

| Layer         | Teknologi                              |
| ------------- | -------------------------------------- |
| Core / Web    | Next.js (Fullstack)                    |
| Styling       | CSS / Tailwind CSS                     |
| Database      | PostgreSQL / MySQL / MongoDB           |
| ORM / Query   | Prisma / Drizzle ORM (Direkomendasikan)|
| File Storage  | Local / Cloudinary / S3                |
| Auth          | NextAuth.js (Auth.js) / JWT            |
| Deployment    | Vercel / VPS / Docker                  |

---

## 4. Halaman & Section (Landing Page)

### 4.1 Hero Section (Interactive Storytelling)

**Deskripsi:** Section utama di bagian atas halaman yang menjadi kesan pertama pengunjung. Bagian ini menggunakan konsep *storytelling* berbasis *scroll-animation* yang dinamis.

**Alur Cerita & Animasi (Scroll-based):**
1. **Layar Awal**: Teks "Belajar Teknologi untuk Masa Depan." dengan visual gambar luar gedung.
2. **Scroll**: Gedung perlahan *zoom in*.
3. **Scroll**: Memasuki area *lobby*.
4. **Scroll**: Teks berubah (menyesuaikan konteks).
5. **Scroll**: Gambar berganti menjadi suasana kelas *programming*.
6. **Scroll**: *Zoom in* secara detail ke layar *coding*.
7. **Scroll**: Transisi ke visual kelas IoT.
8. **Scroll**: *Zoom in* secara detail ke perangkat ESP32.
9. **Scroll**: Visual berpindah ke suasana diskusi *project* antar siswa.
10. **Scroll**: Visual menampilkan sertifikat kelulusan.
11. **Akhir Scroll**: Muncul Call-to-Action (CTA) untuk pendaftaran/bergabung.

**Admin Customizable (Storytelling Frames):**

| Elemen               | Tipe Data    | Keterangan                              |
| -------------------- | ------------ | --------------------------------------- |
| `story_frames`       | Array        | Konten teks & media untuk tiap tahap *scroll* |
| `final_cta_text`     | Text         | Teks tombol CTA di akhir animasi        |
| `final_cta_link`     | URL          | Link tujuan tombol CTA                  |
| `is_visible`         | Boolean      | Tampilkan/sembunyikan section           |

---

### 4.2 About Section

**Deskripsi:** Informasi mengenai lembaga Digital Kompetensi Indonesia.

**Elemen yang ditampilkan:**
- Judul section
- Deskripsi lembaga (rich text)
- Gambar / foto lembaga
- Statistik pencapaian (jumlah alumni, program, dll)
- Visi & Misi

**Admin Customizable:**

| Elemen               | Tipe Data    | Keterangan                              |
| -------------------- | ------------ | --------------------------------------- |
| `section_title`      | Text         | Judul section "Tentang Kami"            |
| `description`        | Rich Text    | Deskripsi lengkap tentang lembaga       |
| `image`              | Image Upload | Foto / gambar lembaga                   |
| `vision`             | Rich Text    | Visi lembaga                            |
| `mission`            | Rich Text    | Misi lembaga                            |
| `stats`              | Array        | Daftar statistik (lihat di bawah)       |
| `is_visible`         | Boolean      | Tampilkan/sembunyikan section           |

**Struktur `stats` (Array of Object):**

| Field         | Tipe Data | Keterangan                     |
| ------------- | --------- | ------------------------------ |
| `label`       | Text      | Label statistik (misal: "Alumni") |
| `value`       | Text      | Nilai (misal: "5000+")          |
| `icon`        | Icon Pick | Ikon untuk statistik            |
| `sort_order`  | Number    | Urutan tampil                   |

---

### 4.3 Program Training Section

**Deskripsi:** Menampilkan daftar program pelatihan yang tersedia.

**Elemen yang ditampilkan:**
- Judul section
- Deskripsi section
- Daftar kartu program pelatihan
- Setiap kartu berisi: gambar, judul, deskripsi singkat, durasi, harga, badge, CTA

**Admin Customizable:**

| Elemen                 | Tipe Data    | Keterangan                              |
| ---------------------- | ------------ | --------------------------------------- |
| `section_title`        | Text         | Judul section                           |
| `section_description`  | Text         | Deskripsi singkat section               |
| `is_visible`           | Boolean      | Tampilkan/sembunyikan section           |

**Struktur Program Training (CRUD per item):**

| Field              | Tipe Data    | Keterangan                          |
| ------------------ | ------------ | ----------------------------------- |
| `title`            | Text         | Nama program pelatihan              |
| `slug`             | Text (auto)  | URL-friendly identifier             |
| `description`      | Rich Text    | Deskripsi lengkap program           |
| `short_description`| Text         | Deskripsi singkat (untuk kartu)     |
| `image`            | Image Upload | Gambar thumbnail program            |
| `duration`         | Text         | Durasi pelatihan (misal: "3 Bulan") |
| `price`            | Number       | Harga program                       |
| `discount_price`   | Number       | Harga diskon (opsional)             |
| `badge`            | Text         | Badge label (misal: "Best Seller")  |
| `category`         | Enum         | Kategori: Desain Grafis / Digital Marketing / IoT / Coding Anak |
| `level`            | Enum         | Level: Beginner / Intermediate / Advanced |
| `curriculum`       | Rich Text    | Kurikulum / materi pelatihan        |
| `benefits`         | Array<Text>  | Daftar keuntungan mengikuti program |
| `cta_text`         | Text         | Teks tombol CTA                    |
| `cta_link`         | URL          | Link tujuan CTA                    |
| `is_featured`      | Boolean      | Tampilkan di landing page           |
| `is_active`        | Boolean      | Status aktif/nonaktif               |
| `sort_order`       | Number       | Urutan tampil                       |

---

### 4.4 Program Sertifikasi Section

**Deskripsi:** Menampilkan daftar program sertifikasi yang ditawarkan.

**Elemen yang ditampilkan:**
- Judul section
- Deskripsi section
- Daftar kartu sertifikasi
- Setiap kartu berisi: gambar, judul, deskripsi, persyaratan, biaya, CTA

**Admin Customizable:**

| Elemen                 | Tipe Data    | Keterangan                              |
| ---------------------- | ------------ | --------------------------------------- |
| `section_title`        | Text         | Judul section                           |
| `section_description`  | Text         | Deskripsi singkat section               |
| `is_visible`           | Boolean      | Tampilkan/sembunyikan section           |

**Struktur Program Sertifikasi (CRUD per item):**

| Field              | Tipe Data    | Keterangan                          |
| ------------------ | ------------ | ----------------------------------- |
| `title`            | Text         | Nama sertifikasi                    |
| `slug`             | Text (auto)  | URL-friendly identifier             |
| `description`      | Rich Text    | Deskripsi lengkap sertifikasi       |
| `short_description`| Text         | Deskripsi singkat (untuk kartu)     |
| `image`            | Image Upload | Gambar thumbnail sertifikasi        |
| `issuing_body`     | Text         | Lembaga penerbit sertifikat         |
| `requirements`     | Rich Text    | Persyaratan peserta                 |
| `price`            | Number       | Biaya sertifikasi                   |
| `discount_price`   | Number       | Harga diskon (opsional)             |
| `validity_period`  | Text         | Masa berlaku sertifikat             |
| `benefits`         | Array<Text>  | Manfaat memiliki sertifikasi        |
| `cta_text`         | Text         | Teks tombol CTA                    |
| `cta_link`         | URL          | Link tujuan CTA                    |
| `is_featured`      | Boolean      | Tampilkan di landing page           |
| `is_active`        | Boolean      | Status aktif/nonaktif               |
| `sort_order`       | Number       | Urutan tampil                       |

---

### 4.5 Program Kemitraan Section

**Deskripsi:** Menampilkan informasi program kemitraan/partnership.

**Elemen yang ditampilkan:**
- Judul section
- Deskripsi section
- Daftar paket kemitraan (kartu atau tabel)
- Setiap paket berisi: nama, deskripsi, benefit, syarat, biaya, CTA
- Logo mitra yang sudah bergabung

**Admin Customizable:**

| Elemen                 | Tipe Data    | Keterangan                              |
| ---------------------- | ------------ | --------------------------------------- |
| `section_title`        | Text         | Judul section                           |
| `section_description`  | Rich Text    | Deskripsi program kemitraan             |
| `is_visible`           | Boolean      | Tampilkan/sembunyikan section           |

**Struktur Program Kemitraan (CRUD per item):**

| Field              | Tipe Data    | Keterangan                          |
| ------------------ | ------------ | ----------------------------------- |
| `title`            | Text         | Nama paket kemitraan                |
| `slug`             | Text (auto)  | URL-friendly identifier             |
| `description`      | Rich Text    | Deskripsi lengkap paket             |
| `short_description`| Text         | Deskripsi singkat (untuk kartu)     |
| `image`            | Image Upload | Gambar / ikon paket                 |
| `benefits`         | Array<Text>  | Daftar keuntungan bermitra          |
| `requirements`     | Rich Text    | Syarat & ketentuan bermitra         |
| `price`            | Number       | Biaya kemitraan (jika ada)          |
| `cta_text`         | Text         | Teks tombol CTA                    |
| `cta_link`         | URL          | Link tujuan CTA                    |
| `is_featured`      | Boolean      | Tampilkan di landing page           |
| `is_active`        | Boolean      | Status aktif/nonaktif               |
| `sort_order`       | Number       | Urutan tampil                       |

**Struktur Logo Mitra (CRUD per item):**

| Field         | Tipe Data    | Keterangan             |
| ------------- | ------------ | ---------------------- |
| `name`        | Text         | Nama mitra             |
| `logo`        | Image Upload | Logo mitra             |
| `website_url` | URL          | Link website mitra     |
| `sort_order`  | Number       | Urutan tampil          |

---

### 4.6 Program Acara / Event Section

**Deskripsi:** Menampilkan daftar acara/event yang akan datang maupun yang sudah berlangsung.

**Elemen yang ditampilkan:**
- Judul section
- Deskripsi section
- Daftar kartu acara
- Setiap kartu: gambar, judul, tanggal, lokasi, deskripsi, status, CTA

**Admin Customizable:**

| Elemen                 | Tipe Data    | Keterangan                              |
| ---------------------- | ------------ | --------------------------------------- |
| `section_title`        | Text         | Judul section                           |
| `section_description`  | Text         | Deskripsi singkat section               |
| `is_visible`           | Boolean      | Tampilkan/sembunyikan section           |

**Struktur Acara/Event (CRUD per item):**

| Field              | Tipe Data    | Keterangan                          |
| ------------------ | ------------ | ----------------------------------- |
| `title`            | Text         | Nama acara                          |
| `slug`             | Text (auto)  | URL-friendly identifier             |
| `description`      | Rich Text    | Deskripsi lengkap acara             |
| `short_description`| Text         | Deskripsi singkat (untuk kartu)     |
| `image`            | Image Upload | Poster / gambar acara               |
| `event_date`       | DateTime     | Tanggal & waktu acara               |
| `event_end_date`   | DateTime     | Tanggal & waktu selesai (opsional)  |
| `location`         | Text         | Lokasi acara                        |
| `location_type`    | Enum         | Online / Offline / Hybrid           |
| `maps_url`         | URL          | Link Google Maps (opsional)         |
| `registration_url` | URL          | Link pendaftaran                    |
| `price`            | Number       | Biaya acara (0 = gratis)            |
| `quota`            | Number       | Kuota peserta (opsional)            |
| `status`           | Enum         | Upcoming / Ongoing / Completed / Cancelled |
| `is_featured`      | Boolean      | Tampilkan di landing page           |
| `is_active`        | Boolean      | Status aktif/nonaktif               |
| `sort_order`       | Number       | Urutan tampil                       |

---

### 4.7 Alumni / Testimoni Section

**Deskripsi:** Menampilkan testimoni dan cerita sukses dari alumni DKI.

**Elemen yang ditampilkan:**
- Judul section
- Deskripsi section
- Carousel / grid kartu testimoni
- Setiap kartu: foto alumni, nama, program yang diikuti, testimoni, rating

**Admin Customizable:**

| Elemen                 | Tipe Data    | Keterangan                              |
| ---------------------- | ------------ | --------------------------------------- |
| `section_title`        | Text         | Judul section                           |
| `section_description`  | Text         | Deskripsi singkat section               |
| `display_mode`         | Enum         | Carousel / Grid                         |
| `is_visible`           | Boolean      | Tampilkan/sembunyikan section           |

**Struktur Testimoni Alumni (CRUD per item):**

| Field              | Tipe Data    | Keterangan                          |
| ------------------ | ------------ | ----------------------------------- |
| `name`             | Text         | Nama alumni                         |
| `photo`            | Image Upload | Foto alumni                         |
| `program`          | Relation     | Relasi ke program yang diikuti      |
| `batch`            | Text         | Angkatan / batch (opsional)         |
| `testimonial`      | Text         | Isi testimoni                       |
| `rating`           | Number (1-5) | Rating kepuasan                     |
| `job_title`        | Text         | Jabatan/pekerjaan saat ini          |
| `company`          | Text         | Perusahaan tempat bekerja           |
| `is_featured`      | Boolean      | Tampilkan di landing page           |
| `is_active`        | Boolean      | Status aktif/nonaktif               |
| `sort_order`       | Number       | Urutan tampil                       |

---

### 4.8 Berita / Artikel Section

**Deskripsi:** Menampilkan artikel, berita, dan blog terkait kegiatan DKI.

**Elemen yang ditampilkan:**
- Judul section
- Daftar kartu artikel (thumbnail, judul, excerpt, tanggal, kategori, penulis)
- Tombol "Lihat Semua" menuju halaman daftar artikel

**Admin Customizable:**

| Elemen                  | Tipe Data    | Keterangan                              |
| ----------------------- | ------------ | --------------------------------------- |
| `section_title`         | Text         | Judul section                           |
| `section_description`   | Text         | Deskripsi singkat section               |
| `display_count`         | Number       | Jumlah artikel yang ditampilkan         |
| `view_all_text`         | Text         | Teks tombol "Lihat Semua"              |
| `view_all_link`         | URL          | Link tujuan "Lihat Semua"             |
| `is_visible`            | Boolean      | Tampilkan/sembunyikan section           |

**Struktur Artikel (CRUD per item):**

| Field              | Tipe Data    | Keterangan                          |
| ------------------ | ------------ | ----------------------------------- |
| `title`            | Text         | Judul artikel                       |
| `slug`             | Text (auto)  | URL-friendly identifier             |
| `content`          | Rich Text    | Isi lengkap artikel                 |
| `excerpt`          | Text         | Ringkasan singkat                   |
| `thumbnail`        | Image Upload | Gambar thumbnail                    |
| `cover_image`      | Image Upload | Gambar cover (untuk halaman detail) |
| `category`         | Relation     | Kategori artikel                    |
| `tags`             | Array<Text>  | Tag artikel                         |
| `author`           | Relation     | Penulis artikel                     |
| `published_at`     | DateTime     | Tanggal publikasi                   |
| `is_featured`      | Boolean      | Tampilkan di landing page           |
| `is_published`     | Boolean      | Status publikasi                    |
| `seo_title`        | Text         | Judul SEO (opsional)               |
| `seo_description`  | Text         | Deskripsi SEO (opsional)           |
| `sort_order`       | Number       | Urutan tampil                       |

**Struktur Kategori Artikel (CRUD per item):**

| Field         | Tipe Data    | Keterangan             |
| ------------- | ------------ | ---------------------- |
| `name`        | Text         | Nama kategori          |
| `slug`        | Text (auto)  | URL-friendly identifier|
| `description` | Text         | Deskripsi kategori     |
| `sort_order`  | Number       | Urutan tampil          |

---

### 4.9 Footer Section

**Deskripsi:** Bagian paling bawah halaman berisi informasi kontak, navigasi, dan social media.

**Admin Customizable:**

| Elemen                  | Tipe Data    | Keterangan                              |
| ----------------------- | ------------ | --------------------------------------- |
| `logo`                  | Image Upload | Logo untuk footer                       |
| `tagline`               | Text         | Tagline / slogan lembaga                |
| `description`           | Text         | Deskripsi singkat lembaga               |
| `address`               | Text         | Alamat lengkap                          |
| `phone`                 | Text         | Nomor telepon                           |
| `email`                 | Text         | Alamat email                            |
| `maps_embed_url`        | URL          | URL embed Google Maps                   |
| `copyright_text`        | Text         | Teks hak cipta                          |

**Struktur Social Media Links (CRUD per item):**

| Field         | Tipe Data    | Keterangan             |
| ------------- | ------------ | ---------------------- |
| `platform`    | Enum         | Instagram / Facebook / Twitter / YouTube / LinkedIn / TikTok / WhatsApp |
| `url`         | URL          | Link ke akun sosmed    |
| `icon`        | Icon Pick    | Ikon platform          |
| `sort_order`  | Number       | Urutan tampil          |

**Struktur Footer Navigation (CRUD per item):**

| Field         | Tipe Data | Keterangan                     |
| ------------- | --------- | ------------------------------ |
| `group_title` | Text      | Judul grup navigasi            |
| `links`       | Array     | Daftar link dalam grup         |
| `sort_order`  | Number    | Urutan tampil grup             |

**Struktur Footer Link (per item dalam grup):**

| Field        | Tipe Data | Keterangan        |
| ------------ | --------- | ------------------ |
| `label`      | Text      | Teks link          |
| `url`        | URL       | URL tujuan         |
| `is_external`| Boolean   | Buka di tab baru?  |
| `sort_order` | Number    | Urutan tampil      |

---

## 5. Pengaturan Global (Admin Customizable)

Pengaturan global yang berlaku untuk seluruh website.

### 5.1 Branding & Identitas

| Elemen                | Tipe Data    | Keterangan                              |
| --------------------- | ------------ | --------------------------------------- |
| `site_name`           | Text         | Nama website                            |
| `site_tagline`        | Text         | Tagline website                         |
| `logo_primary`        | Image Upload | Logo utama (header)                     |
| `logo_secondary`      | Image Upload | Logo alternatif (footer/light bg)       |
| `favicon`             | Image Upload | Favicon website                         |

### 5.2 SEO & Meta

| Elemen                | Tipe Data    | Keterangan                              |
| --------------------- | ------------ | --------------------------------------- |
| `meta_title`          | Text         | Default meta title                      |
| `meta_description`    | Text         | Default meta description                |
| `meta_keywords`       | Text         | Default meta keywords                   |
| `og_image`            | Image Upload | Default Open Graph image                |
| `google_analytics_id` | Text         | Google Analytics tracking ID            |
| `google_tag_manager`  | Text         | Google Tag Manager ID                   |

### 5.3 Tema & Warna

| Elemen                | Tipe Data | Keterangan                              |
| --------------------- | --------- | --------------------------------------- |
| `primary_color`       | Color     | Warna utama brand                       |
| `secondary_color`     | Color     | Warna sekunder                          |
| `accent_color`        | Color     | Warna aksen                             |
| `text_color`          | Color     | Warna teks utama                        |
| `background_color`    | Color     | Warna latar belakang                    |
| `font_heading`        | Font Pick | Font untuk heading                      |
| `font_body`           | Font Pick | Font untuk body text                    |

### 5.4 Navigasi Header

**Struktur Menu Item (CRUD per item):**

| Field         | Tipe Data | Keterangan                     |
| ------------- | --------- | ------------------------------ |
| `label`       | Text      | Teks menu                      |
| `url`         | URL       | Link tujuan                    |
| `is_external` | Boolean   | Buka di tab baru?              |
| `children`    | Array     | Sub-menu items (opsional)      |
| `sort_order`  | Number    | Urutan tampil                  |

### 5.5 WhatsApp Floating Button

| Elemen                | Tipe Data | Keterangan                              |
| --------------------- | --------- | --------------------------------------- |
| `is_enabled`          | Boolean   | Aktifkan/nonaktifkan floating button    |
| `phone_number`        | Text      | Nomor WhatsApp                          |
| `default_message`     | Text      | Pesan default saat klik                 |
| `button_position`     | Enum      | Bottom-Left / Bottom-Right              |
| `greeting_text`       | Text      | Teks sapaan di atas tombol              |

### 5.6 Popup / Banner Promo

| Elemen                | Tipe Data    | Keterangan                              |
| --------------------- | ------------ | --------------------------------------- |
| `is_enabled`          | Boolean      | Aktifkan/nonaktifkan popup              |
| `type`                | Enum         | Popup / Top Banner / Bottom Banner      |
| `title`               | Text         | Judul promo                             |
| `description`         | Rich Text    | Deskripsi promo                         |
| `image`               | Image Upload | Gambar promo                            |
| `cta_text`            | Text         | Teks tombol CTA                        |
| `cta_link`            | URL          | Link tujuan CTA                        |
| `start_date`          | DateTime     | Tanggal mulai tampil                    |
| `end_date`            | DateTime     | Tanggal berakhir                        |
| `show_once`           | Boolean      | Hanya tampilkan sekali per pengunjung   |

### 5.7 Section Ordering

| Elemen                | Tipe Data     | Keterangan                              |
| --------------------- | ------------- | --------------------------------------- |
| `section_order`       | Array<Enum>   | Urutan tampilan section di landing page (drag & drop reorder) |

Admin dapat mengubah urutan section melalui **drag & drop** di admin panel.

---

## 6. Admin Panel (CMS)

### 6.1 Fitur Admin Panel

| Fitur                     | Deskripsi                                             |
| ------------------------- | ----------------------------------------------------- |
| **Dashboard**             | Overview statistik website (total program, artikel, dll) |
| **Manajemen Hero**        | Edit konten hero section                               |
| **Manajemen About**       | Edit konten about section                              |
| **Manajemen Program**     | CRUD program pelatihan                                 |
| **Manajemen Sertifikasi** | CRUD program sertifikasi                               |
| **Manajemen Kemitraan**   | CRUD program kemitraan & logo mitra                    |
| **Manajemen Acara**       | CRUD acara/event                                       |
| **Manajemen Testimoni**   | CRUD testimoni alumni                                  |
| **Manajemen Artikel**     | CRUD artikel/berita + kategori                         |
| **Manajemen Media**       | Upload & kelola gambar/file                            |
| **Pengaturan Website**    | Branding, SEO, tema, navigasi, footer                  |
| **Pengaturan Section**    | Visibilitas & urutan section                           |
| **Manajemen User**        | CRUD user admin & role                                 |

### 6.2 Role & Permission

| Role            | Akses                                              |
| --------------- | -------------------------------------------------- |
| **Super Admin** | Akses penuh ke semua fitur                         |
| **Editor**      | CRUD konten (program, artikel, testimoni, acara)   |
| **Viewer**      | Hanya bisa melihat data tanpa edit                 |

### 6.3 Fitur Pendukung Admin

- **Rich Text Editor** — WYSIWYG editor untuk konten rich text (misal: TipTap, CKEditor)
- **Image Upload** — Upload gambar dengan auto-resize, crop, dan kompresi
- **Drag & Drop** — Untuk reorder section dan item
- **Preview** — Preview tampilan website sebelum publish
- **Bulk Actions** — Aktifkan/nonaktifkan/hapus multiple item sekaligus
- **Search & Filter** — Cari dan filter data di setiap tabel
- **Audit Log** — Riwayat perubahan yang dilakukan admin

---

## 7. Spesifikasi Non-Fungsional

### 7.1 Performa

| Metrik                    | Target                          |
| ------------------------- | ------------------------------- |
| First Contentful Paint    | < 1.5 detik                     |
| Largest Contentful Paint  | < 2.5 detik                     |
| Time to Interactive       | < 3 detik                       |
| Lighthouse Performance    | ≥ 90                           |
| Page Size                 | < 3 MB (initial load)           |

### 7.2 Responsivitas

| Breakpoint     | Lebar          | Target Device           |
| -------------- | -------------- | ----------------------- |
| Mobile         | 320px - 767px  | Smartphone              |
| Tablet         | 768px - 1023px | Tablet                  |
| Desktop        | 1024px - 1440px| Laptop & Desktop        |
| Large Desktop  | > 1440px       | Monitor besar           |

### 7.3 Browser Support

- Chrome (2 versi terakhir)
- Firefox (2 versi terakhir)
- Safari (2 versi terakhir)
- Edge (2 versi terakhir)

### 7.4 SEO

- Semantic HTML5
- Proper heading hierarchy (H1 → H6)
- Alt text untuk semua gambar (editable dari admin)
- Sitemap XML (auto-generated)
- Robots.txt
- Open Graph meta tags
- Structured Data (JSON-LD) untuk Organization

### 7.5 Keamanan

- HTTPS wajib
- Sanitasi input pada semua form admin
- Rate limiting pada API
- Proteksi XSS & CSRF
- Password hashing (bcrypt / argon2)
- File upload validation (tipe & ukuran)

### 7.6 Aksesibilitas

- WCAG 2.1 Level AA compliance
- Keyboard navigation
- Screen reader friendly
- Kontras warna yang memadai
- Focus indicators

---

## 8. API Endpoints (Ringkasan)

### 8.1 Public API (Landing Page)

| Method | Endpoint                    | Deskripsi                        |
| ------ | --------------------------- | -------------------------------- |
| GET    | `/api/settings`             | Ambil pengaturan global          |
| GET    | `/api/hero`                 | Ambil data hero section          |
| GET    | `/api/about`                | Ambil data about section         |
| GET    | `/api/programs`             | Ambil daftar program pelatihan   |
| GET    | `/api/programs/:slug`       | Ambil detail program             |
| GET    | `/api/certifications`       | Ambil daftar sertifikasi         |
| GET    | `/api/certifications/:slug` | Ambil detail sertifikasi         |
| GET    | `/api/partnerships`         | Ambil daftar kemitraan           |
| GET    | `/api/events`               | Ambil daftar acara               |
| GET    | `/api/events/:slug`         | Ambil detail acara               |
| GET    | `/api/testimonials`         | Ambil daftar testimoni           |
| GET    | `/api/articles`             | Ambil daftar artikel             |
| GET    | `/api/articles/:slug`       | Ambil detail artikel             |
| GET    | `/api/navigation`           | Ambil data navigasi              |
| GET    | `/api/footer`               | Ambil data footer                |

### 8.2 Admin API (Authenticated)

| Method      | Endpoint                          | Deskripsi                        |
| ----------- | --------------------------------- | -------------------------------- |
| POST        | `/api/admin/auth/login`           | Login admin                      |
| POST        | `/api/admin/auth/logout`          | Logout admin                     |
| GET/PUT     | `/api/admin/settings`             | Kelola pengaturan global         |
| GET/PUT     | `/api/admin/hero`                 | Kelola hero section              |
| GET/PUT     | `/api/admin/about`                | Kelola about section             |
| CRUD        | `/api/admin/programs`             | Kelola program pelatihan         |
| CRUD        | `/api/admin/certifications`       | Kelola sertifikasi               |
| CRUD        | `/api/admin/partnerships`         | Kelola kemitraan                 |
| CRUD        | `/api/admin/partners`             | Kelola logo mitra                |
| CRUD        | `/api/admin/events`               | Kelola acara                     |
| CRUD        | `/api/admin/testimonials`         | Kelola testimoni                 |
| CRUD        | `/api/admin/articles`             | Kelola artikel                   |
| CRUD        | `/api/admin/article-categories`   | Kelola kategori artikel          |
| CRUD        | `/api/admin/users`                | Kelola user admin                |
| POST        | `/api/admin/media/upload`         | Upload media                     |
| GET/DELETE  | `/api/admin/media`                | Kelola media                     |
| PUT         | `/api/admin/sections/order`       | Ubah urutan section              |

> **Catatan:** CRUD = GET (list), GET/:id (detail), POST (create), PUT/:id (update), DELETE/:id (delete)

---

## 9. Milestone & Timeline (Estimasi)

| Fase                     | Durasi    | Deliverable                                        |
| ------------------------ | --------- | -------------------------------------------------- |
| **Fase 1: Setup**        | 1 minggu  | Inisialisasi project, setup DB, auth admin          |
| **Fase 2: Backend API**  | 2 minggu  | Semua API endpoint + CRUD admin                     |
| **Fase 3: Admin Panel**  | 2 minggu  | Dashboard CMS lengkap                               |
| **Fase 4: Landing Page** | 2 minggu  | Semua section landing page + responsive             |
| **Fase 5: Polish**       | 1 minggu  | Animasi, SEO, performa, testing                     |
| **Fase 6: Deployment**   | 0.5 minggu| Deploy ke production + konfigurasi                  |
| **Total Estimasi**       | **~8.5 minggu** |                                               |

---

## 10. Lampiran

### 10.1 Daftar Kategori Program

| Kode              | Nama                    |
| ----------------- | ----------------------- |
| `desain-grafis`   | Desain Grafis           |
| `digital-marketing` | Digital Marketing     |
| `iot`             | Internet of Things (IoT)|
| `coding-anak`     | Coding Anak Usia Dini   |

### 10.2 Referensi Desain

Desain landing page sebaiknya mengikuti prinsip:
- **Modern & clean** — Minimalis dengan white space yang cukup
- **Mobile-first** — Prioritas tampilan mobile
- **Fast loading** — Optimasi gambar dan lazy loading
- **Micro-animations** — Scroll animations, hover effects
- **Konsisten** — Warna, font, dan spacing konsisten

### 10.3 Glossary

| Istilah      | Definisi                                            |
| ------------ | --------------------------------------------------- |
| CMS          | Content Management System                           |
| CRUD         | Create, Read, Update, Delete                        |
| CTA          | Call to Action                                      |
| Rich Text    | Teks terformat (bold, italic, list, link, dll)      |
| Slug         | URL-friendly identifier yang di-generate dari judul |
| SSR/SSG      | Server Side Rendering / Static Site Generation      |
| SEO          | Search Engine Optimization                          |
| WYSIWYG      | What You See Is What You Get (editor visual)        |

---

> **Dokumen ini merupakan living document** yang akan diperbarui sesuai perkembangan project. Semua perubahan signifikan harus didiskusikan dan disetujui sebelum implementasi.
