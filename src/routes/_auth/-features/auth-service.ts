import { env } from "#/env";

export async function PostAuth(path: string, body: unknown) {
  const response = await fetch(`${env.API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      const error = await response.json();

      // backend do Identity retorna array de erros
      if (Array.isArray(error)) {
        throw new Error(error[0]?.code ?? "Erro desconhecido");
      }

      throw new Error(error.message ?? "Erro desconhecido");
    }

    throw new Error(await response.text());
  }

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json"))
    return response.json();

  return response.text();
}

export function saveTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

// pega o token do localStorage
export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

// remove os tokens (logout)
export function clearTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}