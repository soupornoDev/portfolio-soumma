export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  timeframe: string;
  description: string;
  specifications: { label: string; value: string }[];
  tolerances: string;
  materials: string[];
  tools: string[];
  highlights: string[];
  drawingCode: string;
  githubUrl?: string;
}

export interface SkillCategory {
  title: string;
  categoryCode: string;
  skills: { name: string; tag: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  period: string;
  location: string;
  highlights: string[];
  coreSubjects: string[];
}

export interface CertificateItem {
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  skillsCovered: string[];
  category: "CAD" | "CNC" | "Standards" | "Analysis";
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Soumma Chakraborty",
    shortName: "Soumma C.",
    discipline: "Mechanical Engineering",
    specialization: "CNC Machine Design & Mechanical Design",
    tagline: "Precision Mechanical Design, Kinematics & CNC Machine Architecture",
    bio: "Mechanical Engineer specializing in precision machine design, CNC machine architecture, CAD/CAM integration, and structural analysis. Focused on high-rigidity machine frames, linear motion mechanics, spindle assemblies, and production-ready DFM/DFA engineering drawings.",
    location: "India",
    availability: "Available for Full-time Roles & Engineering Opportunities",
    email: "soummachakraborty.eng@gmail.com",
    github: "https://github.com/soupornoDev",
    repoUrl: "https://github.com/soupornoDev/potfolio-soumma",
    linkedin: "https://linkedin.com/in/soumma-chakraborty",
    cadSoftware: ["SolidWorks", "Autodesk Fusion 360", "AutoCAD", "PTC Creo"],
    standards: ["ASME Y14.5", "ISO 2768-m", "DIN 7168", "ISO 1101"],
  },

  technicalMetrics: [
    { label: "Design Tolerance", value: "±0.005 mm", caption: "Precision CNC fit standards" },
    { label: "Gantry Rigidity", value: "< 0.012 mm", caption: "Deflection @ 350 N tool load" },
    { label: "Linear Drive Accuracy", value: "C5 Ground", caption: "Precision preloaded ball screws" },
    { label: "Spindle Envelope", value: "24,000 RPM", caption: "Water-cooled VFD balance" },
  ],

