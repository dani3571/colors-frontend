"use client";
import { auth } from "@/../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "@/app/login";
import Loading from "@/app/components/loading";
import { useState, useEffect } from "react";
import SubmitMessage from "@/app/SubmitMessage";
import URL from "@/app/utils/api/baseUrl";
import Interaction from "@/app/Interaction";

function HomePage() {
  return <Interaction />;
}

export default HomePage;
