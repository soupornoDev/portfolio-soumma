import { ImageResponse } from "next/og";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { SITE_URL } from "@/lib/site-config";

export const alt = "Soumma Chakraborty | CNC Machine Design Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0d1117",
          padding: "60px 70px",
          color: "#f3f4f6",
          fontFamily: "sans-serif",
          border: "10px solid #2563eb",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 18px",
              borderRadius: "8px",
              backgroundColor: "rgba(37, 99, 235, 0.15)",
              border: "1px solid #2563eb",
              color: "#60a5fa",
              fontSize: "18px",
              fontWeight: 600,
              fontFamily: "monospace",
              letterSpacing: "0.1em",
            }}
          >
            PRECISION ENGINEERING // SPECIFICATION PORTFOLIO
          </div>
          <div
            style={{
              fontSize: "16px",
              fontFamily: "monospace",
              color: "#9ca3af",
            }}
          >
            ISO 2768-m | ASME Y14.5
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "62px", fontWeight: 800, letterSpacing: "-0.02em", color: "#ffffff" }}>
            {PORTFOLIO_DATA.personal.name}
          </div>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 600,
              color: "#60a5fa",
              letterSpacing: "-0.01em",
            }}
          >
            Mechanical Engineer — CNC Machine Design & CAD/CAM
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#9ca3af",
              lineHeight: 1.5,
              maxWidth: "960px",
            }}
          >
            Precision machine design, linear kinematics, FEA structural simulation, press tools, plastic injection moulds & 7 QC tools.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #1f2937",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            {["SolidWorks", "Siemens NX", "PTC Creo", "Mastercam", "ANSYS FEA", "GD&T"].map((skill) => (
              <div
                key={skill}
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  backgroundColor: "#161b22",
                  border: "1px solid #30363d",
                  fontSize: "15px",
                  fontFamily: "monospace",
                  color: "#e5e7eb",
                }}
              >
                {skill}
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: "16px",
              fontFamily: "monospace",
              color: "#60a5fa",
              fontWeight: 600,
            }}
          >
            {SITE_URL.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
