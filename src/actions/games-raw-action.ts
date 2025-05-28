import axios from "axios";
import { NextResponse } from "next/server";

export async function gamesRawAction() {

  const URL = process.env.RAWG_API;
  console.log("RAWG API URL:", URL);

  const response = await axios.get(`${process.env.RAWG_API}/games`, {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + process.env.RAWG_API_KEY,
        "Access-Control-Allow-Origin": "*",
    },
  });

  const data = response;
  return NextResponse.json(data);
}
