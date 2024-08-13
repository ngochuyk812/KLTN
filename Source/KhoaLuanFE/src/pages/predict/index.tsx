import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { Button, Image, Input, Select } from "antd";
import { usePredictMutation } from "../../api/PredictApi";
import { ICamera, ProductPredict } from "../../interface";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// css
import styles from "./predict.module.scss";
import classNames from "classnames/bind";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridDeleteIcon,
  GridRowsProp,
} from "@mui/x-data-grid";
import Block from "../block";
import { ShoppingCartOutlined } from "@mui/icons-material";
import Header from "../../component/header";
import { useCreateOrderMutation } from "../../api/OrderApi";
const cx = classNames.bind(styles);
const initialRows: GridRowsProp = [];
export default function PredictPage() {
  const webcamRef = useRef(null);
  const captureRef = useRef<HTMLDivElement>(null);
  const [cameraDevices, setCameraDevices] = useState<ICamera[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [scanImage, setScanImage] = useState<string>("");
  const [predict, { isLoading, data, error }] = usePredictMutation();
  const [createOrder] = useCreateOrderMutation();

  const formatterCurrency = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const [pageSize, setPageSize] = useState<number>(5);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [rows, setRows] = useState(initialRows);
  const [visible, setVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const handleDelete = (id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const previewProduct = (image: string) => {
    setImagePreview(image);
    setVisible(true);
  };
  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 50 },
    { field: "label_id", headerName: "Label Id", width: 100 },
    { field: "product_name", headerName: "Product Name", width: 150 },
    {
      field: "image_scan",
      headerName: "Image Scan",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="image"
          style={{ width: "100%" }}
          onClick={() => previewProduct(params.value)}
        />
      ),
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="image"
          style={{ width: "100%" }}
          onClick={() => previewProduct(params.value)}
        />
      ),
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      renderCell: (params) => formatterCurrency.format(params.value),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <GridActionsCellItem
          icon={<GridDeleteIcon sx={{ color: "rgb(142 23 22)" }} />}
          label="Delete"
          onClick={() => handleDelete(params.row.id)}
        />
      ),
    },
  ];
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "F2") {
      captureScreenshot();
    }
  };
  useEffect(() => {
    if (data) {
      const newData: ProductPredict = {
        ...data,
        image_scan: scanImage,
        quantity: 1,
      };
      setRows((oldRows) => {
        const existingItemIndex = oldRows.findIndex(
          (row) => row.label_id === newData.label_id
        );
        if (existingItemIndex !== -1) {
          const newList = [...oldRows];
          const updatedItem = {
            ...newList[existingItemIndex],
            quantity: newList[existingItemIndex].quantity + 1,
          };
          newList[existingItemIndex] = updatedItem;
          return newList;
        }
        return [newData, ...oldRows];
      });
    }
  }, [data]);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    const getCameraDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();

        const cameras: ICamera[] = devices.filter(
          (device) => device.kind === "videoinput"
        );

        setCameraDevices(cameras);
        if (cameras.length > 0) {
          setSelectedDeviceId(cameras[0].deviceId);
        }
      } catch (error) {
        console.error("Error enumerating devices:", error);
      }
    };

    getCameraDevices();
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const captureScreenshot = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setScanImage(imageSrc);
    predict(imageSrc);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDeviceChange = (value: string) => {
    setSelectedDeviceId(value);
  };

  const handlePayment = () => {
    if (rows.length === 0) {
      toast.error("Chưa có sản phẩm để thanh toán");
      return;
    }

    if (
      !formData.address ||
      !formData.name ||
      !formData.email ||
      !formData.phone
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin trước khi thanh toán");
      return;
    }

    const listProduct = rows.map((item) => {
      return {
        product_id: item.id,
        quantity: item.quantity,
      };
    });
    const total = rows.reduce((prev, item) => {
      return prev + item.quantity * item.price;
    }, 0);
    const data = {
      customer_name: formData.name,
      address: formData.address,
      phone_number: formData.phone,
      email: formData.email,
      order_date: new Date(),
      total: total,
      order_details: listProduct,
    };
    createOrder(data);
  };
  const resetForm = useCallback(() => {
    setRows([]);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  }, []);

  return (
    <div>
      <Header />
      <div className={cx("container")}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Image
          width={200}
          style={{
            display: "none",
          }}
          src={imagePreview}
          preview={{
            visible,
            scaleStep: 0.5,
            src: imagePreview,
            onVisibleChange: (value) => {
              setVisible(value);
            },
          }}
        />

        <div
          className="main-predict"
          style={{ display: "flex", gap: "10px", alignItems: "center" }}
        >
          <div className={cx("cameraWrapper", "fl")} style={{ flex: 1 }}>
            <div className={cx("cameraTop", "fl")}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <label htmlFor="cameraSelect">Choose a camera:</label>
                <Select value={selectedDeviceId} onChange={handleDeviceChange}>
                  {cameraDevices.map((camera) => (
                    <Select.Option
                      key={camera.deviceId}
                      value={camera.deviceId}
                    >
                      {camera.label}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div ref={captureRef}>
                <Webcam
                  width={600}
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ deviceId: selectedDeviceId }}
                />
              </div>
            </div>
            <Button type="primary" danger onClick={captureScreenshot}>
              Click Scan Product / F2
            </Button>
          </div>
          <div className={cx("productWrapper")} style={{ flex: 1 }}>
            <Block title="List Product">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[2, 5, 7]}
                pagination
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              />
            </Block>

            <div className={cx("OrderInformationWrapper")}>
              <Block title="Information">
                <div className={cx("fieldset")}>
                  <label htmlFor="">Customer Name</label>
                  <Input
                    onChange={handleChange}
                    name="name"
                    value={formData.name}
                    className={cx("input")}
                    placeholder="Enter Fullname"
                  />
                </div>
                <div className={cx("fieldset")}>
                  <label htmlFor="">Address</label>
                  <Input
                    onChange={handleChange}
                    name="address"
                    value={formData.address}
                    className={cx("input")}
                    placeholder="Enter Address"
                  />
                </div>
                <div className={cx("fieldset")}>
                  <label htmlFor="">Email</label>
                  <Input
                    onChange={handleChange}
                    name="email"
                    value={formData.email}
                    className={cx("input")}
                    placeholder="Enter Email"
                  />
                </div>
                <div className={cx("fieldset")}>
                  <label htmlFor="">Phone Number</label>
                  <Input
                    onChange={handleChange}
                    name="phone"
                    value={formData.phone}
                    className={cx("input")}
                    placeholder="Enter phone"
                  />
                </div>
              </Block>
            </div>
            <Button
              onClick={handlePayment}
              icon={<ShoppingCartOutlined />}
              iconPosition={"start"}
              style={{
                float: "right",
                backgroundColor: "#06bfe2",
                color: "white",
                padding: "20px 20px",
              }}
            >
              Payment
            </Button>
            <Button
              onClick={resetForm}
              iconPosition={"start"}
              style={{
                float: "right",
                backgroundColor: "white",
                color: "black",
                padding: "20px 20px",
                marginRight: "20px",
              }}
            >
              Clear Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
