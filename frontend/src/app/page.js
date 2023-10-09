//TODO: redirect to login page if user is not logged in

import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/login");
}
