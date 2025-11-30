window.api.onPoints((points) => {
    const table = document.getElementById("tbl");
    table.innerHTML = points
        .map((p) => `<tr><td>${p.x}</td><td>${p.y}</td></tr>`)
        .join("");
});
