
import {
  ShieldCheck,
  AlertTriangle,
  CircleCheck,
  Clock3,
  Link2,
  ShieldAlert,
  CheckCircle2,
  Info
} from "lucide-react";

export default function AnalysisResults({ analysis, children }) {
  const riskLevel = String(analysis?.riskLevel || "Unknown");
  const normalizedRisk = riskLevel.toLowerCase();

  const isLowRisk = normalizedRisk === "low";
  const isMediumRisk = normalizedRisk === "medium";
  const isHighRisk = normalizedRisk === "high";

  // Dynamic colours for each risk level
  const riskColors = {
    low: {
      background: "#F0FDF4",
      border: "#86EFAC",
      text: "#15803D",
      icon: "#16A34A"
    },
    medium: {
      background: "#FEFCE8",
      border: "#FACC15",
      text: "#A16207",
      icon: "#CA8A04"
    },
    high: {
      background: "#FEF2F2",
      border: "#FCA5A5",
      text: "#B91C1C",
      icon: "#DC2626"
    },
    unknown: {
      background: "#F9FAFB",
      border: "#D1D5DB",
      text: "#374151",
      icon: "#6B7280"
    }
  };

  const colors = riskColors[normalizedRisk] || riskColors.unknown;

  const warningIcons = [Clock3, Link2, ShieldAlert];

  const warningSigns = Array.isArray(analysis?.warningSigns)
    ? analysis.warningSigns
    : [];

  const recommendations = Array.isArray(analysis?.recommendations)
    ? analysis.recommendations
    : [];

  const riskTitle = isHighRisk
    ? "Potential Scam"
    : isMediumRisk
    ? "Medium Risk"
    : isLowRisk
    ? "Low Risk"
    : "Risk Unavailable";

  return (
    <>
      {/* RED HEADER */}
      <section className="scam-red-header">
        <div>
          <p className="scam-header-eyebrow">AI Chatbot</p>
          <h1>Analysis Results</h1>
          <p>Your message has been reviewed.</p>
        </div>

        <div className="scam-header-icon">
          <ShieldCheck size={35} strokeWidth={1.5} />
        </div>
      </section>

      {/* TWO-COLUMN RESULTS LAYOUT */}
      <section className="scam-results-grid">

        {/* LEFT COLUMN */}
        <div className="scam-results-left">

          {/* AI RISK ASSESSMENT */}
          <div
            className={`scam-risk-card scam-risk-${normalizedRisk}`}
            style={{
              backgroundColor: colors.background,
              border: `1px solid ${colors.border}`
            }}
          >
            <div
              className="scam-risk-title"
              style={{ color: colors.text }}
            >
              {isLowRisk ? (
                <CheckCircle2 size={20} color={colors.icon} />
              ) : isMediumRisk ? (
                <Info size={20} color={colors.icon} />
              ) : (
                <AlertTriangle size={20} color={colors.icon} />
              )}

              <span>AI RISK ASSESSMENT</span>
            </div>

            <h2 style={{ color: colors.text }}>
              {riskTitle}
            </h2>

            <p>
              {analysis?.summary ||
                "Unable to provide a risk summary."}
            </p>
          </div>

          {/* WARNING SIGNS */}
          <div className="scam-figma-card">
            <h3>
              {isLowRisk && warningSigns.length === 0
                ? "Safety Assessment"
                : "Warning signs detected"}
            </h3>

            {warningSigns.length > 0 ? (
              warningSigns.map((warning, index) => {
                const WarningIcon =
                  warningIcons[index % warningIcons.length];

                const [title, ...descriptionParts] =
                  String(warning).split("|");

                const description = descriptionParts.join("|");

                return (
                  <div
                    className="scam-warning-item"
                    key={index}
                  >
                    <WarningIcon
                      size={19}
                      color={colors.icon}
                      style={{ flexShrink: 0 }}
                    />

                    <div className="scam-warning-text">
                      <strong>{title}</strong>

                      {description && (
                        <p>{description}</p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="scam-no-warnings">
                <CheckCircle2
                  size={21}
                  color="#16A34A"
                  style={{ flexShrink: 0 }}
                />

                <div className="scam-warning-text">
                  <strong>
                    No obvious warning signs detected
                  </strong>

                  <p>
                    {isLowRisk
                      ? "This message does not appear to contain common scam indicators. However, always remain cautious and verify unexpected requests."
                      : "No specific warning signs were identified. This does not guarantee the message is safe."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="scam-results-right">

          {/* RECOMMENDED ACTIONS */}
          <div className="scam-figma-card">
            <h3>Recommended Actions</h3>

            {recommendations.length > 0 ? (
              recommendations.map((action, index) => (
                <div
                  className="scam-recommendation"
                  key={index}
                >
                  <CircleCheck size={19} />
                  <p>{action}</p>
                </div>
              ))
            ) : (
              <div className="scam-recommendation">
                <CircleCheck size={19} />
                <p>
                  Stay cautious and verify unexpected
                  requests through official channels.
                </p>
              </div>
            )}
          </div>

          {/* NEED MORE GUIDANCE */}
          {children}

        </div>
      </section>
    </>
  );
}
