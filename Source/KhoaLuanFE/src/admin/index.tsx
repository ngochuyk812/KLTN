import classNames from "classnames/bind";
import styles from "./admin.module.scss";
import { TabAd } from "./components";
import { useState, useCallback } from "react";
import {
  ArrowBack as ArrowBackIcon,
  HomeOutlined as HomeOutlinedIcon,
  AddOutlined as AddOutlinedIcon,
  ArrowBackIosRounded as ArrowBackIosRoundedIcon,
} from "@mui/icons-material";
import { ProductIcon } from "../icon";
import { ProductPage } from "./page";

import { PageAdmin } from "../interface";
import { Button } from "@mui/material";
import ProductCreation from "./page/productCreation";
import OrderPage from "./page/order";
const cx = classNames.bind(styles);
const pages = [
  {
    isParent: true,
    tabName: "Product",
    icon: <ProductIcon />,
    children: [
      {
        tabName: "list product",
        content: <ProductPage />,
      },
      {
        tabName: "create product",
        content: <ProductCreation />,
      },
    ],
  },
  {
    isParent: true,
    tabName: "order",
    icon: <ProductIcon />,
    content: <OrderPage />,
  },
];

export default function AdminPage() {
  const [tabActivated, setTabActivated] = useState("list product");
  const [parentTabActivated, setParentTabActivated] = useState("Product");
  const [content, setContent] = useState<PageAdmin | null>({
    tabName: "list product",
    icon: <ProductIcon />,
    content: <ProductPage />,
  });
  const handleTabActivated = useCallback(
    (item: any, callback: any) => {
      if (item.isParent) {
        console.log(item.tabName);
        if (item.tabName == parentTabActivated) {
          callback("");
          console.log(item.tabName);
        } else {
          callback(item.tabName);
        }
        if (item.tabName == "order") {
          setContent(item);
        }
      } else {
        setContent(item);
        callback(item.tabName);
      }
    },
    [tabActivated, parentTabActivated]
  );

  return (
    <div className={cx("templateAdmin")}>
      <div className={cx("bodyContentWrapper")}>
        <div className={cx("sidebar")}>
          <div className={cx("sidebarHeader")}>
            <img
              className={cx("logo")}
              src="https://lotru.devias.io/assets/logo.svg"
              alt=""
            />
          </div>
          <div className={cx("tabs")}>
            <div className="tabs-wrapper">
              {pages.map((item, index) => {
                return (
                  <TabAd
                    haveChild={item.children?.length}
                    tabActivated={parentTabActivated}
                    onClick={handleTabActivated}
                    key={index}
                    isParentElement={true}
                    item={item}
                    callback={setParentTabActivated}
                  >
                    {item.children &&
                      item.children.map((itemChild, childIndex) => {
                        return (
                          <TabAd
                            tabActivated={tabActivated}
                            onClick={handleTabActivated}
                            key={childIndex}
                            item={itemChild}
                            callback={setTabActivated}
                          />
                        );
                      })}
                  </TabAd>
                );
              })}
            </div>
          </div>
        </div>
        <div className={cx("content")}>
          <div className={cx("container")}>
            <header className={cx("header")}>
              <div className={cx("wrapper")}>
                <div className={cx("headerLeft")}>
                  <h1 className={cx("title")}>{content && content.tabName}</h1>
                  <div className={cx("breadcrumb")}>
                    <div className={cx("wrapper", "fl")}>
                      <HomeOutlinedIcon />
                      <ArrowBackIosRoundedIcon fontSize="small" />
                      <span>{content && content.tabName}</span>
                    </div>
                  </div>
                </div>
                <div className={cx("headerRight")}>
                  {content?.tabName == "list product" ? (
                    <Button
                      onClick={() => {
                        handleTabActivated(
                          {
                            tabName: "create product",
                            icon: <ProductIcon />,
                            content: <ProductCreation />,
                          },
                          setTabActivated
                        );
                      }}
                      variant="contained"
                    >
                      <AddOutlinedIcon />
                      <span>Create Product</span>
                    </Button>
                  ) : (
                    <Button
                      style={{
                        background: "white",
                        color: "black",
                        borderRadius: "#333",
                      }}
                      onClick={() => {
                        handleTabActivated(
                          {
                            tabName: "list product",
                            icon: <ProductIcon />,
                            content: <ProductPage />,
                          },
                          setTabActivated
                        );
                      }}
                      variant="contained"
                    >
                      <ArrowBackIcon /> <span>Go To Back</span>
                    </Button>
                  )}
                </div>
              </div>
            </header>
            <div className={cx("contentWrapper")}>
              <div className={cx("wrapper")}>{content && content.content}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
