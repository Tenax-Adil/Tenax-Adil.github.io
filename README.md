# Tenax-Adil.github.io
# ⚡ Silicon-to-Software Portfolio

Welcome to the repository for my personal portfolio! I'm **Adil**, a final-year Electronics & Computer Engineering student based in India. I build at the seam where hardware meets software—from bare-metal microcontroller firmware to full-stack web applications.

This site is designed with a sleek, developer-centric retro/neon terminal aesthetic, featuring interactive terminal booting animations, custom accent controls, and responsive layouts.

🚀 **Live Site:** adilbuild.me

---

## 🛠️ Tech Stack & Architecture

This portfolio is built using modern web technologies optimized for speed, aesthetics, and ease of maintenance:

*   **Framework:** [Next.js 14](https://nextjs.org/) (App Router) & [React](https://reactjs.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/) for smooth, declarative transitions
*   **Scrolling:** [Lenis](https://lenis.darkroom.engineering/) for high-performance smooth scrolling
*   **Language:** [TypeScript](https://www.typescriptlang.org/) for robust static typing

### ⚙️ Content-Driven Design
The entire site is configured dynamically from a single source of truth: **[data/portfolio.json](file:///home/adil/my%20time/portfolio/data/portfolio.json)**.
No need to modify layout code to update text, stats, or projects; simply update the JSON structure, and the changes will render immediately.

---

## 📁 Key Projects Featured

### 1. Dual-Mode Patient Routing System `[Web/Full-stack]`
*   **Summary:** A real-time vitals dashboard featuring local bedside kiosk and remote clinician views.
*   **Stack:** Next.js, TypeScript, WebSockets, Node.js, Tailwind CSS
*   **Features:** Real-time data streaming, automatic threshold-based alerts, and audit trails.

### 2. Gas Leakage Detector `[Embedded/IoT]`
*   **Summary:** A standalone safety node using an MQ-sensor with a buzzer alarm and threshold calibration.
*   **Hardware:** MQ-2 gas sensor, Arduino, GSM Module, Buzzer, Temperature sensor, Status LEDs
*   **Firmware:** C/C++ using the Arduino framework

---

## ⚡ Development & Deployment

### Local Setup

To run this project locally, make sure you have [Node.js](https://nodejs.org/) installed, then follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Tenax-Adil/Tenax-Adil.github.io.git
    cd Tenax-Adil.github.io
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

4.  **Build for production:**
    ```bash
    npm run build
    ```

### Updating Content

To update the bio, projects, stats, or social links:
1. Open **[data/portfolio.json](file:///home/adil/my%20time/portfolio/data/portfolio.json)**.
2. Edit or append objects (refer to **[CONTENT.md](file:///home/adil/my%20time/portfolio/CONTENT.md)** for detailed schema definitions).
3. Commit and push your changes to trigger automatic deployment via GitHub Actions.

---

## ✉️ Connect with Me

*   **LinkedIn:** [/in/adil-khan001](https://www.linkedin.com/in/adil-khan001)
*   **GitHub:** [@Tenax-Adil](https://github.com/Tenax-Adil)
*   **Email:** [adilmurtuzakhan@gmail.com](mailto:adilmurtuzakhan@gmail.com)
