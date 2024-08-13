import React, { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Modal,
  Input,
  InputNumber,
  Upload,
  Button,
  UploadProps,
  UploadFile,
} from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import styles from "./productAd.module.scss";
import classNames from "classnames/bind";
import {
  useDelProductMutation,
  useProductQuery,
  useUpdateProductMutation,
} from "../../../api/ProductApi";
import { setProduct } from "../../../slice/productSlice";

const cx = classNames.bind(styles);

type FileType = Parameters<UploadProps["beforeUpload"]>[0];
let isChecked: boolean = false;
export default function ProductPage() {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useProductQuery();
  const products = useSelector((state: any) => state.product.products);
  const [deleteProduct] = useDelProductMutation();
  const [updateProduct, { isError: updateIsError }] =
    useUpdateProductMutation();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  useEffect(() => {
    if (isSuccess && data && !isChecked) {
      dispatch(setProduct(data));
      isChecked = true;
    }
  }, [isSuccess, data, dispatch]);

  const handleDelete = async (id: number) => {
    try {
      const result = await deleteProduct(id);
      if (result.data) {
        dispatch(setProduct(products.filter((row) => row.id !== id)));
        Modal.success({
          content: "Deleted successfully",
        });
      } else {
        Modal.error({
          content: "Delete failed",
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Modal.error({
        content: "Failed to delete product",
      });
    }
  };
  useEffect(() => {
    console.log(1);
    console.log("product", products);
  }, [products]);

  const handleEdit = (id: number) => {
    const product = products.find((row) => row.id === id);
    if (product) {
      setModalData(product);
      setIsModalVisible(true);
    }
  };

  const handleModalCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const resetForm = () => {
    setFileList([]);
    setModalData(null);
  };

  const handleModalOk = async () => {
    if (fileList.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    const file = fileList[0].originFileObj as FileType;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ecommerce");
    formData.append("cloud_name", "dvgjegefi");

    try {
      setIsLoadingUpdate(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvgjegefi/image/upload",
        formData
      );
      const result = await updateProduct({
        id: modalData.id,
        image: response.data.url,
        price: modalData.price,
        product_name: modalData.product_name,
      });

      if (updateIsError) {
        Modal.error({
          content: result.data,
        });
      } else {
        resetForm();
        const newRows = products.map((item) => {
          if (item.id === modalData.id) {
            return {
              ...result.data,
            };
          }
          return item;
        });
        dispatch(setProduct(newRows));
        Modal.success({
          content: "Updated successfully",
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoadingUpdate(false);
      setIsModalVisible(false);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Label ID", flex: 1 },
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
    { field: "product_name", headerName: "Label Name", flex: 3 },
    { field: "price", headerName: "Product Price", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <GridActionsCellItem
            icon={<EditIcon sx={{ color: "rgb(33 150 243)" }} />}
            label="Edit"
            onClick={() => handleEdit(params.row.id)}
          />
          <GridActionsCellItem
            icon={<DeleteIcon sx={{ color: "rgb(142 23 22)" }} />}
            label="Delete"
            onClick={() => handleDelete(params.row.id)}
          />
        </>
      ),
    },
  ];

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = useCallback(async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  }, []);

  return (
    <div
      className={cx("container", {
        isLoading: isLoading,
        backgroundOverLay: isLoading,
      })}
      style={{ height: 500, width: "100%" }}
    >
      <DataGrid rows={products} columns={columns} pageSizeOptions={[1, 2]} />
      <Modal
        className={cx("modal", {
          isLoading: isLoadingUpdate,
          backgroundOverLay: isLoadingUpdate,
        })}
        title="Edit Product"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleModalOk}>
            Save
          </Button>,
        ]}
      >
        <div className={cx("modalContent", "fl")}>
          <div className={cx("fieldset")}>
            <label htmlFor="productPrice">Product Price</label>
            <InputNumber
              className="input"
              id="productPrice"
              value={modalData && modalData.price}
              onChange={(value) => {
                setModalData({ ...modalData, price: value });
              }}
            />
          </div>
          <div className={cx("fieldset")}>
            <label htmlFor="productName">Product Name</label>
            <Input
              className="input"
              id="productName"
              value={modalData && modalData.product_name}
              onChange={(e) => {
                setModalData({ ...modalData, product_name: e.target.value });
              }}
            />
          </div>
          <div className={cx("fieldset", "uploadImage")}>
            <label htmlFor="productImage">Upload Image</label>
            <ImgCrop cropShape="round">
              <Upload
                className="input"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                beforeUpload={() => false}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </div>
        </div>
      </Modal>
    </div>
  );
}
