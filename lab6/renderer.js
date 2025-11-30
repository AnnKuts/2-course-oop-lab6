const nInput = document.getElementById("n");
const minInput = document.getElementById("min");
const maxInput = document.getElementById("max");
const btn = document.getElementById("run");
btn.onclick = async () => {
    const n = Number(nInput.value);
    const min = Number(minInput.value);
    const max = Number(maxInput.value);
    // window.api is provided by preload; cast to any to avoid TS errors
    await window.api.startObject2(n, min, max);
    setTimeout(() => window.api.startObject3(), 500);
};
