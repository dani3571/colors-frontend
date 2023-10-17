"use client";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import URL from "./utils/api/baseUrl";
import { auth, db } from "../../firebase";
import { getAuth } from "firebase/auth";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
async function fethData() {
  try {
    const response = await fetch(
      "https://localhost:7040/api/WeatherForecast/GetNewInteraction"
    );
    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

function Interaction() {
  const router = useRouter();
  const [contentColor, setContentColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [reaccion, setReaccion] = useState("");
  const [message, setMessage] = useState(true);
  const [reactionType, setreaccionType] = useState(true);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    async function doFetch() {
      await fethData().then((res) => {
        setMessage(res.message);
        setreaccionType(res.messageType);
        setContentColor(res.contentColor);
        setTextColor(res.textColor);
      });
    }
    doFetch();
  }, []);

  // new reaction
  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (reaccion == "") {
      return;
    }
    setDisabled(true);

    const notification = toast.loading(`Se esta guardando su interacción...`);
    const res = await fetch(`${URL.baseUrl}WeatherForecast/CreateInteraction`, {
      method: "POST",
      body: JSON.stringify({
        reaccion: reaccion,
        contentColor: contentColor,
        textColor: textColor,
        reactionType: reactionType,
        imagen: getAuth().currentUser?.photoURL,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    setDisabled(false);
    if (data.error) {
      toast.error(data.error, {
        id: notification,
      });
    } else {
      toast.success(`Gracias por dejar su reacción!`, {
        id: notification,
      });
    }
    router.refresh();
  };

  return (
    <main
      style={{ background: contentColor }}
      className="flex min-h-screen flex-col items-center justify-between box-border p-24"
    >
      <div className="p-40 rounded-2xl ">
        <h1 style={{ color: textColor }} className="text-5xl font-bold">
          {message}
        </h1>
      </div>
      <form onSubmit={onSubmit} className="flex justify-between gap-28">
        <Button
          id="reaccion"
          name="reaccion"
          variant="contained"
          className="text-4xl p-6"
          type="submit"
          disabled={disabled}
          onClick={() => {
            setReaccion("Like");
          }}
        >
          Me gusta
        </Button>
        <Button
          id="reaccion"
          name="reaccion"
          variant="contained"
          color="error"
          type="submit"
          className="text-4xl p-6"
          disabled={disabled}
          onClick={() => {
            setReaccion("Dislike");
          }}
        >
          No me gusta
        </Button>
      </form>
    </main>
  );
}

export default Interaction;
