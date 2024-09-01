import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Button, Box } from "@mui/material";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    Cookies.remove("token");
    Cookies.remove("user_id");

    router.push("/login");
  }, [router]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/login")}
      >
        Logging out...
      </Button>
    </Box>
  );
};

export default Logout;
