const BASE_URL = "http://0.0.0.0:8000";

export async function predict(
  endpoint: "disease" | "variety" | "age",
  file: File
) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/predict/${endpoint}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Prediction failed");
  }

  return response.json();
}
