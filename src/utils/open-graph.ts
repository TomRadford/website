export const DEFAULT_OG_IMAGE = '/open-graph/home.png';
export const WRITING_INDEX_OG_IMAGE = '/open-graph/writing.png';
export const PROJECTS_INDEX_OG_IMAGE = '/open-graph/projects.png';

export const getWritingOgImagePath = (slug: string) => `/open-graph/writing/${slug}.png`;
export const getProjectOgImagePath = (slug: string) => `/open-graph/projects/${slug}.png`;
