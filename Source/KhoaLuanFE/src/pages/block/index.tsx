import { ReactNode } from "react";
import styles from "./block.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
interface BlockProps {
  title: string;
  children: ReactNode;
  styles? : React.CSSProperties
}
export default function Block({ title, children, styles }: BlockProps) {
  return (
    <div className={cx("block")} >
      <div className={cx("blockHeader")}>
        <h3 className={cx("title")}>
          <span className={cx("text")}>{title}</span>
        </h3>
      </div>
      <div className={cx("content")} style={styles}>{children}</div>
    </div>
  );
}
