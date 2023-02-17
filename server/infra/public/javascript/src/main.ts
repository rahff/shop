import { httpClientService } from "./HttpClientService";



const getCart = async () => {
  return  httpClientService.get("http://localhost:3000/api/cart/get/5")
}
window.addEventListener("DOMContentLoaded", ()=> {
  getCart()
    .then((response: Response)=> response.json())
    .then((body: any)=> {
      console.log(body);
    })
})