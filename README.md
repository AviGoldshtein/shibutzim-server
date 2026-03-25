# Shibutzim Management API

> מערכת לניהול שיבוצים, אימונים ומשאבים עבור יחידות צבאיות

---

## 📚 תיאור הפרויקט

פרויקט זה הוא Backend מבוסס **NestJS + TypeORM** עם מסד נתונים **Postgres** (Docker).

המערכת מאפשרת:

- קבלת עץ יחידות צבאיות (`units-tree`)
- ניהול סוגי שירותים, סוגי משאבים וסוגי פריטים
- קבלת רשימת שיבוצים (`shibutzim`) עם פילטרים מתקדמים
- דוגמת נתונים מלאה ל־Swagger עבור תיעוד API
- שימוש ב־DTOs ל־Validation ו־Swagger Documentation

---

## ⚙️ דרישות מוקדמות

לפני ההתקנה, ודא שיש לך:

- Node.js >= 18
- npm >= 9
- Docker + Docker Compose
- Git

---

## 📥 שלבי התקנה והפעלה

### 1. הורדת הפרויקט

```bash
git clone https://github.com/AviGoldshtein/shibutzim-server.git
cd shibutzim-server
```

### 2. התקנת תלויות Node.js

```bash
npm install
```

### 3. הפעלת Docker

הפרויקט משתמש ב־Postgres בתוך Docker:

```bash
docker compose up -d
```

> ודא ש־Docker פועל ושהפורט `5432` פנוי.

### 4. אתחול מסד הנתונים (PoC / Proof of Work)

```bash
npm run initdb
```

יוצר דוגמת נתונים ראשונית עבור Swagger ודיבוג.

### 5. הפעלת הסרבר בפיתוח

```bash
npm run start:dev
```

הסרבר יפעל בכתובת: [http://localhost:3000](http://localhost:3000)

---

## 🧰 שימוש ב־Swagger

לאחר הפעלת הסרבר, ניתן לגשת ל־Swagger UI כדי לבדוק את כל ה־API:

**[http://localhost:3000/api](http://localhost:3000/api)**

- כל Endpoint מתועד עם DTOs ודוגמאות של Response (כולל רשימות שיבוצים מלאות)
- ניתן לראות examples חיים מתוך `examples/shibutz.example.ts`

---

## 📁 מבנה תיקיות עיקרי

```
src/
├── filters/          # Endpoints עבור סוגי שירותים, משאבים, פריטים ומיקומים
├── shibutzim/        # Endpoints עבור שיבוצים
│   ├── dto/          # DTOs עם Validation ו-Swagger
│   ├── examples/     # Examples לשימוש ב-Swagger
│   └── shibutzim.service.ts
├── common/           # Middleware, utilities וכו'
└── main.ts           # Entry point של NestJS
```

---

## 🔧 פקודות שימושיות

| פקודה | תיאור |
|---|---|
| `npm run start:dev` | הפעלת סרבר NestJS בפיתוח |
| `npm run build` | בניית הפרויקט לפרודקשן |
| `npm run lint` | בדיקת קוד עם ESLint |
| `npm run test` | הרצת Unit Tests |
| `npm run initdb` | אתחול DB עם דוגמת PoC |

---
 
## 🔐 משתני סביבה
 
צור קובץ `.env` בתיקיית הפרויקט והגדר את הערכים הבאים:
 
```dotenv
SERVER_PORT=3000
 
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=my_username
DB_PASSWORD=my_password
DB_NAME=my_db
```
 
> ודא שהקובץ `.env` מופיע ב־`.gitignore` ואינו מועלה ל־Git.
 
---
 

## ✅ Best Practices

- שמירת Examples בקבצים נפרדים (`examples/`) כדי לשמור על סדר ויכולת reuse
- שימוש ב־DTOs עבור כל Endpoint כדי לוודא טיפוסים ולידציה נכונה
- שימוש ב־Swagger עם `content.examples` כדי להציג דוגמאות אמיתיות ולא "string placeholders"
- הפעלת Docker תמיד לפני כל הפעלה של `start:dev`