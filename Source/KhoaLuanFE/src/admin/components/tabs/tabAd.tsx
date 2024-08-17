import React from "react";
import styles from "./tab.module.scss";
import classNames from "classnames/bind";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const cx = classNames.bind(styles);
interface TabAdProps {
  children?: React.ReactNode;
  item: any;
  onClick: (item: any, callback: any) => void;
  isParentElement?: boolean;
  tabActivated: string;
  callback: any;
  haveChild: boolean;
}

const TabAd: React.FC<TabAdProps> = ({
  item,
  children,
  onClick,
  isParentElement,
  tabActivated,
  callback,
  haveChild,
}) => {
  return (
    <div
      className={cx("wrapper", {
        "parent-is-activated": tabActivated === item.tabName && isParentElement,
      })}
    >
      <div
        className={cx("tabContent", {
          "is-activated": tabActivated === item.tabName && !isParentElement,
          "parent-activated":
            tabActivated === item.tabName && isParentElement && !children,
        })}
        data-name={item.tabName}
        data-type={isParentElement ? "parent" : "children"}
        onClick={() => {
          onClick(item, callback);
        }}
      >
        <div className={cx("tabLeft", "fl")}>
          <div className={cx("icon")}>{item.icon}</div>
          <span className={cx("name")}>{item.tabName}</span>
        </div>
        <div className={cx("tabRight", "fl")}>
          {isParentElement && haveChild && (
            <div className={cx("iconOpen", "icon")}>
              <ExpandMoreIcon className={cx("iconItem")} />
            </div>
          )}
        </div>
      </div>
      <div className={cx("tabChildren")}>
        <div className={cx("tabChildrenWrapper")}>{children}</div>
      </div>
    </div>
  );
};

export default TabAd;
