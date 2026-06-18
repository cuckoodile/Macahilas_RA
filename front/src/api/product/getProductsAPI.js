import { BASE_URL } from "../config";

export default async function getProductAPI() {
  const res = await fetch(`${BASE_URL}/products`, {  //undefined
    method: "GET",
    // Update: PATCH or PUT
    // Create : POST
    // Delete: DELETE/ DESTROY
  });

  if (!res.ok) {
    throw new Error("Something went wrong!");
    return;
  }

  const response = await res.json(); // undefined
  /**
   * DJ = Python
   * React = JS
   * 
   * {
   * id: 1,
   * name: "Ian"
   * }
   * 
   * JS => DJ (.JSON)
   * DJ => JS (.JSOM)
  */

  console.log(response)
  return response;
}
