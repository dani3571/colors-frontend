"use client";
import { Button } from "@mui/material";
import Head from "next/head";
import { auth, initFireBase, provider } from "../../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import URL from "./utils/api/baseUrl";
import { useRouter } from "next/navigation";

function Login() {
  initFireBase();
  const router = useRouter();
  const signIn = async () => {
    await signInWithPopup(auth, provider).catch((e: any) => {
      console.log(e);
    });
    if (getAuth().currentUser != null) {
      const userResponse = await fetch(
        `${URL.baseUrl}WeatherForecast/GetUserByEmail/${
          getAuth().currentUser?.email
        }`
      );
      if (!userResponse.ok) {
        throw new Error("Error en la solicitud: " + userResponse.status);
      }
      if (userResponse.status == 204) {
        await fetch(`${URL.baseUrl}WeatherForecast/CreateNewUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: getAuth().currentUser?.email,
          }),
        });
      }
      router.refresh();
    }
  };

  return (
    <div className="grid place-items-center h-screen bg-whitesmoke">
      <Head>
        <title>Login</title>
      </Head>

      <div className="p-16 flex flex-col items-center bg-white rounded-lg shadow-lg">
        <img
          className="h-200 w-200 mb-16"
          src="https://cdn-icons-png.flaticon.com/512/6873/6873405.png"
        />
        <Button onClick={signIn} variant="outlined">
          Iniciar sesión con Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
