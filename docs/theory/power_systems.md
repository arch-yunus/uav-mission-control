# 🔋 Batarya ve Enerji Yönetimi

> **Amaç:** Batarya, İHA'nın kalbidir. Bunu doğru anlamadan yapılan her tasarım, eksik bir tasarımdır. Bu modül, LiPo kimyasını ve enerji sistemlerini temelinden açıklar.

---

## 1. LiPo Hücre Kimyası

### Temel Elektrokimya
LiPo (Lithium Polymer) pil, katot ve anot arasındaki lityum iyon hareketine dayanır.

```
Deşarj sırasında:
ANO (Grafit): Li → Li⁺ + e⁻
KATOT (LiCoO₂): Li⁺ + e⁻ → Li(katot)

Şarj sırasında: Ters yön
```

### Gerilim Eğrisi
```
4.20V ─── Tam Şarj (asla aşma)
4.10V ─── Nominal Şarj
3.70V ─── Nominal/Boş Orta
3.50V ─── Düşük Uyarı (inmeye başla)
3.40V ─── Kritik (FCın RTL tetiklemeli)
3.00V ─── Kalıcı Hasar Başlar
2.50V ─── Tehlikeli (yangın riski)
```

---

## 2. C-Rating: Ne Anlama Gelir?

```
C-Rating = Maksimum güvenli deşarj oranı / Kapasite

Örnek:
Batarya: 5000mAh, 50C
Maksimum anlık akım = 50 × 5A = 250A

4 motor, her biri maksimum 60A çekiyorsa:
Toplam = 240A < 250A → Güvenli
```

**Dikkat:** C-rating üreticiye göre abartılıdır. Gerçekçi limit = nominal C / 1.3

---

## 3. Deşarj Eğrisi Analizi

```
[Gerilim]
4.2V │▀▀▀▀▀▀▀▀────────────────
     │                         ╲
3.7V │                          ╲_______
     │                                   ╲
3.4V │                                    ╲
     └─────────────────────────────────────[Kapasite %]
     0%                                  100%
```

**Kullanışlı Bölge:** 80% (4.15V) → 20% (3.65V) arasında uçuş. Bu aralıkta gerilim düşüşü doğrusal ve öngörülebilirdir.

---

## 4. İç Direnç ve Gerilim Sarkması

Yüklü devrede gerilim:
```
V_efektif = V_açık_devre - (İç_Direnç × Akım)

Örnek:
Batarya: 16.8V, İç direnç: 10mΩ hücre × 4 hücre = 40mΩ = 0.04Ω
Motor tam gaz: 60A çekiyor
V_sarkma = 0.04Ω × 60A = 2.4V
V_efektif = 16.8 - 2.4 = 14.4V → Motor tam gücüne ulaşamaz!
```

Bu yüzden yaşlı, yüksek dirençli bataryalar tam gaz anlarda sistemi çöküme götürebilir.

---

## 5. Güvenli Saklama ve Şarj Protokolleri

### Depolama Şarjı
```
Kısa süre (< 1 hafta): Tam şarjta bırakabilirsin
Uzun süre (> 1 hafta): Storage voltajına indir
Storage voltajı: ~3.80–3.85V/hücre
```

### Güvenli Şarj
- **Şarj akımı:** Kapasite × 1C (Örn: 5000mAh → 5A maksimum)
- **Balans şarjı:** Her hücre eşit gerilime getirilir.
- **Asla gözetimsiz bırakma:** LiPo şarj sırasında izlenmeli.
- **LiPo çantası kullan:** Yangına karşı güvenli depolama.

---

## 📝 Pratik Alıştırma

1. `scripts/flight_calculator.py`'yi çalıştır. Kendi platformun için uçuş süresi tahmini yap.
2. 4S 5000mAh 50C bir bataryanın maksimum anlık akım kapasitesini hesapla.
