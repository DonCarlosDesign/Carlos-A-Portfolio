/* @ds-bundle: {"format":4,"namespace":"FRAGLOGDesignSystem_925068","components":[{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"RankBadge","sourcePath":"components/core/RankBadge.jsx"},{"name":"StatusTag","sourcePath":"components/core/StatusTag.jsx"},{"name":"TierTag","sourcePath":"components/core/TierTag.jsx"},{"name":"BarChart","sourcePath":"components/data/BarChart.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"LineChart","sourcePath":"components/data/LineChart.jsx"},{"name":"StatTile","sourcePath":"components/data/StatTile.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"ErrorState","sourcePath":"components/feedback/ErrorState.jsx"}],"sourceHashes":{"components/brand/Wordmark.jsx":"d5551138ed0c","components/core/Button.jsx":"3e45639972ad","components/core/Input.jsx":"fca6d13e8896","components/core/RankBadge.jsx":"a39cb2d6baf7","components/core/StatusTag.jsx":"86e4f043acf3","components/core/TierTag.jsx":"5a0e48f959a1","components/data/BarChart.jsx":"35b3b310a30e","components/data/DataTable.jsx":"db5aa50dd9e8","components/data/LineChart.jsx":"9bf6a8a1ff28","components/data/StatTile.jsx":"571c7706d0be","components/feedback/EmptyState.jsx":"e3a0ef2052cc","components/feedback/ErrorState.jsx":"d2a144caaf22","ui_kits/fraglog/AgentBreakdown.jsx":"7ab463dba871","ui_kits/fraglog/Leaderboard.jsx":"d555a21b5f8f","ui_kits/fraglog/MatchDetail.jsx":"cc9af1f27738","ui_kits/fraglog/NavShell.jsx":"4c93cea01a75","ui_kits/fraglog/Overview.jsx":"4b87b9b9fbf4","ui_kits/fraglog/ProfileSummary.jsx":"0439a1e96319"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FRAGLOGDesignSystem_925068 = window.FRAGLOGDesignSystem_925068 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Wordmark.jsx
try { (() => {
function Wordmark({
  size = 24,
  dim = false
}) {
  return React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-bold)',
      fontSize: size + 'px',
      color: dim ? 'var(--border-default)' : 'var(--text-primary)',
      letterSpacing: '0.02em'
    }
  }, 'frag', React.createElement('span', {
    style: {
      color: 'var(--c-amber)'
    }
  }, '.'), 'log', React.createElement('span', {
    className: 'fraglog-cursor',
    style: {
      color: 'var(--c-amber)',
      animation: 'fraglog-blink 1s steps(1) infinite'
    }
  }, '_'));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  variant = 'secondary',
  disabled = false,
  children,
  onClick
}) {
  const base = {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--fs-body)',
    fontWeight: 'var(--weight-bold)',
    letterSpacing: 'var(--tracking-label)',
    textTransform: 'lowercase',
    borderRadius: 'var(--radius-sharp)',
    padding: '10px 18px',
    cursor: disabled ? 'default' : 'pointer',
    border: '1px solid transparent',
    transition: 'border-color .12s ease, color .12s ease'
  };
  let style = {
    ...base
  };
  if (disabled) {
    style = {
      ...style,
      background: 'transparent',
      border: '1px solid var(--c-bg-row)',
      color: 'var(--text-muted)'
    };
  } else if (variant === 'primary') {
    style = {
      ...style,
      background: 'var(--c-amber)',
      color: 'var(--c-bg-base)'
    };
  } else {
    style = {
      ...style,
      background: 'transparent',
      border: '1px solid var(--border-default)',
      color: 'var(--text-primary)'
    };
  }
  return React.createElement('button', {
    style,
    disabled,
    onClick
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function Input({
  placeholder = '',
  value,
  onChange
}) {
  const style = {
    width: '100%',
    background: 'var(--surface-input)',
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-sharp)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--fs-body)',
    padding: '10px 12px',
    outline: 'none'
  };
  return React.createElement('input', {
    style,
    placeholder,
    value,
    onChange,
    onFocus: e => {
      e.target.style.borderBottom = '1px solid var(--c-amber)';
    },
    onBlur: e => {
      e.target.style.borderBottom = '1px solid var(--border-default)';
    }
  });
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/RankBadge.jsx
try { (() => {
function RankBadge({
  rank = 'IRON',
  active = false
}) {
  const style = {
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: active ? '1px solid var(--c-amber)' : '1px solid var(--border-default)',
    borderRadius: 'var(--radius-sharp)',
    fontFamily: 'var(--font-mono)',
    fontWeight: active ? 'var(--weight-bold)' : 'var(--weight-regular)',
    fontSize: 'var(--fs-micro)',
    color: active ? 'var(--c-amber)' : 'var(--text-secondary)',
    letterSpacing: '0.03em'
  };
  return React.createElement('div', {
    style
  }, rank);
}
Object.assign(__ds_scope, { RankBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/RankBadge.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusTag.jsx
try { (() => {
function StatusTag({
  kind = 'pending',
  children
}) {
  const map = {
    win: {
      background: 'var(--c-tag-win-bg)',
      color: 'var(--c-amber)'
    },
    loss: {
      background: 'var(--c-tag-loss-bg)',
      color: 'var(--c-loss)'
    },
    pending: {
      background: 'var(--c-tag-pending-bg)',
      color: 'var(--text-secondary)',
      border: '1px solid var(--border-default)'
    },
    mvp: {
      background: 'var(--c-tag-mvp-bg)',
      color: 'var(--c-tag-mvp-fg)',
      fontWeight: 'var(--weight-bold)'
    }
  };
  const style = {
    display: 'inline-block',
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--fs-micro)',
    letterSpacing: 'var(--tracking-label)',
    textTransform: 'lowercase',
    padding: '3px 8px',
    borderRadius: 'var(--radius-sharp)',
    ...map[kind]
  };
  return React.createElement('span', {
    style
  }, children);
}
Object.assign(__ds_scope, { StatusTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusTag.jsx", error: String((e && e.message) || e) }); }

// components/core/TierTag.jsx
try { (() => {
function TierTag({
  tier = 'average',
  children
}) {
  const map = {
    below: {
      color: 'var(--c-tier-gray)',
      border: '1px solid var(--c-tier-gray)'
    },
    average: {
      color: 'var(--c-tier-blue)',
      border: '1px solid var(--c-tier-blue)'
    },
    excellent: {
      color: 'var(--c-tier-purple)',
      border: '1px solid var(--c-tier-purple)',
      fontWeight: 'var(--weight-bold)'
    }
  };
  const style = {
    display: 'inline-block',
    background: 'transparent',
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--fs-micro)',
    letterSpacing: 'var(--tracking-label)',
    textTransform: 'lowercase',
    padding: '4px 9px',
    borderRadius: 'var(--radius-sharp)',
    ...map[tier]
  };
  return React.createElement('span', {
    style
  }, children);
}
Object.assign(__ds_scope, { TierTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TierTag.jsx", error: String((e && e.message) || e) }); }

// components/data/BarChart.jsx
try { (() => {
function BarChart({
  bars = []
}) {
  const max = Math.max(...bars.map(b => b.value));
  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: '12px',
      height: 100,
      fontFamily: 'var(--font-mono)'
    }
  }, bars.map((b, i) => React.createElement('div', {
    key: i,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '6px',
      flex: 1
    }
  }, React.createElement('div', {
    style: {
      width: '100%',
      height: b.value / max * 80 + 'px',
      background: b.below ? 'var(--c-loss)' : 'var(--c-amber)',
      borderRadius: 'var(--radius-sharp)'
    }
  }), React.createElement('div', {
    style: {
      fontSize: 'var(--fs-micro)',
      color: 'var(--text-muted)'
    }
  }, b.label))));
}
Object.assign(__ds_scope, { BarChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/BarChart.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function DataTable({
  columns = [],
  rows = []
}) {
  return React.createElement('table', {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-body)'
    }
  }, React.createElement('thead', null, React.createElement('tr', null, columns.map((c, i) => React.createElement('th', {
    key: i,
    style: {
      textAlign: c.align || 'left',
      color: 'var(--text-secondary)',
      fontSize: 'var(--fs-micro)',
      textTransform: 'lowercase',
      letterSpacing: 'var(--tracking-label)',
      fontWeight: 'var(--weight-regular)',
      padding: '12px 16px',
      borderBottom: '1px solid var(--border-default)'
    }
  }, c.label)))), React.createElement('tbody', null, rows.map((r, ri) => React.createElement('tr', {
    key: ri,
    style: {
      background: ri % 2 ? 'var(--surface-row)' : 'transparent'
    }
  }, columns.map((c, ci) => React.createElement('td', {
    key: ci,
    style: {
      textAlign: c.align || 'left',
      padding: '16px',
      color: 'var(--text-primary)',
      borderBottom: '1px solid var(--surface-row)'
    }
  }, r[c.key]))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/LineChart.jsx
try { (() => {
function LineChart({
  data = [],
  labelStart = '',
  labelEnd = '',
  endLabel = ''
}) {
  const w = 560,
    h = 140,
    pad = 8,
    topPad = 24;
  const max = Math.max(...data),
    min = Math.min(...data);
  const pts = data.map((d, i) => {
    const x = pad + i / (data.length - 1) * (w - pad * 2);
    const y = h - pad - (d - min) / (max - min || 1) * (h - pad - topPad);
    return [x, y];
  });
  const path = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const last = pts[pts.length - 1];
  const gridLines = [0.25, 0.5, 0.75].map((f, i) => React.createElement('line', {
    key: i,
    x1: pad,
    x2: w - pad,
    y1: h - pad - f * (h - pad - topPad),
    y2: h - pad - f * (h - pad - topPad),
    stroke: 'var(--border-default)',
    strokeDasharray: '2,3',
    strokeWidth: 1
  }));
  return React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, React.createElement('svg', {
    width: '100%',
    viewBox: '0 0 ' + w + ' ' + h,
    style: {
      display: 'block'
    }
  }, gridLines, React.createElement('path', {
    d: path,
    fill: 'none',
    stroke: 'var(--c-amber)',
    strokeWidth: 2
  }), React.createElement('circle', {
    cx: last[0],
    cy: last[1],
    r: 4,
    fill: 'var(--c-amber)'
  }), endLabel && React.createElement('text', {
    x: last[0] - 4,
    y: last[1] - 12,
    fill: 'var(--c-amber)',
    fontSize: 11,
    textAnchor: 'end',
    fontFamily: 'var(--font-mono)'
  }, endLabel)), React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      color: 'var(--text-muted)',
      fontSize: 'var(--fs-micro)',
      marginTop: 4
    }
  }, React.createElement('span', null, labelStart), React.createElement('span', null, labelEnd)));
}
Object.assign(__ds_scope, { LineChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/LineChart.jsx", error: String((e && e.message) || e) }); }

// components/data/StatTile.jsx
try { (() => {
function StatTile({
  label = '',
  value = '',
  accent = false
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '8px 0'
    }
  }, React.createElement('div', {
    style: {
      fontSize: 'var(--fs-label)',
      color: 'var(--text-secondary)',
      textTransform: 'lowercase',
      letterSpacing: 'var(--tracking-label)'
    }
  }, label), React.createElement('div', {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-hero)',
      fontWeight: 'var(--weight-bold)',
      color: accent ? 'var(--c-amber)' : 'var(--text-primary)',
      lineHeight: 'var(--lh-tight)'
    }
  }, value));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
function EmptyState({
  metaLabel = 'no_matches',
  heading = '',
  body = '',
  buttonLabel = 'refresh_log',
  onAction
}) {
  return React.createElement('div', {
    style: {
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-sharp)',
      padding: '28px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: '12px',
      fontFamily: 'var(--font-mono)'
    }
  }, React.createElement('div', {
    style: {
      fontSize: 'var(--fs-micro)',
      color: 'var(--text-secondary)',
      textTransform: 'lowercase',
      letterSpacing: 'var(--tracking-label)'
    }
  }, 'empty // ' + metaLabel), React.createElement('div', {
    style: {
      fontSize: 'var(--fs-body-lg)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--text-primary)'
    }
  }, heading), React.createElement('div', {
    style: {
      fontSize: 'var(--fs-body)',
      color: 'var(--text-secondary)',
      maxWidth: '320px'
    }
  }, body), React.createElement('button', {
    onClick: onAction,
    style: {
      marginTop: '8px',
      background: 'transparent',
      border: '1px solid var(--border-default)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-body)',
      fontWeight: 'var(--weight-bold)',
      padding: '10px 18px',
      borderRadius: 'var(--radius-sharp)',
      cursor: 'pointer',
      textTransform: 'lowercase'
    }
  }, buttonLabel));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ErrorState.jsx
try { (() => {
function ErrorState({
  metaLabel = 'sync_failed',
  heading = '',
  body = '',
  buttonLabel = 'retry_sync',
  onAction
}) {
  return React.createElement('div', {
    style: {
      border: '1px solid var(--c-loss)',
      borderRadius: 'var(--radius-sharp)',
      padding: '28px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: '12px',
      fontFamily: 'var(--font-mono)'
    }
  }, React.createElement('div', {
    style: {
      fontSize: 'var(--fs-micro)',
      color: 'var(--c-loss)',
      textTransform: 'lowercase',
      letterSpacing: 'var(--tracking-label)'
    }
  }, 'error // ' + metaLabel), React.createElement('div', {
    style: {
      fontSize: 'var(--fs-body-lg)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--text-primary)'
    }
  }, heading), React.createElement('div', {
    style: {
      fontSize: 'var(--fs-body)',
      color: 'var(--text-secondary)',
      maxWidth: '320px'
    }
  }, body), React.createElement('button', {
    onClick: onAction,
    style: {
      marginTop: '8px',
      background: 'var(--c-loss)',
      border: '1px solid var(--c-loss)',
      color: 'var(--c-bg-base)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-body)',
      fontWeight: 'var(--weight-bold)',
      padding: '10px 18px',
      borderRadius: 'var(--radius-sharp)',
      cursor: 'pointer',
      textTransform: 'lowercase'
    }
  }, buttonLabel));
}
Object.assign(__ds_scope, { ErrorState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ErrorState.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fraglog/AgentBreakdown.jsx
try { (() => {
function AgentBreakdown() {
  const {
    StatTile,
    BarChart,
    DataTable,
    TierTag
  } = window.FRAGLOGDesignSystem_925068;
  const agents = [{
    agent: 'jett',
    matches: 42,
    winrate: '67%',
    kd: '1.51',
    tier: /*#__PURE__*/React.createElement(TierTag, {
      tier: "excellent"
    }, "excellent")
  }, {
    agent: 'omen',
    matches: 18,
    winrate: '55%',
    kd: '1.12',
    tier: /*#__PURE__*/React.createElement(TierTag, {
      tier: "average"
    }, "average")
  }, {
    agent: 'sova',
    matches: 11,
    winrate: '45%',
    kd: '0.94',
    tier: /*#__PURE__*/React.createElement(TierTag, {
      tier: "below"
    }, "below avg")
  }, {
    agent: 'reyna',
    matches: 9,
    winrate: '71%',
    kd: '1.68',
    tier: /*#__PURE__*/React.createElement(TierTag, {
      tier: "excellent"
    }, "excellent")
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 96,
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "most played",
    value: "JETT",
    accent: true
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "best agent // win%",
    value: "REYNA"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "agents played",
    value: "9"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-secondary)',
      textTransform: 'lowercase',
      letterSpacing: '1px',
      marginBottom: 12
    }
  }, "win rate by agent"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(BarChart, {
    bars: [{
      label: 'jett',
      value: 67
    }, {
      label: 'omen',
      value: 55
    }, {
      label: 'sova',
      value: 45,
      below: true
    }, {
      label: 'reyna',
      value: 71
    }, {
      label: 'sage',
      value: 38,
      below: true
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-secondary)',
      textTransform: 'lowercase',
      letterSpacing: '1px',
      marginBottom: 12
    }
  }, "weapon / loadout breakdown"), /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 'agent',
      label: 'agent'
    }, {
      key: 'matches',
      label: 'matches',
      align: 'right'
    }, {
      key: 'winrate',
      label: 'win rate',
      align: 'right'
    }, {
      key: 'kd',
      label: 'k/d',
      align: 'right'
    }, {
      key: 'tier',
      label: 'tier',
      align: 'right'
    }],
    rows: agents
  }));
}
window.AgentBreakdown = AgentBreakdown;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fraglog/AgentBreakdown.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fraglog/Leaderboard.jsx
try { (() => {
function Leaderboard() {
  const {
    RankBadge,
    StatusTag,
    Input
  } = window.FRAGLOGDesignSystem_925068;
  const rows = [{
    pos: 1,
    name: 'zk.raven',
    rank: 'RDNT',
    rr: 412,
    streak: 'win x5'
  }, {
    pos: 2,
    name: 'you',
    rank: 'RDNT',
    rr: 388,
    streak: 'win x2',
    you: true
  }, {
    pos: 3,
    name: 'op_hyd',
    rank: 'IMRT',
    rr: 340,
    streak: 'loss'
  }, {
    pos: 4,
    name: 'lowkey',
    rank: 'IMRT',
    rr: 301,
    streak: 'win x1'
  }, {
    pos: 5,
    name: 'ph4nt',
    rank: 'DMND',
    rr: 266,
    streak: '—'
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-secondary)',
      textTransform: 'lowercase',
      letterSpacing: '1px'
    }
  }, "ranked ladder // region na"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 260
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "search operator id"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(RankBadge, {
    rank: "IRON"
  }), /*#__PURE__*/React.createElement(RankBadge, {
    rank: "BRNZ"
  }), /*#__PURE__*/React.createElement(RankBadge, {
    rank: "SLVR"
  }), /*#__PURE__*/React.createElement(RankBadge, {
    rank: "GOLD"
  }), /*#__PURE__*/React.createElement(RankBadge, {
    rank: "PLAT"
  }), /*#__PURE__*/React.createElement(RankBadge, {
    rank: "DMND"
  }), /*#__PURE__*/React.createElement(RankBadge, {
    rank: "IMRT"
  }), /*#__PURE__*/React.createElement(RankBadge, {
    rank: "RDNT",
    active: true
  })), rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      padding: '14px 12px',
      background: r.you ? 'var(--c-bg-row)' : i % 2 ? 'var(--c-bg-row)' : 'transparent',
      borderBottom: '1px solid var(--border-default)',
      borderLeft: r.you ? '2px solid var(--c-amber)' : '2px solid transparent'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      color: 'var(--text-muted)'
    }
  }, r.pos), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 160
    }
  }, r.name), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 60,
      color: 'var(--c-amber)',
      fontWeight: 700
    }
  }, r.rank), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 70,
      textAlign: 'right'
    }
  }, r.rr, " rr"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto'
    }
  }, r.streak.startsWith('win') ? /*#__PURE__*/React.createElement(StatusTag, {
    kind: "win"
  }, r.streak) : r.streak === 'loss' ? /*#__PURE__*/React.createElement(StatusTag, {
    kind: "loss"
  }, "loss") : /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, r.streak)))));
}
window.Leaderboard = Leaderboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fraglog/Leaderboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fraglog/MatchDetail.jsx
try { (() => {
function MatchDetail() {
  const {
    StatusTag,
    DataTable,
    Button
  } = window.FRAGLOGDesignSystem_925068;
  const rounds = Array.from({
    length: 13
  }, (_, i) => ({
    round: i + 1,
    winner: i % 3 === 2 ? 'defense' : 'attack',
    type: i % 4 === 0 ? 'spike' : 'elim'
  }));
  const players = [{
    name: 'you',
    agent: 'jett',
    k: 22,
    d: 14,
    a: 5,
    acs: 268
  }, {
    name: 'op_hyd',
    agent: 'omen',
    k: 18,
    d: 15,
    a: 9,
    acs: 231
  }, {
    name: 'zk.raven',
    agent: 'sova',
    k: 15,
    d: 16,
    a: 11,
    acs: 198
  }, {
    name: 'ph4nt',
    agent: 'sage',
    k: 9,
    d: 13,
    a: 14,
    acs: 167
  }, {
    name: 'lowkey',
    agent: 'reyna',
    k: 24,
    d: 17,
    a: 2,
    acs: 255
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-secondary)',
      textTransform: 'lowercase',
      letterSpacing: '1px'
    }
  }, "match // ascent // competitive"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-hero-sm)',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      color: 'var(--c-amber)',
      marginTop: 8
    }
  }, "13 \u2014 8")), /*#__PURE__*/React.createElement(StatusTag, {
    kind: "win"
  }, "win")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-secondary)',
      textTransform: 'lowercase',
      letterSpacing: '1px',
      marginBottom: 12
    }
  }, "round-by-round"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      marginBottom: 32,
      flexWrap: 'wrap'
    }
  }, rounds.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    title: 'round ' + r.round,
    style: {
      width: 28,
      height: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 10,
      border: '1px solid var(--border-default)',
      borderRadius: '2px',
      color: r.winner === 'attack' ? 'var(--c-amber)' : 'var(--text-secondary)'
    }
  }, r.round))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-secondary)',
      textTransform: 'lowercase',
      letterSpacing: '1px',
      marginBottom: 12
    }
  }, "scoreboard"), /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 'name',
      label: 'operator'
    }, {
      key: 'agent',
      label: 'agent'
    }, {
      key: 'k',
      label: 'k',
      align: 'right'
    }, {
      key: 'd',
      label: 'd',
      align: 'right'
    }, {
      key: 'a',
      label: 'a',
      align: 'right'
    }, {
      key: 'acs',
      label: 'acs',
      align: 'right'
    }],
    rows: players
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "export_log")));
}
window.MatchDetail = MatchDetail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fraglog/MatchDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fraglog/NavShell.jsx
try { (() => {
function NavShell({
  active,
  setActive,
  children
}) {
  const {
    Wordmark
  } = window.FRAGLOGDesignSystem_925068;
  const tabs = ['overview', 'match', 'agents', 'leaderboard', 'profile'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--c-bg-base)',
      minHeight: '100vh',
      fontFamily: 'var(--font-mono)',
      color: 'var(--text-primary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 32px',
      borderBottom: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 20
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    onClick: () => setActive(t),
    style: {
      cursor: 'pointer',
      fontSize: 12,
      letterSpacing: '1px',
      textTransform: 'lowercase',
      color: active === t ? 'var(--c-amber)' : 'var(--text-secondary)',
      borderBottom: active === t ? '1px solid var(--c-amber)' : '1px solid transparent',
      paddingBottom: 4
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '32px'
    }
  }, children));
}
window.NavShell = NavShell;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fraglog/NavShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fraglog/Overview.jsx
try { (() => {
function Overview() {
  const {
    StatTile,
    LineChart,
    BarChart,
    StatusTag,
    Button
  } = window.FRAGLOGDesignSystem_925068;
  const matches = [{
    map: 'ascent',
    result: 'win',
    kd: '1.42',
    time: '2h ago'
  }, {
    map: 'bind',
    result: 'loss',
    kd: '0.88',
    time: '5h ago'
  }, {
    map: 'haven',
    result: 'win',
    kd: '1.15',
    time: '1d ago'
  }, {
    map: 'split',
    result: 'win',
    kd: '1.61',
    time: '1d ago'
  }, {
    map: 'sunset',
    result: 'pending',
    kd: '—',
    time: 'in progress'
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 96,
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "current rank",
    value: "radiant",
    accent: true
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "win rate // 30d",
    value: "64%"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "k/d ratio",
    value: "1.32"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 48,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-secondary)',
      textTransform: 'lowercase',
      letterSpacing: '1px',
      marginBottom: 12
    }
  }, "rank progression // last 14 days"), /*#__PURE__*/React.createElement(LineChart, {
    data: [10, 12, 11, 18, 22, 20, 26, 24, 30],
    labelStart: "jul 8",
    labelEnd: "jul 22",
    endLabel: "radiant"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-secondary)',
      textTransform: 'lowercase',
      letterSpacing: '1px',
      marginBottom: 12
    }
  }, "win rate by map"), /*#__PURE__*/React.createElement(BarChart, {
    bars: [{
      label: 'A',
      value: 62
    }, {
      label: 'B',
      value: 48
    }, {
      label: 'H',
      value: 71
    }, {
      label: 'S',
      value: 39,
      below: true
    }, {
      label: 'L',
      value: 55
    }]
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-default)',
      marginTop: 32,
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-secondary)',
      textTransform: 'lowercase',
      letterSpacing: '1px'
    }
  }, "recent matches"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "export_log")), matches.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 4px',
      background: i % 2 ? 'var(--c-bg-row)' : 'transparent',
      borderBottom: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 120
    }
  }, m.map), /*#__PURE__*/React.createElement(StatusTag, {
    kind: m.result
  }, m.result), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 80,
      textAlign: 'right'
    }
  }, m.kd), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 100,
      textAlign: 'right',
      color: 'var(--text-muted)'
    }
  }, m.time)))));
}
window.Overview = Overview;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fraglog/Overview.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fraglog/ProfileSummary.jsx
try { (() => {
function ProfileSummary() {
  const {
    StatTile,
    LineChart,
    RankBadge,
    StatusTag
  } = window.FRAGLOGDesignSystem_925068;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-secondary)',
      textTransform: 'lowercase',
      letterSpacing: '1px'
    }
  }, "operator // season 14"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-heading)',
      fontWeight: 700,
      marginTop: 8
    }
  }, "op_hyd")), /*#__PURE__*/React.createElement(RankBadge, {
    rank: "RDNT",
    active: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 96,
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "peak rank",
    value: "radiant",
    accent: true
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "matches played",
    value: "214"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "season win rate",
    value: "58%"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-secondary)',
      textTransform: 'lowercase',
      letterSpacing: '1px',
      marginBottom: 12
    }
  }, "rank history // season"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: [4, 5, 5, 7, 9, 8, 11, 13, 12, 15, 16, 15, 18, 20],
    labelStart: "mar 1",
    labelEnd: "jul 22",
    endLabel: "radiant"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-secondary)',
      textTransform: 'lowercase',
      letterSpacing: '1px',
      marginBottom: 12
    }
  }, "milestones"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(StatusTag, {
    kind: "mvp"
  }, "mvp x14"), /*#__PURE__*/React.createElement(StatusTag, {
    kind: "win"
  }, "10 win streak"), /*#__PURE__*/React.createElement(StatusTag, {
    kind: "pending"
  }, "200 matches")));
}
window.ProfileSummary = ProfileSummary;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fraglog/ProfileSummary.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.RankBadge = __ds_scope.RankBadge;

__ds_ns.StatusTag = __ds_scope.StatusTag;

__ds_ns.TierTag = __ds_scope.TierTag;

__ds_ns.BarChart = __ds_scope.BarChart;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.LineChart = __ds_scope.LineChart;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.ErrorState = __ds_scope.ErrorState;

})();
