console.log("=== OBJECT2 RENDERER LOADED ===");
console.log("Window API:", (window as any).api);

(window as any).api.onPoints((points: any[]) => {
  console.log("RECEIVED POINTS IN RENDERER:", points);
  console.log("Points length:", points.length);

  const table = document.getElementById("tbl");
  console.log("Table element:", table);

  if (!table) {
    console.error("Table element not found!");
    return;
  }

  const html = points
    .map((p: any) => `<tr><td>${p.x}</td><td>${p.y}</td></tr>`)
    .join("");

  console.log("Generated HTML (first 200 chars):", html.substring(0, 200));

  table.innerHTML = html;
  console.log("Table updated successfully");
});

console.log("Listener registered");