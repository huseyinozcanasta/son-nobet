# SON NÖBET v1.10.0 — 290 el yazısı denetimi + 16 mekanizma kartı

FBT'nin 443 sıra numaralı, 442 mevcut soru kaydı (#358 kaynakta yok); #124'te kaynakta iki aynı numaralı soru vardır.

## Denetim görev A: #246–274 — TAMAMLANDI
- PDF **61–69. sayfalar** özgün görüntüler olarak tek tek açıldı, mevcut dijital bankanın soruları, cevapları ve sayfa geçişleriyle karşılaştırıldı.
- **Yeni 29 kayıt** eklendi: toplam **290 / 442 (%65,6)** görsel kaynak incelemesi; **152 kayıt** hâlâ bekliyor.
- Özgün not ve daha güncel/klinik kaynak açıklamaları iki ayrı paneldir. PDF'de görsel olarak eşlenmiş olmak tüm tıbbi ifadelerin klinik yönerge düzeyinde doğrulanmış olduğu anlamına gelmez.
- Özellikle **#253** perianal fistül/apse daha çok Crohn, ÜK için tipik değil; **#258** ALT ve ALP'yi ULN ile normalize ederek R oranı hesabı, eski mutlak transaminaz eşikleri yanıltıcı; **#262** PSC hem intrahem de ekstrahepatik safra yollarını tutar; **#264** dekstrokardi yalnız sağ elektrik aksı demek değildir; **#269** lenfoid neoplazi cevabı özgün kaynakta kesilmiş/eksik; **#273** senkop ilk değerlendirmede ortostatik KB, EKG, öykü gerekir.
- Kaynaklar: Rome Foundation Rome IV, NIH Toxic Megacolon, AASLD karaciğer testleri/PSC, Crohn's & Colitis Foundation, NCBI Dextrocardia, ESC hipertansiyon ve senkop. Her düzeltmenin ilgili kaynak bağlantısı karttadır.

## Yeni 8 hafıza şeması — toplam 16
- Yeni: **#246** malabsorbsiyon bulgularının eksiklik mekanizması; **#251** Rome IV İBS; **#253** ÜK/Crohn duvar derinliği ve fistül; **#254** toksik megakolon Jalan kriterleri; **#258** karaciğer enzim R oranı; **#264** dekstrokardi anatomisi; **#267** anemi MCV→retikülosit yolu; **#273** senkop değerlendirme algoritması.
- Önceki sekiz mekanizma, bütün soruların arşivi ve kayıtlar korunur. Her şema dört açılır basamak + klinik hafıza ipucu + test içerir. **Geri kalan sorular için otomatik/genel geçer şema uydurulmamıştır.**
- Mekanizma madalyalarının `son-nobet-mechanisms-v1` anahtarında tutulması sürüm 1.9'dan aktarılan yedeklerle uyumludur.

## Android ve yeni sürüm aktarımı
- Uygulama içindeki **Sürüm Merkezi** GitHub Releases üzerinde gerçek bir APK bağlantısını kontrol eder; APK Android tarayıcısında indirilir (uygulama sessiz kurulum yapmaz).
- v1.9'dan *Sürüm Merkezi → Yedek kodunu oluştur/kopyala*, v1.10'dan *geri yükle*. v1.8 ve eski sürümlerde yedekleme yoktu; geriye dönük otomatik veri aktarımı yapılamaz.
- Android paket: `com.huseyin.sonnobet.audit10`. Eski debug uygulamaların farklı paket/sertifikalı olması nedeniyle ayrı kurulur.
- İçerik/regresyon, mekanizma ve backup, imza/bütünlük, Android 12 emülatör kurulum/açılış testleri zorunlu.
- [GitHub v1.10.0 APK ve sürüm notları](https://github.com/huseyinozcanasta/son-nobet/releases/tag/v1.10.0).
- [Tüm kalan görevler](ROADMAP.md): sıradaki kaynak denetimi **#278–309**.

Eğitim içindir. Gerçek hasta yönetimi ve reçete için kullanılmaz.
