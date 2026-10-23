# SON NÖBET v1.7 — 234 FBT kaydı için orijinal kaynak denetimi

Sözlü hazırlığı için kaynak: taranmış 109 sayfalık özgün FBT PDF ve onun DOCX dijital aktarımı. **443 sıra numarası, 442 kayıt**; #358 kaynakta yok; #124'te kaynak üzerinde iki aynı sıra numaralı alt soru bulunuyor.

## Denetim ilerlemesi
- **234/442** soru özgün el yazısı PDF'nin ilgili sayfalarıyla manuel görsel karşılaştırıldı.
- **208** soru için görsel kontrol henüz tamamlanmadı. Bu, daha önceki v1.6 aşamasına eklenen **#178–213 arasındaki 36 soru** anlamına gelir.
- Yeni görsel kaynak: PDF **44–52. sayfalar**. Cushing/endokrin testlerinin görsel notlarında tarihsel/etkinlik dışı kesin sayılar görüldü; orijinal metin silinmedi.
- **Kaynak karşılaştırması ile bilimsel doğrulama farklı şeylerdir.** 'PDF görüldü' etiketi orijinal sorunun görüntüsünü kontrol ettiğimizi ifade eder; bütün tıbbi ifadelerin güncel kılavuzlarda kesin doğrulandığını değil.
- Uygulama orijinal notu ancak cevap açıldıktan sonra, ve ayrıca 'öğretici açıklama', 'kaynak uyarısı' ve uygun referansları gösterir.

## Bu sürümün önemli açıklamaları
- **#185–186:** Cushing taramasında 1 mg DST, geç gece tükürük ve 24 saat idrar kortizolü; kaynakta yer alan '2/3 tanı' ve tek ACTH >500 ektopik lokasyon ezberleri yanlıştır. Endocrine Society.
- **#187–189:** Tip 1 DM otoantikorları, açlık glukozu tanı eşiği, MODY'nin aile/genetik ipuçları; kaynakta 'MODY hep 25 yaş altı' sınırlaması hatalı olabilir.
- **#191:** Hipoglisemide <70 mg/dL alarm, <54 mg/dL klinik anlamlı seviye; bilinci kapalı hastaya ağızdan glukoz verilmez.
- **#198–202:** VKİ alt normal sınırı 18,5; Charcot ayağında nöropatiyle travma; diyabetik ayak Wagner 0–5 ve ABI'nin DM'de yalancı yüksek ölçülebilmesi.
- **#205–207:** Adrenal yetmezlik testlerinde ölçüm yöntemine göre eşik değişir; **adrenal krizde sonuç bekleyerek tedavi geciktirilmez**; 100 mg IV/IM hidrokortizon, sonra 200 mg/24 saat ve izotonik sıvı, profesyonel acil tedavi gerektirir.
- **#211:** Primer hiperparatiroidide 2022 Fifth Workshop cerrahi ölçütleri: Ca ULN +1 mg/dL, eGFR <60, taş/kırık, T skoru ≤−2,5, yaş <50 vb.
- **#212:** Hirsutizm notundaki '17-OHP 2–10 mg/dL' birimi klinik testlerin tipik ng/dL/ng/mL birimleriyle karışmış görünüyor; not aynen saklanmış, uyarı eklenmiştir.

## İçerik ve APK
- Bütün 442 kaynak sorusu, 10 soruluk oyun, öz değerlendirme, tekrar planı, XP, FBT #16 üç ayrıntılı ders korunuyor.
- Yeni dosya: `app/src/main/assets/audit-v17.js`.
- Android paket adı `com.huseyin.sonnobet.audit7` eski sürümlerden farklıdır; ilerleme **otomatik taşınmaz**.
- Android 12 emülatör kurulum/açılış testi, Node regresyon testi ve APK imza/hizalama denetimi GitHub Actions üzerinden yapılır.
- [GitHub v1.7.0 sürümü](https://github.com/huseyinozcanasta/son-nobet/releases/tag/v1.7.0)

Yalnız tıp eğitimi için; hasta yönetimi veya reçete yazımı için kullanılmamalıdır.
