# SON NÖBET — Kontrollü Gelişim Görevleri

**Durum (v1.9):** FBT'de 443 sıra numarası / 442 mevcut indeks (kaynakta #358 yok; #124 iki farklı alt soru içeriyor). Orijinal taranmış PDF görüntüsüyle karşılaştırılan **261**; bekleyen **181**. Görsel transkripsiyon kontrolü, tıbbi kanıta dayalı doğrulama **değildir**.

## Birim görev / kabul kriteri

Her yeni FBT soru paketi için:
- [ ] Orijinal el yazısı PDF'nin soru sayfalarını görsel olarak incele (numara, metin, cevap, sayfa bölünmesi).
- [ ] 109 sayfalık dijital aktarımla **ayrı ayrı** eşleştir; eksik/tekrarlanan/kesilmiş notları işaretle.
- [ ] Kaynaktaki ifade ile *klinik açıklama/düzeltmeyi* ayrı tut; güncel kılavuz varsa bağlantısını ekle; yoksa doğrulanmış gibi gösterme.
- [ ] Her yeni cevap için kaynak belirsizliği ve hasta güvenliği risklerini gözden geçir (ilaç/doz/tanı eşiği/tedavi).
- [ ] Veritabanında görsel kontrol sayısı ve kalan soru sayısını programatik denetle.
- [ ] Her yeni mekanizma kartında **en az 4 doğrulanmış akış düğümü**, somut hafıza ipucu, son aktif hatırlama sorusu ve kaynak göster.
- [ ] Eski kartları, önceki XP'leri ve ilerleme kayıtlarını koru; yedek alma/geri yükleme testini geç.
- [ ] Node/Javascript regresyon testi + APK imza/bütünlük + Android 12 emülatör kurulum/açılış.
- [ ] Başarısız CI için GitHub Release oluşturma, başarıyı cihaz testinden fazla iddia etme.

## Uygulama ve kalıcı altyapı

- [x] **v1.9:** Uygulama içi sürüm radarının resmi GitHub Releases API ve indirme bağlantılarıyla çalışması.
- [x] **v1.9:** Manuel çalışma ilerlemesi yedeği/geri yükleme; yalnız v1.9 ve daha yeni uyumlu sürümler desteklenir.
- [x] **v1.9:** 8 temel klinik mekanizma şeması ve aktif hatırlama.
- [ ] Sabit **özel/korumalı üretim imza anahtarı**: release anahtarını açık depoya yüklemeden GitHub Secrets tabanlı CI imzası. Mevcut farklı debug imzaları üstüne kurulum sağlayamaz.
- [ ] Aynı Android applicationId ile güvenli sürüm yükseltme, regresyon/rollback.
- [ ] Android'de dosya olarak yedek dışa/içe alma (şu anda elle JSON yedek kodu).

## Kalan görsel kaynak denetimi: sıralı görevler

- [ ] **Bölüm A:** FBT #246–274 (29 soru)
- [ ] **Bölüm B:** FBT #278–309 (32 soru)
- [ ] **Bölüm C:** FBT #310–341 (32 soru)
- [ ] **Bölüm D:** FBT #346–357 ve #359–371 (25 soru; #358 yok)
- [ ] **Bölüm E:** FBT #376–405 (30 soru)
- [ ] **Bölüm F:** FBT #406–435 (30 soru)
- [ ] **Bölüm G:** FBT #441–443 (3 soru)

**Toplam kalan: 181 soru.** Önceden görsel denetimi yapılan #275–277, #342–345, #372–375 ve #436–440 bu tekrar listesine alınmaz.

## Mekanizma geliştirme

- [x] #16 hipokalemi/hiperkalsemi, #131 SIAD, #151 hiperkalemi, #185 Cushing, #207 adrenal kriz, #225 febril nötropeni, #234 miyelom ve #244 H. pylori.
- [ ] Her yeni kaynak denetim paketinin sınav açısından yüksek getirili en az 5 sorusunda mekanizma şeması; tüm mevcut eski sorular için ayrıca kaynaklı kartlar.
- [ ] Neden → fizyoloji/patofizyoloji → klinik bulgu → ayırıcı tanı/sözlü anlatım zinciri; riskli konularda ilaç veya reçete talimatlarını kişisel klinik tavsiye gibi sunma.
- [ ] Kartlarda yanlış cevap tekrar döngüsü ve ertesi gün aralıklı tekrar entegrasyonu.
- [ ] Nihai kontrol: her **gerçek kaynak soru/alt soru** için ayrı şema var mı? Bilimsel referansı yoksa 'doğrulanmadı' statüsünde kalsın.

## Sınırlar
- Bu yol haritası otomatik arka plan geliştirmesi başlatmaz. GitHub'da her gerçek değişiklik test edilip yayımlanmalıdır.
- Kullanıcının eski v1.8 ve daha eski sürümlerindeki localStorage yeni paketler tarafından doğrudan okunamaz; gizli/yanıltıcı "otomatik taşıma" iddiası yapılmaz.
- Mekanizma notları sözlü sınav içindir, doğrudan hasta tedavisi/ilaç uygulama talimatı değildir.
