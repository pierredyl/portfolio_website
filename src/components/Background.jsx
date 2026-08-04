export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
    >
      {/* Ambient corner glows — static, give the base sense of depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 12% 8%, var(--color-accent-soft) 0%, transparent 55%)",
          opacity: 0.5,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 88% 92%, var(--color-bg-soft) 0%, transparent 60%)",
          opacity: 0.5,
        }}
      />

      {/* Vignette — darkens edges so the center reads as nearer */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
}
