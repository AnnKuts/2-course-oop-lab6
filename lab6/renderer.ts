const nInput = document.getElementById("n") as HTMLInputElement;
const minInput = document.getElementById("min") as HTMLInputElement;
const maxInput = document.getElementById("max") as HTMLInputElement;
const runButton = document.getElementById("run") as HTMLButtonElement;
const errorBox = document.getElementById("form-error") as HTMLDivElement;

type InputData = {
  n: number;
  min: number;
  max: number;
};

function showFormError(message: string): void {
  errorBox.textContent = message;
}

function clearFormError(): void {
  errorBox.textContent = "";
}

function clearErrors(): void {
  [nInput, minInput, maxInput].forEach(input =>
    input.classList.remove("error")
  );
}

function setError(input: HTMLInputElement): void {
  input.classList.add("error");
}

function readInput(): InputData {
  return {
    n: Number(nInput.value),
    min: Number(minInput.value),
    max: Number(maxInput.value)
  };
}

function isValid(data: InputData): boolean {
  clearErrors();
  clearFormError();

  const errors: string[] = [];

  if (!Number.isInteger(data.n) || data.n <= 0) {
    setError(nInput);
    errors.push("n should be a positive integer");
  }

  if (Number.isNaN(data.min)) {
    setError(minInput);
    errors.push("Min should be a number");
  }

  if (Number.isNaN(data.max)) {
    setError(maxInput);
    errors.push("Max should be a number");
  }

  if (!Number.isNaN(data.min) && !Number.isNaN(data.max) && data.max <= data.min) {
    setError(maxInput);
    errors.push("Max should be greater than Min");
  }

  if (errors.length > 0) {
    showFormError(errors.join("; "));
    return false;
  }

  return true;
}

async function run(): Promise<void> {
  const input = readInput();

  if (!isValid(input)) {
    return;
  }

  await (window as any).api.startObject2(
    input.n,
    input.min,
    input.max
  );

  setTimeout(() => {
    (window as any).api.startObject3();
  }, 500);
}

runButton.addEventListener("click", run);