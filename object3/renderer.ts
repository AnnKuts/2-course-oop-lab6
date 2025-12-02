declare const Chart: any;

let chart: any = null;

(window as any).api.onData((points: any[]) => {
  console.log("POINTS:", points);

  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext("2d")!;

  const labels = points.map((p: any) => p.x);
  const values = points.map((p: any) => p.y);

  if (chart) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = values;
    chart.update();
  } else {
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "y=f(x)",
          data: values,
          borderWidth: 2
        }]
      }
    });
  }
});
