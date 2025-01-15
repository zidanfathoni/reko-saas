import { cn } from "@/utils/cn";
import { FC } from "react";
import type { IconType } from "react-icons";
import * as FaIcons6 from "react-icons/fa6";
// import * as BsIcons from "react-icons/bs";
// import * as FiIcons from "react-icons/fi";
// import * as Io5Icons from "react-icons/io5";
import * as RiIcons from "react-icons/ri";
// import * as TbIcons from "react-icons/tb";
// import * as TfiIcons from "react-icons/tfi";

type IconMap = Record<string, IconType>;

interface IDynamicIcon extends React.SVGProps<SVGSVGElement> {
  icon: string;
  className?: string;
  width?: number;
  height?: number;
}

const iconLibraries: { [key: string]: IconMap } = {
  fa: FaIcons6,
  ri: RiIcons,
};

const DynamicIcon: FC<IDynamicIcon> = ({ icon, className, width, height, ...props }) => {
  const IconLibrary = getIconLibrary(icon);
  const Icon = IconLibrary ? IconLibrary[icon] : undefined;

  if (!Icon) {
    return <span className="text-sm">Icon not found</span>;
  }

  return <Icon height={height} width={width} className={cn(
    "min-h-50 min-w-50",
    className,
  )} {...props} />;
};

const getIconLibrary = (icon: string): IconMap | undefined => {
  const libraryKey = [...icon].reduce((lib, letter, i) => {
    if (letter === letter.toUpperCase() && lib === "" && i > 0) {
      return icon.slice(0, i).toLowerCase();
    }
    return lib;
  }, "");

  return iconLibraries[libraryKey];
};

export default DynamicIcon;