// ver6.3 (web) — Timetable generator (front-end only)
document
  .getElementById('btn-generate')
  .addEventListener('click', generateTimetable);
document.getElementById('btn-download').addEventListener('click', downloadPNG);
document.getElementById('btn-clear').addEventListener('click', () => {
  document.getElementById('tables').innerHTML = '';
});

function generateTimetable() {
  const num5 = parseInt(document.getElementById('num5').value || '0', 10);
  const num6 = parseInt(document.getElementById('num6').value || '0', 10);
  const num7 = parseInt(document.getElementById('num7').value || '0', 10);

  const dayChecks = [
    ...document.querySelectorAll('.days input[type="checkbox"]'),
  ];
  const days = dayChecks.filter((chk) => chk.checked).map((chk) => chk.value);

  if (days.length === 0) {
    alert('수업 가능한 요일을 하나 이상 선택하세요.');
    return;
  }

  const tables = document.getElementById('tables');
  tables.innerHTML = '';

  const slots = ['1교시', '2교시', '3교시', '4교시'];
  const instr6 = ['카니', '페니', '카니', '로니'];
  const instr7 = ['페니', '카니', '로니', '카니'];

  let alerted = false;

  for (let w = 1; w <= 4; w++) {
    const weekEl = document.createElement('section');
    weekEl.className = 'week';

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = `주간 시간표 (${w}주차)`;
    weekEl.appendChild(title);

    const wrap = document.createElement('div');
    wrap.className = 'table-wrap';

    const table = document.createElement('table');

    // Header row
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    const th0 = document.createElement('th');
    th0.textContent = '';
    th0.className = 'label';
    headRow.appendChild(th0);
    days.forEach((d) => {
      const th = document.createElement('th');
      th.textContent = d;
      th.className = 'label';
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    // Build empty 4 x days grid
    const grid = Array.from({ length: slots.length }, () =>
      Array.from({ length: days.length }, () => '')
    );

    // Compose class list according to week
    const classList = [];
    for (let i = 1; i <= num5; i++) classList.push(`5세 ${i}반 (카니)`);
    for (let i = 1; i <= num6; i++)
      classList.push(`6세 ${i}반 (${instr6[w - 1]})`);
    for (let i = 1; i <= num7; i++)
      classList.push(`7세 ${i}반 (${instr7[w - 1]})`);

    // Fill grid row-wise then column-wise similar to GAS
    classList.forEach((cls, idx) => {
      const r = Math.floor(idx / days.length); // 0..
      const c = idx % days.length; // 0..
      if (r < slots.length && c < days.length) grid[r][c] = cls;
    });

    // Build body
    for (let r = 0; r < slots.length; r++) {
      const tr = document.createElement('tr');
      const label = document.createElement('td');
      label.textContent = slots[r];
      label.className = 'label';
      tr.appendChild(label);
      for (let c = 0; c < days.length; c++) {
        const td = document.createElement('td');
        td.textContent = grid[r][c] || '';
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    wrap.appendChild(table);
    weekEl.appendChild(wrap);
    tables.appendChild(weekEl);

    async function downloadPNG() {
      const target = document.getElementById('tables');
      if (!target || !target.firstChild) {
        alert('먼저 시간표를 생성하세요.');
        return;
      }

      // 해상도 선명하게(scale 2) + 배경 흰색
      const canvas = await html2canvas(target, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      });

      const link = document.createElement('a');
      link.download = 'timetable.png';
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link); // iOS/Safari 대응
      link.click();
      link.remove();
    }

    // Alert logic: if any day has >=3 '카니'
    if (!alerted) {
      for (let c = 0; c < days.length; c++) {
        let cnt = 0;
        for (let r = 0; r < slots.length; r++) {
          if ((grid[r][c] || '').includes('카니')) cnt++;
        }
        if (cnt >= 3) {
          alert(
            '하루 수업 시수가 3회 이상입니다. 카니가 1세트 이상 필요한지 확인이 필요합니다.'
          );
          alerted = true;
          break;
        }
      }
    }
  }
}
