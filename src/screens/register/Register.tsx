import { Component } from "solid-js";
import useForm from "../../hooks/useForm";
import { RegisterForm } from "../../types/Forms";
import { SubmitHandler, createForm, zodForm } from "@modular-forms/solid";
import { z } from "zod";
import { Typography, Box, Stack, Button, ButtonGroup, Card } from "@suid/material";

type Register = {
  fullName: string;
  nickName: string;
  email: string;
  avatar: string;
  password: string;
  confirmPassword: string;
}

const RegisterScreen: Component = () => {
  const { handleInput, submitForm } = useForm<RegisterForm>({
    fullName: "",
    nickName: "",
    email: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  });

  const validationSchema = z.object({
    fullName: z.string().min(3, {message: "Must be at least 3 letters long"}).max(255),
    nickName: z.string().min(6, {message: "Nick name must be at least 6 letters long"}).max(255),
    email: z.string().email({message: "Must be a valid email address"}),
    avatar: z.optional(z.string()),
    password: z.string().min(8, {message: "Password must be at least 8 character(s)"}).max(255),
    confirmPassword: z.string().min(8, {message: "Password must be at least 8 character(s)"}).max(255),
  }).refine(data => data.password === data.confirmPassword, { message: "Passwords must match", path: ["confirmPassword"] });

  const [registerForm, { Form, Field }] = createForm<
    z.infer<typeof validationSchema>
  >({
    validate: zodForm(validationSchema),
  });

  const handleSubmit: SubmitHandler<RegisterForm> =  (values, event) => {
    console.log(values);
  };

  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        objectFit: "cover",
      }}
    >
      <Card sx={{ 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: "400px",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)"
      }}>
      <Typography variant="h4" align="center" color="#415A77" padding={2}>Register</Typography>
      <Stack as="form" spacing={2} sx={{ width: "100%", maxWidth: "400px", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <Form
          onSubmit={handleSubmit}
          style={{
           "display": "flex",
            "justify-content": "center",
            "align-items": "center",
            "flex-direction": "column",
          }}
        >
          <Field 
          name="fullName">
            {(field, props) => (
              <>
                <h5>Full Name</h5>
                <div style={{padding: "10px"}}>
                <input {...props} height={"100px"} type="fullName" required size={40} placeholder="Enter your full name.."/>
                {field.error && <div style={{"text-align": "center", "color": "red"}}>{field.error}</div>}
                </div>
              </>
            )}
          </Field>
          <Field name="nickName">
            {(field, props) => (
              <>
                <h5>Nickname</h5>
                <div style={{padding: "10px"}}>
                <input {...props} type="nickName" required size={40} placeholder="Enter your nickname.."/>
                {field.error && <div style={{"text-align": "center", "color": "red"}}>{field.error}</div>}
                </div>
              </>
            )}
          </Field>
          <Field name="email">
            {(field, props) => (
              <>
                <h5>Email</h5>
                <div style={{padding: "10px"}}>
                <input {...props} type="email" required size={40} placeholder="Enter your email.." />
                {field.error && <div style={{"text-align": "center", "color": "red"}}>{field.error}</div>}
                </div>
              </>
            )}
          </Field>
          <Field name="avatar">
            {(field, props) => (
              <>
                <h5>Avatar</h5>
                <div style={{padding: "10px"}}>
                <input {...props} type="avatar" required size={40} placeholder="Submit a link to a picture.."/>
                {field.error && <div style={{"text-align": "center", "color": "red"}}>{field.error}</div>}
                </div>
              </>
            )}
          </Field>
          <Field name="password">
            {(field, props) => (
              <>
                <h5>Password</h5>
                <div style={{padding: '10px'}}>
                <input {...props} type="password" required size={40} placeholder="Enter a password.."/>
                {field.error && <div style={{"text-align": "center", "color": "red"}}>{field.error}</div>}
                </div>
              </>
            )}
          </Field>
          <Field name="confirmPassword">
            {(field, props) => (
              <>
                <h5>Confirm Password</h5>
                <div style={{padding: "10px"}}>
                <input {...props} type="password" required size={40} placeholder="Confirm your password.."/>
                {field.error && <div style={{"text-align": "center", "color": "red"}}>{field.error}</div>}
                </div>
              </>
            )}
          </Field>
          <ButtonGroup variant="contained" fullWidth>
            <Button type="submit" variant="contained" color="primary">Register</Button>
          </ButtonGroup>
          <Typography variant="body2" align="center" color="#415A77" padding={2}>Already have an account? <a href="/login">Login</a></Typography>
        </Form>
      </Stack>
      </Card>
    </Box>
  );
};

export default RegisterScreen;