  projects: [
    {
      id: "cnc-desktop-mill",
      title: "High-Precision 3-Axis Desktop CNC Milling Machine",
      subtitle: "Custom-Engineered Rigid Portal Gantry for Non-Ferrous & Engineering Plastics",
      category: "CNC Machine Architecture",
      timeframe: "Machine Design Capstone",
      description:
        "Full ground-up mechanical architecture of a compact 3-axis CNC milling machine engineered for high static stiffness and vibrational damping. Incorporates dual supported linear rail guides per axis, preloaded zero-backlash ball screws, and an isolated water-cooled spindle carriage.",
      specifications: [
        { label: "Working Envelope", value: "320 × 240 × 120 mm (X/Y/Z)" },
        { label: "Positional Accuracy", value: "±0.015 mm / Axis" },
        { label: "Spindle Drive", value: "1.5 kW 24,000 RPM ER11 VFD" },
        { label: "Kinematic Drive", value: "1605 C5 Ball Screws + Closed-Loop Steppers" },
        { label: "Linear Motion", value: "HGR15 Linear Rails + Flanged Carriages" },
      ],
      tolerances: "ISO 2768-f (Fine Precision Machining)",
      materials: ["6061-T6 Aluminum Tooling Plate", "4140 Hardened Alloy Steel", "Cast Iron Base Dampener"],
      tools: ["SolidWorks", "ANSYS / FEA Simulation", "Fusion 360 CAM", "G-Code Simulator"],
      highlights: [
        "Iterative FEA structural analysis reduced gantry bridge deflection by 34% under peak cutting forces.",
        "Integrated labyrinth dust seals and telescopic accordion bellows to shield linear bearing ways from swarf.",
        "Designed adjustable motor mount tensioners to eliminate angular misalignment on leadscrew couplings.",
        "Created full parametric 3D assembly and 2D fabrication drawing package with complete GD&T callouts.",
      ],
      drawingCode: "DWG-CNC-001-REV.C",
      githubUrl: "https://github.com/soupornoDev/potfolio-soumma",
    },
    {
      id: "cnc-workholding-system",
      title: "Modular Quick-Change CNC Tooling Fixture & Workholding",
      subtitle: "Zero-Point Quick Clamping Fixture Plate with Repeatable Locating System",
      category: "Tooling & Manufacturing Systems",
      timeframe: "Design & Fabrication Project",
      description:
        "Engineered a modular zero-point fixture sub-plate with diamond and cylindrical locating pins for rapid changeovers between machining setups. Engineered to withstand high cutting moments while maintaining sub-ten-micron repositioning accuracy.",
      specifications: [
        { label: "Clamping Force", value: "12 kN per Clamp Unit" },
        { label: "Locating Repeatability", value: "Within 0.005 mm" },
        { label: "Fixture Grid", value: "M8 on 25 mm Precision Pitch" },
        { label: "Hardness", value: "58-62 HRC (Locating Bushings)" },
        { label: "Overall Dimensions", value: "300 × 200 × 32 mm" },
      ],
      tolerances: "ASME Y14.5-2018 (True Position: ⌀0.008 mm)",
      materials: ["Pre-hardened 4140 Steel", "7075-T6 Hard-Anodized Aluminum", "O1 Tool Steel Bushings"],
      tools: ["SolidWorks", "AutoCAD", "GD&T Tolerance Stack-Up", "CAM Simulation"],
      highlights: [
        "Reduced part changeover and re-zeroing duration by 65% across multi-stage CNC machining cycles.",
        "Employed Kinematic Coupling principles (slot-and-pin) to prevent over-constraint and thermal binding.",
        "Low-profile clamp design maximizes tool access for 5-sided milling operations without tool collisions.",
        "Analyzed clamping deformation via FEA to guarantee zero cosmetic or dimensional part distortion.",
      ],
      drawingCode: "DWG-FIX-014-REV.B",
      githubUrl: "https://github.com/soupornoDev/potfolio-soumma",
    },
    {
      id: "rotary-4th-axis",
      title: "Precision Rotary 4th-Axis Indexing Mechanism",
      subtitle: "Harmonic Drive Backlash-Free Rotary Table for Multi-Sided Machining",
      category: "Precision Mechanisms",
      timeframe: "Applied Kinematic Design",
      description:
        "Designed a high-torque, zero-backlash 4th-axis rotary positioning unit utilizing a harmonic gear reducer. Engineered for smooth continuous rotation or high-rigidity indexing during multi-surface cylindrical milling.",
      specifications: [
        { label: "Reduction Ratio", value: "50:1 Harmonic Drive Component" },
        { label: "Backlash", value: "< 0.5 Arcmin (Near-Zero)" },
        { label: "Bearing Configuration", value: "Back-to-Back Preloaded Angular Contact (7206)" },
        { label: "Spindle Nose", value: "MT3 Morse Taper + 100 mm 3-Jaw Interface" },
        { label: "Holding Torque", value: "48 Nm @ Output Flange" },
      ],
      tolerances: "Runout < 0.006 mm TIR @ Spindle Nose",
      materials: ["Cast Ductile Iron Housing", "Case-Hardened 8620 Spindle", "High-Torque Synchronous Timing Belt"],
      tools: ["SolidWorks", "Bearing Calculation (ISO 281)", "Kinematic Sizing", "CAM Toolpaths"],
      highlights: [
        "Preloaded dual angular contact bearing arrangement handles both high radial and thrust machining forces.",
        "O-ring sealed enclosure and double-lip viton shaft seals prevent coolant wash from entering internal gears.",
        "Direct-mount optical homing index flag provides sub-arcsecond zero referencing repeatability.",
      ],
      drawingCode: "DWG-ROT-042-REV.A",
      githubUrl: "https://github.com/soupornoDev/potfolio-soumma",
    },
    {
      id: "spindle-thermal-fea",
      title: "FEA Structural Optimization & Thermal Dissipation of Spindle Mount",
      subtitle: "Topology-Optimized Mount Mitigating Thermal Growth and Spindle Drift",
      category: "FEA & Thermal Analysis",
      timeframe: "Computational Engineering Study",
      description:
        "Multi-physics structural and steady-state thermal analysis of an 80 mm high-speed CNC spindle clamp. Integrated convective air fins and internal structural web ribbing to dissipate heat while raising the primary resonance frequency above cutter excitation harmonics.",
      specifications: [
        { label: "Clamping Bore", value: "80.00 mm (+0.015 / +0.000)" },
        { label: "Mass Reduction", value: "28% via Topology Optimization" },
        { label: "First Modal Frequency", value: "318 Hz (Well above 200 Hz excitation)" },
        { label: "Max Thermal Rise", value: "Stabilized at 38°C under continuous run" },
        { label: "Bore Concentricity", value: "0.005 mm under 15 Nm bolt torque" },
      ],
      tolerances: "Cylindricity 0.005 mm / Perpendicularity 0.01 mm",
      materials: ["Cast A356-T6 Aluminum", "Grade 10.9 Zinc-Flake Fasteners"],
      tools: ["ANSYS Structural", "SolidWorks Simulation", "MATLAB Heat Transfer Solver"],
      highlights: [
        "Eliminated thermal expansion bias along the Z-axis, reducing tool tip thermal drift by 45%.",
        "Modal analysis confirmed natural vibration frequencies avoid resonant interaction with 2-flute & 4-flute endmills.",
        "Optimized clamping split geometry to provide uniform hoop stress without ovalizing the precision spindle cartridge.",
      ],
      drawingCode: "DWG-FEA-080-REV.D",
      githubUrl: "https://github.com/soupornoDev/potfolio-soumma",
    },
  ],

