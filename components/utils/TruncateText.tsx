import { Tooltip } from "@nextui-org/react";

export const TruncateText = (str: string, length = 60) => {
  if (str.length > length) {
    return (
      <Tooltip
        placement="bottom-start"
        content={<span className="p-3">{str}</span>}
      >
        <span>{str.substring(0, length - 3) + "..."}</span>
      </Tooltip>
    );
  }

  return str;
};
