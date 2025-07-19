# 🌌 **Cosmic Dream**

Un diario íntimo e interactivo donde cada pensamiento es un asteroide errante flotando en una galaxia en calma.  
Una experiencia poética para explorar tu propio cosmos interior.  

---

## ✨**📋 Alcance y MVP (minimum viable product)**

**Propósito:**  
Crear un espacio personal donde los pensamientos y reflexiones se visualicen como asteroides luminosos flotando lentamente sobre una galaxia giratoria, cada uno con su propio sonido sutil y categoría.

**MVP:**
- Mostrar una galaxia giratoria en bucle como fondo animado.
- Cargar pensamientos desde un archivo JSON estático.
- Visualizar cada pensamiento como un asteroide flotante en movimiento.
- Cada asteroide muestra un modal con su texto completo y reproduce un sonido asociado.
- Diferenciar asteroides por categoría mediante colores o algo más.

**Nice-to-have (futuro):**
- Formulario para agregar nuevos pensamientos.
- Guardar datos en la nube.
- Login opcional.
- Compartir pensamientos con otros usuarios.

---

## ✨**🗂️ Estructura de carpetas**
```
/pages/ # Rutas principales
index.tsx # Página principal
about.tsx # Acerca del proyecto

/components/ # Componentes reutilizables
Asteroid.tsx
GalaxyBackground.tsx
AsteroidModal.tsx
CategoryLegend.tsx

/styles/ # Estilos globales y utilidades
globals.css

/public/ # Recursos estáticos
/images/ # Imágenes de respaldo
/videos/ # Video de la galaxia
/sounds/ # Sonidos de los asteroides

/data/ # Datos iniciales
thoughts.json

/utils/ # Funciones auxiliares
randomPosition.ts

/hooks/ # Custom hooks opcionales
```

---

## ✨**🛣️ Roadmap por fases**

### 🌱 Fase 1: Estructura básica
- [ ] Configurar Next.js + Tailwind.
- [ ] Definir paleta de colores y fuentes.
- [ ] Crear las páginas `/` y `/about`.
- [ ] Configurar el video de la galaxia como fondo.
- [ ] Cargar y mostrar asteroides como círculos flotantes.

### 🌷 Fase 2: Movimiento elegante
- [ ] Programar trayectoria lenta y suave de los asteroides.
- [ ] Colisiones opcionales o rebotes en bordes.
- [ ] Animaciones de brillo o rotación.

### 🌸 Fase 3: Modal y sonidos
- [ ] Al hacer clic en un asteroide, mostrar texto en modal.
- [ ] Reproducir sonido asociado.
- [ ] Diferenciar categorías por color.

### 🌻 Fase 4: Mejoras y escalabilidad
- [ ] Formulario para nuevas entradas.
- [ ] Backend para guardar datos dinámicos.
- [ ] Autenticación de usuario.

---

## ✨**🎨 Paleta sugerida**

|      Elemento      |         Color HEX     |
|--------------------|-----------------------|
| Fondo galaxia      | `#0B0C10` `to define` |
| Asteroides neutros | `#FFFFFF` `to define` |
| Asteroides dorados | `#F6C453` `to define` |
| Asteroides azules  | `#1F6FEB` `to define` |
| Modal fondo        | `#111218` `to define` |
| Texto              | `#E5E5E5` `to define` |

**Tipografía:**  
- Primaria: `To define`  
- Secundaria: `To define`

---

