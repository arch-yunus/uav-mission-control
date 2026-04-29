# 🔋 Batarya ve Enerji Yönetimi

İHA operasyonlarında krizlerin büyük çoğunluğu enerji yönetiminin doğru yapılamamasından kaynaklanır. Batarya okuryazarlığı bir İHA pilotu için hayati önem taşır.

## 1. Lityum Polimer (Li-Po) Kimyası
- **Hücre (Cell):** Li-Po bataryalar hücrelerden oluşur. 1 Hücrenin nominal (ortalama) voltajı 3.7V, tam dolu voltajı 4.2V, kritik boş voltajı ise yaklaşık 3.2V - 3.4V aralığındadır.
- **Seri Bağlantı (S):** Hücrelerin voltajı toplamak için seri bağlanmasıdır. (Örn: 6S bir batarya 6 * 3.7 = 22.2V nominal voltaja sahiptir). SUNGUR sistemleri genellikle 6S kullanır.

## 2. Kapasite ve Deşarj (C-Rating)
- **Kapasite (mAh):** Bataryanın tutabildiği toplam enerji miktarıdır. (Örn: 5000 mAh = Batarya 1 saat boyunca 5 Amper güç verebilir).
- **C-Rating:** Bataryanın güvenle deşarj edebileceği anlık akım çarpanıdır. (Örn: 5000 mAh ve 50C bir batarya, anlık olarak 5A * 50 = 250 Amper akım verebilir). Düşük C değerli bir bataryadan yüksek akım çekilirse batarya şişer ve alev alabilir.

## 3. Saklama (Storage) ve Operasyon Öncesi
- Bataryalar tam dolu (4.2V) veya tam boş (<3.5V) olarak uzun süre saklanmamalıdır.
- Güvenli saklama voltajı (Storage) hücre başı 3.8V'tur.
- Uçuş öncesi balans (dengeleme) şarjı ile tüm hücrelerin voltajları (örn: 4.20V - 4.20V - 4.19V - 4.20V...) birbirine olabildiğince yakın hale getirilmelidir. Dengesiz hücreler uçuş sırasında ani güç kesilmesine neden olabilir.
