# Next.js Dashboard Project

## Proje Açıklaması
Bu proje, **Next.js** kullanılarak bir **dashboard** uygulaması geliştirilmiştir. 
- **Ana Sayfa (Dashboard)**: MongoDB'den çekilen verilerle oluşturulmuş grafikler yer alıyor.
- **CSV Yükleme Sayfası**: Kullanıcı bir CSV dosyası yükleyerek verileri MongoDB'ye kaydedebiliyor.

## Kullanılan Teknolojiler
- **Next.js 14** (React Framework)
- **MongoDB** (Veritabanı)
- **Mongoose** (MongoDB ODM)
- **Recharts** (Grafikler için)
- **Papaparse** (CSV işleme)
- **shadcn/ui** (UI bileşenleri için)

## Kurulum
Öncelikle projeyi klonlayın:
```sh
git clone https://github.com/sevvalmertoglu/chart-dashboard.git
cd nextjs-dashboard
```

### Bağımlılıkları Yükleyin
```sh
npm install
# veya
yarn install
```

### Çevresel Değişkenleri Ayarlayın
`.env.local` dosyası oluşturup aşağıdaki bilgileri ekleyin:
```env
MONGODB_URI=mongodb+srv://kullanici:parola@cluster.mongodb.net/db_adi
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Geliştirme Ortamında Çalıştırın
```sh
npm run dev
# veya
yarn dev
```

## Kullanım
### 1️⃣ Dashboard Sayfası (/)
- **MongoDB'den çekilen verileri grafik olarak görüntülüyor.**
- **Recharts** kullanılarak görselleştiriliyor.

### 2️⃣ CSV Yükleme Sayfası (/upload)
- **CSV dosyası seçilip yüklendiğinde**, satırlar MongoDB'ye kaydediliyor.
- **PapaParse** kullanılarak CSV dosyası okunuyor.

## Proje Yapısı
```
📂 nextjs-dashboard
 ┣ 📂 components
 ┃ ┣ 📜 Chart.js   # Grafik bileşeni
 ┃ ┗ 📜 FileUpload.js   # CSV yükleme bileşeni
 ┣ 📂 pages
 ┃ ┣ 📜 index.js   # Ana sayfa (grafikler)
 ┃ ┗ 📜 upload.js   # CSV yükleme sayfası
 ┣ 📂 lib
 ┃ ┗ 📜 db.js   # MongoDB bağlantısı
 ┣ 📂 models
 ┃ ┗ 📜 DataModel.js   # MongoDB veri modeli
 ┣ 📂 api
 ┃ ┗ 📜 upload.js   # CSV yükleme API endpoint'i
 ┣ 📜 .env.local.example
 ┣ 📜 package.json
 ┣ 📜 README.md
 ┗ 📜 LICENSE
```

## API Endpointler
| Metod | Endpoint  | Açıklama |
|--------|----------|----------|
| GET    | `/api/data` | MongoDB'den veri çekiyor |
| POST   | `/api/upload` | CSV verisini MongoDB'ye kaydediyor |

## Katkıda Bulunma
Eğer projeye katkıda bulunmak istiyorsanız:
1. Fork'layın 🍴
2. Yeni bir branch oluşturun (`git checkout -b feature-ismi`)
3. Değişiklik yapın ve commit atın (`git commit -m 'Açıklama'`)
4. Branch'i push edin (`git push origin feature-ismi`)
5. Bir **Pull Request** açın 🎉

## Lisans
MIT Lisansı altında paylaşılmıştır.


<img width="840" alt="Ekran Resmi 2025-03-30 14 10 40" src="https://github.com/user-attachments/assets/6a8403cf-5412-49c8-bb1f-b276cf87096a" />
<img width="840" alt="Ekran Resmi 2025-03-30 14 10 58" src="https://github.com/user-attachments/assets/3fb23601-b6f7-4e0d-8cf8-298b2c795683" />
<img width="840" alt="Ekran Resmi 2025-03-30 14 11 11" src="https://github.com/user-attachments/assets/5fcea272-2cb6-424b-9e6b-9a799d8dd09e" />
