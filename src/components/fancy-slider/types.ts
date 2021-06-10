export type Image = {
  id?: string;
  width?: number;
  height?: number;
  color?: string;
  alt_description?: string;
  urls?: {
    full?: string;
    regular?: string;
    small?: string;
    thumb?: string;
  };
  likes?: number;
};
