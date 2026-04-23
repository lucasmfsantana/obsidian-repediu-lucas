import { useState } from "react";

// ─── Design tokens ───────────────────────────────────────────────
const C = {
  primary: "#E72A4B",
  primaryDark: "#C41F3B",
  primaryLight: "#F8E0E0",
  bg: "#F5F6F8",
  surface: "#FFFFFF",
  border: "rgb(227, 230, 240)",
  textPrimary: "#1C1C1E",
  textSecondary: "#5E5E6E",
  textMuted: "#A0A0B0",
  green: "#2EBF7E",
  teal: "#26C6DA",
  blue: "#4B9EF5",
  orange: "rgb(255, 171, 0)",
};

// ─── SVG Icon helper ─────────────────────────────────────────────
const Icon = ({ d, size = 18, color = "currentColor", style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <path d={d} />
  </svg>
);

const ICONS = {
  moreVert:     "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z",
  edit:         "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
  contentCopy:  "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",
  pause:        "M6 19h4V5H6v14zm8-14v14h4V5h-4z",
  schedule:     "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z",
  history:      "M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z",
  close:        "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  whatsapp:     "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.38 1.26 4.79L2.05 22l5.42-1.42c1.35.74 2.9 1.16 4.57 1.16 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.52 14.24l-.65.37c-.9.51-1.93.78-2.96.78-.8 0-1.58-.16-2.32-.47l-.42-.18-3.2.84.86-3.12-.22-.44A7.89 7.89 0 0 1 7.4 11.9c0-4.33 3.52-7.85 7.85-7.85 4.32 0 7.84 3.52 7.84 7.85 0 1.75-.58 3.38-1.53 4.69z",
  checkCircle:  "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  info:         "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
  calendarToday:"M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z",
  delete:       "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
};

// ─── Status Badge ─────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    ativa:              { bg: "#E8F5E9", color: "#2EBF7E", label: "Ativa" },
    pausada:            { bg: "#F5F5F5", color: "#9E9E9E", label: "Pausada" },
    "pausa programada": { bg: "rgba(255,171,0,0.12)", color: C.orange, label: "Pausa programada" },
    "pausada automaticamente": { bg: "#F5F5F5", color: "#9E9E9E", label: "Pausada automaticamente" },
    rascunho:           { bg: "#E3F2FD", color: "#1976D2", label: "Rascunho" },
  };
  const s = map[status] || map.rascunho;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "2px 10px", borderRadius: 4,
      background: s.bg, color: s.color,
      fontFamily: "Mulish", fontWeight: 700, fontSize: 11,
    }}>
      {status === "ativa" && <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, display: "inline-block" }} />}
      {status === "pausa programada" && <Icon d={ICONS.schedule} size={12} color={C.orange} />}
      {s.label}
    </span>
  );
};

