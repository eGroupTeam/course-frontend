import Button from "@eGroupTeam/material/Button";
import TextField from "@eGroupTeam/material/TextField";
import Typography from "@eGroupTeam/material/Typography";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BasicExampleFormInput } from "interfaces/form";
import Layout from "components/Layout";

// Please read react-hook-form official doc for more details.
// https://react-hook-form.com/get-started
const Basic = function () {
  const { control, handleSubmit } = useForm<BasicExampleFormInput>();
  const [data, setData] = useState<BasicExampleFormInput>();

  const onSubmit = (values: BasicExampleFormInput) => setData(values);

  return (
    <Layout title="React Hook Form Basic Example">
      <Typography>Data: {JSON.stringify(data)}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <TextField
              label="Title"
              onChange={onChange}
              value={value}
              margin="normal"
            />
          )}
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Layout>
  );
};

export default Basic;
