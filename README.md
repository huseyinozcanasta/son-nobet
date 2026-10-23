# SON NÖBET v1.9 — Güncelleme merkezi, kayıt transferi ve mekanizma zincirleri

Android çevrimdışı dahiliye FBT RPG. **442 kaynak soru** / 443 sıra numarası. **261** el yazısı PDF görüntüsüyle karşılaştırıldı; **181** soru hâlâ özgün PDF denetimi bekliyor. Kaynak aktarımının eşleştirilmesi **tıbbi doğrulama değildir**.

## Yeni: Uygulama içi sürüm radarı
- **Sürüm Merkezi → Yeni sürüm kontrolü** GitHub Releases API üzerinden mevcut en yeni sürümün doğrulanmış APK URL'sini alır ve resmi GitHub indirme sayfasını Android tarayıcısında açar.
- İnternet gerektiren tek kısım sürüm sorgulaması ve dış referans bağlantılarıdır; FBT soruları ve mekanizma kartları **çevrimdışı** çalışır.
- Uygulama yeni APK'yı sessizce indirmez veya kurmaz. Kullanıcı GitHub indirme bağlantısını açar.
- Geçmiş debug APK'ları farklı **paket isimleri ve imza sertifikaları** taşır, otomatik üstüne yükseltme garanti edilmez; v1.9 `com.huseyin.sonnobet.audit9` önceki uygulamalardan bağımsızdır.

## Yeni: Soru ilerlemesini yedekle / içe aktar
- **Yedek Kodu**: cihaz içi soru notları, öz-değerlendirme kayıtları, XP ve mekanizma madalyaları JSON olarak kopyalanır.
- **Geri yükle**: kodu yeni uygulamanın Sürüm Merkezi'ne yapıştır, açık onayla yerel kayıtlar geri yüklenir.
- **Önemli sınır:** v1.8 ve önceki sürümlerde dışa aktarma olmadığından eski uygulamadan ilerlemeyi otomatik almak **mümkün değil**. Bu mekanizma v1.9 ve daha yeni uyumlu sürümlerde kullanılabilir. Kod gizli kişisel öğrenme verileri içerebilir; herkesle paylaşma.

## Yeni: 8 kaynaklı mekanizma haritası
Ayrıntıları dört adımda açılan, aktif hatırlama kontrolü içeren etkileşimli ders kartları:
- FBT #16: hipokalemi ve hiperkalsemi → gastrointestinal hipomotilite
- #131: SIAD ve hipotonik hiponatremi
- #151: hiperkalemi → kardiyak membran korunması, hücre içi kaydırma, eliminasyon
- #185: Cushing tarama → ACTH ayrımı
- #207: adrenal kriz tanı/tedavi mantığı
- #225: febril nötropenide seçici gram-pozitif antibiyotik kapsamı
- #234: miyelom CRAB organ hasarı
- #244: H. pylori direnç, tedavi seçimi ve eradikasyon kontrolü

İçerik kaynakları mekanizma panelinde bağlantılıdır. Tedavi algoritmaları aşırı basitleştirilmemiş ve gerçek klinik yönetim için amaçlanmamıştır. Diğer sorulara otomatik veya kanıtsız şemalar eklenmemiştir.

## Geliştirme kontrolü
- `test/audit-smoke.cjs`: eski 261 PDF eşleşmesi, 442 soru ve tekrar regresyonları
- `test/upgrade-smoke.cjs`: yeni mekanizma veri bütünlüğü, sürüm karşılaştırması, yedekleme ve güvenilmeyen APK URL kontrolü
- Android 12 emülatör APK kurulum/açılış, paket/sertifika doğrulama GitHub Actions tarafından gerçekleştirilir.

[GitHub Releases v1.9.0](https://github.com/huseyinozcanasta/son-nobet/releases/tag/v1.9.0)

**Sıradaki kaynak denetimi #246'dan sürer; tamamlanmamış 181 soruya görsel olarak bakıldı iddiasında bulunulmaz.**
