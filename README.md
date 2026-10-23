# SON NÖBET v1.4 — FBT özgün PDF karşılaştırması

**Durum:** 443 numaralı dizin; 442 özgün FBT sorusu (#358 kaynakta yok). **124 soru** özgün tarama görüntüleriyle karşılaştırıldı; **318 soru** hâlâ tek tek görsel denetim bekliyor. Bu sayılar metin aktarım kontrolünü ifade eder; 124 cevabın tamamının güncel tıbbi kılavuzla doğrulandığı anlamına gelmez.

## v1.4: #61–98 (38 yeni soru)
- Özgün PDF **15–23. sayfalar** elle görüntülenerek soru metni/numarası/cevapları dijital DOCX aktarımıyla karşılaştırıldı.
- Ayrı `audit-v14.js` katmanında kaynak notuna dokunmadan kısa öğretici özet, gerektiğinde kritik hata uyarısı ve uygun referanslar eklendi.
- Öncelikli düzeltmeler: #66 fetor hepaticus 'amonyak kokusu' basitleştirmesi; #68 stridorun üst hava yolu ilişkisi; #75 'PAC/PRA=10' sabit primer aldosteronizm tanı eşiği değil; #76 eski feokromositoma '%10' kuralı kalıtsal riskleri düşük gösterir; #81 'kretenizm' yerine konjenital hipotiroidi; #89 guatr tarihî evrelemesi; #94 sistemik skleroz 2013 ACR/EULAR; #96 akut gut IL-1 inhibitörleri birinci basamak değil; #97 Takayasu 1990/2022 ölçütleri ayrımı; #98 dev hücreli arterit 1990/2022 ölçütleri ayrımı.
- #61–98 için özgün PDF sayfaları 15–23 kapsamındadır. #62 sorusundaki hepatomegali listesi PDF 15 ve 16'ya taşmaktadır.

## Kaynak şeffaflığı
- Önceki incelemelerde #1–60, #99–103, #214–218, #275–277, #342–345, #372–375, #436–440 gibi seçili sorular incelenmişti; toplam görsel inceleme artık 124.
- Ders slaytı eşleştirmeleri konu başlığından otomatik önerilir; **tıbbi doğrulama sayılmaz**.
- Kaynak notu orijinal biçimde kalır; her düzeltme ayrı panelde gösterilir ve öğrenme amacıyla cevabı açana kadar gizlenir.
- Uyarı ve kaynak linkleri: Akdeniz Üniversitesi muayene/romatoloji/endokrin dersleri, 2025 Endocrine Society primer aldosteronizm, 2022 ACR/EULAR Takayasu ve dev hücreli arterit, 2013 sistemik skleroz, 2020 ACR gut ve PPGL genetik kaynakları.
- Aralıklı tekrar, 10 soruluk görev, XP ve FBT #016 üç uzun ders + dokuz RPG aşaması korunmuştur.

## APK
[Son Nöbet v1.4.0 indirme sayfası](https://github.com/huseyinozcanasta/son-nobet/releases/tag/v1.4.0)

GitHub Actions, Node içerik/regresyon testi + APK paket/imza doğrulaması + Android 12 emülatör kurulum/açılış testi sonrasında **deneme sürümünü** yayımlar. Yeni paket: `com.huseyin.sonnobet.audit4`. Eski sürümün yanına kurulur; ilerleme eski uygulamadan yeniye otomatik taşınmaz. Debug sürümlerinde sabit yayın sertifikası yoktur.

**Tıbbi tanı, reçete veya gerçek hasta yönetimi için kullanmayın.**
