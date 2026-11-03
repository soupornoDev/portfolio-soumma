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
  organizationUrl?: string;
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
  institutionUrl?: string;
  period: string;
  location: string;
  highlights: string[];
  coreSubjects?: string[];
}

export interface CertificateItem {
  title: string;
  issuer: string;
  year?: string;
  credentialId?: string;
  skillsCovered: string[];
  category: "Degree" | "Tool Design" | "IIT / NPTEL" | "Standards" | "Analysis";
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Soumma Chakraborty",
    shortName: "Soumma Chakraborty",
    discipline: "Mechanical Engineering",
    specialization: "CNC Machine Design & Mechanical Design",
    tagline: "Precision Mechanical Design, Kinematics & CNC Machine Architecture",
    bio: "Mechanical Engineer specializing in precision machine design, CNC machine architecture, CAD/CAM integration, and structural analysis. Focused on high-rigidity machine frames, linear motion mechanics, spindle assemblies, and production-ready DFM/DFA engineering drawings.",
    location: "India",
    availability: "Available for Full-time Roles & Engineering Opportunities",
    email: "soummachakraborty.eng@gmail.com",
    linkedin: "https://www.linkedin.com/in/soumma-chakraborty-10b85a230/",
    cadSoftware: ["SolidWorks", "Siemens NX", "PowerShape", "Autodesk Fusion 360", "AutoCAD", "PTC Creo"],
    camSoftware: ["Mastercam", "PowerMill", "Wire EDM", "CNC Milling & Turning"],
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
      id: "key-ring-press-tool",
      title: '"KEY RING" Press Tool Design & Manufacture',
      subtitle: "Product Design, Strip Layout, Die Assembly, CAM & Press Stamping Run",
      category: "Press Tool & Die Design",
      timeframe: "Tool Design & Manufacturing",
      description:
        'Complete engineering design and shopfloor manufacturing of a sheet metal press tool for a "KEY RING" product. Product modeled in SolidWorks, strip layout drafted in AutoCAD, 3D die assembly constructed in SolidWorks, toolpath generation via Mastercam CAM, and multi-machine fabrication using CNC milling, manual lathe, milling machine, surface grinding, and Wire EDM, followed by toolroom assembly and press stamping tryout.',
      specifications: [
        { label: "Product & Tool Type", value: 'Sheet Metal "KEY RING" Blanking & Piercing Tool' },
        { label: "Strip Layout Design", value: "AutoCAD (Economic Pitch & Scrap Minimization)" },
        { label: "CAD & Die Assembly", value: "SolidWorks (Punches, Die Plate, Stripper & Bolster)" },
        { label: "CAM Programming", value: "Mastercam (CNC Toolpaths & NC Code Generation)" },
        { label: "Shopfloor Machining", value: "CNC Machine, Wire EDM, Manual Lathe, Milling, Grinding" },
      ],
      tolerances: "Precision Punch & Die Clearance (±0.008 mm)",
      materials: ["D2 / OHNS Tool Steel (Hardened)", "Ground Guide Pillars & Bushings", "Die Set Bolsters"],
      tools: ["SolidWorks", "AutoCAD", "Mastercam", "CNC Machine", "Wire EDM", "Grinding Machine"],
      highlights: [
        'Designed the 3D "KEY RING" product in SolidWorks and drafted the progressive strip layout in AutoCAD to maximize material utilization.',
        "Modeled and assembled all press tool components in SolidWorks: punch plate, piercing punches, blanking punch, stripper, and guide pillars.",
        "Programmed machining toolpaths using Mastercam CAM; fabricated hardened punch and die elements via Wire EDM, CNC, and precision grinding.",
        "Assembled all tool parts in the toolroom assembly area with precision fits and loaded the tool into the press machine to successfully stamp out Key Rings.",
      ],
      drawingCode: "DWG-PT-KEYRING-001",
    },
    {
      id: "hand-injection-mould-machine",
      title: "Hand Injection Mould Machine Design through Reverse Engineering",
      subtitle: "Reverse Engineering, Dimensional Inspection, CNC Machining & Full Machine Assembly",
      category: "Machine Design & Reverse Engineering",
      timeframe: "Design & Fabrication Project",
      description:
        "Full reverse engineering, precision dimensional verification, 3D CAD modeling, CNC parts manufacturing, and final mechanical assembly of a manual Hand Injection Moulding Machine. Measured physical machine components, verified tolerances in SolidWorks, machined parts using CNC machines, and assembled every part together into a fully operational machine.",
      specifications: [
        { label: "Machine Type", value: "Hand / Manual Plastic Injection Moulding Machine" },
        { label: "Engineering Method", value: "Reverse Engineering & Dimensional Inspection" },
        { label: "CAD Modeling", value: "SolidWorks (Dimensional Checks & Full Assembly)" },
        { label: "Component Machining", value: "CNC Machining Centers (Milling & Turning Operations)" },
        { label: "Final Assembly", value: "Plunger Mechanism, Heated Barrel, Clamping Unit & Frame" },
      ],
      tolerances: "Precision Slide & Bore Clearance (H7/g6 Fit)",
      materials: ["Medium Carbon Steel (EN8/EN24)", "Machined Tool Steel Barrel", "Structural Machine Base"],
      tools: ["SolidWorks", "CNC Machine", "Precision Metrology", "Lathe & Milling", "Machine Assembly"],
      highlights: [
        "Measured physical reference machine parts with precision inspection instruments to check and confirm all critical dimensional values.",
        "Created detailed 3D part models and complete mechanical assembly in SolidWorks, verifying kinematic clearances and mechanical fit.",
        "Manufactured all machine components to tight tolerances using CNC machines and precision shopfloor operations.",
        "Assembled all fabricated machine parts together in the assembly bay to achieve the final, fully functional hand injection moulding machine.",
      ],
      drawingCode: "DWG-HIM-REV-002",
    },
    {
      id: "drone-prototype-cad-cam",
      title: "Design & Manufacturing of Drone Prototype",
      subtitle: "PowerShape 3D Aerodynamic Modeling, PowerMill CAM, CNC & Wire EDM Machining",
      category: "Lightweight Aerospace & Robotics",
      timeframe: "CAD/CAM Prototyping Project",
      description:
        "Design, advanced CAM programming, multi-axis machining, and final assembly of a lightweight Drone Prototype. Designed the drone airframe using Delcam PowerShape, programmed multi-axis machining strategies using PowerMill software, manufactured structural parts using CNC machines and Wire EDM, and assembled the complete prototype chassis.",
      specifications: [
        { label: "Prototype Type", value: "Multi-Rotor Drone Airframe & Structural Assembly" },
        { label: "CAD Modeling", value: "PowerShape (Advanced 3D Surface & Solid Geometry)" },
        { label: "CAM Software", value: "PowerMill (High-Speed Multi-Axis Toolpaths)" },
        { label: "Machining Processes", value: "CNC Machining Centers & Precision Wire EDM" },
        { label: "Mechanical Assembly", value: "Frame Arms, Motor Mounts, Landing Struts & Electronics Tray" },
      ],
      tolerances: "Aerospace Prototype Tolerance (±0.02 mm)",
      materials: ["6061-T6 Aircraft Grade Aluminum", "Lightweight Composites", "High-Tensile Fasteners"],
      tools: ["PowerShape", "PowerMill", "CNC Machine", "Wire EDM", "Chassis Assembly"],
      highlights: [
        "Modeled complex aerodynamic curves and lightweight structural frame geometry using Delcam PowerShape surfacing.",
        "Engineered multi-axis CAM machining toolpaths using PowerMill software for smooth surface finish and rapid cycle times.",
        "Manufactured intricate drone frame arms and motor mount brackets using CNC machines and Wire EDM with zero thermal distortion.",
        "Assembled each drone part together, verifying motor mount perpendicularity, structural stiffness, and balance.",
      ],
      drawingCode: "DWG-DRN-PRT-003",
    },
    {
      id: "marker-stand-injection-mould",
      title: '"MARKER STAND" Injection Mould Design, Manufacture & Assembly',
      subtitle: "Core & Cavity Extraction, AutoCAD Layout, ANSYS Validation, Toolroom Machining & Machine Tryout",
      category: "Plastic Injection Mould Tooling",
      timeframe: "Tool Design & Shopfloor Production",
      description:
        'Complete tool design, finite element validation, shopfloor tooling fabrication, and production moulding of a "MARKER STAND" injection mould. Designed the Marker Stand and extracted core/cavity in SolidWorks, drew assembly layout in AutoCAD, validated tool integrity in ANSYS, machined all parts using Mastercam, manual lathe, milling machine, CNC machine, surface grinder, and Wire EDM, assembled all mould parts in the assembly area, and loaded the tool into a plastic moulding machine to produce finished Marker Stands.',
      specifications: [
        { label: "Tool Type", value: 'Plastic Injection Mould ("MARKER STAND" Multi-Plate Tool)' },
        { label: "Core & Cavity Extraction", value: "SolidWorks (Draft Analysis, Parting Surface, Shrinkage)" },
        { label: "Layout & Detailing", value: "AutoCAD (Assembly Layout & Bolster Stackup)" },
        { label: "Simulation & Validation", value: "ANSYS (Mould Plate Deflection & Injection Pressure Validation)" },
        { label: "Toolroom Machining", value: "Mastercam CAM, CNC Machine, Manual Lathe, Milling, Grinding, Wire EDM" },
      ],
      tolerances: "Core/Cavity Match < 0.005 mm (Flash-Free Molding)",
      materials: ["P20 Pre-Hardened Mould Steel", "EN9/C45 Bolster Plates", "Hardened Guide Pins & Ejector Pins"],
      tools: ["SolidWorks", "AutoCAD", "ANSYS", "Mastercam", "CNC Machine", "Wire EDM", "Grinding Machine"],
      highlights: [
        'Designed the 3D "MARKER STAND" product and extracted core and cavity blocks with proper draft angles and shrinkage allowance in SolidWorks.',
        "Drew full assembly layout in AutoCAD and structurally validated mould plate rigidity under injection pressure using ANSYS FEA.",
        "Manufactured each part on the shop floor using Mastercam CAM, CNC machine, manual lathe, milling machine, surface grinder, and Wire EDM.",
        "Assembled all mould plates, guide pillars, cooling lines, and ejector mechanisms in the toolroom assembly area.",
        "Loaded the injection mould into the plastic moulding machine to successfully produce defect-free, high-finish Marker Stands.",
      ],
      drawingCode: "DWG-IM-MS-004",
    },
  ] as Project[],

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
        { name: "NX", tag: "Advanced" },
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
      title: "Technical Documentation & Management",
      categoryCode: "SK-06",
      skills: [
        { name: "Technical Drawing & Revision Control", tag: "Standard" },
        { name: "Bill of Materials (BOM) Generation", tag: "Systems" },
      ],
    },
  ],

  experience: [
    {
      id: "exp-jyoti-cnc",
      role: "Quality Assurance Engineer",
      organization: "Jyoti CNC Automation Ltd.",
      organizationUrl: "https://www.linkedin.com/company/13664988/",
      location: "Rajkot, Gujarat, India (Hybrid)",
      period: "May 2023 – Aug 2025 · 2 yrs 4 mos",
      type: "Full-time",
      description:
        "Quality Audit, CNC based Product development, and application of 7 QC tools in precision machine tool manufacturing and assembly at Jyoti CNC Automation Ltd.",
      achievements: [
        "Conducted comprehensive Quality Audits across CNC machine components, casting sub-structures, and machine assemblies.",
        "Executed CNC-based product development and test-cut validations to verify dimensional accuracy, positioning repeatability, and surface finish.",
        "Applied 7 QC tools (Cause-and-Effect diagrams, Pareto charts, Check sheets, Histograms, Scatter diagrams, Control charts, Stratification) for root cause analysis and defect prevention.",
        "Conducted geometric accuracy inspections: spindle runout, axis backlash, squareness, and alignment adhering to precision machine tool standards.",
      ],
      techStack: [
        "Quality Auditing",
        "CNC Manufacturing",
        "7 QC Tools",
        "Quality Control (QC)",
        "Dimensional Inspection",
        "Machine Tools",
      ],
    },
  ] as ExperienceItem[],

  education: [
    {
      degree: "Post Graduate Diploma in Tool Design and CAD CAM",
      field: "Industrial and Product Design",
      institution: "Central Tool Room and Training Centre (CTTC), Bhubaneswar",
      institutionUrl: "https://www.linkedin.com/in/soumma-chakraborty-10b85a230/",
      period: "Nov 2025 – Nov 2026",
      location: "Bhubaneswar, Odisha, India",
      highlights: [
        "Specialized in advanced Tool Design: Plastic Injection Moulds, Sheet Metal Press Tools, Die Casting Dies, and Jigs & Fixtures.",
        "Parametric CAD modeling and assembly drafting using Siemens NX and PTC Creo.",
        "Industrial tooling standards, core/cavity extraction, strip layout design, and DFM methodologies.",
      ],
      coreSubjects: [
        "Siemens NX",
        "PTC Creo",
        "Press Tool Design",
        "Injection Mould Design",
        "Die Casting Dies",
        "Jigs & Fixtures",
        "CAD/CAM",
        "Industrial & Product Design",
      ],
    },
    {
      degree: "Advance Certificate Course in CNC Machining",
      field: "Mechanical Engineering & CNC Manufacturing",
      institution: "MSME KOLKATA (MSME Technology Centre)",
      institutionUrl: "https://www.linkedin.com/in/soumma-chakraborty-10b85a230/",
      period: "May 2022 – May 2023",
      location: "Kolkata, West Bengal, India",
      highlights: [
        "Extensive practical programming and operation of multi-axis CNC milling and turning machines.",
        "CAM programming with Mastercam: 2D/3D toolpath creation, feeds/speeds calculation, and NC post-processing.",
        "Hands-on workshop machining, tool setting, G-code/M-code verification, and part quality inspection.",
      ],
      coreSubjects: [
        "Mastercam",
        "CNC Manufacturing",
        "CNC Milling & Turning",
        "G-Code / M-Code Programming",
        "Precision Metrology",
        "Shopfloor Machining",
      ],
    },
    {
      degree: "Bachelor of Technology (B.Tech)",
      field: "Mechanical Engineering",
      institution: "FUTURE INSTITUTE OF TECHNOLOGY",
      institutionUrl: "https://www.linkedin.com/school/15112105/",
      period: "2017 – 2021",
      location: "Kolkata, West Bengal, India",
      highlights: [
        "Four-year undergraduate degree program in Mechanical Engineering.",
        "Design modeling and 2D detailing using SOLIDWORKS and AutoCAD.",
        "Studied machine elements, mechanics of solids, manufacturing technology, thermodynamics, and fluid dynamics.",
      ],
      coreSubjects: [
        "SOLIDWORKS",
        "AutoCAD",
        "Machine Design",
        "Kinematics & Dynamics of Machinery",
        "Manufacturing Technology",
        "Strength of Materials",
      ],
    },
    {
      degree: "Higher Secondary (10+2)",
      field: "Science Stream",
      institution: "Harinavi D.V.A.S High School",
      period: "2015 – 2017",
      location: "Kolkata, West Bengal, India",
      highlights: [
        "Higher secondary education with a strong scientific foundation in Physics, Chemistry, and Mathematics.",
      ],
      coreSubjects: ["Physics", "Chemistry", "Mathematics"],
    },
    {
      degree: "Secondary Education (10th Standard)",
      field: "General Academic Curriculum",
      institution: "Sri Ramakrishna Ashrama Institute",
      period: "Completed Apr 2015",
      location: "Kolkata, West Bengal, India",
      highlights: [
        "Secondary school education emphasizing mathematics, physical sciences, and academic fundamentals.",
      ],
    },
  ] as EducationItem[],

  certificates: [
    {
      title: "Mechanical Engineer",
      issuer: "Future Institute of Technology, Kolkata",
      year: "2017 – 2021",
      category: "Degree",
      skillsCovered: ["SOLIDWORKS", "AutoCAD", "Machine Design", "Manufacturing Technology"],
    },
    {
      title: "Post Graduate Diploma in Tool Design and CAD & CAM",
      issuer: "Central Tool Room and Training Centre (CTTC), Bhubaneswar",
      year: "2025 – 2026",
      category: "Tool Design",
      skillsCovered: ["Siemens NX", "PTC Creo", "Press Tool Design", "Injection Mould Design"],
    },
    {
      title: "Tool & Machine Design: Injection Moulding, Jigs & Fixture, Die Casting, Press Tool",
      issuer: "Tool Design & Manufacturing Specialization",
      year: "Specialization",
      category: "Tool Design",
      skillsCovered: ["Injection Moulding", "Jigs & Fixture", "Die Casting", "Press Tool Design", "Product & Machine Design"],
    },
    {
      title: "Certification on Principles of Casting Technology",
      issuer: "IIT ROORKEE (NPTEL)",
      year: "IIT Certified",
      category: "IIT / NPTEL",
      skillsCovered: ["Casting Technology", "Gating & Riser Design", "Moulding Sands", "Solidification & Defects"],
    },
    {
      title: "Certification on Engineering Metrology",
      issuer: "IIT KANPUR (NPTEL)",
      year: "IIT Certified",
      category: "IIT / NPTEL",
      skillsCovered: ["Engineering Metrology", "Limits, Fits & Tolerances", "Surface Finish (Ra/Rz)", "CMM & Precision Gauging"],
    },
    {
      title: "Certification on Automation in Production System and Management",
      issuer: "IIT KHARAGPUR (NPTEL)",
      year: "IIT Certified",
      category: "IIT / NPTEL",
      skillsCovered: ["Automation in Production", "CNC & Transfer Lines", "Production Management", "FMS & Industrial Robotics"],
    },
    {
      title: "Certification on Principles of Industrial Engineering",
      issuer: "IIT ROORKEE (NPTEL)",
      year: "IIT Certified",
      category: "IIT / NPTEL",
      skillsCovered: ["Industrial Engineering", "Work Study & Method Study", "Facility Layout", "Productivity Optimization"],
    },
    {
      title: "Certification on Manufacturing Guidelines for Product Design",
      issuer: "IIT ROORKEE (NPTEL)",
      year: "IIT Certified",
      category: "IIT / NPTEL",
      skillsCovered: ["DFM / DFA Guidelines", "Product Design for Tooling", "Material Selection", "Cost Optimization"],
    },
    {
      title: "Certification on Operations Management",
      issuer: "IIT ROORKEE (NPTEL)",
      year: "IIT Certified",
      category: "IIT / NPTEL",
      skillsCovered: ["Operations Management", "Supply Chain Control", "Capacity Planning", "Quality Systems"],
    },
    {
      title: "Certification on Toyota Production System",
      issuer: "IIT ROORKEE (NPTEL)",
      year: "IIT Certified",
      category: "IIT / NPTEL",
      skillsCovered: ["Toyota Production System (TPS)", "Lean Manufacturing", "Kaizen & 5S", "Waste Elimination (Muda)"],
    },
  ] as CertificateItem[],
};
