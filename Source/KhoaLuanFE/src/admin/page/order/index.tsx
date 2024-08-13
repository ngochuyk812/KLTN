import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./orderAd.module.scss";
import classNames from "classnames/bind";
import {
  useGetOrderDetailMutation,
  useGetOrdersQuery,
} from "../../../api/OrderApi";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useCallback, useEffect, useState } from "react";
import { Button, Modal } from "antd";
const cx = classNames.bind(styles);
export default function OrderPage() {
  const { data } = useGetOrdersQuery();
  const [dataPopup, setDataPopup] = useState();
  const [getOrderDetail, { data: dataOrderDetail }] =
    useGetOrderDetailMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleExpand = (id: any) => {
    getOrderDetail(id);
    setIsModalVisible(true);
    console.log("data", data);
  };
  const handleModalCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);
  useEffect(() => {
    if (dataOrderDetail) {
      const result = dataOrderDetail.map((item: any) => {
        return {
          id: item.product_id,
          quantity: item.quantity,
          ...item.product,
        };
      });
      setDataPopup(result);
    }
  }, [dataOrderDetail]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Order ID", flex: 0.4 },
    {
      field: "customer_name",
      headerName: "Customer Name",
      flex: 1,
    },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "phone_number", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "email", flex: 1 },
    { field: "order_date", headerName: "Date", flex: 1 },
    { field: "total", headerName: "Total", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params: any) => (
        <>
          <GridActionsCellItem
            icon={<VisibilityIcon sx={{ color: "rgb(33 150 243)" }} />}
            label="Edit"
            onClick={() => handleExpand(params.row.id)}
          />
        </>
      ),
    },
  ];
  const columnsPopup: GridColDef[] = [
    { field: "id", headerName: "Order ID", flex: 0.4 },
    { field: "product_name", headerName: "Product Name", flex: 1 },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => (
        <img
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
          src={params.value}
          alt="Product"
        />
      ),
    },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
  ];

  return (
    <div className={cx("container")} style={{ height: 500, width: "100%" }}>
      <DataGrid rows={data} columns={columns} pageSizeOptions={[1, 2]} />
      <Modal
        className={cx("modal")}
        title="Order Detail"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
        ]}
      >
        <DataGrid
          rows={dataPopup}
          columns={columnsPopup}
          pageSizeOptions={[1, 2]}
        />
      </Modal>
    </div>
  );
}
