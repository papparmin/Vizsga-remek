# 🌍 Explore – Vizsgaremek  
**Szoftverfejlesztő és -tesztelő záróvizsga projekt**

 **Készítette:**  
- Németh Gergő  
- Papp Ármin  

---

## Projekt áttekintés
Az **Explore** egy komplex, full-stack webalkalmazás, amely egyetlen letisztult felületen integrálja a túraszervezést és felszerelésbérlést, miközben személyre szabott közösségi élményt nyújt.

Célunk egy modern, intelligens platform létrehozása, amely kiváltja a jelenlegi töredezett és elavult megoldásokat.

---

##  Projekt célja
A meglévő rendszerek problémái:
- Töredezett információk  
- Elavult felhasználói felületek  
- Személyre szabhatóság hiánya  

 **Megoldás:**  
Egy **Single Page Application (SPA)** alapú rendszer, amely:
- intelligens ajánlórendszert használ  
- integrálja a túrákat és bérlést  
- javítja a felhasználói élményt  

---

##  Fő funkciók

###  Személyre szabás
- Intelligens ajánlórendszer  
- Túratípus alapú szűrés (hegyi, vízi, városi)

### 🗓️ Túrafoglalás
- Gyors jelentkezés  
- Időpontkezelés  
- Létszámkorlát  

###  Felszerelésbérlés
- Integrált rendszer  
- Túrához kapcsolt eszközök  

###  Hőtérkép
- Interaktív térkép  
- Népszerű útvonalak  

### Galéria
- Felhasználói képfeltöltés  
- Túra beszámolók  

###  Admin felület
- Szerepkör-alapú hozzáférés (RBAC)  
- CRUD műveletek  
- Felhasználó- és foglaláskezelés  

---

##  Technológiai stack

###  Frontend
- React.js (Vite)  
- CSS Grid / Flexbox  
- Material UI  
- Leaflet.js + Heatmap  
- Context API  

###  Backend
- Node.js  
- Express.js (REST API, MVC)  
- JWT & Bcrypt  
- Node-cron  

###  Adatbázis & DevOps
- MySQL  
- Docker & Docker Compose  

---

##  Csapatmunka

###  Németh Gergő
- Rendszerarchitektúra  
- Autentikáció  
- Foglalási logika  
- State management  
- E2E tesztelés (Selenium)

###  Papp Ármin
- Adatbázis tervezés  
- Hőtérkép & galéria  
- Admin felület  
- Unit tesztek (Jest)

 **Módszertan:**
- Agilis fejlesztés  
- Heti sprintek  
- CI  
- Pair programming  

---

##  Adatbázis
- 3NF normalizált MySQL  
- 14 tábla  

### Fő részek:
**Felhasználók és interakciók**
- Felhasználók  
- Jogosultságok  
- Foglalások  
- Preferenciák  

**Túrák és felszerelések**
- Túrák  
- Üzemeltetők  
- Felszerelések  
- Galéria  

---

##  Tesztelés

###  Manuális
- Postman (API tesztelés)

###  Unit tesztek
- Jest  

###  E2E
- Selenium WebDriver  
- 25 teszteset  
- Chrome  

---

##  Eszközök

**Design:**
- Figma  
- Canva  
- Inkscape  

**Fejlesztés:**
- VS Code  
- Git & GitHub  

**Adatbázis:**
- Docker  
- phpMyAdmin  

**Projektmenedzsment:**
- Moodle  
- Discord  
- Google Drive  

---

##  Futtatás

A rendszer Docker konténerekben fut, `.env` konfigurációval.

### ▶️ Indítás:

```bash
node init.js



