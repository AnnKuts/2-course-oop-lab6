document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-dialog-btn');
  startBtn?.addEventListener('click', () => {
    (window as any).api.startDialog();
  });
});

