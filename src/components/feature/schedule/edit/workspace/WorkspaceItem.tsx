import githubIcon from "@/assets/icon/github_icon.svg";
import notionIcon from "@/assets/icon/notion_icon.svg";
import miroIcon from "@/assets/icon/miro_icon.svg";
import canvaIcon from "@/assets/icon/canva_icon.svg";
import googledocsIcon from "@/assets/icon/googledocs_icon.svg";
import figmaIcon from "@/assets/icon/figma_icon.svg";
import Image from "next/image";
import Link from "next/link";

interface WorkspaceItemProps {
  type: "github" | "notion" | "miro" | "figma" | "canva" | "googledocs";
  name: string;
  url: string;
}

const workspaceLogos = {
  github: githubIcon,
  notion: notionIcon,
  miro: miroIcon,
  figma: figmaIcon,
  canva: canvaIcon,
  googledocs: googledocsIcon,
};

const WorkspaceItem = ({ type, name, url }: WorkspaceItemProps) => {
  const logo = workspaceLogos[type];
  return (
    <div className="flex flex-col">
      <div className="flex">
        {logo && (
          <Image src={logo} alt={`${type} 로고`} width={24} height={24} />
        )}
        <span>{name}</span>
      </div>

      <Link href={url}>{url}</Link>
    </div>
  );
};
export default WorkspaceItem;
