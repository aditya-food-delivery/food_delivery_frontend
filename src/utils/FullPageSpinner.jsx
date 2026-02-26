const FullPageSpinner = () => {
  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.spinner} />
        <div style={styles.text}>Checking session…</div>
      </div>
    </div>
  );
};

export default FullPageSpinner;

/* ---------------- styles ---------------- */

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
  spinner: {
    width: "48px",
    height: "48px",
    border: "4px solid #e5e7eb",
    borderTop: "4px solid #111827",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  text: {
    fontSize: "14px",
    color: "#6b7280",
  },
};

/* ---------------- animation ---------------- */

// Inject keyframes once
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
  document.head.appendChild(style);
}
