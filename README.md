# Jaxongir English Games (AT with Jaxongir)

Mobile-first, oflayn ishlaydigan, o'rnatish mumkin bo'lgan Progressive Web App (PWA) — ingliz tili so'z boyligi va grammatika o'yinlari to'plami.

## 🌟 Umumiy ko'rinish va o'yinlar ro'yxati

Ilova 7 ta mustaqil moduldan iborat bo'lib, jami **2574 ta so'z va gap**ni o'z ichiga oladi:

| № | O'yin nomi | Yozuvlar | Bo'limlar | Tavsif & Manba | localStorage kaliti |
|---|---|---|---|---|---|
| 1 | **Navigate C1 — So'z boyligi** | 865 | 12 (Unit 1–12) | Oxford Navigate C1 Coursebook. O'qituvchi tasdiqlagan aniq tarjimalar. | `navigateC1FlashcardsData_v2` |
| 2 | **Navigate B2 — So'z boyligi** | 867 | 12 (Unit 1–12) | Oxford Navigate B2 Coursebook to'liq lug'ati. | `navigateB2FlashcardsData_v1` |
| 3 | **7+ 8+ Vocabulary** | 440 | 22 (Topic 1–23, T12 yo'q) | IELTS 7.5+ darajali akademik mavzular bo'yicha saralangan lug'at. | `vocab78TopicsData_v1` |
| 4 | **Listening Map Vocabulary** | 100 | 10 (Topic 1–10) | IELTS / Multi-level Listening xarita (map) topshirig'i lug'ati. | `listeningMapVocabData_v1` |
| 5 | **100 ta "oltin" sinonim** | 100 | 4 (Qism 1–4) | B1 oddiy so'zlar → C1 akademik sinonimlar. | `synonyms100Data_v1` |
| 6 | **Gerund & To-infinitive (kartochka)** | 101 | 2 (Gerund: 46, To inf: 55) | Fe'llar va orqa tomonda misol gaplar. | `gerundInfinitiveData_v1` |
| 7 | **Gerund & To-infinitive (yozish)** | 101 | 2 (Gerund: 46, To inf: 55) | 3 xil yozma mashq: Bo'shliqni to'ldirish, gapni yozish, ko'chirib yozish. | `gerundInfinitiveTypingProgress_v1` |

---

## 🎨 Global Dizayn Tizimi (Retro Paper Aesthetic)

- **Asosiy shrift (Base Font):** Serif stack (`"Iowan Old Style"`, `"Palatino Linotype"`, `Georgia`, `serif`).
- **Hisoblagich va yorliqlar (Monospace):** `Menlo`, `"Courier New"`, `monospace`.
- **Kartalar (Cards):** `1.5px solid #1c2b2a`, `border-radius: 6px`, qattiq 4–5px siljigan soya (`box-shadow: 4px 4px 0px #1c2b2a`).
- **Ranglar palitrasi:**
  * **Ink (Matn/Chegara):** `#1c2b2a`
  * **Paper (Fon):** `#f6f1e4`
  * **Paper 2 (Formalar, chip foni):** `#efe6d0`
  * **Line (Yupqa chiziqlar):** `#c9bd9c`
  * **Teal (Asosiy tugma/Faol chip):** `#28524c`
  * **Teal Dark (Sarlavha/Yorliqlar):** `#173330`
  * **Clay (Faol tab / "Bilmadim" tugmasi):** `#b5502f`
  * **Gold (Tanlangan plitka / Yo'nalish):** `#c79a3d`
  * **Success / Danger:** `#2f7a4f` / `#b5402f`

---

## ⚙️ Arxitektura va Funksionallik

### 1. Umumiy Game Engine (1–6-o'yinlar)
Barcha 1–6-o'yinlar yagona `FlashcardGameEngine` orqali ishlaydi va konfiguratsiya obyekti bilan sozlanadi:
- **Header:** Sarlavha, so'zlar hisoblagichi ("N ta so'z"), tarjima yo'nalishi tugmasi (`EN → UZ` ↔ `UZ → EN`, 5-o'yinda `B1 → C1` ↔ `C1 → B1`).
- **Dinamik Bo'lim Chiplari:** "Barchasi" + ko'p tanlovli chiplar (U1...U12, T1...T23, Q1...Q4).
- **6 ta Interaktiv Rejim:**
  1. **Kartochkalar (Flashcards):** 0.45s 3D burilish animatsiyasi. Oldi: savol, bo'lim yorlig'i, talaffuz tugmasi; Orqasi: tarjima + misol gap/izoh (`tr`). Tugmalar: "Bilmadim", "← Oldingi", "Keyingi →", "Bilaman ✓".
  2. **Moslashtirish (Matching):** 12 ta plitka (6 ta juftlik). To'g'ri juftlik yashil bo'lib o'chadi, noto'g'ri juftlik 0.55s qizil ko'rinib qaytadi.
  3. **Tezkor test (Speed Quiz):** 15 ta savol, har biriga 20 soniyalik teskari hisoblagich, 1 ta to'g'ri va 3 ta tasodifiy noto'g'ri variant.
  4. **Yozib mashq (Typing):** 20 ta savol. Normalizatsiya qilingan qat'iy tekshiruv (kichik harflar, barcha apostroflar birlashtirilgan, tinish belgilari tozalangan). Vergul bilan ajratilgan istalgan variant to'g'ri qabul qilinadi.
  5. **Ro'yxat (Word List):** Real vaqtda inglizcha va o'zbekcha qidiruv, joriy faol bo'limdagi so'zlar jadvali va talaffuzni tinglash imkoniyati.
  6. **Tahrirlash (Management Dashboard):** Yangi so'z qo'shish (yangi bo'lim qo'shilsa chip avtomatik paydo bo'ladi), har bir qatorda matnlarni to'g'ridan-to'g'ri tahrirlash (darhol localStorage'ga yoziladi), o'chirish va "Asl holatiga qaytarish" (reset to original) funksiyasi.

### 2. Maxsus Modul: 7-o'yin (Gerund & To-Infinitive Typing)
- Ikki alohida qism: "Gerund (-ing)" (46 gap) va "To infinitive" (55 gap). "Barchasi" varianti yo'q.
- **1-rejim (Bo'shliqni to'ldiring):** Gapdagi bo'sh o'ringa to'g'ri fe'l shaklini yozish. Aqlli ogohlantirishlar: To-infinitive'da "to" unutilsa `"'to' ni unutdingiz!"`, Gerundda "to" yozilsa `"Bu yerda gerund (-ing) kerak"`. Britaniya/Amerika imlosi (*recognise* / *recognize*) birdek qabul qilinadi.
- **2-rejim (Gapni yozing):** O'zbekcha tarjimasi ko'rsatiladi, foydalanuvchi inglizcha gapni to'liq yozadi. "Maslahat" tugmasi birinchi harflar shablonini ko'rsatadi (`H_ a______ ...`).
- **3-rejim (Ko'chirib yozing):** Gapning maqsadli fe'li sariq bilan belgilanadi. Klaviatura orqali har bir belgi real vaqtda tekshiriladi (to'g'ri: yashil, xato: qizil).
- **Sessiya Yakuni:** To'liq hisobot, foiz ko'rsatkichi, xato qilingan gaplar ro'yxati va "Xatolarni qayta ishlash" (faqat xatolardan iborat yangi sessiya) tugmasi.

---

## 🚀 Loyihani ishga tushirish

### Ishlab chiqish rejimida ishga tushirish (Development):
```bash
npm run dev
```

### Ishlab chiqarish uchun yig'ish (Production Build):
```bash
npm run build
```
Natija `dist/` papkasida hosil bo'ladi va Vercel, Netlify yoki istalgan statik hostingga to'g'ridan-to'g'ri yuklanishi mumkin.

---

## 📱 Oflayn Rejim va PWA
Ilova `service-worker.js` va `manifest.webmanifest` orqali to'liq oflayn ishlaydi. Birinchi ochilishdan so'ng internet yo'q bo'lsa ham barcha 7 ta o'yin to'liq tezlikda ishlayveradi. Smartfon va kompyuterlarga ilova sifatida o'rnatish (PWA install) mumkin.
