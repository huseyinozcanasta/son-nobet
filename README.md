# SON NÖBET v1.15 — FBT #017 ve #018 için yeni klinik RPG görevleri (ilk içerik paketi)

**Durum:** FBT #016 uzun macerası korundu; iki yeni soru için **3'er ders / 9'ar klinik karşılaşma / 7'şer boss sorusu** kaynaklı, çevrimdışı yeni oyun motoruna eklendi. Her yeni görevin ilk metni yaklaşık **1.405 kelime**; bu bir **pilot**, #016'nın 4.906 kelimelik derinliğine henüz eşit değildir. Oyun yapısı ortak, içeriklerin genişletilmesi açıktır.

- **#017 Dirençli hipertansiyon:** Kaynak Akdeniz Üniversitesi Dr. Funda Sarı'nın *Hipertansiyon Tanı ve Tedavisi* dersi; ESC 2024 / AHA 2025 bağlamı. Üçlü rejim, ofis dışı ölçüm, yalancı direnç, sekonder neden, hedef organ hasarı, tedavi güvenliği.
- **#018 Akut pankreatit / Ranson:** Kaynak Dr. Bülent Yıldırım'ın *Akut Pankreatit* dersi, OHSU Ranson tablosu ve ACG 2024. **BUN >5 mg/dL ifadesi mutlak düzey değildir; 48 saat içinde >5 mg/dL artış** şeklinde öğretilir. Geleneksel slayt yaklaşımı ile güncel kılavuz ayrılır.
- **Kaynak bağlantıları:** GitHub'daki `content-v115.js` içinde 2 sorunun her biri için PDF ve klinik referanslar yer alır. Kullanıcı kaynakların paylaşılmasına izin verdi; içerik yazarların slaytlarından kopyalanmamış, özgün açıklamalarla düzenlenmiştir.
- **Kaydetme:** Yeni görevler `son-nobet-v1` kaydında `quests115` alanında saklanır; var olan Sürüm Merkezi'nin yedek/geri yükleme akışına dahildir. Önceki FBT #016 XP ve 442 soru verisi korunur. v1.14 ve v1.15 uygulama kimlikleri ayrı olduğu için eski uygulamadan yedek kopyalanıp yeni sürüme yüklenmesi gerekir.
- **Korunan durum:** 442 kaynak sorusu / #358 eksik; 82 mekanizma kartı; 322/442 özgün PDF görüntü denetimi. Yeni görev hazırlamak bu denetim sayısını artırmaz.
- **Test:** `node test/quest115-smoke.cjs` ile aşama kilitleri, yanlış kararlar, bir kere XP verme, 7 soru boss, görev bazında ayrı ilerleme ve mevcut yedek biçimi sınanır; CI Android 12 emülatörü ve APK bütünlük testleri sürdürülür.

## Geliştirme sıradaki işleri

- [ ] #017 ve #018 derslerini #016'nın 8+ dakikalık **ders başına** anlatım standardına yükselt.
- [ ] Kullanıcının sağladığı 114 PDF ile diğer FBT sorularını sistematik eşleştir; kaynak içeriklerini konu başlığı ve ilgili slayt düzeyinde gerçekten kontrol et.
- [ ] Klinik tutarlılık/dönemsel kılavuz uyarılarını genişlet; sözlü anısı görevleri ekle.
- [ ] Sabit imza ve cihazlar arasında güvenli güncelleme/ilerleme aktarımı.

---

# SON NÖBET v1.14 — 82 mekanizma haritası, 322/442 özgün PDF görsel denetimi

