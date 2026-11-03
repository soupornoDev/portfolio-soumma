import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

function escapePdf(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

class SimplePdfBuilder {
  constructor() {
    this.objects = [];
  }

  addObject(content) {
    this.objects.push(content);
    return this.objects.length;
  }

  generate(pagesCommands) {
    const fontNormal = this.addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
    const fontBold = this.addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
    const fontOblique = this.addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>");
    const fontMono = this.addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>");

    const pagesObjId = this.addObject(""); // placeholder

    const pageObjIds = [];
    for (const streamContent of pagesCommands) {
      const streamLen = Buffer.byteLength(streamContent, "utf-8");
      const streamId = this.addObject(
        `<< /Length ${streamLen} >>\nstream\n${streamContent}\nendstream`
      );
      const pageId = this.addObject(
        `<< /Type /Page /Parent ${pagesObjId} 0 R /MediaBox [0 0 595.28 841.89] /Contents ${streamId} 0 R /Resources << /Font << /F1 ${fontNormal} 0 R /F2 ${fontBold} 0 R /F3 ${fontOblique} 0 R /F4 ${fontMono} 0 R >> >> >>`
      );
      pageObjIds.push(pageId);
    }

    this.objects[pagesObjId - 1] = `<< /Type /Pages /Kids [${pageObjIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageObjIds.length} >>`;

    const catalogId = this.addObject(`<< /Type /Catalog /Pages ${pagesObjId} 0 R >>`);

    let out = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
    const offsets = [];

    for (let i = 0; i < this.objects.length; i++) {
      offsets.push(Buffer.byteLength(out, "utf-8"));
      out += `${i + 1} 0 obj\n${this.objects[i]}\nendobj\n`;
    }

    const startXref = Buffer.byteLength(out, "utf-8");
    out += `xref\n0 ${this.objects.length + 1}\n0000000000 65535 f \n`;
    for (const offset of offsets) {
      out += `${String(offset).padStart(10, "0")} 00000 n \n`;
    }
    out += `trailer\n<< /Size ${this.objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;

    return out;
  }
}

// Page 1 Content Stream
let p1 = "";

// Header
p1 += `0.02 0.52 0.78 rg 45 798 505 2 re f 0 g\n`; // blue top accent bar
p1 += `BT /F2 20 Tf 45 770 Td (${escapePdf("SOUMMA CHAKRABORTY")}) Tj ET\n`;
p1 += `0.02 0.52 0.78 rg BT /F2 10 Tf 45 754 Td (${escapePdf("MECHANICAL ENGINEER // CAD/CAM & PRECISION CNC MACHINE DESIGN")}) Tj ET 0 g\n`;
p1 += `BT /F1 9 Tf 45 738 Td (${escapePdf("Email: soummachakraborty.eng@gmail.com  |  Portfolio: https://soumma-chakraborty.vercel.app  |  Location: India")}) Tj ET\n`;
p1 += `BT /F1 9 Tf 45 726 Td (${escapePdf("LinkedIn: linkedin.com/in/soumma-chakraborty-10b85a230  |  Availability: Full-Time Engineering Roles")}) Tj ET\n`;
p1 += `0.85 0.85 0.85 RG 0.75 w 45 716 m 550 716 l S 0 G\n`;

// Section: Professional Summary
p1 += `0.02 0.52 0.78 rg BT /F2 11 Tf 45 698 Td (${escapePdf("1. PROFESSIONAL SUMMARY")}) Tj ET 0 g\n`;
p1 += `0.85 0.85 0.85 RG 0.5 w 45 692 m 550 692 l S 0 G\n`;
p1 += `BT /F1 9 Tf 45 678 Td (${escapePdf("Mechanical Engineer specializing in CNC machine architecture, precision kinematics, CAD/CAM integration,")}) Tj ET\n`;
p1 += `BT /F1 9 Tf 45 666 Td (${escapePdf("and structural FEA simulation. Experienced in translating product concepts into high-rigidity assemblies, sheet")}) Tj ET\n`;
p1 += `BT /F1 9 Tf 45 654 Td (${escapePdf("metal stamping press tools, plastic injection moulds, and ASME Y14.5 / ISO 2768-m production drawings.")}) Tj ET\n`;

// Section: Core Technical Competencies
p1 += `0.02 0.52 0.78 rg BT /F2 11 Tf 45 634 Td (${escapePdf("2. TECHNICAL COMPETENCIES & TOOLS MATRIX")}) Tj ET 0 g\n`;
p1 += `0.85 0.85 0.85 RG 0.5 w 45 628 m 550 628 l S 0 G\n`;

p1 += `BT /F2 9 Tf 45 614 Td (${escapePdf("CAD & 3D Modeling:")}) Tj /F1 9 Tf 8 Td (${escapePdf("SolidWorks, Siemens NX, PTC Creo Parametric, Autodesk Fusion 360, AutoCAD (2D Drafting)")}) Tj ET\n`;
p1 += `BT /F2 9 Tf 45 601 Td (${escapePdf("CAM & CNC Machining:")}) Tj /F1 9 Tf 8 Td (${escapePdf("Delcam PowerShape, Delcam PowerMill, Mastercam, Multi-Axis Toolpaths, Wire EDM, G/M-Code")}) Tj ET\n`;
p1 += `BT /F2 9 Tf 45 588 Td (${escapePdf("Tool & Die Design:")}) Tj /F1 9 Tf 8 Td (${escapePdf("Sheet Metal Press Tools, Blanking/Piercing, Plastic Injection Moulds, Strip Layouts, Core/Cavity")}) Tj ET\n`;
p1 += `BT /F2 9 Tf 45 575 Td (${escapePdf("Analysis & Standards:")}) Tj /F1 9 Tf 8 Td (${escapePdf("ANSYS FEA (Structural & Thermal Deflection), GD&T (ASME Y14.5 / ISO 1101), ISO 2768-m, DFM/DFA")}) Tj ET\n`;
p1 += `BT /F2 9 Tf 45 562 Td (${escapePdf("Quality & Metrology:")}) Tj /F1 9 Tf 8 Td (${escapePdf("7 QC Tools, Vernier/Micrometers, Dial Indicators (TIR), Surface Roughness (Ra/Rz), CMM Principles")}) Tj ET\n`;

// Section: Engineering Experience
p1 += `0.02 0.52 0.78 rg BT /F2 11 Tf 45 540 Td (${escapePdf("3. PROFESSIONAL EXPERIENCE & INDUSTRY TRAINING")}) Tj ET 0 g\n`;
p1 += `0.85 0.85 0.85 RG 0.5 w 45 534 m 550 534 l S 0 G\n`;

p1 += `BT /F2 10 Tf 45 518 Td (${escapePdf("Quality Assurance & Mechanical Engineering Associate")}) Tj ET\n`;
p1 += `BT /F3 9 Tf 45 506 Td (${escapePdf("Mechanical Tooling & Manufacturing Environment  |  India")}) Tj ET\n`;
p1 += `BT /F1 9 Tf 55 492 Td (${escapePdf("* Executed dimensional inspection and runout tolerances (TIR) according to ASME Y14.5 and ISO 2768-m.")}) Tj ET\n`;
p1 += `BT /F1 9 Tf 55 480 Td (${escapePdf("* Applied 7 QC Tools (Pareto Analysis, Cause & Effect Diagrams, Control Charts) to resolve manufacturing variances.")}) Tj ET\n`;
p1 += `BT /F1 9 Tf 55 468 Td (${escapePdf("* Collaborated with CNC machinists and toolroom engineers to optimize milling, turning, and EDM workflows.")}) Tj ET\n`;

// Section: Featured Projects (Page 1: Project 1 & 2)
p1 += `0.02 0.52 0.78 rg BT /F2 11 Tf 45 444 Td (${escapePdf("4. FEATURED ENGINEERING & TOOLING PROJECTS")}) Tj ET 0 g\n`;
p1 += `0.85 0.85 0.85 RG 0.5 w 45 438 m 550 438 l S 0 G\n`;

// Project 1
p1 += `BT /F2 10 Tf 45 422 Td (${escapePdf("Project 1: 'KEY RING' Press Tool Design, Manufacture & Stamping Tryout")}) Tj ET\n`;
p1 += `BT /F3 8.5 Tf 45 410 Td (${escapePdf("SolidWorks CAD  |  AutoCAD Strip Layout  |  Mastercam CAM  |  Wire EDM & CNC Machining  |  Toolroom Assembly")}) Tj ET\n`;
p1 += `BT /F1 9 Tf 55 396 Td (${escapePdf("* Modeled 3D product in SolidWorks; designed progressive strip layout in AutoCAD for maximum material yield.")}) Tj ET\n`;
p1 += `BT /F1 9 Tf 55 384 Td (${escapePdf("* Generated multi-axis CNC toolpaths with Mastercam; fabricated hardened punch/die plates using Wire EDM & CNC.")}) Tj ET\n`;
p1 += `BT /F1 9 Tf 55 372 Td (${escapePdf("* Assembled punch plate, stripper, and guide pillars; stamped out defect-free production key rings in trial press run.")}) Tj ET\n`;

// Project 2
p1 += `BT /F2 10 Tf 45 350 Td (${escapePdf("Project 2: Hand Injection Mould Machine Design through Reverse Engineering")}) Tj ET\n`;
p1 += `BT /F3 8.5 Tf 45 338 Td (${escapePdf("Reverse Engineering  |  SolidWorks 3D Assembly  |  Precision CNC Machining  |  Full Mechanical Integration")}) Tj ET\n`;
p1 += `BT /F1 9 Tf 55 324 Td (${escapePdf("* Measured reference machine parts using precision micrometers and calipers to determine critical baseline dimensions.")}) Tj ET\n`;
p1 += `BT /F1 9 Tf 55 312 Td (${escapePdf("* Built complete kinematic 3D CAD assembly in SolidWorks, verifying slide clearances and tolerance fits (H7/g6).")}) Tj ET\n`;
p1 += `BT /F1 9 Tf 55 300 Td (${escapePdf("* Fabricated plunger mechanism, barrel, and clamping frame on CNC centers; successfully assembled complete machine.")}) Tj ET\n`;

// Project 3
p1 += `BT /F2 10 Tf 45 278 Td (${escapePdf("Project 3: Drone Prototype Design & Multi-Axis Manufacturing")}) Tj ET\n`;
p1 += `BT /F3 8.5 Tf 45 266 Td (${escapePdf("Delcam PowerShape Surfacing  |  Delcam PowerMill CAM  |  CNC Machining & Wire EDM  |  Aircraft Aluminum 6061-T6")}) Tj ET\n`;
p1 += `BT /F1 9 Tf 55 252 Td (${escapePdf("* Modeled lightweight aerodynamic curves and structural arm mounts using Delcam PowerShape 3D surfacing.")}) Tj ET\n`;
p1 += `BT /F1 9 Tf 55 240 Td (${escapePdf("* Programmed high-speed milling strategies in Delcam PowerMill for flawless surface finish and rapid cycle times.")}) Tj ET\n`;
p1 += `BT /F1 9 Tf 55 228 Td (${escapePdf("* Fabricated intricate frame arms and motor mount brackets with zero thermal distortion via Wire EDM and CNC.")}) Tj ET\n`;

// Footer Page 1
p1 += `0.85 0.85 0.85 RG 0.5 w 45 60 m 550 60 l S 0 G\n`;
p1 += `BT /F1 8 Tf 45 46 Td (${escapePdf("Soumma Chakraborty  --  Curriculum Vitae  |  soummachakraborty.eng@gmail.com")}) Tj ET\n`;
p1 += `BT /F1 8 Tf 500 46 Td (${escapePdf("Page 1 of 2")}) Tj ET\n`;

// Page 2 Content Stream
let p2 = "";

// Header
p2 += `0.02 0.52 0.78 rg 45 798 505 2 re f 0 g\n`;
p2 += `BT /F2 14 Tf 45 774 Td (${escapePdf("SOUMMA CHAKRABORTY -- CURRICULUM VITAE (CONT.)")}) Tj ET\n`;
p2 += `BT /F1 9 Tf 45 760 Td (${escapePdf("Mechanical Engineer | CNC Machine Design, CAD/CAM, GD&T & FEA Simulation")}) Tj ET\n`;
p2 += `0.85 0.85 0.85 RG 0.75 w 45 750 m 550 750 l S 0 G\n`;

// Project 4
p2 += `0.02 0.52 0.78 rg BT /F2 11 Tf 45 730 Td (${escapePdf("FEATURED PROJECTS (CONTINUED)")}) Tj ET 0 g\n`;
p2 += `0.85 0.85 0.85 RG 0.5 w 45 724 m 550 724 l S 0 G\n`;

p2 += `BT /F2 10 Tf 45 708 Td (${escapePdf("Project 4: 'MARKER STAND' Plastic Injection Mould Design, Simulation & Production")}) Tj ET\n`;
p2 += `BT /F3 8.5 Tf 45 696 Td (${escapePdf("SolidWorks Parting Surfaces  |  AutoCAD Stackup  |  ANSYS FEA Validation  |  Mould Machine Tryout")}) Tj ET\n`;
p2 += `BT /F1 9 Tf 55 682 Td (${escapePdf("* Designed Marker Stand product and extracted core and cavity blocks with proper draft angles and shrinkage factors.")}) Tj ET\n`;
p2 += `BT /F1 9 Tf 55 670 Td (${escapePdf("* Structurally verified mould plate deflection under continuous injection pressure using ANSYS FEA simulation.")}) Tj ET\n`;
p2 += `BT /F1 9 Tf 55 658 Td (${escapePdf("* Machined mould plates, guide pillars, and cooling lines via Mastercam and CNC; produced high-finish parts.")}) Tj ET\n`;

// Section: Education
p2 += `0.02 0.52 0.78 rg BT /F2 11 Tf 45 632 Td (${escapePdf("5. ACADEMIC & TECHNICAL QUALIFICATIONS")}) Tj ET 0 g\n`;
p2 += `0.85 0.85 0.85 RG 0.5 w 45 626 m 550 626 l S 0 G\n`;

p2 += `BT /F2 10 Tf 45 610 Td (${escapePdf("Post Graduate Diploma in Tool Design & CAD/CAM (PGDTD&CC)")}) Tj ET\n`;
p2 += `BT /F3 9 Tf 45 598 Td (${escapePdf("Central Tool Room & Training Centre (CTTC), Bhubaneswar  |  Ministry of MSME, Govt. of India")}) Tj ET\n`;
p2 += `BT /F1 9 Tf 55 584 Td (${escapePdf("* Specialized in Press Tool Design, Plastic Injection Mould Design, Die Casting, and Multi-Axis CAM Programming.")}) Tj ET\n`;
p2 += `BT /F1 9 Tf 55 572 Td (${escapePdf("* Rigorous hands-on training on CNC Machining Centers, CNC Turning, Wire EDM, and Precision Surface Grinding.")}) Tj ET\n`;

p2 += `BT /F2 10 Tf 45 548 Td (${escapePdf("Bachelor of Technology (B.Tech) in Mechanical Engineering")}) Tj ET\n`;
p2 += `BT /F3 9 Tf 45 536 Td (${escapePdf("Undergraduate Engineering Degree  |  India")}) Tj ET\n`;
p2 += `BT /F1 9 Tf 55 522 Td (${escapePdf("* Core focus: Theory of Machines, Machine Design, Fluid Mechanics, Thermodynamics, Strength of Materials, Metrology.")}) Tj ET\n`;
p2 += `BT /F1 9 Tf 55 510 Td (${escapePdf("* Applied coursework in CAD modeling, GD&T geometric tolerancing, kinematics, and manufacturing technology.")}) Tj ET\n`;

// Section: Certifications
p2 += `0.02 0.52 0.78 rg BT /F2 11 Tf 45 484 Td (${escapePdf("6. VERIFIED CERTIFICATIONS & ACCREDITATIONS")}) Tj ET 0 g\n`;
p2 += `0.85 0.85 0.85 RG 0.5 w 45 478 m 550 478 l S 0 G\n`;

p2 += `BT /F2 9 Tf 45 462 Td (${escapePdf("* Post Graduate Diploma in Tool Design & CAD/CAM:")}) Tj /F1 9 Tf 6 Td (${escapePdf("CTTC Bhubaneswar (Govt. of India MSME Center)")}) Tj ET\n`;
p2 += `BT /F2 9 Tf 45 448 Td (${escapePdf("* Advanced CAD/CAM Technologies:")}) Tj /F1 9 Tf 6 Td (${escapePdf("SolidWorks, Siemens NX, PTC Creo Parametric, Autodesk Fusion 360")}) Tj ET\n`;
p2 += `BT /F2 9 Tf 45 434 Td (${escapePdf("* Industrial CAM Toolpath Synthesis:")}) Tj /F1 9 Tf 6 Td (${escapePdf("Delcam PowerShape, Delcam PowerMill, Mastercam Milling & Turning")}) Tj ET\n`;
p2 += `BT /F2 9 Tf 45 420 Td (${escapePdf("* IIT / NPTEL Engineering Certifications:")}) Tj /F1 9 Tf 6 Td (${escapePdf("Accreditations from IIT Roorkee, IIT Kanpur, and IIT Kharagpur")}) Tj ET\n`;
p2 += `BT /F2 9 Tf 45 406 Td (${escapePdf("* Engineering Standards & Quality:")}) Tj /F1 9 Tf 6 Td (${escapePdf("GD&T (ASME Y14.5 / ISO 1101), ISO 2768-m Precision Standards, 7 QC Tools")}) Tj ET\n`;
p2 += `BT /F2 9 Tf 45 392 Td (${escapePdf("* Structural & Thermal Simulation:")}) Tj /F1 9 Tf 6 Td (${escapePdf("ANSYS FEA Static Structural & Deflection Simulation")}) Tj ET\n`;

// Section: Standards & Verification
p2 += `0.02 0.52 0.78 rg BT /F2 11 Tf 45 366 Td (${escapePdf("7. PROFESSIONAL REFERENCES & DIGITAL VERIFICATION")}) Tj ET 0 g\n`;
p2 += `0.85 0.85 0.85 RG 0.5 w 45 360 m 550 360 l S 0 G\n`;
p2 += `BT /F1 9 Tf 45 344 Td (${escapePdf("Interactive Engineering Portfolio:  https://soumma-chakraborty.vercel.app")}) Tj ET\n`;
p2 += `BT /F1 9 Tf 45 330 Td (${escapePdf("LinkedIn Professional Profile:      https://www.linkedin.com/in/soumma-chakraborty-10b85a230/")}) Tj ET\n`;
p2 += `BT /F1 9 Tf 45 316 Td (${escapePdf("Direct Contact / Inquiries:        soummachakraborty.eng@gmail.com")}) Tj ET\n`;
p2 += `BT /F1 9 Tf 45 302 Td (${escapePdf("Standard Drawing Compliance:       ASME Y14.5M, ISO 2768-m, DIN 7168, ISO 1101")}) Tj ET\n`;

// Footer Page 2
p2 += `0.85 0.85 0.85 RG 0.5 w 45 60 m 550 60 l S 0 G\n`;
p2 += `BT /F1 8 Tf 45 46 Td (${escapePdf("Soumma Chakraborty  --  Curriculum Vitae  |  soummachakraborty.eng@gmail.com")}) Tj ET\n`;
p2 += `BT /F1 8 Tf 500 46 Td (${escapePdf("Page 2 of 2")}) Tj ET\n`;

const builder = new SimplePdfBuilder();
const pdfBuffer = builder.generate([p1, p2]);

const cvPath = path.join(rootDir, "public", "Soumma_Chakraborty_CV.pdf");
const resumePath = path.join(rootDir, "public", "Soumma_Chakraborty_Resume.pdf");

fs.writeFileSync(cvPath, pdfBuffer, "binary");
fs.writeFileSync(resumePath, pdfBuffer, "binary");

console.log(`Generated CV: ${cvPath} (${pdfBuffer.length} bytes)`);
console.log(`Generated Resume: ${resumePath} (${pdfBuffer.length} bytes)`);
