# **All errors I've faced along the development of Cosmic Dream, and their solutions**

Un listado de todos los errores y sus fixes en este proyecto.
A list of everyone of my bugs, errors, and their respective fixes.

---

## **Errors and Solutions 🥲🌠**
- [x] My fonts weren't being applied (I used fonts/next)
- My "tailwind.config.ts" file was using CommonJS, which didn't make any sense. For JS uses CJS and TS ESM.
- I also tried to use "Parkinsans", and it looks like it doesn't exist on fonts/next anymore.
- [x] Components in which I used localStorage didn't render at the first page render
- Looks like it only was a cache problem. I just cleaned the cache, reloaded, and they executed normally. It was so stressful...