**Durum:** 442 mevcut FBT kaynak sorusu / 443 sıra numarası (#358 eksik; #124 iki alt soru içerir). El yazısı 109 sayfalık PDF ile **322/442** kaydın görsel karşılaştırması tamamlandı; **120** kayıt bekliyor. Bu sayılar v1.11'den beri **değişmedi**.

## v1.14: Onkoloji paketi (#346–357, #359–371; 25 soru)

- **25 yeni aktif-hatırlama mekanizma kartı** eklendi: kemoterapi toksisiteleri (mukozit, diyare, kardiyovasküler, renal, nörolojik), febril nötropeni, MASCC, G-CSF, metastatik hormon tedavisi, epidemiyoloji/tarama, antineoplastik sınıfları, palyatif ağrı, hedef mutasyonlar, metastatik spinal kord basısı ve SVK sendromu.
- **Toplam 82/442 kart.** 25 yeni kaynak sayfa eşleşmesi `FBT_DOCX_CROSSCHECK_114` içinde ayrı işlendi; v1.13'teki 32 ile **57 sayfa/başlık eşlemesi** var.
- Kaynak `Dahiliye_Birlesik_Sayfa_001-109.docx`, dijital yeniden aktarım olup özgün el yazısı taraması **değildir**. Bu nedenle özgün el yazısı görüntüsü denetimi halen **322/442** ve **120 bekleyen**. **#358 belge/oyunda eksik** olduğu için kart uydurulmadı.
- Önemli klinik düzeltmeler: #352 CIPN ile el-ayak sendromu ayrımı, #355 seçilmiş düşük riskli FN ayaktan tedavide tek florokinolon yerine kılavuz bazlı kombinasyon, #356 ASCO 2026 G-CSF primer profilaksi ≥yaklaşık %20, #361 FIT/kolonoskopi ve geçerli meme taraması, #368 tüm hedef mutasyonlarda immünoterapiyi kategorik dışlamama, #369–370 MSCC'de acil MRI ve nörolojik değerlendirme.
- **Ayrı paket:** `com.huseyin.sonnobet.audit14`. v1.13 **Sürüm Merkezi → Yedek kodu oluştur/kopyala**; v1.14 **Yedeği geri yükle**. Sabit production imza/otomatik güncelleme henüz yok.
- Bilimsel kaynaklar: [AGIHO FN](https://pmc.ncbi.nlm.nih.gov/articles/PMC11836497/), [ASCO G-CSF 2026](https://ascopubs.org/doi/full/10.1200/JCO-25-02938), [ASCO CIPN](https://ascopubs.org/doi/full/10.1200/JCO.20.01399), [ESC Kardiyo-Onkoloji](https://academic.oup.com/eurheartj/article/43/41/4229/6673995), [NICE NG234](https://www.nice.org.uk/guidance/ng234/chapter/recommendations), [IARC GLOBOCAN 2024](https://www.iarc.who.int/news-events/global-cancer-statistics-2024-globocan-estimates-of-incidence-and-mortality-worldwide-for-34-cancers-in-186-countries), [NCI Tarama](https://www.cancer.gov/about-cancer/screening/screening-tests).
- Not: Klinik notlar sözlü sınav eğitim malzemesidir; hasta başında kişisel tedavi/ilaç uygulama talimatı değildir.

## v1.13: Dijital belge kaynak eşlemesi (24 Ekim 2026)

- Kullanıcının gönderdiği `Dahiliye_Birlesik_Sayfa_001-109.docx` dosyasının **özgün sayfa numaraları 78–87** içinde, **FBT #310–341'in 32 soru başlığı ve sayfa ataması** bulundu. Bu belge özgün el yazısı taraması **değil**, onun yeniden düzenlenmiş dijital transkripsiyonudur.
- **24 yeni 4 aşamalı klinik mekanizma + önceki 33 = 57 kart.** Böylece #310–341'deki bütün 32 soruda hafıza haritası, neden→mekanizma→bulgu→ayırıcı ve aktif hatırlama vardır. Kaynak temelli ders kartları sınav hazırlığı içindir.
- `FBT_DOCX_CROSSCHECK` 32 dijital kaynak bölümünü işaretler, **`FBT_AUDIT.reviewed` 322/442 olarak aynen kalır**. Yeni 32 kartın özgün el yazısı görsel denetimi yapılmış gibi gösterilmez.
- Klinik kaynak şüpheleri korunur: #320 Budd–Chiari, #323 bilirubinüri ve bilirubin yolu, #324 pnömoperitoneum, #326 üremi, #328 PT/aPTT, #329 kayıtta eksik başlık, #338–341 eski vaskülit sınıflandırma ölçütleri ve #341 kesik yanıt.
- Android `com.huseyin.sonnobet.audit13` uygulaması ayrı kurulur. v1.12 Sürüm Merkezi → **yedek kodu**; v1.13 → **geri yükle**. İlerlemenin otomatik aktarımı ve eski APK üzerine sessiz güncelleme **yoktur**.

## v1.12 değişiklikleri — PDF denetimi yerine GEÇMEZ

- Dijital FBT #310–341 bölümünden sekiz yüksek öncelikli soru için referanslı dört halkalı mekanizma haritası ve aktif hatırlama: #311 kabızlık (Rome IV), #318 peritonit ağrısı, #319 AAA rüptürü, #320 Budd–Chiari, #330 hipoglisemi, #338 Takayasu, #340 GPA, #341 EGPA.
- Bu **8 kartın** güncel bilimsel referans bağlantıları ve kritik düzeltmeleri vardır, fakat **özgün el yazısı PDF sayfa görüntüleri bu sürümde görülmedi**. Soru ekranlarında açıkça *Kılavuz notu — PDF denetimi yapılmadı* uyarısı görünür.
- Dijital FBT özgün yanıtları değişmedi. Önceki 25 harita korunarak toplam **33** yapıldı.
- Önemli yanlış/eskimiş ifadeler: Rome IV kabızlık süre+belirti şartları, Budd–Chiari'nin hepatik venöz obstrüksiyon olması; Takayasu/GPA/EGPA'da 1990 sınıflandırma kriterlerinin tanı olarak kullanılmaması.
- Sürüm Merkezi GitHub'dan yeni APK'yı kontrol eder; v1.9+ ilerleme yedeği/geri yükleme JSON koduyla sürdürülür. Eski sürümün üzerine imzalı otomatik kurulum henüz desteklenmez.

## Kaynaklar

- [Rome Foundation IV](https://theromefoundation.org/rome-iv/rome-iv-criteria/)
- [Merck — Acute Abdominal Pain](https://www.merckmanuals.com/professional/gastrointestinal-disorders/acute-abdomen-and-surgical-gastroenterology/acute-abdominal-pain)
- [NICE — AAA NG156](https://www.nice.org.uk/guidance/ng156/chapter/recommendations)
- [Merck — Budd–Chiari](https://www.merckmanuals.com/professional/hepatic-and-biliary-disorders/vascular-disorders-of-the-liver/budd-chiari-syndrome)
- [ADA — Hypoglycemia 2025](https://doi.org/10.2337/dc25-s006)
- [2022 ACR/EULAR — Takayasu](https://ard.bmj.com/content/81/12/1654)
- [2022 ACR/EULAR — GPA](https://pubmed.ncbi.nlm.nih.gov/35110333/)
- [2022 ACR/EULAR — EGPA](https://pubmed.ncbi.nlm.nih.gov/35106968/)

## Dağıtım ve veri güvenliği

Android APK debug/deneysel, çevrimdışı ders ve çevrimiçi sürüm kontrolü. **v1.11 -> v1.12**: Eski sürümde Sürüm Merkezi -> Yedek kodu oluştur/kopyala; yeni sürümü kurup aynı menüden geri yükle. Uygulama paketleri `com.huseyin.sonnobet.audit11` ve `.audit12` birbirinden bağımsızdır. Soru 16 uzun dersleri, oyun XP'si ve mekanizma ödülleri korunur (geri yüklemeden sonra).

Uygulama eğitim içindir, hasta bakımı veya reçete talimatı değildir. Resmi APK yalnız başarılı CI sonrasında yayımlanır.

**Sonraki gerçek görsel kontrol:** FBT #310–341, orijinal PDF s.78–87; doğrulama tamamlanmadan 322 sayısı artırılmayacak.
