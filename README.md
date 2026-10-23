# SON NÖBET 1.1 — Kaynak doğrulama ve öğretici notlar

Dahiliye FBT'nin **443 numaralı dizini (442 özgün soru)**, aktif hatırlama, XP, tekrar ve FBT #016 oyununu içeren çevrimdışı Android uygulaması.

## 1.1 doğrulama kapsamı
- **FBT #1–21:** orijinal PDF'nin **2–6. sayfalarının** el yazısı görselleri, dijital aktarım ile karşılaştırıldı. Bu, klinik doğruluk onayı değil kaynak aktarım denetimidir.
- **FBT #22–443:** özgün PDF ile **henüz tek tek karşılaştırılmadı** (#358 kaynakta yok).
- Tüm sorularda eski özgün yanıt korunur; ilk 21 soruya ayrı öğretici açıklama/uyarı ve mevcut olduğu yerde Akdeniz Üniversitesi ders slaytları veya klinik kılavuz bağlantısı eklenmiştir.
- Önemli düzeltmeler: #10 DKA'da dehidratasyon olabilir, #15 RAAS blokerleri diüretik değildir, #18 Ranson ölçütü **BUN artışı >5 mg/dL**, #21 RRT için tek başına BUN/kreatinin eşiği yeterli değildir.
- Kullandığımız dersler: Akdeniz Üniversitesi Kardiyovasküler Sistem, Abdomen Muayenesi, Sjögren, Sıvı-Elektrolit, Hipertansiyon ve ABH. Gerektiğinde KDIGO, OHSU Ranson ve AHA/ACC bilgileri.
- 442 sorunun tamamının bilimsel doğrulaması yapıldı iddiasında bulunulmaz. 442 sorunun tamamına 8+ dakikalık ders de yazılmamıştır.

## Android
[GitHub Release v1.1.0](https://github.com/huseyinozcanasta/son-nobet/releases/tag/v1.1.0).
Paket: `com.huseyin.sonnobet.audit`; önceki 1.0 sürümünün yanına kurulur. **İlerleme otomatik aktarılmaz**. APK debug imzasıyla yayımlandığı için üstüne güncellemede kalıcı anahtar gerekir. Bağımsız ilk uygulama testleriyle yayınlanır.

CI: Node veri/güvenilirlik testi, APK paketi/imza/hizalama kontrolü, Android 12 emülatör kurulumu ve açılış testi.
Tıbbi eğitim amaçlıdır, gerçek hasta yönetiminde kullanılmaz.
