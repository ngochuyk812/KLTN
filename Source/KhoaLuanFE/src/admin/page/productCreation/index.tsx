import styles from "./productCreation.module.scss";
import classNames from "classnames/bind";
import {
  Button,
  GetProp,
  Input,
  InputNumber,
  Modal,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import ImgCrop from "antd-img-crop";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useCreateProductMutation } from "../../../api/ProductApi";
import { useDispatch, useSelector } from "react-redux";
import { setProduct as setProductAction } from "../../../slice/productSlice";
const cx = classNames.bind(styles);
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function ProductCreation() {
  const products = useSelector((state: any) => state.product.products);
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [createProduct, { isError, isLoading: isLoadingCreation }] =
    useCreateProductMutation();
  const [isLoading, setIsLoading] = useState(false);

  const [product, setProduct] = useState({
    price: 10,
    product_name: "",
  });

  const [errors, setErrors] = useState({
    price: "",
    product_name: "",
  });

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

  const validateFields = () => {
    const newErrors = {
      price: "",
      product_name: "",
    };

    if (product.price <= 0) newErrors.price = "must be greater than 0.";
    if (!product.product_name) newErrors.product_name = "required";

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const resetForm = () => {
    setProduct({
      price: 10,
      product_name: "",
    });
    setFileList([]);
    setErrors({
      price: "",
      product_name: "",
    });
  };

  const handleUpload = async () => {
    if (!validateFields()) {
      return;
    }

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
      setIsLoading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvgjegefi/image/upload",
        formData
      );
      const result = await createProduct({
        image: response.data.url,
        price: product.price,
        product_name: product.product_name,
      });
      const newRows = [...products, result.data];

      if (isError) {
        Modal.error({
          content: result.data,
        });
      } else {
        resetForm();
        console.log("newRows", newRows);

        dispatch(setProductAction(newRows));
        Modal.success({
          content: "Created successfully",
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log("product", products);
  }, [products]);
  return (
    <div
      className={cx("container", {
        isLoading: isLoading,
      })}
    >
      <div className="main">
        <h4 className={cx("title")}>Information</h4>
        <div className={cx("productInformation", "fl")}>
          <div className={cx("fieldset")}>
            <div className={cx("fieldsetHeader")}>
              <label htmlFor="">Product Name</label>
              {errors.product_name && (
                <span className={cx("error")}>{errors.product_name}</span>
              )}
            </div>
            <Input
              value={product.product_name}
              className={cx("input")}
              onChange={(e) =>
                setProduct({ ...product, product_name: e.target.value })
              }
            />
          </div>
          <div className={cx("fieldset")}>
            <div className={cx("fieldsetHeader")}>
              <label htmlFor="">Product Price</label>
              {errors.price && (
                <span className={cx("error")}>{errors.price}</span>
              )}
            </div>
            <InputNumber
              value={product && product.price}
              className={cx("input")}
              min={1}
              max={1000000000000}
              defaultValue={10}
              onChange={(value) => setProduct({ ...product, price: value })}
            />
          </div>
        </div>
        <div className="line"></div>
        <div className={cx("imageContainer")}>
          <h4 className={cx("title")}>Image Upload</h4>
          <div className={cx("fieldset")}>
            <label htmlFor="">Upload Image</label>
            <ImgCrop className={cx("fieldset")} rotationSlider>
              <Upload
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
      </div>
      <div className={cx("actionAdd")}>
        <div className="line"></div>
        <Button
          className={cx("btnAdd")}
          onClick={handleUpload}
          variant="contained"
        >
          Publish
        </Button>
      </div>
    </div>
  );
}
