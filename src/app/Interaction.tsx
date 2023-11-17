"use client";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import URL from "./utils/api/baseUrl";
import { getAuth } from "firebase/auth";
import obtainGama from "./utils/api/getBrand";

async function fethData() {
  try {
    const response = await fetch(
      `${URL.baseUrl}WeatherForecast/GetNewInteraction`
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
  const userAgent = navigator.userAgent;
  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (reaccion == "") {
      return;
    }
    setDisabled(true);
    const notification = toast.loading(`Se esta guardando su interacción...`);
    const imgUrl = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.es%2Ficono-gratis%2Fperfil_3135715&psig=AOvVaw3u8JNiq67xmYxaatFmRFz2&ust=1700337855439000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJj9xqHqy4IDFQAAAAAdAAAAABAJ";
    const res = await fetch(`${URL.baseUrl}WeatherForecast/CreateInteraction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reaccion: reaccion,
        contentColor: contentColor,
        textColor: textColor,
        reactionType: reactionType,
        imagen: imgUrl,
        gama: obtainGama(userAgent)
      }),
    });
    const data = await res.json();
    
    if (data.error) {
      toast.error(data.error, {
        id: notification,
      });
    } else {
      toast.success(`Gracias por dejar su reacción!`, {
        id: notification,
      });
    }
    setDisabled(false);
    window.location.reload();
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
          className=""
          type="submit"
          disabled={disabled}
          onClick={() => {
            setReaccion("Like");
          }}
        >
          <p className="text-3xl px-6">
          Me gusta</p>
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
        ><p className="text-3xl px-6">
        
        No me gusta</p>
        </Button>
      </form>
    </main>
  );
}

export default Interaction;
