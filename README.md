# CareConnect - Healthcare Support NGO Platform

CareConnect is a modern, premium, fully responsive web application built for a healthcare support Non-Governmental Organization (NGO). The platform bridges the gap between vulnerable patients seeking medical aid and volunteers offering their healthcare skills and time.

---

## 🌟 Project Overview

CareConnect allows patients to submit structured aid requests and volunteers to sign up for community clinics. All submissions are saved to the browser's `localStorage` and synchronized in real-time with an interactive **Admin Dashboard**. It also features a floating **AI FAQ Chatbot Assistant** and a clean **Dark/Light Mode toggle**.

---

## 🚀 Features

1. **Home Page**: Includes a sleek hero section, mission statement, testimonial grids, animated statistics counters, and direct Call-to-Actions (CTAs).
2. **Patient Support Form**: Captures full patient profile details (Name, Age, Gender, Phone, Email, Health Concern, Category of Support, Notes) and yields a unique Reference ID.
3. **Volunteer Registration Form**: Gathers contact details, city, weekly availability, and a multi-select skillset register (Medical Support, Counseling, Logistics, etc.).
4. **AI FAQ Chatbot Assistant**: Floating chat window that answers queries about requests, volunteering, and donations. Employs keyword matching and displays a natural typing indicator.
5. **Admin Dashboard**:
   - Programmatically counts and reports total registrations.
   - Summarizes activity using an **automated activity statement** (e.g. *"Currently we have received 12 support requests and 8 volunteer registrations. The most requested category is Diagnostics."*).
   - Lists recent patient and volunteer records with expandable drawers for complete detail views.
   - Includes developer helpers to **Seed Mock Data** and **Clear Database**.
6. **Responsive Sticky Navigation**: Highlights active links automatically based on the user's scroll position (ScrollSpy) and collapses into an overlay menu on mobile.
7. **Premium Styling & Dark Mode Toggle**: Built with Tailwind CSS v4, supporting dynamic dark and light mode shifts with CSS transitions.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **Core Library**: [React 19](https://react.dev/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Storage**: `localStorage` (Browser Persistence)

---

## 🤖 AI Chatbot Explanation

The floating chatbot is designed as a quick FAQ helper. It operates by parsing the user's input string for specific keyword tokens. 

### Keyword Dataset Rules

| Target Area | Keywords Tracked | Bot Response |
| :--- | :--- | :--- |
| **Requesting Support** | `request`, `support`, `patient`, `get help`, `need help` | Explains the Patient Support form process, timeline (24-48 hours), and medical board review. |
| **Volunteering Fees** | `volunteer`, `free`, `cost`, `charge`, `pay`, `fee` | Confirms that joining and volunteering with the NGO is entirely free. |
| **Services Offered** | `service`, `provide`, `do`, `offer`, `activities` | Summarizes medical consultation, diagnostic sponsorship, pharmacy support, and camps. |
| **Donations** | `donate`, `donation`, `give`, `money`, `fund` | Informs the user on donation methods and provides mock contact email/phone for contributions. |
| **How to Volunteer** | `become`, `join`, `sign up`, `how to volunteer` | Directs the user to the Volunteer Registration section. |
| **Timelines** | `time`, `long`, `duration`, `wait`, `receive`, `hours` | States that applications are processed within 24 to 48 hours. |
| **Fallback** | *No matching keywords* | *"Thank you for your question. Our team will contact you soon."* |

Additionally, the bot displays a floating bouncing dots animation (`dot-flashing`) for `1.2 seconds` before posting answers to simulate a realistic live assistant.

---

## 🏥 NGO Use Case

Non-Governmental Organizations (NGOs) operating in low-resource environments need simple, reliable digital intakes. CareConnect fits this use case by:
1. **Intaking Patients**: Structuring requests by category (Medicines, Financial Aid, Diagnostics) so medical review boards can prioritize severe cases.
2. **Coordinating Volunteers**: Registering specialists by skills and availability so organizers can mobilize the right clinicians for specific health camps.
3. **Data Summarization**: Enabling field administrators to immediately see metrics and aggregate demands via the automated activity report.

---

## 💻 Local Installation Steps

Follow these steps to run CareConnect on your local development machine:

### 1. Prerequisites
Make sure you have [Node.js (v18.0.0 or higher)](https://nodejs.org/) installed.

### 2. Install Dependencies
Run the install command inside the project directory:
```bash
npm install
```

### 3. Start Development Server
Start the local Next.js compiler:
```bash
npm run dev
```

### 4. View in Browser
Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

---

## ☁️ Deployment Steps for Vercel

CareConnect is fully optimized and production-ready for deployment on [Vercel](https://vercel.com/):

### Option 1: Via Vercel Git Integration (Recommended)
1. Push your local repository to a remote server (GitHub, GitLab, or Bitbucket).
2. Log in to your [Vercel Dashboard](https://vercel.com/).
3. Click **Add New** > **Project** and import your repository.
4. Vercel automatically detects Next.js settings. Keep the default build settings:
   - **Framework Preset**: `Next.js`
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
5. Click **Deploy**. Your app will be live on a production-grade URL in under a minute.

### Option 2: Via Vercel CLI
If you prefer terminal-based deployment:
1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run the deployment command in the project root:
   ```bash
   vercel
   ```
3. Follow the CLI wizard prompts. Once ready, run the following for production:
   ```bash
   vercel --prod
   ```