  skills: [
    {
      title: "CAD & 3D Parametric Modeling",
      categoryCode: "SK-01",
      skills: [
        { name: "SolidWorks (Parts & Assemblies)", tag: "Expert" },
        { name: "Autodesk Fusion 360", tag: "Advanced" },
        { name: "AutoCAD (2D Drafting & Detailing)", tag: "Core" },
        { name: "PTC Creo Parametric", tag: "Familiar" },
        { name: "Sheet Metal & Weldments", tag: "Applied" },
        { name: "Top-Down Skeleton Modeling", tag: "Advanced" },
      ],
    },
    {
      title: "CNC Machining & CAM Programming",
      categoryCode: "SK-02",
      skills: [
        { name: "G-Code & M-Code Programming", tag: "Core" },
        { name: "Multi-Axis CAM Toolpaths", tag: "Advanced" },
        { name: "Speeds & Feeds Calculation", tag: "Engineering" },
        { name: "Milling & Turning Operations", tag: "Hands-on" },
        { name: "Work Coordinate Offsets (G54-G59)", tag: "Practical" },
        { name: "Toolpath Simulation & Collision Avoidance", tag: "Rigorous" },
      ],
    },
    {
      title: "Design Standards & Engineering Analysis",
      categoryCode: "SK-03",
      skills: [
        { name: "GD&T (ASME Y14.5 / ISO 1101)", tag: "Core Standard" },
        { name: "Tolerance Stack-Up (Worst-Case & RSS)", tag: "Precision" },
        { name: "DFM / DFA Principles", tag: "Production" },
        { name: "FEA Static Stress & Modal Analysis", tag: "Analytical" },
        { name: "Thermal Gradient Simulation", tag: "Applied" },
        { name: "Material Selection & Heat Treatment", tag: "Metallurgy" },
      ],
    },
    {
      title: "Machine Kinematics & Precision Mechanics",
      categoryCode: "SK-04",
      skills: [
        { name: "Precision Ball Screws & Lead Screws", tag: "Kinematics" },
        { name: "Linear Guide Rails & Carriages", tag: "Bearings" },
        { name: "Spindle Design & Bearing Preload", tag: "Assembly" },
        { name: "Stepper & Closed-Loop Servo Drives", tag: "Mechatronics" },
        { name: "Timing Belt & Harmonic Reducers", tag: "Power Trans." },
        { name: "Backlash Compensation Systems", tag: "Precision" },
      ],
    },
    {
      title: "Metrology, Workshop & Prototyping",
      categoryCode: "SK-05",
      skills: [
        { name: "Vernier & Digital Micrometers", tag: "Inspection" },
        { name: "Dial Indicators & Runout (TIR)", tag: "Alignment" },
        { name: "Surface Roughness (Ra/Rz) Verification", tag: "Quality" },
        { name: "Manual Lathe & Milling Fundamentals", tag: "Hands-on" },
        { name: "3D Rapid Prototyping (FDM/SLA)", tag: "Iterative" },
        { name: "CMM Inspection Principles", tag: "Metrology" },
      ],
    },
    {
      title: "Computing & Technical Documentation",
      categoryCode: "SK-06",
      skills: [
        { name: "MATLAB / GNU Octave (Sizing Math)", tag: "Numerical" },
        { name: "Python for Mechanical Computations", tag: "Scripting" },
        { name: "Technical Drawing & Revision Control", tag: "Standard" },
        { name: "Bill of Materials (BOM) Generation", tag: "Systems" },
        { name: "Git & Version-Controlled Engineering Assets", tag: "Workflows" },
      ],
    },
  ],

