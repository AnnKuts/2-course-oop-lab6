const nInput = document.getElementById("n") as HTMLInputElement;
const minInput = document.getElementById("min") as HTMLInputElement;
const maxInput = document.getElementById("max") as HTMLInputElement;
const btn = document.getElementById("run") as HTMLButtonElement;

btn.onclick = async () => {
  const n = Number(nInput.value);
  const min = Number(minInput.value);
  const max = Number(maxInput.value);

  await (window as any).api.startObject2(n, min, max);
  setTimeout(() => (window as any).api.startObject3(), 500);
};
