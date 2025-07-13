export type NameWithRole = {
  name: string;
  role: string;
};

export type Radio = {
  mediaId: string;
  title: string;
  mc: Array<NameWithRole>;
  guests: Array<NameWithRole>;
  airedAt: string;
};
