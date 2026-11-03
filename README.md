⚙️ Soumma Chakraborty — Engineering Portfolio

<p align="center">
  <strong>DESIGN. ENGINEER. INNOVATE.</strong>
  <br />
  A digital showcase of mechanical engineering, precision design, and modern web technology.
</p><p align="center">
  <a href="https://github.com/soupornoDev/portfolio-soumma">
    <img src="https://img.shields.io/badge/Repository-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repository" />
  </a>
  <img src="https://img.shields.io/badge/Framework-Next.js-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p><p align="center">
  <i>Precision in engineering. Creativity in design. Excellence in execution.</i>
</p>---

📐 Overview

Welcome to the source code of my personal engineering portfolio.

I am Soumma Chakraborty, a Mechanical Engineering professional focused on mechanical design, CNC machine design, CAD/CAM technologies, and product development.

This portfolio represents the intersection of traditional mechanical engineering principles and modern digital experiences.

The website is designed to showcase my engineering background, technical capabilities, design projects, and professional journey through an elegant, interactive, and responsive interface.

Rather than functioning as a conventional online resume, this portfolio serves as a digital engineering workspace — presenting my skills, projects, and design philosophy in a structured and visually engaging way.

«Engineering is not just about designing components. It is about transforming ideas into practical, precise, and efficient solutions.»

---

✨ Design Philosophy

The portfolio follows a premium, minimal, and engineering-inspired design language.

Principle| Description
Precision| Clean layouts, structured content, and attention to detail
Simplicity| Minimal interfaces that prioritize meaningful information
Performance| Efficient rendering and optimized user experiences
Responsiveness| A consistent experience across desktop, tablet, and mobile
Accessibility| Thoughtful navigation, readable content, and usability
Professionalism| A design language suitable for recruiters and engineering professionals

The visual direction is inspired by modern engineering interfaces, precision machinery, technical documentation, and contemporary digital portfolios.

---

🚀 Features

🎨 Modern Portfolio Experience

- Premium and minimal visual design.
- Responsive layouts for different screen sizes.
- Carefully structured engineering-focused content.
- Professional typography and visual hierarchy.
- Interactive UI elements.
- Consistent design language across portfolio sections.

🌓 Theme Experience

The interface supports a theme-aware design.

- Light mode.
- Dark mode.
- Theme persistence through the existing theme provider.
- Consistent colors across the interface.

🧑‍💻 Professional Profile

A structured presentation of my professional background, including:

- Mechanical Engineering education.
- CAD/CAM specialization.
- Technical skills.
- Engineering interests.
- Professional experience.
- Selected projects.
- Contact and professional links.

⚙️ Engineering Project Showcase

The portfolio is intended to highlight practical engineering work, including:

- CNC Machine Design.
- Product Design.
- 3D Modelling.
- Sheet Metal Design.
- Surface Modelling.
- CAD/CAM.
- GD&T.
- FEA Simulation.

Project information is organized to communicate the engineering problem, design approach, tools used, and outcome.

📱 Responsive Interface

The application is designed to adapt to:

- Desktop workstations.
- Laptops.
- Tablets.
- Mobile devices.

🔍 Technical SEO

The project includes a foundation for search engine optimization through:

- Structured metadata.
- Semantic HTML.
- Search engine discoverability.
- Sitemap generation.
- Robots.txt configuration.
- Canonical URLs.
- Open Graph metadata.
- Google Search Console verification.

The exact implementation should be verified against the current source code and deployment configuration.

---

🛠️ Technology Stack

The project uses a modern web development stack.

Frontend

Technology| Purpose
Next.js| React framework and application architecture
React| Component-based user interface
TypeScript| Type safety and maintainable code
Tailwind CSS| Utility-first styling
CSS| Custom visual styling and animations
Geist| Typography

UI & Application Architecture

Technology| Purpose
Next.js App Router| Routing and application layouts
React Components| Reusable interface elements
ThemeProvider| Theme management
shadcn/ui| UI components, where integrated
Anime.js| Animation, where integrated

Deployment & Infrastructure

Technology| Purpose
Vercel| Application deployment
Git| Version control
GitHub| Source code management
MongoDB| Database, where used by the application

«The technology list should reflect the actual dependencies and integrations present in the repository. Remove any technology that is not currently implemented.»

---

🏗️ Application Architecture

The project follows a modular Next.js architecture.

The application separates page routing, reusable UI components, layout components, and portfolio content.

Architecture Overview

flowchart TD
    A[Next.js Application] --> B[App Router]
    B --> C[Root Layout]
    B --> D[Pages and Routes]

    C --> E[Theme Provider]
    C --> F[Navbar]
    C --> G[Footer]
    C --> H[Toast Container]

    D --> I[Portfolio Sections]
    I --> J[About]
    I --> K[Skills]
    I --> L[Projects]
    I --> M[Experience]
    I --> N[Contact]

    I --> O[Portfolio Data]

Project Structure

The following is an illustrative structure. The actual repository may contain additional modules.

portfolio-soumma/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   └── robots.ts
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   │
│   ├── providers/
│   │   └── ThemeProvider.tsx
│   │
│   └── ui/
│
├── lib/
│   └── portfolio-data.ts
│
├── public/
│   ├── images/
│   └── assets/
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── .gitignore
└── README.md

---

💻 Getting Started

Follow these instructions to run the portfolio locally.

Prerequisites

Ensure that the following tools are installed:

- Node.js — a version supported by the project's Next.js version.
- npm.
- Git.
- A code editor such as Visual Studio Code.

1. Clone the Repository

