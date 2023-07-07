import { useState } from "react";
import { Organization } from "../../interfaces/entities";
import style from "../../src/styles/Home.module.css";
import { Button, DialogActions, DialogContent, TextField } from "@mui/material";

type Props = {
  updateOrganization(organization: Organization): void;
  onClose(): void;
  id: number;
  name: string;
  description: string;
  date: string;
  tel: string;
  mail: string;
  address: string;
};

const OrganizationUpdate: React.FC<Props> = (props) => {
  const [organization, setOrganization] = useState<Organization>({
    id: props.id,
    name: props.name,
    description: props.description,
    date: props.date,
    tel: props.tel,
    mail: props.mail,
    address: props.address,
  });
  const handeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrganization({
      ...organization,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = () => {
    props.updateOrganization(organization);
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

export default OrganizationUpdate;
