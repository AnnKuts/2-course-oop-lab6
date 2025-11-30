declare const Chart: any;

(window as any).api.onData((points: any[]) => {
  console.log("POINTS:", points);

  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;

  const labels = points.map((p: any) => p.x);
  const values = points.map((p: any) => p.y);

  new Chart(ctx, {
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
});
