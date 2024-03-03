import Upload from "antd/lib/upload";
import message from "antd/lib/message";
import { Flex } from "antd";
import { UploadProps } from "antd";
import { UserEntryLayout } from "./UserEntryLayoutt";
import { Inbox } from "../../../components/icons";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded corretament.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload falhou.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

type UserDietProps = {
  uploadText: string;
  uploadHint: string;
};

const UserDiet = ({ uploadHint, uploadText }: UserDietProps) => {
  return (
    <div className="user-diets-page">
      <UserEntryLayout>
        <Flex>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <Inbox width="6rem" height="6rem" />
            </p>
            <p className="ant-upload-text">{uploadText}</p>
            <p className="ant-upload-hint">{uploadHint}</p>
          </Dragger>
          <div style={{ marginLeft: "16px" }}>
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="text"
              fileList={[
                {
                  uid: "-11",
                  name: "Plano Alimentar de Carlos Adriano Miranda",
                  status: "done",
                  url: "https://drive.google.com/file/d/1QmSytT84tyoj15TlYixkT-AYV9UISjY4/view?usp=drive_link",
                },
                {
                  uid: "-12",
                  name: "Plano Alimentar de Carlos Adriano Miranda",
                  status: "done",
                  url: "https://drive.google.com/file/d/1QmSytT84tyoj15TlYixkT-AYV9UISjY4/view?usp=drive_link",
                },
                {
                  uid: "-133",
                  name: "Plano Alimentar de Carlos Adriano Miranda",
                  status: "done",
                  url: "https://drive.google.com/file/d/1QmSytT84tyoj15TlYixkT-AYV9UISjY4/view?usp=drive_link",
                },
                {
                  uid: "-14",
                  name: "Plano Alimentar de Carlos Adriano Miranda",
                  status: "done",
                  url: "https://drive.google.com/file/d/1QmSytT84tyoj15TlYixkT-AYV9UISjY4/view?usp=drive_link",
                },
                {
                  uid: "-15",
                  name: "Plano Alimentar de Carlos Adriano Miranda",
                  status: "done",
                  url: "https://drive.google.com/file/d/1QmSytT84tyoj15TlYixkT-AYV9UISjY4/view?usp=drive_link",
                },
                {
                  uid: "-16",
                  name: "Plano Alimentar de Carlos Adriano Miranda",
                  status: "done",
                  url: "https://drive.google.com/file/d/1QmSytT84tyoj15TlYixkT-AYV9UISjY4/view?usp=drive_link",
                },
              ]}
            />
          </div>
        </Flex>
      </UserEntryLayout>
    </div>
  );
};
export { UserDiet };
