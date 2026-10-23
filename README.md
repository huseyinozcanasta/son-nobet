# SON NÖBET v1.3 — FBT kaynak görüntüsü / klinik bilgi ayrımı

**Kapsam:** Orijinal FBT 1–443 soru indeksinin 442 gerçek kaydı; #358 özgün belgede yok.

## Kaynak inceleme ilerlemesi
- **442/442 kayıt:** dijital transkripsiyon üzerinden sayfa numarası, boş/kesilmiş cevap, metin kalite bayrakları ve arama/tekrar sistemi (bu klinik doğruluk anlamına gelmez).
- **86/442 soru:** özgün el yazısı PDF'nin **2–14, 24, 53, 70, 88, 93 ve 107. sayfalarının ilgili kısımları** görsel olarak karşılaştırıldı. İncelenen soru numaraları: **1–49, 50–60, 99–103, 214–218, 275–277, 342–345, 372–375, 436–440**; bu listedeki 27–42 ve 50–60 karşılaştırması v1.3'te eklendi. **Not: sayfa 8–11 ve 13–14 bu sürümde incelendi.**
- **356/442 soru:** özgün görseliyle henüz tek tek karşılaştırılmadı.
- Otomatik ders slaytı adayları kullanıcıya **öneri** olarak sunuluyor; önerilmesi bilimsel doğrulama değildir.
- Kaynak PDF metin katmanı bulunmayan el yazısı taramasıdır; el yazısı yorumlama belirsizlikleri olabilir.

## v1.3 düzeltme örnekleri
- #27: Gowers manevrası anlatımı özgün cevapta bulunmuyor.
- #28: Heliotrop döküntü tipik olarak morumsu; kaynakta renk ifadesi yanıltıcı.
- #30: Eski SLE listesi ile 2019 EULAR/ACR ANA giriş koşulu/puanlı sınıflandırma farklı.
- #32: Febril nötropenide **ANC** ve 38,0°C'nin 1 saat sürmesi koşulu unutulmamalı.
- #38: ADPKD karaciğer kisti doğrudan siroza götürür sonucu hatalı genelleme.
- #42: Homans belirtisi tek başına DVT tanısı koydurmaz.
- #50: Kussmaul solunumu daha çok metabolik asidozla ilişkilidir; KBH/KY özgül bulgusu değildir.
- #54: Sadece CRP >3 mg/dL ile pnömoni tanısı koyulmaz.
- #55: Kronik adrenal yetmezlikte '3 gün 3x steroid' her hastaya uygulanacak sabit tedavi değildir.

**Tıbbi güvenlik:** Özellikle ilaç, doz, laboratuvar eşikleri ve eski sınıflandırmalar hasta yönetiminde kullanılmamalıdır. Kaynak aktarımının görsel onayı **klinik kanıt düzeyi veya rehber doğrulaması değildir**. Notların kendisi orijinal biçimiyle kalır; editoryal düzeltmeler ayrı panelde görünür.

## Uygulama
- Arama, kategori filtreleme, 10 soruluk sözlü nöbet, kaynak cevabını açıp kendini değerlendirme, XP, aralıklı tekrar.
- FBT #016 için 3 uzun ders + 9 oyun aşaması.
- Kullanılan dosyalar: `app/src/main/assets/audit-v11.js`, `audit-v12.js`, `audit-v13.js`, `slide-candidates-v12.js`.
- Android 12 emülatörü kurulum/açılış testi ve Node içerik/regresyon testleri GitHub Actions ile zorunlu.

**APK:** https://github.com/huseyinozcanasta/son-nobet/releases/tag/v1.3.0

Yeni paket `com.huseyin.sonnobet.audit3`, 1.2 uygulamasının yanına kurulur; önceki yerel ilerleme otomatik kopyalanmaz. Debug APK imzası üretim için sabit bir anahtar değildir.

Yalnızca tıp eğitimi içindir.
