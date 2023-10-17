"use client";
import { auth } from "@/../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "@/app/login";
import Loading from "@/app/components/loading";
import { useState, useEffect } from "react";
import SubmitMessage from "@/app/SubmitMessage";
import URL from "@/app/utils/api/baseUrl";
import Interaction from "@/app/Interaction";

import { useRouter } from "next/navigation";
function HomePage() {
  const [hasReaction, setHasReaction] = useState(false);
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    async function doFetch() {
      const response = await fetch(
        `${URL.baseUrl}WeatherForecast/GetUserInteraction/${user?.email}`
      );
      const data = await response.json();
      setHasReaction(data.hasReaction);
    }
    doFetch();
  }, [user]);
  if (loading) return <Loading />;
  if (!user) return <Login />;
  if (hasReaction) return <SubmitMessage />;
  return <Interaction />;
}

export default HomePage;
