# SON NÖBET — Dahiliye RPG
**Sınava yönelik, API anahtarsız ve çevrimdışı Android öğrenme oyunu.**

İlk oynanabilir görev: FBT #016 — “Barsak seslerini azaltan elektrolit bozukluğu?” (kaynak FBT sözlü notu, s. 6).

## Özellikler (v0.1.0)
- Üç kısa ders: Sıvı/Elektrolit Dengesi, Paratiroid–Endokrin Hipertansiyon, Batın Muayenesi.
- Her dersin sonunda aktif hatırlama kontrolü.
- 5 soruluk final (en az 4 doğru), XP ve günlük çalışma serisi.
- İsteğe bağlı sözlü prova ve açık cevap taslağı.
- İlerleme cihazda tutulur. İnternet ve Google hesabı gerekmez.
- #017 ve #018 henüz kilitlidir. Bütün FBT ve sözlü anıları bu sürümde **bulunmaz**.

## APK edinme
1. GitHub **Actions → Android APK** iş akışına git.
2. Son başarılı çalışmayı aç.
3. **Artifacts → son-nobet-debug-apk** içindeki ZIP'i indir.
4. ZIP'i aç ve `app-debug.apk` dosyasını Android cihazında kur.

Bu, otomatik test amaçlı **debug APK**'dır. Play Store üretim imzası yoktur. Yeni APK kurulumu önceki sürümden farklı imzayla gelirse önceden yüklü sürüm kaldırılmak zorunda kalabilir; yerel ilerleme kaybolabilir.

## Kod ve derleme
```sh
cd .
gradle assembleDebug
```
Java 17, Gradle 8.9 ve Android SDK 35 gerekir; GitHub Actions derleme ortamını otomatik hazırlar.

## Kaynak ve veri
FBT orijinal soru #016 (s. 6) ve kullanıcıya ait FBT16 ders çalışma notlarından hazırlanmış kısa derslerdir. Uygulama doğrudan Google Calendar/Drive API'sine **bağlanmaz**; içerik APK'ya önceden gömülüdür.

Uygulama tıbbi eğitim içindir; hasta yönetimi amacıyla kullanılamaz.
