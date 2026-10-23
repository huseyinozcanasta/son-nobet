# SON NÖBET v1.5.0 — FBT #104–143 kaynak denetimi

Dahiliye FBT'nin 1–443 numaralı soru haritası; **442 özgün numaralandırılmış kayıt** (#358 belgede yok). Orijinal PDF 28. sayfada **iki ayrı 124 numaralı soru** içerir; bunlardan ikincisi uygulamada #124'ün ayrı alt sorusu olarak saklanır. Bu nedenle kayıt ve gerçek soru başlığı sayıları aynı olmayabilir.

## Denetim kapsamı
- **164/442 numaralandırılmış kayıt** orijinal el yazısı PDF görüntüsüyle tek tek karşılaştırılmıştır (önceki 124 + bu sürümde 104–143 arası 40).
- **278 kayıt** orijinal PDF'ye karşı manuel görsel denetim bekler.
- **Bu sürümün incelenen PDF sayfaları: 25–33**.
- Dijital aktarım aslı değiştirilmemiştir. Soru notları ile düzeltilmiş/öğretici açıklamalar ayrı görünür; düzeltme notları cevabı açmadan gösterilmez.
- Kaynaklarda Akdeniz Üniversitesi Romatoid Artrit, Sjögren, Hipertansiyon, ABH, KBH ve Elektrolit dersleri ile 2016 Sjögren ACR/EULAR, 2024 ESC hipertansiyon, KDIGO, Behçet ve septik artrit yayınları ilgili olduğu yerde kullanılmıştır. Bağımsız klinik doğrulama yapılmayan sorular tıbben onaylanmış sayılmaz.
- Yeni kritik uyarılar: #105 genital/oral her ülser aft değildir; #118 eroziv artrit yalnız RA değildir; #120 Schirmer ≤5 mm/5 dk yalnız 1 puandır; #121 entezit her zaman kalsifikasyon değildir; #122 anti-SSA ve anti-SSB sınıflandırmada eşdeğer değildir; #123 'Reiter' eski addır; #124 iki ayrı alt soru ve septik artritin klinik aciliyeti; #128 eski Behçet kriterleri; #130 proteinüri >500 mg zorunlu değil; #131 SIAD tanısında <275 mOsm/kg; #136 Türkiye tuz oranları tarihî bilgi; #138 tüm KBH hastalarına üçlü ilk ilaç tedavisi verilmez; #139 afebril nötropenik sepsis; #143 KDIGO ABH tanımı.

## Oyunda değişmeyenler
- 442 FBT kaynak kartı, 10 soruluk nöbet, dört öz değerlendirme seçeneği, XP, tekrar aralıkları.
- FBT 16'ya ait üç yaklaşık 11–12 dakikalık ders ve RPG görevleri.
- Haricî API anahtarı veya çalışma sırasında internet gerekmez (haricî kaynak bağlantısı açmak internet gerektirir).

## Android
[GitHub Release v1.5.0](https://github.com/huseyinozcanasta/son-nobet/releases/tag/v1.5.0).
Android paket adı: `com.huseyin.sonnobet.audit5`. Önceki sürümlerin yanına kurulur, onların ilerlemesini otomatik taşımaz. GitHub CI'da APK imza, kaynak/regresyon ve Android 12 emülatör kurulum/açılış testleri uygulanır.

**Tıbbi uyarı:** PDF'nin görsel olarak eşleştirilmesi, sorudaki bütün tıbbi önermelerin güncel kılavuz doğrulamasından geçtiği anlamına gelmez. Eğitim amaçlıdır; hasta yönetiminde kullanılamaz.
