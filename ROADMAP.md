## v1.19 — Tüm kayıtlar için ölçülebilir kapsam

- [x] 442 kaynak kaydını hazırlık, kaynak denetimi ve kullanıcı öğrenmesi olarak ayrı izle.
- [x] Eksik #358 için soru veya macera uydurma; arama/filtre/paginasyon ve özgün FBT erişimi.
- [x] Gerçek kapsamı JSON ve Markdown olarak üret, CI ile kaynak kodla eşleştir.
- [ ] Kalan 436 soru için kaynak PDF içerikleri gerçekten okunarak uzun maceralar üret.

## 24 Ekim 2026 — v1.16 içerik derinliği paketi

- [x] #017 ve #018 için görev başına en az 4.906 kelime, ders başına en az 1.500 kelime.
- [x] Her görev için dört halkalı karar zinciri ve sözlü prova.
- [x] Mevcut #016 anlatımı ile 10 kaynak banka dosyasının değişmediğini SHA-256 ile kontrol et.
- [x] Bozuk görev kaydı, geçersiz seçenek, kilit ve tekrar XP kontrolleri.
- [x] Sürüm alanlarını tek manifestten türet, yayımlanmış APK üzerine yazmayı engelle.
- [x] v1.17: #019 ve #020 kardiyovasküler muayene maceraları.
- [x] v1.18: #021 akut böbrek hasarında diyaliz kararı.
- [ ] #022 ve sonraki 436 kaynak sorusuna aynı derinlikte özgün görevler (#016–021 tamamlandı).
- [ ] Eksik 120 özgün tarama görseliyle denetim; bu turda sayı artırılmadı.

# SON NÖBET — Kontrollü Gelişim Görevleri

**Durum (v1.14):** FBT'de 443 sıra numarası / 442 mevcut indeks (kaynakta #358 yok; #124 iki farklı alt soru içeriyor). Orijinal taranmış PDF görüntüsüyle karşılaştırılan **322**; bekleyen **120**. Görsel transkripsiyon kontrolü, tıbbi kanıta dayalı doğrulama **değildir**.

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

- [x] **Bölüm A:** FBT #246–274 (29 soru; v1.10; PDF s.61–69)
- [x] **Bölüm B:** FBT #278–309 (32 soru; v1.11; PDF s.71–78)
- [x] **Bölüm C — dijital kaynak eşlemesi:** FBT #310–341, 32/32 başlık ve DOCX kaynak sayfası eşleştirildi (78–87). **Özgün PDF görsel kontrolü tamamlanmadı; 322/442 sayacı DEĞİŞMEDİ.**
- [ ] **Bölüm C — özgün el yazısı görsel denetimi:** FBT #310–341 (32 soru; taramanın orijinal görüntüleri hâlâ bekleniyor)
- [x] **Bölüm D — dijital Word eşlemesi + 25 mekanizma:** FBT #346–357 ve #359–371 (25 soru; #358 kaynakta yok), Word sayfaları 89–92 eşleştirildi. Özgün tarama görsel denetimi **yapılmadı**, sayaç değişmedi.
- [ ] **Bölüm D — özgün el yazısı görsel denetimi:** #346–357 ve #359–371 (25 soru) özgün tarama ile karşılaştırılacak.
- [ ] **Bölüm E:** FBT #376–405 (30 soru)
- [ ] **Bölüm F:** FBT #406–435 (30 soru)
- [ ] **Bölüm G:** FBT #441–443 (3 soru)

**Toplam özgün el yazısı görsel denetimi kalan: 120 soru.** Önceden görsel denetimi yapılan #275–277, #342–345, #372–375 ve #436–440 bu tekrar listesine alınmaz.

## Mekanizma geliştirme

- [x] #16 hipokalemi/hiperkalsemi, #131 SIAD, #151 hiperkalemi, #185 Cushing, #207 adrenal kriz, #225 febril nötropeni, #234 miyelom ve #244 H. pylori.
- [x] v1.10: #246 malabsorbsiyon, #251 Rome IV İBS, #253 Crohn fistül, #254 toksik megakolon, #258 R oranı, #264 dekstrokardi, #267 anemi MCV, #273 senkop.
- [x] v1.11: #278 SVK, #281 FAP, #284 parasentez, #289 tiroid US, #290 asit/SAAG, #291 SBP, #301 K-EKG, #302 psödohiperkalemi, #306 AF-pulsus defisit.
- [x] v1.12: #311, #318, #319, #320, #330, #338, #340, #341 için 8 referanslı **ön mekanizma kartı**; bunların orijinal PDF görsel kontrolü bekliyor; toplam 33 kart.
- [x] **v1.13:** #310–341'in eksik 24 sorusuna referanslı dört aşamalı mekanizma/aktif hatırlama kartları eklendi; bu bölüme ait 32/32 kart, toplam **57/442** kart.
- [x] **v1.14:** Onkoloji ve acillerde 25 yeni mekanizma/aktif hatırlama görevi; **toplam 82/442** soru kartı. 
- [ ] Her yeni kaynak denetim paketinin sınav açısından yüksek getirili en az 5 sorusunda mekanizma şeması; tüm mevcut eski sorular için ayrıca kaynaklı kartlar.
- [ ] Neden → fizyoloji/patofizyoloji → klinik bulgu → ayırıcı tanı/sözlü anlatım zinciri; riskli konularda ilaç veya reçete talimatlarını kişisel klinik tavsiye gibi sunma.
- [ ] Kartlarda yanlış cevap tekrar döngüsü ve ertesi gün aralıklı tekrar entegrasyonu.
- [ ] v1.12 ön klinik referans kartları için **özgün 109 sayfa PDF s.78–87** ile tek tek eşleştirme; şüpheli veya eksik metinleri yeniden doğrulama ve gerçek görsel denetim tamamlanınca sayıyı yükseltme.
- [ ] Nihai kontrol: her **gerçek kaynak soru/alt soru** için ayrı şema var mı? Bilimsel referansı yoksa 'doğrulanmadı' statüsünde kalsın.

## Sınırlar
- Bu yol haritası otomatik arka plan geliştirmesi başlatmaz. GitHub'da her gerçek değişiklik test edilip yayımlanmalıdır.
- Kullanıcının eski v1.8 ve daha eski sürümlerindeki localStorage yeni paketler tarafından doğrudan okunamaz; gizli/yanıltıcı "otomatik taşıma" iddiası yapılmaz.
- Mekanizma notları sözlü sınav içindir, doğrudan hasta tedavisi/ilaç uygulama talimatı değildir.
