import { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { registerUser } from "../api";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  return <></>;
};
