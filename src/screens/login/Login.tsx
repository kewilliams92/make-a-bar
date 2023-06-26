import { Component } from "solid-js";
import useForm from "../../hooks/useForm";
import { AuthForm } from "../../types/Forms";
import { SubmitHandler, createForm, zodForm } from "@modular-forms/solid";
import { z } from "zod";
import { Typography, Box, Stack, Button, ButtonGroup, Card } from "@suid/material";
import useAuthenticate from "../../hooks/useAuthenticate";



const LoginScreen: Component = () => {
    const { loading, authUser } = useAuthenticate("login")
    const { handleInput, submitForm } = useForm<AuthForm>({
        email: "",
        password: "",
      });
    
      const validationSchema = z.object({
        email: z.string().email({message: "Must be a valid email address"}),
        password: z.string().min(8, {message: "Password must be at least 8 character(s)"}).max(255),
      });
    
      const [registerForm, { Form, Field }] = createForm<
        z.infer<typeof validationSchema>
      >({
        validate: zodForm(validationSchema),
      });
    
      const handleSubmit: SubmitHandler<AuthForm> =  (values, event) => {
        event.preventDefault();
        authUser(values)
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
          <Typography variant="h4" align="center" color="#415A77" padding={2}>Login</Typography>
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
              <Field name="password">
                {(field, props) => (
                  <>
                    <h5>Password</h5>
                    <div style={{padding: '10px'}}>
                    <input {...props} type="password" required size={40} placeholder="Enter your password.."/>
                    {field.error && <div style={{"text-align": "center", "color": "red"}}>{field.error}</div>}
                    </div>
                  </>
                )}
              </Field>
              <ButtonGroup variant="contained" fullWidth>
                <Button disabled={loading()} type="submit" variant="contained" color="primary">Login</Button>
              </ButtonGroup>
              <Typography variant="body2" align="center" color="#415A77" padding={2}>Need an account? <a href="/auth/register">Sign up now!</a></Typography>
            </Form>
          </Stack>
          </Card>
        </Box>
      );
}

export default LoginScreen