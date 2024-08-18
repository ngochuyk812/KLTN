import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
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
export default function OrderPage({ refetchOrder }: { refetchOrder: number }) {
  const { data, refetch } = useGetOrdersQuery(undefined);
  const [dataPopup, setDataPopup] = useState();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const [getOrderDetail, { data: dataOrderDetail }] =
    useGetOrderDetailMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleExpand = (id: any) => {
    getOrderDetail(id);
    setIsModalVisible(true);
  };

  const handleModalCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);
  const formatterCurrency = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  useEffect(() => {
    if (dataOrderDetail) {
      const result = dataOrderDetail.map((item: any) => {
        return {
          id: item.product_id,
          quantity: item.quantity,
          ...item.product,
        };
      });
      const totalCost = result.reduce(
        (sum: any, item: any) => sum + item.ntity * item.price,
        0
      );
      setDataPopup({ result, total: totalCost });
    }
  }, [dataOrderDetail]);

  useEffect(() => {
    refetch();
  }, [refetchOrder]);

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
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      renderCell: (params: any) => formatterCurrency.format(params.value),
    },
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
    { field: "id", headerName: "Order ID", flex: 1 },
    { field: "product_name", headerName: "Product Name", flex: 2 },
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
    {
      field: "price",
      headerName: "Product Price",
      flex: 1,
      renderCell: (params) => {
        const formattedPrice = formatterCurrency.format(params.value);
        return <span>{formattedPrice}</span>;
      },
    },
    { field: "quantity", headerName: "Quantity", flex: 1 },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pagination
        pageSizeOptions={[5, 10, 20]}
      />
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
          rows={dataPopup?.result || []}
          columns={columnsPopup}
          pagination
          pageSizeOptions={[5, 10, 20]}
          rowCount={dataPopup?.total || 0}
        />
        <p>Total Price: {dataPopup?.total}</p>
      </Modal>
    </div>
  );
}
