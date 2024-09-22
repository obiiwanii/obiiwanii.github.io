// js/charts.js
// js/charts.js

export function drawXpGraph(xpTransactions) {
  let xpData = [];
  xpTransactions.forEach(el => {
    let yyyymm = el.createdAt.substring(0, 7);
    let existing = xpData.find(x => x.period === yyyymm);
    if (!existing) {
      xpData.push({ period: yyyymm, xp: el.amount / 1000 });
    } else {
      existing.xp += el.amount / 1000;
    }
  });

  new Morris.Line({
    element: 'line-chart',
    data: xpData,
    xkey: 'period',
    ykeys: ['xp'],
    labels: ['XP Gained'],
    resize: true,
    lineColors: ['#FFD369'],
    xLabelAngle: window.innerWidth < 600 ? 45 : 0,
    hoverCallback: function(index, options, content, row) {
      document.getElementById('xp-month').textContent = row.period;
      document.getElementById('xp-gained').textContent = `XP Gained: ${row.xp.toFixed(1)}`;
      return ''; // Suppress default tooltip
    }
  });
}


export function drawAuditGraph(audits) {
  let auditData = [];
  audits.forEach(el => {
    let yyyymm = el.createdAt.substring(0, 7);
    let existing = auditData.find(x => x.period === yyyymm);
    if (!existing) {
      auditData.push({
        period: yyyymm,
        given: el.type === 'up' ? 1 : 0,
        received: el.type === 'down' ? 1 : 0,
      });
    } else {
      if (el.type === 'up') existing.given += 1;
      if (el.type === 'down') existing.received += 1;
    }
  });

  new Morris.Bar({
    element: 'bar-chart',
    data: auditData,
    xkey: 'period',
    ykeys: ['given', 'received'],
    labels: ['Given Audits', 'Received Audits'],
    barColors: ['#FFD369', '#EEEEEE'],
    resize: true,
    xLabelAngle: window.innerWidth < 600 ? 45 : 0,
    hoverCallback: function(index, options, content, row) {
      document.getElementById('audit-month').textContent = row.period;
      document.getElementById('given-audits').textContent = `Given Audits: ${row.given}`;
      document.getElementById('received-audits').textContent = `Received Audits: ${row.received}`;
      return ''; // Suppress default tooltip
    }
  });
}
