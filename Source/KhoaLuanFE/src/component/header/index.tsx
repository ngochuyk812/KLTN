import { Link } from "react-router-dom";
import styles from "./header.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export default function Header() {
  return (
    <div className={cx("header")}>
      <div className={cx("header__center")}>
        <img
          className={cx("logo")}
          src="https://lotru.devias.io/assets/logo.svg"
          alt=""
        />
      </div>
      <div className={cx("header__right")}>
        <div className={cx("menu")}>
          <div className={cx("menu__item")}>
            <Link to="/admin">
              Admin
              <span className={cx("line")}></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
