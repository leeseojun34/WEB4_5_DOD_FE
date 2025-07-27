import githubIcon from "@/assets/icon/github_icon.svg";
import notionIcon from "@/assets/icon/notion_icon.svg";
import miroIcon from "@/assets/icon/miro_icon.svg";
import canvaIcon from "@/assets/icon/canva_icon.svg";
import googledocsIcon from "@/assets/icon/googledocs_icon.svg";
import figmaIcon from "@/assets/icon/figma_icon.svg";

export const workspaceTypes = [
  "GITHUB",
  "NOTION",
  "FIGMA",
  "GOOGLE_DOCS",
  "CANVA",
  "MIRO",
] as const;

export type WorkspacePlatformType = (typeof workspaceTypes)[number];

export const workspaceLogos: Record<WorkspacePlatformType, string> = {
  GITHUB: githubIcon,
  NOTION: notionIcon,
  MIRO: miroIcon,
  FIGMA: figmaIcon,
  CANVA: canvaIcon,
  GOOGLE_DOCS: googledocsIcon,
};
