![SUNGUR Academy Banner](assets/mission_control_banner.png)

# 🎓 SUNGUR İHA Pilotluk Eğitim Akademisi

[![Akademi](https://img.shields.io/badge/Akademi-Aktif-success?style=for-the-badge&logo=academiccap)](https://github.com/arch-yunus/uav-mission-control)
[![Müfredat](https://img.shields.io/badge/Müfredat-Kapsamlı-blue?style=for-the-badge&logo=book)](https://github.com/arch-yunus/uav-mission-control)

> **"Gerçek bir pilot makineyi değil, olasılıkları yönetir."**

**SUNGUR İHA Pilotluk Eğitim Akademisi**'ne hoş geldiniz. Bu depo, SUNGUR İHA sistemleri için **resmi eğitim müfredatını, teorik materyalleri ve pratik simülasyon ortamını** barındıran temel eğitim karargahıdır. 

Amacımız, sadece bir yazılım kullanıcısı değil, aerodinamik, meteoroloji ve kriz yönetimi konularına hakim, sahada her türlü duruma hazırlıklı profesyonel operatörler yetiştirmektir.

---

## 📚 Akademi Müfredatı (Syllabus)

Eğitim sürecimiz, teorik temellerin atılması ve ardından simülasyon ile kas hafızasının (reflekslerin) geliştirilmesi üzerine iki ana faza ayrılmıştır.

### 🧠 1. Teorik Eğitim Fazı

Sahaya çıkmadan önce bir pilotun bilmesi gereken temel mühendislik ve doğa kanunları:

*   **[Aerodinamik ve İtki Sistemleri](docs/theory/aerodynamics.md):** Kaldırma kuvveti (Lift), sürüklenme (Drag), BLDC motor ve ESC tepkileri.
*   **[İHA Hukuku ve Regülasyonlar](docs/regulations/law.md):** NOTAM okuma, sivil havacılık kuralları, uçuşa yasak bölgeler (NFZ) ve uçuş izin prosedürleri.
*   **[Havacılık Meteorolojisi](docs/meteorology/weather.md):** Rüzgar gradyanı, termaller, K-İndeksi (Manyetik fırtınalar) ve yağışın RF sinyallerine etkisi.
*   **[Batarya ve Enerji Yönetimi](docs/theory/power_systems.md):** Li-Po hücre kimyası, iç direnç, deşarj eğrileri (C-Rating) ve güvenli saklama koşulları.

### 🎮 2. Pratik Simülasyon Fazı (SUNGUR Simulator)

Teorik eğitimi tamamlayan kursiyerler, deponun kök dizininde bulunan interaktif web simülatörü üzerinden pratik eğitime geçerler.

| Modül | Simülatör Dersi | Kazanım |
| :--- | :--- | :--- |
| **MOD-01** | Temel Uçuş (VFR) | İrtifa, hız takibi ve manuel kalkış/iniş oryantasyonu. |
| **MOD-02** | Aletli Uçuş (IFR) | Görüşsüz ortamda Yapay Ufuk (Horizon) ve radar ile uçuş. |
| **MOD-03** | Kriz Yönetimi | Eğitmen tarafından tetiklenen motor arızası ve sinyal kaybı pratikleri. |
| **MOD-04** | Çoklu İHA | SUNGUR-E1, E2, E3 ünitelerinin tek ekrandan sürü mantığıyla yönetimi. |

---

## 💻 Simülatörü Başlatma (Pratik Dersler İçin)

Pratik eğitim derslerine başlamak için SUNGUR Eğitim Simülatörü arayüzünü yerel makinenizde başlatmanız gerekmektedir:

```bash
# Akademi reposunu klonlayın
git clone https://github.com/arch-yunus/uav-mission-control.git
cd uav-mission-control

# Simülasyon arayüzünü başlatın (Python gerektirir)
python3 -m http.server 8000
```
Tarayıcınızdan `localhost:8000` adresine giderek **Simülatör Konsoluna** erişebilirsiniz.

---

## 📝 Değerlendirme ve Sertifikasyon

Kursiyerlerin "SUNGUR Operatörü" statüsü alabilmeleri için:
1.  **Teorik Sınav:** Meteoroloji, Regülasyon ve Sistem mimarisi sorularından %85 başarı.
2.  **Simülasyon Check-Ride:** Eğitmen eşliğinde yapılan 15 dakikalık simülasyon uçuşunda, enjekte edilen en az 2 arıza durumuna (örn. Link Kaybı) doğru SOP (Standart Operasyon Prosedürü) ile tepki vermek.

---

## 📂 Akademi Dizin Yapısı

```text
uav-mission-control/
├── 📁 docs/
│   ├── 📁 theory/         # Aerodinamik, sistem ve batarya teorileri
│   ├── 📁 regulations/    # Havacılık hukuku ve NOTAM bilgileri
│   └── 📁 meteorology/    # Rüzgar, manyetik fırtına ve hava durumu okumaları
├── 📁 src/                # Simülatör kaynak kodları (app.js, style.css)
└── 📄 index.html          # Web Tabanlı Eğitim Simülatörü (Pratik Faz)
```

---

## 🤝 Eğitime Katkıda Bulunma

Akademi müfredatı sürekli gelişmektedir. Teorik notlara katkıda bulunmak veya simülatöre yeni acil durum senaryoları eklemek için Pull Request gönderebilirsiniz.

**arch-yunus tarafından ⚔️ ile geliştirilmiştir.**
