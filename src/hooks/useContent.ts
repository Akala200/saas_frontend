// hooks/useContent.ts
'use client';

import { useEffect, useState } from "react";
import * as contentService from "@/lib/services/contentService";

export function useContent() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const data = await contentService.listContent();
    setItems(data);
    setLoading(false);
  };

  const create = async (data: any) => {
    const result = await contentService.createContent(data);
    refresh();
    return result;
  };

  const update = async (id: string, data: any) => {
    const result = await contentService.updateContent(id, data);
    refresh();
    return result;
  };

  const remove = async (id: string) => {
    await contentService.deleteContent(id);
    refresh();
  };

  useEffect(() => {
    refresh();
  }, []);

  return { items, loading, create, update, remove };
}
