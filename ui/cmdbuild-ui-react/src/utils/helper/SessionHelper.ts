import api from "../../api/http";

export interface Session {
  id: string;
  user: string;
  language: string;
  isModel?: boolean;
  valid: boolean;
}

export async function checkSessionValidity(): Promise<Session> {
  try {
    const response = await api.get("/sessions/current");
    return { ...response.data, valid: true };
  } catch {
    return { id: "", user: "", language: "en", valid: false };
  }
}

export async function loadPublicConfs() {
  const { data } = await api.get("/configuration/public");
  return data;
}

export async function loadSystemConfs() {
  const { data } = await api.get("/configuration/system");
  return data;
}

export async function loadUserPreferences() {
  const { data } = await api.get("/preferences");
  return data;
}

export async function loadLocale(language: string) {
  const { data } = await api.get(`/locales/${language}.json`);
  return data;
}
