# 🚁 Temel Aerodinamik ve İtki Sistemleri

Bu modül, SUNGUR İHA pilot adaylarının hava araçlarının gökyüzünde nasıl tutunduğunu ve hareket ettiğini anlamaları için hazırlanmıştır.

## 1. Uçuşun Dört Temel Kuvveti

Bir hava aracına etki eden 4 temel kuvvet vardır:
- **Kaldırma Kuvveti (Lift):** Havanın kanat (veya pervane) profili etrafından akarken oluşturduğu yukarı yönlü kuvvettir. Ağırlığı yener.
- **Ağırlık (Weight/Gravity):** Aracın kütlesi ve yerçekimi ivmesinin çarpımıdır. Lift tarafından dengelenmelidir.
- **İtki (Thrust):** Motorların (Pervanelerin) aracı ileriye veya yukarıya doğru ittiği/çektiği kuvvettir.
- **Sürüklenme (Drag):** Havanın hava aracına karşı gösterdiği fiziksel dirençtir. İtki tarafından yenilmelidir.

## 2. Pervane (Propeller) Dinamikleri
- **Pitch (Hatve):** Bir pervanenin kendi etrafında 1 tam tur attığında teorik olarak ilerlediği mesafedir. Yüksek pitch = daha yüksek hız ama daha az tork. Düşük pitch = daha yüksek tork (kaldırma) ama daha düşük hız.
- **Çap (Diameter):** Pervanenin büyüklüğü. Büyük pervaneler daha stabil ve verimlidir ancak tepki süreleri daha yavaştır.

## 3. BLDC (Fırçasız) Motor ve ESC Tepkileri
SUNGUR sistemlerinde Fırçasız Doğru Akım (BLDC) motorlar kullanılır.
- **KV Değeri:** Motora uygulanan 1 Volt başına motorun yüksüz olarak 1 dakikada attığı tur sayısıdır. (Örn: 1000KV motor, 10V ile 10.000 devir döner).
- **ESC (Electronic Speed Controller):** Uçuştan gelen dijital sinyalleri (PWM, DShot vb.) kullanarak BLDC motorun dönüş hızını anlık olarak ayarlar. Hassasiyeti İHA'nın stabilitesini belirler.
