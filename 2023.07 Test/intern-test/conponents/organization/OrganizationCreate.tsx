import { useState } from "react";
import { Organization } from "../../interfaces/entities";
import style from "../../src/styles/Home.module.css";
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
} from "@mui/material";

type Props = {
  addOrganization(organization: Organization): void;
  onClose(): void;
  onDateError(): void;
};

const OrganizationCreate: React.FC<Props> = (props) => {
  const pattern: RegExp = /^\d{4}-\d{2}-\d{2}$/;
  const [organization, setOrganization] = useState<Organization>({
    id: 0,
    name: "",
    description: "",
    date: "",
    tel: "",
    mail: "",
    address: "",
  });
  const handeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrganization({
      ...organization,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = () => {
    if (pattern.test(organization.date)) {
      props.addOrganization(organization);
      setOrganization({
        id: 0,
        name: "",
        description: "",
        date: "",
        tel: "",
        mail: "",
        address: "",
      });
      props.onClose();
    } else {
      props.onDateError();
    }
  };
  return (
    <div className={style.container}>
      <DialogContent>
        <TextField
          id="outlined-basic"
          label="公司名稱"
          variant="outlined"
          name="name"
          value={organization.name}
          onChange={handeChange}
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="公司描述"
          variant="outlined"
          name="description"
          value={organization.description}
          onChange={handeChange}
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="創建日期"
          variant="outlined"
          name="date"
          value={organization.date}
          onChange={handeChange}
          placeholder="YYYY-MM-DD"
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="公司電話"
          variant="outlined"
          name="tel"
          value={organization.tel}
          onChange={handeChange}
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="公司信箱"
          variant="outlined"
          name="mail"
          value={organization.mail}
          onChange={handeChange}
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="公司地址"
          variant="outlined"
          name="address"
          value={organization.address}
          onChange={handeChange}
        />
        <br />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSubmit}>
          送出
        </Button>
        <Button color="secondary" variant="contained" onClick={props.onClose}>
          取消
        </Button>
      </DialogActions>
    </div>
  );
};

export default OrganizationCreate;
