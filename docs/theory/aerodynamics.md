# 🌬️ Aerodinamik ve İtki Sistemleri

> **Amaç:** Bir İHA'nın neden uçtuğunu anlamadan sadece uçurmak, kaza davetiyesi çıkarmaktır. Bu modül, uçuşu sağlayan fiziksel kuvvetleri öğretir.

---

## 1. Dört Temel Uçuş Kuvveti

```
        [KALDIRMA KUVVETİ (Lift)]
                 ↑
                 │
[SÜRÜKLENME] ←──┤──→ [İTKİ (Thrust)]
  (Drag)         │
                 ↓
           [YERÇEKİMİ (Weight)]
```

**Hover Koşulu:** Kaldırma = Yerçekimi | İtki = Sürüklenme

---

## 2. Döner Kanat Aerodinamiği

### Kaldırma Kuvveti Denklemi
```
L = ½ × ρ × v² × Cl × A

ρ = Hava yoğunluğu (kg/m³) → Yüksek irtifada ve sıcak havada düşer!
v = Hava akış hızı (m/s)
Cl = Kaldırma katsayısı (kanat profili)
A = Kanat alanı (m²)
```

**Yüksek İrtifada İHA:** Hava incelir → Kaldırma düşer → Motor daha çok iş yapar → Batarya hızlı biter.

### Pervane İtki Formülü
```
T = Kt × ρ × n² × D⁴

Kt = İtki katsayısı (pervane geometrisine bağlı)
n  = Devir sayısı (rps)
D  = Pervane çapı (m)
```

**Pratik Çıkarım:** Pervane çapı 2x artarsa itki 4x artar (D² ilişkisi). Bu yüzden büyük pervaneler verimlidir.

---

## 3. Uçuş Modları

### Quadcopter Motor Karışımı (Motor Mixing)
```
Motor Pozisyonları (Üstten Görünüm):
  M1(CCW) ── M2(CW)
     \         /
      \       /
  M3(CW)  ── M4(CCW)

Kontrol:
PITCH (İleri/Geri): M1+M2 vs M3+M4
ROLL (Sağ/Sol):     M1+M3 vs M2+M4
YAW (Dönüş):        CCW motorlar vs CW motorlar (tork dengesi)
THROTTLE:           Tüm motorlar aynı anda
```

---

## 4. Hover Verimliliği ve Disk Yükleme

```
Disk Yükleme (DL) = Ağırlık / Toplam Pervane Alanı (g/cm²)

Düşük DL → Verimli → Uzun menzil (kargo İHA'lar büyük peron)
Yüksek DL → Hızlı ve çevik → Kısa menzil (yarış İHA)
```

**Hover Gücü Formülü:**
```
P_hover = (W^1.5) / (√(2 × ρ × A))

W = Ağırlık (Newton)
ρ = Hava yoğunluğu
A = Toplam rotor disk alanı
```

---

## 5. Reynolds Sayısı ve Pervane Profili

```
Re = ρ × v × L / μ

L = Kanat/pervane kord genişliği
μ = Hava dinamik viskozitesi

İHA ölçeğinde: Re genellikle 50,000–500,000 aralığı
Bu aralıkta profil seçimi kritiktir: Clark-Y, E387 profilleri tercih edilir.
```

---

## 📝 Pratik Alıştırma

1. 5 inç ve 10 inç pervane arasında itki farkı neden bu kadar büyük? Formülle açıkla.
2. Simülatörde irtifayı 1000m'ye çıkar. Batarya tüketimi nasıl değişiyor?

---

*Sonraki Konu → [Batarya ve Enerji Yönetimi](power_systems.md)*
