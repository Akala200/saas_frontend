// lib/services/contentService.ts
import api from "@/services/api";

export async function listContent() {
  const res = await api.get("/content");
  return res.data;
}

export async function getContent(id: string) {
  const res = await api.get(`/content/${id}`);
  return res.data;
}

export async function createContent(data: any) {
  const res = await api.post("/content", data);
  return res.data;
}

export async function updateContent(id: string, data: any) {
  const res = await api.put(`/content/${id}`, data);
  return res.data;
}

export async function deleteContent(id: string) {
  const res = await api.delete(`/content/${id}`);
  return res.data;
}
