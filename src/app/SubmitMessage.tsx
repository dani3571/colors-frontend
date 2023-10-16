import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { GetServerSidePropsContext } from "next";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  lineHeight: "60px",
  paddingTop: "36px",
  paddingBottom: "36px",
  paddingLeft: "40px",
  paddingRight: "40px",
  fontWeight: "bold",
  fontSize: "44px",
  display: "grid",
  justifyContent: "center",
  justifyItems: "center",
}));
export default function SubmitMessage() {
  const router = useRouter();
  return (
    <>
      <main className="grid min-h-screen flex-col justify-center box-border p-24 bg-slate-200 content-center">
        <Item elevation={2}>
          {`Gracias por dejar tu reacción!`}
          <img
            className="grid my-6"
            src={"https://cdn-icons-png.flaticon.com/512/6873/6873405.png"}
            alt="Icon"
            width={50}
            height={50}
          ></img>
          <Button
            variant="contained"
            onClick={() =>
              auth.signOut().then(() => {
                router.push("./");
              })
            }
          >
            Cerrar sesión
          </Button>
        </Item>
      </main>
    </>
  );
}