// ─── Campaign Card ────────────────────────────────────────────────
const CampaignCard = ({ campaign, onAction }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: "Editar", icon: ICONS.edit },
    { label: "Duplicar", icon: ICONS.contentCopy },
    { label: "Pausar", icon: ICONS.pause, color: C.primary },
    { label: campaign.scheduled ? "Editar pausa programada" : "Programar pausa", icon: ICONS.schedule, color: "#5E5E6E" },
    { label: "Ver histórico", icon: ICONS.history },
  ];

  return (
    <div style={{
      background: C.surface, border: `1px solid ${C.border}`,
      borderRadius: "0.35rem", padding: "16px 20px",
      boxShadow: "rgba(0,0,0,0.1) 0px 1px 3px, rgba(0,0,0,0.06) 0px 1px 2px",
      position: "relative", width: 320,
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", gap: 10, flex: 1 }}>
          <img src={campaign.img} alt="" style={{ width: 52, height: 52, borderRadius: 6, objectFit: "cover", background: "#eee" }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "Mulish", fontWeight: 700, fontSize: 13, color: C.textPrimary, marginBottom: 2 }}>
              {campaign.name}
            </div>
            <div style={{ fontFamily: "Mulish", fontSize: 11, color: C.textMuted }}>{campaign.subtitle}</div>
            <div style={{ fontFamily: "Mulish", fontSize: 11, color: C.textMuted }}>Criada em: {campaign.created}</div>
          </div>
        </div>
        {/* 3-dot menu */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "none", border: "none", cursor: "pointer",
            color: C.textSecondary, padding: 4, borderRadius: 4,
          }}>
            <Icon d={ICONS.moreVert} size={20} />
          </button>
          {menuOpen && (
            <div style={{
              position: "absolute", right: 0, top: 28, zIndex: 100,
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: 6, boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              minWidth: 190, padding: "4px 0",
            }}>
              {menuItems.map((item) => (
                <button key={item.label} onClick={() => { setMenuOpen(false); onAction(item.label, campaign); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    width: "100%", padding: "9px 16px",
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "Mulish", fontSize: 13, fontWeight: 500,
                    color: item.color || C.textPrimary, textAlign: "left",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F5F6F8"}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                >
                  <Icon d={item.icon} size={16} color={item.color || C.textSecondary} />
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status + badges */}
      <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
        <StatusBadge status={campaign.status} />
        {campaign.scheduled && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            padding: "2px 8px", borderRadius: 4,
            background: "rgba(255,171,0,0.10)", color: C.orange,
            fontFamily: "Mulish", fontWeight: 600, fontSize: 10,
            border: `1px solid rgba(255,171,0,0.3)`,
          }}>
            <Icon d={ICONS.schedule} size={10} color={C.orange} />
            Pausa: {campaign.scheduled}
          </span>
        )}
      </div>

      {/* Channel + metrics */}
      <div style={{ marginTop: 12, display: "flex", gap: 6, alignItems: "center" }}>
        <Icon d={ICONS.whatsapp} size={15} color="#25D366" />
        <span style={{ fontFamily: "Mulish", fontSize: 11, color: C.green, fontWeight: 600 }}>
          Campanha de WhatsApp Oficial
        </span>
        <span style={{ fontFamily: "Mulish", fontSize: 10, color: C.green, background: "rgba(46,191,126,0.1)", padding: "1px 6px", borderRadius: 3 }}>
          aprovada
        </span>
      </div>
      <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        {[
          { label: "Enviadas", value: campaign.sent },
          { label: "Recebidas", value: campaign.received },
          { label: "Conversões", value: campaign.conversions },
          { label: "Receita", value: campaign.revenue, color: C.green },
        ].map(m => (
          <div key={m.label} style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "Mulish", fontSize: 11, color: C.textMuted }}>{m.label}</span>
            <span style={{ fontFamily: "Mulish", fontSize: 11, fontWeight: 700, color: m.color || C.textPrimary }}>{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Modal: Pausa Rápida (simplificada) ──────────────────────────
const PauseModal = ({ campaign, onClose, onConfirm }) => (
  <div style={{
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
  }} onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div style={{
      background: C.surface, borderRadius: 8, width: 440,
      boxShadow: "0 8px 32px rgba(0,0,0,0.18)", overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        padding: "20px 24px 16px", borderBottom: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon d={ICONS.pause} size={20} color={C.primary} />
          </div>
          <div>
            <div style={{ fontFamily: "Mulish", fontWeight: 700, fontSize: 16, color: C.textPrimary }}>
              Pausar campanha?
            </div>
            <div style={{ fontFamily: "Mulish", fontSize: 12, color: C.textSecondary, marginTop: 2 }}>
              {campaign?.name}
            </div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted }}>
          <Icon d={ICONS.close} size={20} />
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "20px 24px" }}>
        <p style={{ fontFamily: "Mulish", fontSize: 14, color: C.textSecondary, lineHeight: 1.6, margin: 0 }}>
          A campanha ficará <strong>inativa</strong> até você reativá-la manualmente.
          Nenhuma mensagem será enviada durante a pausa.
        </p>

        {/* Info box */}
        <div style={{
          display: "flex", gap: 10, background: "#E3F2FD",
          borderRadius: 4, padding: "10px 14px", marginTop: 16,
          alignItems: "flex-start",
        }}>
          <Icon d={ICONS.info} size={16} color="#0288D1" style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontFamily: "Mulish", fontSize: 12, color: "#5E5E6E", lineHeight: 1.5 }}>
            Quer pausar por um período específico? Use a opção{" "}
            <strong style={{ color: C.primary }}>Programar pausa</strong> no menu da campanha.
          </span>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: "12px 24px 20px", display: "flex",
        justifyContent: "flex-end", gap: 8,
        borderTop: `1px solid ${C.border}`,
      }}>
        <button onClick={onClose} style={{
          background: "none", border: "none", cursor: "pointer",
          fontFamily: "Mulish", fontWeight: 500, fontSize: 13,
          color: C.primary, padding: "6px 12px",
        }}>
          Cancelar
        </button>
        <button onClick={onConfirm} style={{
          background: C.primary, color: "#fff", border: "none",
          borderRadius: 4, cursor: "pointer", padding: "8px 20px",
          fontFamily: "Mulish", fontWeight: 600, fontSize: 13,
          boxShadow: "rgba(0,0,0,0.2) 0px 3px 1px -2px, rgba(0,0,0,0.14) 0px 2px 2px 0px",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <Icon d={ICONS.pause} size={14} color="#fff" />
          Pausar agora
        </button>
      </div>
    </div>
  </div>
);

// ─── Modal: Programar Pausa ───────────────────────────────────────
const ScheduleModal = ({ campaign, onClose, onConfirm, isEditing }) => {
  const [startDate, setStartDate] = useState(isEditing ? "2026-12-24" : "");
  const [startTime, setStartTime] = useState(isEditing ? "00:00" : "");
  const [endDate, setEndDate]     = useState(isEditing ? "2026-12-25" : "");
  const [endTime, setEndTime]     = useState(isEditing ? "00:00" : "");
  const [error, setError]         = useState("");

  const isValid = startDate && startTime && endDate && endTime && !error;

  const validate = (sd, st, ed, et) => {
    if (!sd || !st || !ed || !et) { setError(""); return; }
    const start = new Date(`${sd}T${st}`);
    const end   = new Date(`${ed}T${et}`);
    const now   = new Date();
    if (start < now) { setError("A data de pausa deve ser no futuro."); return; }
    if (end <= start) { setError("A data de reativação deve ser posterior à data de pausa."); return; }
    setError("");
  };

  const inputStyle = {
    width: "100%", fontFamily: "Mulish", fontSize: 14,
    padding: "9px 12px", border: `1px solid rgba(0,0,0,0.23)`,
    borderRadius: 4, outline: "none", background: "white", boxSizing: "border-box",
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
    }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: C.surface, borderRadius: 8, width: 480,
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          padding: "20px 24px 16px", borderBottom: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "rgba(255,171,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon d={ICONS.schedule} size={20} color={C.orange} />
            </div>
            <div>
              <div style={{ fontFamily: "Mulish", fontWeight: 700, fontSize: 16, color: C.textPrimary }}>
                {isEditing ? "Editar pausa programada" : "Programar pausa"}
              </div>
              <div style={{ fontFamily: "Mulish", fontSize: 12, color: C.textSecondary, marginTop: 2 }}>
                {campaign?.name}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted }}>
            <Icon d={ICONS.close} size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 24px" }}>
          <p style={{ fontFamily: "Mulish", fontSize: 13, color: C.textSecondary, marginBottom: 20, marginTop: 0, lineHeight: 1.6 }}>
            Defina o período em que a campanha ficará pausada. Ela será <strong>reativada automaticamente</strong> ao fim do intervalo.
          </p>

          {/* Section card — Pausa */}
          <div style={{
            border: `1px solid ${C.border}`, borderRadius: "0.35rem",
            padding: "16px", marginBottom: 12,
          }}>
            <div style={{
              fontFamily: "Mulish", fontSize: 11, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.08em",
              color: C.teal, marginBottom: 12,
            }}>
              Início da pausa
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ fontFamily: "Mulish", fontSize: 11, color: C.textSecondary, display: "block", marginBottom: 4 }}>
                  Data
                </label>
                <input type="date" value={startDate} onChange={e => { setStartDate(e.target.value); validate(e.target.value, startTime, endDate, endTime); }}
                  style={inputStyle} onFocus={e => e.target.style.border = `2px solid ${C.primary}`}
                  onBlur={e => e.target.style.border = `1px solid rgba(0,0,0,0.23)`} />
              </div>
              <div>
                <label style={{ fontFamily: "Mulish", fontSize: 11, color: C.textSecondary, display: "block", marginBottom: 4 }}>
                  Hora
                </label>
                <input type="time" value={startTime} onChange={e => { setStartTime(e.target.value); validate(startDate, e.target.value, endDate, endTime); }}
                  style={inputStyle} onFocus={e => e.target.style.border = `2px solid ${C.primary}`}
                  onBlur={e => e.target.style.border = `1px solid rgba(0,0,0,0.23)`} />
              </div>
            </div>
          </div>

          {/* Section card — Reativação */}
          <div style={{
            border: `1px solid ${C.border}`, borderRadius: "0.35rem",
            padding: "16px", marginBottom: 12,
          }}>
            <div style={{
              fontFamily: "Mulish", fontSize: 11, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.08em",
              color: C.green, marginBottom: 12,
            }}>
              Reativação automática
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ fontFamily: "Mulish", fontSize: 11, color: C.textSecondary, display: "block", marginBottom: 4 }}>
                  Data
                </label>
                <input type="date" value={endDate} onChange={e => { setEndDate(e.target.value); validate(startDate, startTime, e.target.value, endTime); }}
                  style={inputStyle} onFocus={e => e.target.style.border = `2px solid ${C.primary}`}
                  onBlur={e => e.target.style.border = `1px solid rgba(0,0,0,0.23)`} />
              </div>
              <div>
                <label style={{ fontFamily: "Mulish", fontSize: 11, color: C.textSecondary, display: "block", marginBottom: 4 }}>
                  Hora
                </label>
                <input type="time" value={endTime} onChange={e => { setEndTime(e.target.value); validate(startDate, startTime, endDate, e.target.value); }}
                  style={inputStyle} onFocus={e => e.target.style.border = `2px solid ${C.primary}`}
                  onBlur={e => e.target.style.border = `1px solid rgba(0,0,0,0.23)`} />
              </div>
            </div>
          </div>

          {/* Validation error */}
          {error && (
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 4 }}>
              <Icon d={ICONS.info} size={14} color={C.primary} />
              <span style={{ fontFamily: "Mulish", fontSize: 12, color: C.primary }}>{error}</span>
            </div>
          )}

          {/* Preview */}
          {isValid && !error && (
            <div style={{
              display: "flex", gap: 10, background: "#E8F5E9",
              borderRadius: 4, padding: "10px 14px", marginTop: 12,
              alignItems: "center",
            }}>
              <Icon d={ICONS.checkCircle} size={16} color={C.green} />
              <span style={{ fontFamily: "Mulish", fontSize: 12, color: "#388E3C", lineHeight: 1.5 }}>
                Pausa de <strong>{startDate.split("-").reverse().join("/")} às {startTime}</strong> até{" "}
                <strong>{endDate.split("-").reverse().join("/")} às {endTime}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: "12px 24px 20px", borderTop: `1px solid ${C.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          {isEditing ? (
            <button onClick={onClose} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "Mulish", fontWeight: 500, fontSize: 13,
              color: C.textMuted, padding: "6px 0", display: "flex", alignItems: "center", gap: 4,
            }}>
              <Icon d={ICONS.delete} size={14} color={C.textMuted} />
              Remover programação
            </button>
          ) : <div />}
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onClose} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "Mulish", fontWeight: 500, fontSize: 13,
              color: C.primary, padding: "6px 12px",
            }}>
              Cancelar
            </button>
            <button onClick={() => isValid && onConfirm({ startDate, startTime, endDate, endTime })}
              disabled={!isValid}
              style={{
                background: isValid ? C.primary : "#ccc",
                color: "#fff", border: "none", borderRadius: 4,
                cursor: isValid ? "pointer" : "default",
                padding: "8px 20px", fontFamily: "Mulish", fontWeight: 600, fontSize: 13,
                boxShadow: isValid ? "rgba(0,0,0,0.2) 0px 3px 1px -2px, rgba(0,0,0,0.14) 0px 2px 2px 0px" : "none",
                display: "flex", alignItems: "center", gap: 6,
              }}>
              <Icon d={ICONS.schedule} size={14} color="#fff" />
              Salvar programação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Toast ────────────────────────────────────────────────────────
const Toast = ({ message, type = "success" }) => (
  <div style={{
    position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
    background: type === "success" ? "#323232" : C.primary,
    color: "#fff", borderRadius: 6, padding: "12px 20px",
    fontFamily: "Mulish", fontSize: 13, fontWeight: 500,
    boxShadow: "0 4px 16px rgba(0,0,0,0.24)", zIndex: 2000,
    display: "flex", alignItems: "center", gap: 8,
  }}>
    <Icon d={type === "success" ? ICONS.checkCircle : ICONS.info} size={16} color="#fff" />
    {message}
  </div>
);

// ─── Main App ─────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("list"); // "list" | "compare"
  const [modal, setModal] = useState(null); // null | "pause" | "schedule"
  const [toast, setToast] = useState(null);
  const [campaigns, setCampaigns] = useState([
    {
      id: 1, name: "Repediu: Clientes com um p...", subtitle: "Al dente massas e crepes",
      created: "05/03/2026", status: "ativa", scheduled: null,
      sent: 411, received: 389, conversions: 10, revenue: "R$ 416,11",
      img: "https://via.placeholder.com/52x52/E72A4B/fff?text=R",
    },
    {
      id: 2, name: "Promoção Fim de Ano", subtitle: "Pizzaria Bella Napoli",
      created: "01/04/2026", status: "ativa", scheduled: "24/12 às 00:00",
      sent: 230, received: 198, conversions: 22, revenue: "R$ 1.840,00",
      img: "https://via.placeholder.com/52x52/4B9EF5/fff?text=P",
    },
    {
      id: 3, name: "Reativação de Inativos", subtitle: "Burger House",
      created: "10/02/2026", status: "pausada", scheduled: null,
      sent: 89, received: 72, conversions: 5, revenue: "R$ 310,00",
      img: "https://via.placeholder.com/52x52/2EBF7E/fff?text=B",
    },
  ]);
  const [activeCampaign, setActiveCampaign] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const handleAction = (action, campaign) => {
    setActiveCampaign(campaign);
    if (action === "Pausar") setModal("pause");
    if (action === "Programar pausa" || action === "Editar pausa programada") setModal("schedule");
  };

  const handlePauseConfirm = () => {
    setCampaigns(cs => cs.map(c => c.id === activeCampaign.id ? { ...c, status: "pausada" } : c));
    setModal(null);
    showToast("Campanha pausada com sucesso.");
  };

  const handleScheduleConfirm = ({ startDate, startTime, endDate, endTime }) => {
    const fmt = (d, t) => `${d.split("-").reverse().join("/")} às ${t}`;
    const badge = `${fmt(startDate, startTime)}`;
    setCampaigns(cs => cs.map(c => c.id === activeCampaign.id ? { ...c, scheduled: badge } : c));
    setModal(null);
    showToast(`Pausa programada para ${fmt(startDate, startTime)}.`);
  };

  const tabs = [
    { key: "list", label: "Campanhas ativas" },
    { key: "compare", label: "Comparativo de fluxo" },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "Mulish" }}>
      <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Topbar */}
      <div style={{
        background: C.surface, borderBottom: `1px solid ${C.border}`,
        height: 56, display: "flex", alignItems: "center", padding: "0 24px",
        justifyContent: "space-between",
      }}>
        <div style={{ fontFamily: "Mulish", fontWeight: 700, fontSize: 16, color: C.textPrimary }}>
          <span style={{ color: C.primary, fontWeight: 800 }}>repediu</span>
          <span style={{ color: C.textMuted, fontWeight: 400, marginLeft: 12, fontSize: 13 }}>/ Campanhas</span>
        </div>
        <div style={{
          background: "rgba(255,171,0,0.1)", color: C.orange,
          borderRadius: 6, padding: "2px 10px",
          fontFamily: "Mulish", fontSize: 11, fontWeight: 700,
        }}>
          PROTÓTIPO
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: `1px solid ${C.border}`, background: C.surface, padding: "0 24px" }}>
        <div style={{ display: "flex", gap: 0 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setView(t.key)} style={{
              padding: "12px 18px", fontFamily: "Mulish", fontSize: 13, fontWeight: 600,
              background: "none", border: "none", cursor: "pointer",
              color: view === t.key ? C.primary : C.textSecondary,
              borderBottom: view === t.key ? `2px solid ${C.primary}` : "2px solid transparent",
              transition: "all 0.15s",
            }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px" }}>
        {view === "list" && (
          <>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "Mulish", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: C.teal, marginBottom: 4 }}>
                Clique nos 3 pontos ⋮ de qualquer campanha
              </div>
              <div style={{ fontFamily: "Mulish", fontSize: 13, color: C.textSecondary }}>
                Explore o novo menu com as opções "Pausar" (fluxo simplificado) e "Programar pausa".
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {campaigns.map(c => (
                <CampaignCard key={c.id} campaign={c} onAction={handleAction} />
              ))}
            </div>
          </>
        )}

        {view === "compare" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 860 }}>
            {/* Antes */}
            <div>
              <div style={{ fontFamily: "Mulish", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#E53935", marginBottom: 12 }}>
                ❌ Fluxo atual — 3 telas
              </div>
              {[
                { step: "1", title: "Confirmação", desc: "\"Tem certeza que deseja pausar?\"", friction: true },
                { step: "2", title: "Avaliação", desc: "\"A campanha foi útil?\" — dados não usados", friction: true },
                { step: "3", title: "Motivo (obrigatório)", desc: "Campo de texto livre com limite oculto — falhas silenciosas", friction: true },
              ].map(s => (
                <div key={s.step} style={{
                  border: `1px solid ${C.border}`, borderRadius: "0.35rem",
                  padding: "14px 16px", marginBottom: 8, background: C.surface,
                  borderLeft: "3px solid #EF9A9A",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ background: "#EF9A9A", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                      {s.step}
                    </span>
                    <span style={{ fontFamily: "Mulish", fontWeight: 700, fontSize: 13 }}>{s.title}</span>
                  </div>
                  <p style={{ fontFamily: "Mulish", fontSize: 12, color: C.textSecondary, margin: 0, marginLeft: 28 }}>{s.desc}</p>
                </div>
              ))}
              <div style={{ fontFamily: "Mulish", fontSize: 12, color: "#E53935", marginTop: 4 }}>
                ⏱ ~30 segundos · 3 cliques · dados descartados
              </div>
            </div>

            {/* Depois */}
            <div>
              <div style={{ fontFamily: "Mulish", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: C.green, marginBottom: 12 }}>
                ✅ Fluxo proposto — 1 modal
              </div>
              {[
                { step: "1", title: "Confirmação simples", desc: "\"Pausar agora\" — sem coleta de motivo", ok: true },
              ].map(s => (
                <div key={s.step} style={{
                  border: `1px solid ${C.border}`, borderRadius: "0.35rem",
                  padding: "14px 16px", marginBottom: 8, background: C.surface,
                  borderLeft: "3px solid #A5D6A7",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ background: C.green, color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                      {s.step}
                    </span>
                    <span style={{ fontFamily: "Mulish", fontWeight: 700, fontSize: 13 }}>{s.title}</span>
                  </div>
                  <p style={{ fontFamily: "Mulish", fontSize: 12, color: C.textSecondary, margin: 0, marginLeft: 28 }}>{s.desc}</p>
                </div>
              ))}

              <div style={{ fontFamily: "Mulish", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: C.orange, marginTop: 20, marginBottom: 12 }}>
                ✨ Nova feature — Programar pausa
              </div>
              {[
                { step: "1", title: "Seleciona \"Programar pausa\"", desc: "Nova opção no menu ⋮ da campanha" },
                { step: "2", title: "Define intervalo", desc: "Data/hora de início + data/hora de fim" },
                { step: "3", title: "Job executa automaticamente", desc: "Pausa e reativação sem intervenção manual" },
              ].map(s => (
                <div key={s.step} style={{
                  border: `1px solid ${C.border}`, borderRadius: "0.35rem",
                  padding: "14px 16px", marginBottom: 8, background: C.surface,
                  borderLeft: `3px solid ${C.orange}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ background: C.orange, color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                      {s.step}
                    </span>
                    <span style={{ fontFamily: "Mulish", fontWeight: 700, fontSize: 13 }}>{s.title}</span>
                  </div>
                  <p style={{ fontFamily: "Mulish", fontSize: 12, color: C.textSecondary, margin: 0, marginLeft: 28 }}>{s.desc}</p>
                </div>
              ))}
              <div style={{ fontFamily: "Mulish", fontSize: 12, color: C.green, marginTop: 4 }}>
                ⏱ ~5 segundos para pausa imediata · Zero risco de esquecimento
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {modal === "pause" && (
        <PauseModal campaign={activeCampaign} onClose={() => setModal(null)} onConfirm={handlePauseConfirm} />
      )}
      {modal === "schedule" && (
        <ScheduleModal
          campaign={activeCampaign}
          onClose={() => setModal(null)}
          onConfirm={handleScheduleConfirm}
          isEditing={activeCampaign?.scheduled != null}
        />
      )}
      {toast && <Toast message={toast.msg} type={toast.type} />}
    </div>
  );
}
