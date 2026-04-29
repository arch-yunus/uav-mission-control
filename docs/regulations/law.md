# ⚖️ İHA Hukuku ve Havacılık Regülasyonları (Türkiye)

> **Amaç:** Yasal çerçeveyi bilmeden yapılan her uçuş, hem güvenlik hem hukuki açıdan risk taşır. Bu modül, Türkiye'de İHA operasyonlarının yasal altyapısını öğretir.

---

## 1. Türkiye'de İHA Sınıflandırması (SHGM)

Sivil Havacılık Genel Müdürlüğü (SHGM), İHA'ları ağırlığa göre sınıflandırır:

| Kategori | Ağırlık | Lisans | Kayıt |
| :--- | :--- | :--- | :--- |
| **C0** | < 250g | Gerekmez | Gerekmez |
| **C1** | 250g – 900g | Uzaktan Pilot Sertifikası | Zorunlu |
| **C2** | 900g – 4kg | UAS Pilot Lisansı | Zorunlu |
| **C3** | 4kg – 25kg | Operatör Lisansı | Zorunlu |
| **C4** | > 25kg | Özel İzin | Zorunlu |

---

## 2. NOTAM: Notice to Airmen

NOTAM, hava sahasındaki geçici kısıtlamaları ve uyarıları içerir.

### NOTAM Okuma Örneği
```
LTBA/NOTAM A1234/26
Q) LTBB/QRPCA/IV/NBO/A/000/010/4100N02900E005
A) LTBA B) 2605010600 C) 2605011800
E) UAS OPERATIONS PROHIBITED WITHIN 5NM OF LTBA AD
    DUE TO AIRSHOW. ALL UAS FLIGHTS REQUIRE PRIOR ATC APPROVAL.
```

**Çözümleme:**
- `LTBA` = ICAO kodu (Atatürk Havalimanı bölgesi)
- `Q)` satırı = Kısıtlama tipi, koordinat, irtifa limitleri
- `B)–C)` = Başlangıç / Bitiş zamanı (UTC)
- `E)` = Kısıtlamanın açıklaması

**NOTAM Sorgulama:** [uvm.dhmi.gov.tr](https://uvm.dhmi.gov.tr)

---

## 3. Uçuşa Yasak Bölgeler (NFZ)

```
Türkiye'de Otomatik Yasak Bölgeler:
├── Havalimanı Çevresi: Merkez 5NM (≈9km) içi
├── Askeri Tesisler: Değişken, genellikle 5km+
├── Cumhurbaşkanlığı Külliyesi vb.: 15km
└── Özel Olay Bölgeleri: NOTAM ile ilan edilir
```

**Uygulama:** DJI ve benzeri sistemlerde bu bölgeler otomatik olarak kilitlenir. Açık kaynaklı sistemlerde yazılımsal kontrol yapılmalıdır.

---

## 4. SİHA Operatörlüğü: İzin Süreci

```
1. SHGM'ye Operatör Kaydı (Bireysel/Kurumsal)
2. Platform Kaydı (Seri numarası ile)
3. Uzaktan Pilot Sertifikası (Teorik + Pratik sınav)
4. Operasyon Onayı (Hassas bölgeler için ek izin)
5. Sigorta (Üçüncü şahıs sorumluluğu — zorunlu C1+)
```

---

## 5. Gizlilik ve Veri Koruma

- **Fotoğraflama:** Başkasının özel mülkü veya kişilerin görüntülenmesi izin gerektirir.
- **KVKK:** Kişisel veriler (yüz, plaka vb.) kamera ile kayıt altına alınırsa KVKK kapsamına girer.
- **Ticari Kullanım:** İzinsiz ticari amaçlı çekim yasaktır.

---

## 📝 Pratik Alıştırma

1. [uvm.dhmi.gov.tr](https://uvm.dhmi.gov.tr) üzerinden yaşadığın şehir için aktif NOTAM'ları sorgula.
2. Kendi İHA'n için SHGM kayıt sürecini araştır. Hangi belgeler gerekiyor?
