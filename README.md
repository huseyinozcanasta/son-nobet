# SON NÖBET v1.12 — 33 mekanizma haritası, 322/442 özgün PDF denetimi

**Durum:** 442 mevcut FBT kaynak sorusu / 443 sıra numarası (#358 eksik; #124 iki alt soru içerir). El yazısı 109 sayfalık PDF ile **322/442** kaydın görsel karşılaştırması tamamlandı; **120** kayıt bekliyor. Bu sayılar v1.11'den beri **değişmedi**.

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
