"use client";
import { useEffect, useState } from "react";

import { Button } from "@mui/material";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
async function fethData() {
  try {
    const response = await fetch("https://localhost:7040/api/GetInteractions/");
    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

export default function Home() {
  const [contentColor, setContentColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [reaccion, setReaccion] = useState("");
  useEffect(() => {
    async function doFetch() {
      const api = await fethData();
      setContentColor(api[2].contentColor);
      setTextColor(api[7].contentColor);
    }
    //Utilizar cuando funcione la api
    //doFetch();
  }, []);

  // new reaction
  const onSubmit = async (e: any) => {
    e.preventDefault();
    //const reaction = e.target.reaccion.value;
    //console.log("Reacción a enviar:", reaction);
    if (reaccion == "") {
      return;
    }
    const res = await fetch(
      "https://localhost:7040/api/WeatherForecast/CreateInteraction",
      {
        method: "POST",
        body: JSON.stringify({ reaccion, contentColor, textColor }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
  };

  return (
    <main
      style={{ background: contentColor }}
      className="flex min-h-screen flex-col items-center justify-between box-border p-24"
    >
      <div className="p-40 rounded-2xl ">
        <h1 style={{ color: textColor }} className="text-5xl font-bold ">
          ES TU DIA DE SUERTE
        </h1>
      </div>
      <form onSubmit={onSubmit} className="flex justify-between gap-28">
        <Button
          id="reaccion"
          name="reaccion"
          variant="contained"
          className="text-4xl p-6"
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
          className="text-4xl p-6"
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
