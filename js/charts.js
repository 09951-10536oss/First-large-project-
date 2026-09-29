document.addEventListener('DOMContentLoaded', () => {
    const chartContainer = document.getElementById('salesChart');
    if(!chartContainer) return;

    const data = [40, 65, 30, 85, 95, 75, 110];
    const days = ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'];

    chartContainer.innerHTML = data.map((val, i) => `
        <div class="bar" style="height: ${val}%;" title="${days[i]}: ฿${val * 100}">
            <span style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); font-size: 0.75rem; color: var(--text-secondary);">${days[i]}</span>
        </div>
    `).join('');
});
