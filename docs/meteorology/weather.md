# 🌬️ Havacılık Meteorolojisi: İHA Operasyonlarına Etkisi

> **Amaç:** Hava koşulları, her İHA uçuşunun en kritik değişkenidir. Bu modül, meteorolojik verileri okumayı, yorumlamayı ve operasyonel kararlara dönüştürmeyi öğretir.

---

## 1. Rüzgar ve İHA Performansı

### Rüzgar Gradyanı (Wind Shear)
Yükseklik arttıkça rüzgar hızı değişir. Bu "rüzgar gradyanı" etkisi İHA stabilitesini doğrudan etkiler.

```
Yükseklik 100m: 8 m/s Rüzgar
Yükseklik  50m: 5 m/s Rüzgar
Yükseklik  10m: 2 m/s Rüzgar   ← Arazi sürtünmesi etkisi
Yükseklik   0m: ~0 m/s          ← Sınır Katmanı (Boundary Layer)
```

**Operasyonel Kural:** İHA test uçuşunu zemin seviyesinde rüzgar sakinken, yüksekte uçmadan önce yap. Zirve rüzgarı zemin rüzgarının 2-3 katı olabilir.

### Türbülans Tipleri
| Tip | Kaynak | Belirtisi | Önlem |
| :--- | :--- | :--- | :--- |
| **Mekanik** | Bina/tepe arkaları | Ani yön değişimleri | Engel mesafesini artır (H×2) |
| **Termal** | Sıcak zemin üstü | Yükselme/alçalma titremeleri | Termal saatleri (öğle üstü) kaçın |
| **Rüzgar Makası** | Farklı hava kütleleri | Hızlı hız değişimi | Fırtına öncesi uçmaktan kaçın |

---

## 2. Manyetik Fırtınalar ve GNSS Etkisi

### Kp İndeksi
Kp indeksi, Dünya'nın manyetik alanındaki bozulmanın şiddetini gösterir (0–9 arası).

| Kp | Etki Düzeyi | İHA Etkisi |
| :--- | :--- | :--- |
| 0–2 | Sakin | Normal GNSS performansı |
| 3–4 | Hafif | HDOP hafif artabilir |
| 5–6 | Orta (G1 Fırtına) | GPS hassasiyeti düşer, pusula sapabilir |
| 7+ | Şiddetli (G3+) | **GNSS kullanma. Görsel uçuş veya iptali seç.** |

**Kaynak:** [spaceweather.com](https://spaceweather.com) | [NOAA Space Weather](https://www.swpc.noaa.gov/)

---

## 3. Görüş Mesafesi (Visibility) ve VMC/IMC

**VMC (Visual Meteorological Conditions):** Görsel uçuş için yeterli hava koşulları.
- VLOS (Görüş Hattı) için minimum: **500m Yatay Görüş**
- Bulut tabanı: **150m+ arazi üstü** (kontrol edilmeli)

**IMC (Instrument Meteorological Conditions):** Görsel koşullar altında değil. Bu koşullarda standart İHA'larla **uçmak yasaktır.**

---

## 4. Yağış ve RF Sinyali

Yağmur ve nem, RF sinyallerini emer (attenuation):

```
Yağmur Zayıflaması (yaklaşık, 5GHz):
- Hafif yağmur (2.5mm/saat): ~0.01 dB/km
- Orta yağmur (25mm/saat):   ~0.5 dB/km
- Şiddetli yağmur (100mm/saat): ~3 dB/km

Pratik Kural: IP67 veya üstü korumasız İHA'lar yağmurda UÇMAZ.
```

---

## 5. Pratik Hava Değerlendirmesi

```bash
# Windy.com API (terminal üzerinden hava durumu)
curl "wttr.in/Ankara?format=j1" | python3 -c "
import sys, json
d = json.load(sys.stdin)['current_condition'][0]
print(f'Rüzgar: {d[\"windspeedKmph\"]} km/h | Görüş: {d[\"visibility\"]}m | Nem: {d[\"humidity\"]}%')
"
```

---

## 📝 Pratik Alıştırma

1. Bugünkü Kp indeksini [spaceweather.com](https://spaceweather.com)'dan kontrol et. Uçuş uygun mu?
2. Rüzgar 8m/s olan bir günde 200m irtifada beklenen rüzgar hızını tahmin et.
