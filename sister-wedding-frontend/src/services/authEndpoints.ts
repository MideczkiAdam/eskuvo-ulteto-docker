import type { ChangeWeddingSettingsType, GuestType, WeddingSettingsType } from "../types/weddingTypes";
import api from "./apiInterceptor";

export async function getGuestsEndpoint(): Promise<GuestType[]> {
  try {
    const response = await api.get<GuestType[]>("api/guests/");
    return response.data as GuestType[];
  } catch (error) {
    console.error("Error fetching guests:", error);
    return []
  }
}

export async function addNewGuestEndpoint(name: string): Promise<GuestType> {
  try {
    const response = await api.post<GuestType>("api/guests/", {
      name
    });
    return response.data as GuestType;

  } catch (error) {
    throw error
  }
}

export async function modifyGuestEndpoint(name: string, id: number): Promise<GuestType> {
  try {
    const response = await api.patch<GuestType>(`api/guests/${id}/`, {
      name
    });
    return response.data as GuestType;

  } catch (error) {
    throw error
  }
}

export async function deleteGuestEndpoint(id: number) {
  try {
    const response = await api.delete<GuestType>(`api/guests/${id}/`);
    return response.data;

  } catch (error) {
    throw error
  }
}

export async function getSettingsEndpoint(): Promise<WeddingSettingsType | undefined> {
  try {
    const response = await api.get<WeddingSettingsType>("api/settings/");
    return response.data as WeddingSettingsType;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return undefined
  }
}

export async function changeSettingsEndpoint(changeable: ChangeWeddingSettingsType) {
  try {
    const response = await api.patch<WeddingSettingsType>("api/settings/", changeable);
    return response.data as WeddingSettingsType;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return undefined
  }
}

export const downloadPdfEndpoint = async ({
  startLoading,
  stopLoading
}: { startLoading: () => void, stopLoading: () => void }) => {
  try {
    startLoading();
    const response = await api.get("/api/printable/", {
      responseType: "blob",
      withCredentials: true
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.pdf";

    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => window.URL.revokeObjectURL(url), 1000);
  } finally {
    stopLoading();
  }
};
