export type LoginResponse = {
  access_token: string,
  token_type: string,
  scope: string,
  expires_in: number,
  refresh_token: string
};

export type MeResponse = Identifiable<Identifiable<{
  display_name: string,
  followers: Collection,
  images: Image[]
}>>;

export type PlaylistsResponse = Collection<Identifiable<{
  name: string,
  public: boolean,
  collaborative: boolean,
  images: Image[],
  owner: Identifiable,
  tracks: Collection
}>>;

export type TracksResponse = Collection<{
  track: {
    id: string,
    name: string,
    preview_url: string,
    album: {
      images: Image[]
    },
    artists: {
      name: string
    }[]
  }
}>;

export type LyricResponse = {
  success: boolean,
  data: string[]
};

type Identifiable<T = {}> = T & {
  id: string,
  type: string,
  uri: string,
  href: string,
  external_urls: {
    spotify: string
  }
};

type Collection<T = number> = {
  href: string,
  total: number
} & (T extends number ? {} : {
  items: T[],
  limit: number,
  offset: number,
  next?: string,
  previous?: string
});

type Image = {
  url: string,
  width?: number,
  height?: number
};

export type CollectionEntry<T> = T extends Collection<infer V> ? V : never;
