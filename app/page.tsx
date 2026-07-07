import { CSSProperties } from "react";
export default function HomePage() {
  return (
    <div>

      {/* HERO SECTION */}

      <section
        style={{
          background: "#0f172a",
          color: "white",
          padding: "80px 60px",
          borderRadius: "15px",
          marginBottom: "50px",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            marginBottom: "10px",
          }}
        >
          OMTATVA DIGITALS
        </h1>

        <h2
          style={{
            color: "#94a3b8",
            marginBottom: "25px",
          }}
        >
          AI Filmmaking & Production Operations Platform
        </h2>

        <p
          style={{
            fontSize: "20px",
            maxWidth: "800px",
            lineHeight: "1.8",
          }}
        >
          Track attendance, manage AI filmmaking workflows,
          monitor productivity, track client projects,
          and streamline production delivery from a
          centralized platform.
        </p>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            gap: "15px",
          }}
        >
          <a href="/login">
            <button style={styles.primaryButton}>
              Login
            </button>
          </a>

          <a href="/dashboard">
            <button style={styles.secondaryButton}>
              Dashboard
            </button>
          </a>
        </div>
      </section>

      {/* STATS */}

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "50px",
        }}
      >
        <div style={styles.card}>
          <h3>Total Employees</h3>
          <h1>20+</h1>
        </div>

        <div style={styles.card}>
          <h3>Active Projects</h3>
          <h1>10+</h1>
        </div>

        <div style={styles.card}>
          <h3>AI Tools Used</h3>
          <h1>15+</h1>
        </div>

        <div style={styles.card}>
          <h3>Production Hours</h3>
          <h1>1000+</h1>
        </div>
      </section>

      {/* FEATURES */}

      <section>
        <h2
          style={{
            marginBottom: "25px",
          }}
        >
          Platform Features
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "20px",
          }}
        >
          <div style={styles.featureCard}>
            <h3>📅 Attendance Management</h3>
            <p>
              Daily employee check-in and check-out tracking.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3>⏱ Timesheet Tracking</h3>
            <p>
              Log project hours, tasks, and deliverables.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3>🎬 Production Workflow</h3>
            <p>
              Track clients, episodes, and production tasks.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3>🤖 AI Tool Monitoring</h3>
            <p>
              Record Runway, Kling, Veo, Midjourney and
              other AI tools usage.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3>📊 Productivity Reports</h3>
            <p>
              Analyze team performance and project output.
            </p>
          </div>

          <div style={styles.featureCard}>
            <h3>👥 User Management</h3>
            <p>
              Manage employees, departments, and admin roles.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}

      <section
        style={{
          marginTop: "60px",
          padding: "30px",
          background: "#f8fafc",
          borderRadius: "10px",
        }}
      >
        <h2>About OMTATVA DIGITALS</h2>

        <p
          style={{
            lineHeight: "1.8",
            marginTop: "15px",
          }}
        >
          OMTATVA DIGITALS specializes in AI-powered
          filmmaking, creative automation, video production,
          virtual production workflows, and next-generation
          storytelling using cutting-edge AI technologies.
        </p>
      </section>

      {/* FOOTER */}

      <footer
        style={{
          textAlign: "center",
          marginTop: "60px",
          padding: "20px",
          color: "#666",
        }}
      >
        © 2026 OMTATVA DIGITALS | AI Production Management Platform
      </footer>
    </div>
  );
}

const styles: {
  card: CSSProperties;
  featureCard: CSSProperties;
  primaryButton: CSSProperties;
  secondaryButton: CSSProperties;
} = {
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  featureCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  primaryButton: {
    padding: "12px 25px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  secondaryButton: {
    padding: "12px 25px",
    backgroundColor: "#334155",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
