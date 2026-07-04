# Sourav Yadav — Protocol Engineer & Smart Contract Security Researcher

A high-performance, premium dark-themed personal portfolio showcasing my work as a **Protocol Engineer & Smart Contract Security Researcher**. Built with modern web technologies, it highlights my competitive audit archive, comprehensive protocol case studies, and engineering achievements.

## 🛠️ Tech Stack

- **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** Tailwind CSS / Custom CSS Variables (Premium Dark Aesthetic)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Form Handling:** [Web3Forms](https://web3forms.com/) (Serverless Contact Form)

## ✨ Key Features

- **Security Research Archive:** Dynamic mapping of competitive audits across Sherlock, Code4rena, and Cantina, complete with severity breakdown, timeline, and platform-specific styling.
- **Project Case Studies:** Deep-dive breakdown of protocol engineering work, system architecture, key metrics, and roadmap timelines.
- **Interactive Methodology:** Custom CSS-grid based interactive flow diagram for my audit methodology.
- **Web3Forms Integration:** Fully functional contact form connected directly to email without requiring a dedicated backend server.
- **Data-Driven UI:** The entire site is powered by isolated data files in `src/data`, making it incredibly easy to update stats, projects, and findings without touching UI code.

## ⚙️ Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sourav-IIITBPL/sourav.git
   cd sourav
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add your Web3Forms Access Key to enable the contact form functionality:

   ```env
   NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
   ```

   _(Note: The app will still compile without this key, but the contact form will not successfully send messages.)_

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running locally.
