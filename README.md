Dibutuhkan sebuah API Notes

Kebutuhan
 - Mampu membuat notes baru - DONE
 - Mampu menampilkan semua notes - DONE
 - Mampu menampilkan salah satu notes - DONE
 - Mampu mengubah notes (judul, tanggal, dan catatan) - DONE
 - Mampu menghapus notes - DONE


Perhatian
 - Wajib dikerjakan
 - Wajib menggunakan database yang disediakan
 - Perintah SQL dilampirkan di bagian lampiran
 - Dilarang mengubah struktur table dan tipe data
 - Menggunakan file .env (Template di lampiran)
 - Wajib memiliki file .gitignore (Template di lampiran)
 - Link pengumpulan menyusul
 - Deadline Jumat, 31 Mei 2024 23:59

Lampiran 1. Template Database

CREATE DATABASE notes_db;
USE notes_db;
create table notes
(
    id       bigint auto_increment primary key,
    title    text     not null,
    datetime datetime not null,
    note     longtext not null
);

Hapus Auto Incremen & Mulai dari Nol :

TRUNCATE TABLE notes;

ALTER TABLE notes AUTO_INCREMENT = 1; -> Resiko Terduplikat

Lampiran 2. Template .env

APP_PORT=5000
HOST=localhost
USER=root
PASSWORD=
DATABASE=notes_db

Lampiran 3. Template .gitignore

node_modules/
.env