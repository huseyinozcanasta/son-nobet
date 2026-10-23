# SON NÖBET v1.2 — Bütün FBT sorularında kaynak bütünlüğü taraması

109 sayfalık özgün tarama ve 109 sayfalık DOCX aktarımındaki **442 gerçek FBT sorusu**, 1–443 arası tüm numaralarla birlikte erişilebilir. #358 kaynakta yoktur.

## Kaynak denetimi kapsamı
**Bütün 442 soru:** Özgün PDF sayfa numarası var mı ve kaynak cevap notu kesilmiş/şüpheli mi diye tarandı. 442/442 soru sayfa 2–108 arasında geçerli sayfalara eşleşiyor. 146 kayıtta `[?]`, 18 kayıtta `okunamadı`, 3 kayıtta `Kaynak notu kısaltıldı` var; #443 cevabına aktarım kalite raporu karışmıştı, ekranda cevap kısmından ayrıldı. Orijinal veri korunur.

**59 soru:** Orijinal taramanın 2–7, 12, 24, 53, 70, 88, 93 ve 107. sayfalarındaki soruların el yazısı görselleri manuel incelendi (FBT #1–21, #22–26, #43–49, #99–103, #214–218, #275–277, #342–345, #372–375, #436–440).

**383 soru:** Orijinal el yazısıyla tek tek görsel karşılaştırma hâlâ bekleniyor. Bu sorular "PDF karşılaştırması bekliyor" etiketi taşır. Başlı başına sayfa referansının doğru aralıkta olması görsel karşılaştırma demek değildir.

## Tıbbi düzeltmeler
- #43 ADA 2026 diabetes tanı ölçütleri **≥** eşikleri ve semptomlu rastgele PG ≥200 mg/dL.
- #101 standart Phalen bilek fleksiyonu, ekstansiyon reverse Phalen.
- #215 Whipple triadı sabit <50 mg/dL demek değildir.
- #276 SIAD tanısında hipotoni/övolemik bulgular ve alternatif nedenlerin dışlanması esastır.
- Önceki sürümdeki #10 (DKA dehidratasyonu), #15 (diüretik sınıflandırması), #18 (Ranson BUN artışı), #21 (renal replasman kararı) uyarıları korunur.

**Ders slaytları:** 30 kullanıcının Drive ders PDF'si metin üzerinden konu açısından tarandı. **100 soruda** güçlü ders *başlık* eşleşmesi bulundu ve "otomatik slayt önerisi — cevap doğrulaması değil" olarak gösterilir. Diğer sorulara alakasız slayt atanmamıştır. Derste öğrendiğin tedavi/ilaç ayrıntıları, güncel kılavuzlar ve hocanın sunumuyla ayrıca doğrulanmalıdır.

## Oyun
10 soruluk nöbet, cevabı gizleyerek önce kendi kendini sınama, 4 dereceli öz değerlendirme, XP/tekrar, filtreler ve FBT #016'nın üç uzun dersi sürüyor. Açıklama ve kaynak düzeltmesi **cevap gösterilmeden önce açılmaz**.

## Yükleme
[GitHub Releases v1.2.0](https://github.com/huseyinozcanasta/son-nobet/releases/tag/v1.2.0)

Yeni paket kimliği `com.huseyin.sonnobet.audit2` ile v1.0 ve v1.1'in yanına kurulur. **Eski ilerlemeyi otomatik aktarmıyor**. Debug APK için kalıcı yayın imzası ayrıca gereklidir.

Bu araç sözlü sınav hazırlığı içindir. 442 sorunun her birinin güncel klinik literatür doğrulamasından geçtiği iddia edilmez.
