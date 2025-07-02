# 🎬 Netflix Analog

Netflix streaming platformasining analog versiyasi bo'lib, foydalanuvchilar uchun zamonaviy va qulay kinolar va seriallarni ko'rish imkonini beradi.

## ✨ Asosiy xususiyatlar

- 🎭 **Kinolar va seriallar**: TMDB API orqali eng so'nggi va mashhur kinolar
- 🔍 **Qidiruv tizimi**: Kinolar va seriallarni nomi bo'yicha qidirish
- 👤 **Foydalanuvchi profillari**: Bir nechta profil yaratish va boshqarish
- ❤️ **Sevimli filmlar**: Sevimli kinolarni saqlash va ko'rish
- 🔐 **Xavfsiz autentifikatsiya**: Google orqali NextAuth.js bilan tizimga kirish
- 📱 **Responsive dizayn**: Barcha qurilmalarda yaxshi ko'rinish
- ⚡ **Tezkor ishlash**: Next.js 15 va Turbopack bilan optimallashtirilgan

## 🛠️ Texnologiyalar

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animatsiyalar
- **Lucide React** - Ikonlar

### Backend
- **Next.js API Routes** - Backend API
- **MongoDB** - Ma'lumotlar bazasi
- **Mongoose** - MongoDB ODM
- **NextAuth.js** - Autentifikatsiya
- **bcrypt** - Parol hashlash

### API va xizmatlar
- **TMDB API** - Kino ma'lumotlari
- **ImageKit** - Rasmlarni saqlash
- **Google OAuth** - Tizimga kirish

## 🚀 O'rnatish va ishga tushirish

### Talablar
- Node.js 18+ 
- MongoDB
- Google OAuth credentials
- TMDB API key

### 1. Loyihani klonlash
```bash
git clone https://github.com/your-username/netflix-analog.git
cd netflix-analog
```

### 2. Dependensiyalarni o'rnatish
```bash
npm install
```

### 3. Muhit o'zgaruvchilarini sozlash
`.env.local` fayl yarating va quyidagi o'zgaruvchilarni qo'shing:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# TMDB API
TMDB_API_KEY=your_tmdb_api_key

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

### 4. Loyihani ishga tushirish
```bash
# Development rejimida
npm run dev

# Production build
npm run build
npm start
```

Loyiha `http://localhost:3000` manzilida ochiladi.

## 📁 Loyiha tuzilishi

```
netflix-analog/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   │   ├── accounts/      # Foydalanuvchi profillari API
│   │   └── auth/          # Autentifikatsiya API
│   ├── dashboard/         # Asosiy sahifa
│   ├── favorites/         # Sevimli kinolar
│   ├── manage-accounts/   # Profillarni boshqarish
│   └── search/            # Qidiruv sahifasi
├── components/            # React komponentlari
├── context/               # React Context
├── lib/                   # Utility funksiyalar
├── models/                # MongoDB modellari
├── providers/             # Context providers
├── public/                # Statik fayllar
└── types/                 # TypeScript tiplari
```

## 🎯 Asosiy funksiyalar

### 1. Autentifikatsiya
- Google orqali tizimga kirish
- Xavfsiz sessiya boshqaruvi
- Avtomatik yo'naltirish

### 2. Foydalanuvchi profillari
- Bir nechta profil yaratish
- Profil rasmini o'zgartirish
- Profil nomini tahrirlash

### 3. Kino ko'rish
- Turli kategoriyalardagi kinolar
- Kino tafsilotlari
- Trailer va ma'lumotlar

### 4. Qidiruv
- Real-time qidiruv
- Filtrlash va saralash
- Natijalarni ko'rsatish

### 5. Sevimli kinolar
- Sevimli kinolarni saqlash
- Ro'yxatni ko'rish
- O'chirish funksiyasi

## 🔧 API Endpoints

### Accounts
- `GET /api/accounts` - Barcha profillarni olish
- `GET /api/accounts/[id]` - Profil ma'lumotlarini olish
- `POST /api/accounts` - Yangi profil yaratish
- `PUT /api/accounts/[id]` - Profilni yangilash
- `DELETE /api/accounts/[id]` - Profilni o'chirish

### Auth
- `GET /api/auth/[...nextauth]` - NextAuth.js endpoints

## 🎨 UI/UX xususiyatlari

- **Zamonaviy dizayn**: Netflix'ga o'xshash interfeys
- **Responsive**: Barcha qurilmalarda yaxshi ko'rinish
- **Animatsiyalar**: Framer Motion bilan silliq animatsiyalar
- **Loading states**: Foydalanuvchi tajribasini yaxshilash
- **Error handling**: Xatolarni to'g'ri ko'rsatish

## 🚀 Deployment

### Vercel (Tavsiya etiladi)
```bash
npm install -g vercel
vercel
```

### Boshqa platformalar
- Netlify
- Railway
- Heroku

## 🤝 Hissa qo'shish

1. Repository'ni fork qiling
2. Feature branch yarating (`git checkout -b feature/amazing-feature`)
3. O'zgarishlarni commit qiling (`git commit -m 'Add amazing feature'`)
4. Branch'ga push qiling (`git push origin feature/amazing-feature`)
5. Pull Request yarating

## 📝 Litsenziya

Bu loyiha MIT litsenziyasi ostida tarqatiladi. Batafsil ma'lumot uchun `LICENSE` faylini ko'ring.

## 📞 Bog'lanish

- GitHub: [@your-username](https://github.com/your-username)
- Email: your-email@example.com

## 🙏 Minnatdorchilik

- [TMDB](https://www.themoviedb.org/) - Kino ma'lumotlari uchun
- [Next.js](https://nextjs.org/) - Framework uchun
- [Tailwind CSS](https://tailwindcss.com/) - Styling uchun
- [Framer Motion](https://www.framer.com/motion/) - Animatsiyalar uchun

---

⭐ Agar bu loyiha sizga foydali bo'lsa, uni yulduzcha bilan baholashni unutmang!
