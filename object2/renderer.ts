(window as any).api.onPoints((points: any[]) => {
  const table = document.getElementById("tbl")!;
  table.innerHTML = points
    .map((p: any) => `<tr><td>${p.x}</td><td>${p.y}</td></tr>`)
    .join("");
});