  experience: [
    {
      id: "exp-1",
      role: "Mechanical Design & CNC Engineering Trainee",
      organization: "Precision Mechanical & Machine Tools Focus",
      location: "India",
      period: "Engineering Formation & Practical Studies",
      type: "Academic & Applied Engineering",
      description:
        "Dedicated focus on the mechanical architecture, structural rigidity calculations, and manufacturing workflows of precision CNC machinery and custom tooling fixtures.",
      achievements: [
        "Synthesized parametric CAD models for multi-part mechanical assemblies with full associativity and DFM verification.",
        "Produced production-grade engineering drawings compliant with ASME Y14.5 GD&T standards, featuring datum schemes, form tolerances, and runout limits.",
        "Formulated G-code cutting strategies and simulated CAM toolpaths for 2.5D and 3D surface milling on aluminum and engineering plastics.",
        "Performed linear static and modal FEA to verify factor of safety (> 2.5) and minimize vibrational deflection on machine structural frames.",
      ],
      techStack: ["SolidWorks", "Fusion 360", "GD&T", "ANSYS", "G-Code", "CAM Toolpaths"],
    },
    {
      id: "exp-2",
      role: "CAD/CAM Mechanical Projects Specialist",
      organization: "Laboratory & Prototyping Studio",
      location: "India",
      period: "Engineering Development Projects",
      type: "Design & Prototyping",
      description:
        "Spearheaded technical development from concept requirements through kinematics calculations, mechanical drafting, component sourcing, and prototype validation.",
      achievements: [
        "Engineered zero-backlash rotary and linear sub-systems using harmonic drive and preloaded recirculating ball bearings.",
        "Conducted worst-case and Root-Sum-Square (RSS) tolerance stack-up analyses across multi-component bearing assemblies.",
        "Validated prototype dimensional conformance using micrometers, dial test indicators, and gauge blocks.",
        "Documented detailed engineering bills of materials (BOM), standard operating procedures (SOP), and assembly guides.",
      ],
      techStack: ["SolidWorks", "AutoCAD", "Tolerance Stack-up", "Metrology", "DFM/DFA"],
    },
  ],

  education: [
    {
      degree: "Bachelor of Technology (B.Tech)",
      field: "Mechanical Engineering",
      institution: "Mechanical Engineering Department",
      period: "Undergraduate Engineering Curriculum",
      location: "India",
      highlights: [
        "Specialized academic focus in Machine Design, CNC Machining, Mechatronics, and Manufacturing Automation.",
        "Hands-on workshop training across manual turning, milling, grinding, CNC machine operation, and quality inspection.",
        "Capstone Project: Design, Analysis, and CAM Fabrication Validation of High-Precision CNC Machine Sub-Assemblies.",
      ],
      coreSubjects: [
        "Design of Machine Elements",
        "Kinematics & Dynamics of Machinery",
        "Manufacturing Technology & Metrology",
        "Computer-Aided Design & Manufacturing (CAD/CAM)",
        "Finite Element Methods in Engineering",
        "Strength of Materials",
        "Fluid Mechanics & Hydraulics/Pneumatics",
        "Material Science & Metallurgy",
      ],
    },
  ],

  certificates: [
    {
      title: "Certified SolidWorks Mechanical Design Professional",
      issuer: "Dassault Systèmes / Certified Standard",
      year: "Certified Competence",
      credentialId: "CSWA / Mechanical Design",
      category: "CAD",
      skillsCovered: ["Parametric 3D Modeling", "Complex Assembly Mates", "Drafting & Exploded Views", "Mass Properties Analysis"],
    },
    {
      title: "CNC Programming, G-Code & CAM Masterclass",
      issuer: "Industrial Machining & CAM Technical Training",
      year: "Certified Training",
      category: "CNC",
      skillsCovered: ["G-Code / M-Code Syntax", "Cutter Compensation (G41/G42)", "Speeds & Feeds Optimization", "Fixture Offsets"],
    },
    {
      title: "Geometric Dimensioning & Tolerancing (GD&T) per ASME Y14.5",
      issuer: "Engineering Precision Standards",
      year: "Technical Specialization",
      category: "Standards",
      skillsCovered: ["Datums & Feature Control Frames", "True Position & MMC/LMC", "Runout & Concentricity", "Profile of a Surface"],
    },
    {
      title: "Finite Element Analysis (FEA) for Mechanical Engineers",
      issuer: "Computational Mechanics & Simulation",
      year: "Applied Analysis",
      category: "Analysis",
      skillsCovered: ["Static Structural Stress", "Modal & Vibration Analysis", "Mesh Convergence Studies", "Von Mises Criteria"],
    },
  ],
};
