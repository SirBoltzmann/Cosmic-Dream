# 🌌 **Cosmic Dream**

An interactive and intimate diary where every thought is an foreign asteroid floating in a calm galaxy.. A poetical experience for those who love watching the cosmos every night.. to dive in your cosmic dream...

Un diario íntimo e interactivo donde cada pensamiento es un asteroide errante flotando en una galaxia en calma.  
Una experiencia poética para explorar tu propio cosmos interior....

---

## ✨**📋 Inspiration & MVP (minimum viable product)**

**Inspiration and Mission:**
Make a private and personal space where thoughts and secrets can be visualised as glowing asteroids drifting away through the galaxy..


Crear un espacio personal donde los pensamientos y reflexiones se visualicen como asteroides luminosos flotando lentamente sobre una galaxia giratoria..

**MVP:**
- Render and show existing notes and thoughts from our Database of registered and logued users.
- Visualize every note/thought as a floating asteorid...
- Every asteroid shows a modal with all its content (title, content, images, etc) and plays a song (soon), all when clicked.
- Save data on the Cloud.
- Save users data with a Log-in/Log-out system.
- Make transitions, and show animations to cards, etc.

**Nice-to-have (soon...):**
- Make skeletons to my UI
- Share thoughts with other users.
- Inserts Images in a note/thought.
- Create more text edition options in the Editor like custom font sizes (h2, h3), etc.
---

## ✨** File Structure 🗂️**
```
src
    /app/ # Main Routes
        page.tsx # Main note page
        favorites.tsx # Favorite notes
        archive.tsx # Archived notes
        trash bin.tsx # Deleted notes
        setting.tsx # Settings
        aboutMe.tsx # About me (The Developer <3)
        FollowMe.tsx # Follow me (you can ^^)

    /components/ # Reusable components
        notes/ 
            NoteCard.tsx
            NoteEditor.tsx
            NoteModal.tsx
            NotesList.tsx

        ui/
            Buttons.tsx
            SideBar.tsx
            TopBarTrigger.tsx
        

    /styles/ # Global styles
        globals.css

    /public/ # Static..
    /images/ # Imágenes de respaldo
    /videos/ # Video de la galaxia
    /sounds/ # Sonidos de los asteroides

    /data/ # NOT USED YET 

    /utils/ # NOT USED YET 

    /hooks/ # NOT USED YET
```

---

## **🛣️ Roadmap 🌌**

### 🌱 Stage 1: Basic App Structure & UI (We're here yet... <3)
- [x] Config Next.js + Tailwind.
- [x] Define color palette, styles and fonts.
- [x] Create the main page.
- [x] Code the logic for creating, editing and deleting notes.
- [x] Create every page and its content.

### 🌷 Stage 2: Improve UX/UI and Code Elegant Animations
- [x] Improve UI (responsiveness, etc)
- [x] Change the Note Card UI from a Classic Note to an Asteroid.
- [x] Make asteroids float.
- [x] Create animations.

### 🌻 Stage 3: Improve and Scalability
- [ ] Log-In and sessions with NextAuth.
- [ ] User Authentication.
- [ ] Use Firebase as database for storing users data and notes.

---

## **🔑 Log-in and Sessions  with Next.js**
### NextAuth.js
- Works pretty good with Next.js's App Router.
- Don't need a separate backend: Run like API Routes inside the app.

### Manage:
- Providers (Google, GitHub, Discord, etc.).
- Login with your own credentials (username/email + password).
- Safe sesions with JWT or Cookies.
- Documentation: next-auth.js.org
- Ready-to-use hooks:

```
    import { useSession, signIn, signOut } from "next-auth/react";
```
---

