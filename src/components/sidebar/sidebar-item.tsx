import React from "react";
import { SidebarItemContent } from "./sidebar-item-content";
import { SidebarItemList } from "./sidebar-item-list";

type Props = {
  title: string;
  onAddClick: (e: React.MouseEvent) => void;
  expandableList: any[];
  className?: string;
}

export function SidebarItem({ title, onAddClick, expandableList, className = ""}: Props) {
  const [listOpen, setListOpen] = React.useState(false);

  return (
    <div className={className}>
      <SidebarItemContent
        title={title}
        onAddClick={onAddClick}
        listOpen={listOpen}
        onClick={() => setListOpen(!listOpen)}
      />

      <SidebarItemList
        open={listOpen}
        list={expandableList}
      />
    </div>
  );
}
