export type GuestType = {
  id: number;
  name: string;
};

export type WeddingSettingsType = {
    side1: string,
    side2: string | null,
    side3: string | null,
    side2_image: string | null,
    side3_image: string | null
};

export type ChangeWeddingSettingsType = {
    side1?: string,
    side2?: string | null,
    side3?: string | null,
    side2_image?: string | null,
    side3_image?: string | null
}