git clone https://github.com/soupornoDev/portfolio-soumma.git

2. Navigate to the Project

cd portfolio-soumma

3. Install Dependencies

npm install

4. Configure Environment Variables

If the application requires environment variables, create a ".env.local" file in the project root.

Example:

# Public production website URL
NEXT_PUBLIC_SITE_URL=https://your-domain.com

Replace the placeholder with the actual production domain.

If the application uses MongoDB, authentication, email services, or other backend integrations, configure the corresponding environment variables using the project's existing environment configuration.

Security: Never commit ".env.local", database credentials, API secrets, or private keys to GitHub.

5. Start the Development Server

npm run dev

Open:

http://localhost:3000

The application should now be available locally.

---

📦 Available Scripts

The available scripts depend on the project's "package.json".

Common Next.js commands include:

Command| Description
"npm run dev"| Start the development server
"npm run build"| Create a production build
"npm run start"| Start the production server
"npm run lint"| Run linting, if configured
"npx tsc --noEmit"| Check TypeScript types

---

🌐 Deployment

The portfolio is designed for deployment on Vercel.

Deploy with Vercel

1. Push the project to GitHub.
2. Open Vercel.
3. Import the repository.
4. Configure required environment variables.
5. Deploy the application.

Vercel supports automatic deployments when changes are pushed to the connected Git repository.

Production Environment

Before deploying, verify:

- Production environment variables.
- Correct canonical domain.
- Metadata configuration.
- Sitemap generation.
- Robots.txt configuration.
- Google Search Console verification.
- Production build success.

---

🔎 Search Engine Optimization

Search engine optimization is an important part of making a professional portfolio discoverable.

Sitemap

The Next.js sitemap route can generate an XML sitemap automatically.

Expected URL:

https://your-domain.com/sitemap.xml

The sitemap should contain valid, publicly accessible, canonical URLs.

Robots.txt

Expected URL:

https://your-domain.com/robots.txt

The robots configuration should allow search engines to crawl public portfolio content and reference the sitemap.

Google Search Console

Google Search Console can be used to:

- Verify website ownership.
- Submit the sitemap.
- Monitor indexing.
- Inspect individual URLs.
- Review search performance.
- Identify indexing issues.

Search Console:

https://search.google.com/search-console/

---

🧪 Quality Assurance

The project should be validated before production deployment.

Build Validation

npm run build

TypeScript Validation

npx tsc --noEmit

Responsive Testing

Test the interface across:

- Small mobile screens.
- Large mobile screens.
- Tablets.
- Laptops.
- Desktop monitors.

SEO Validation

Verify:

- Sitemap accessibility.
- Robots.txt accessibility.
- Canonical metadata.
- Page titles.
- Meta descriptions.
- Open Graph metadata.
- Structured data, where implemented.

---

📸 Screenshots & Preview

Visual documentation helps visitors understand the portfolio before exploring the source code.

Homepage

<!-- Add a screenshot of the homepage here -->Add your homepage screenshot to:

public/images/readme/homepage.png

Example Markdown:

![Portfolio Homepage](public/images/readme/homepage.png)

Projects Section

<!-- Add a screenshot of the engineering projects section here -->![Engineering Projects](public/images/readme/projects.png)

Mobile Experience

<!-- Add a screenshot of the responsive mobile interface here -->![Mobile Portfolio](public/images/readme/mobile.png)

---

🧭 Future Improvements

Potential enhancements for the portfolio include:

- More detailed engineering project case studies.
- Interactive 3D engineering model previews.
- CAD model visualization.
- Project filtering by engineering discipline.
- Advanced project search.
- Improved animation and interaction design.
- Enhanced accessibility auditing.
- Additional technical SEO improvements.
- Performance monitoring.
- Engineering documentation downloads.

These are potential improvements and should not be interpreted as currently implemented features.

---

👨‍🔧 About the Author

Soumma Chakraborty

Mechanical Engineer | CNC Machine Design | CAD/CAM | Product Design

My engineering interests focus on mechanical design, precision engineering, product development, and the application of modern CAD/CAM technologies to practical engineering problems.

My academic and technical background includes:

- B.Tech in Mechanical Engineering — Future Institute of Technology, Kolkata.
- PG Diploma in Tool Design & CAD/CAM — CTTC, Bhubaneswar.
- Product Design Guidelines — IIT Roorkee.
- 3D Modelling using Creo and Siemens NX.
- Sheet Metal Design.
- Surface Modelling.
- FEA using ANSYS.

I am interested in engineering challenges that combine design precision, practical functionality, and innovative problem-solving.

Connect With Me

<p align="center">
  <a href="https://github.com/soupornoDev">
    <img src="https://img.shields.io/badge/GitHub-soupornoDev-181717?style=for-the-badge&logo=github" alt="GitHub" />
  </a>
  <a href="https://www.linkedin.com/in/soumma-chakraborty-10b85a230">
    <img src="https://img.shields.io/badge/LinkedIn-Soumma%20Chakraborty-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
</p>---

📄 License

The licensing terms for this project should be defined in the repository.

If a "LICENSE" file is present, refer to that file for the applicable permissions and restrictions.

Unless otherwise stated, the portfolio's personal content, professional information, photographs, and design assets should not be assumed to be freely reusable.

---

<p align="center">
  <strong>Built with precision, creativity, and a passion for engineering.</strong>
  <br />
  <br />
  <i>Turning engineering ideas into meaningful digital experiences.</i>
</p><p align="center">
  ⭐ If you find this project interesting, consider starring the repository.
</p>