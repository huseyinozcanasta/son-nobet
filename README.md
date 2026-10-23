# SON NÖBET — Dahiliye RPG (v0.2.0)

**Dahiliye FBT #016 soru odaklı, API'siz ve çevrimdışı Android çalışma oyunu.**

## v0.2 özellikler
- FBT #016 için her biri **en az 8 dakika** okumayı hedefleyen üç kaynaklı ders:
  - Potasyum Alarmı — **1.639 kelime** (yaklaşık 11 dk).
  - Kalsiyum Tuzağı — **1.566 kelime** (yaklaşık 11 dk).
  - Batın Nöbeti — **1.701 kelime** (yaklaşık 12 dk).
- Her ders **3 perde / klinik karar**: toplam 9 mini karşılaşma.
- 7 soruluk final boss (6/7 geçme), combo, can, XP, madalyalar, günlük vaka, sözlü prova.
- Okumayı gerçekten ölçtüğü iddia edilmez: **zorunlu bekleme sayacı yoktur**; mini sınavlarla aktif hatırlama ölçülür.
- Kullanıcının daha önceki FBT16 çalışma notlarından odaklı bölümler; daha fazla konu gerekmedikçe FBT dışına genişlemez.
- İnternet erişimi, Google giriş işlemi veya harici AI API anahtarı gerekmez. Kaydedilen bilgiler yalnız cihazdadır.
- #017 ve #018 sonraki içerik güncellemeleri için **kilitlidir**, henüz oynanamaz.

## Kurulum
[Releases → v0.2.0 APK](https://github.com/huseyinozcanasta/son-nobet/releases/tag/v0.2.0)

**Not:** Önceki GitHub CI sürümleri farklı geçici Android debug imzaları kullanır. Bu nedenle v0.2 için geçici Android paket adı `com.huseyin.sonnobet.beta` seçildi. v0.1 cihazda korunurken v0.2 yanına kurulabilir; ilerleme iki uygulama arasında otomatik aktarılmaz. Sonraki sürümlerde sabit güvenli bir uygulama imzalama sistemi kurmadan otomatik üstüne güncelleme garanti edilmez.

## Kaynak dosyaları
- `app/src/main/assets/index.html`: temel çevrimdışı HTML/CSS.
- `app/src/main/assets/content-v02.js`: üç ders, dokuz karşılaşma metni.
- `app/src/main/assets/game-v02.js`: RPG mekanikleri, aktif hatırlama, boss ve günlük görev.
- `app/src/main/java/com/huseyin/sonnobet/MainActivity.java`: native Android WebView kabuğu.
- `.github/workflows/android-apk.yml`: APK üretimi, paket doğrulaması ve Android 12 emülatör kurulum testi.

Android uygulaması klinik karar desteği veya hasta yönetimi aracı değildir.
