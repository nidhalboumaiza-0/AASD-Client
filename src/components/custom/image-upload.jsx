import { Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";

const ImageUpload = ({setFile}) => {
  return (
    <ImgCrop rotationSlider>
      <Upload
        beforeUpload={(file) => {
          setFile(file);
          return false;
        }}
        listType="picture"
        accept="image/jpg, image/jpeg ,image/png"
        showUploadList={true}
        type="file"
        onChange={() => null}
      >
        <Button>Image de profile</Button>
      </Upload>
    </ImgCrop>
  );
};

export default ImageUpload;
