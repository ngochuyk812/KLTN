import { ReactNode } from "react";
import styles from "./block.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
interface BlockProps {
  title: string;
  children: ReactNode;
}
export default function Block({ title, children }: BlockProps) {
  return (
    <div className={cx("block")}>
      <div className={cx("blockHeader")}>
        <h3 className={cx("title")}>
          <span className={cx("text")}>{title}</span>
        </h3>
      </div>
      <div className={cx("content")}>{children}</div>
    </div>
  );
}
