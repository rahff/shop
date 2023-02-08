import axios from "axios";
import * as fs from "fs";
import env from "dotenv";
env.config();
const apiToken: string = process.env.API_TOKEN || "";
const defaultConfig = { headers: {"Authorization": `Bearer ${apiToken}`}}
const authConfig = { headers: {"Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTY3NTUwMTcyOCwiZXhwIjoxNjc4MDkzNzI4fQ.5X-Z1BejX4h5NG293Xc2spkMNJAReDLNLEfENJtZggM`}}
const serverUrl = "http://localhost:1337/api";
const loginPath = "/auth/local?populate[0]=cart";
const registerPath = "/auth/local/register";
const credentials = (identifier: string)=> ({identifier, password: "strapiPassword"});
const cartBaseUrl = "/carts";
const cartQueryParams = "?populate[0]=items&populate[1]=customer";
const invoiceBaseUrl = "/invoices";
const authenticationBaseUrl = "/users/me";
const userBaseUrl = "/users";
const baseProductUrl = "/products";
const baseInvoicetUrl = "/invoices";
const productQuery = `?populate[0]=images`;
const productPageQuery = `?populate[0]=images&pagination[page]=${1}&pagination[pageSize]=6`;
const invoiceByCartQuery = `?filters[cart]=212&populate[0]=shipping_address`;
const http = axios.create()
// TODO



// const getUserToken = async (identifier: string): Promise<any> => {
//     const response = await http.post(serverUrl+loginPath, credentials(identifier));
//     fs.writeFileSync("./auth.json", JSON.stringify({user: response.data.user, jwt: response.data.jwt}))
//     return {user: response.data.user, jwt: response.data.jwt}
// }

// getUserToken("tester2test@gmail.com").then((response: any)=> console.log(response));

// const getCart = async () => {
//     const response = await http.get(serverUrl+cartBaseUrl+"/239"+cartQueryParams, defaultConfig);
//     fs.writeFileSync("./getCart.json", JSON.stringify(response.data))
// }

// getCart().then(()=> console.log("ok"));

// const getProductPage = async () => {
//     const response = await http.get(serverUrl+baseProductUrl+productPageQuery, defaultConfig);
//     fs.writeFileSync("./getProductPage.json", JSON.stringify(response.data))
// }

// getProductPage().then(()=> console.log("ok"));

// const createCart = async () => {
//     const response = await http.post(serverUrl+cartBaseUrl+cartQueryParams, {data:{
//         customer: null,
//         items: [],
//         amount: 0,
//         validated: false
//     }}, defaultConfig);
//     fs.writeFileSync("./createCart.json", JSON.stringify(response.data))
// }

// createCart().then(()=> console.log("ok"));

// const saveCart = async () => {
//     const response = await http.put(serverUrl+cartBaseUrl+"/237"+cartQueryParams, {data:{
//         amount: 19.99,
//         customer: 40,
//         validated: false,
//         items: [{
//             amount: 19.99,
//             image_url: "fake_url",
//             product_id: 1,
//             product_name: "fake_name",
//             product_price: 19.99,
//             quantity: 1
//         }],
//         id: 237
//     }}, defaultConfig);
//     fs.writeFileSync("./saveCart.json", JSON.stringify(response.data))
// }

// saveCart().then(()=> console.log("ok"));

// const validateCart = async () => {
//         const response = await http.put(serverUrl+cartBaseUrl+"/237"+cartQueryParams, {data:
//             {customerId: 40, cartId: 237, validated: true}}
//             , defaultConfig);
//                 fs.writeFileSync("./validateCart.json", JSON.stringify(response.data))
//             }
//  validateCart().then(()=> console.log("ok"));

// const createInvoice = async () => {
//     const response = await http.post(serverUrl+invoiceBaseUrl, 
//         {data:{
//             customer: 40,
//             cart: 200,
//             amount: 85.99,
//             paid: false,
//             payment_ref: null
//         }}, defaultConfig);
//         fs.writeFileSync("./createInvoice.json", JSON.stringify(response.data))
// }
// createInvoice().then(()=> console.log("ok"));

// const registerUser = async () => {
//     const response = await http.post(serverUrl+registerPath, {
//         username: "tintindu93@gmail.com",
//         firstname: "tintin",
//         name: "Milou",
//         email: "tintindu93@gmail.com",
//         birthday: "1992-05-18",
//         title: "Mr",
//         password: "strapiPassword"
//     });
//     fs.writeFileSync("./register.json", JSON.stringify(response.data))
// }

// registerUser().then(()=> console.log("ok"))
// .catch((error: any) => console.log(error.message));

// const authenticate = async () => {
//         const response = await http.get(serverUrl+userBaseUrl+"/30", authConfig);
//         fs.writeFileSync("./getUser.json", JSON.stringify(response.data))
//     }
    
//     authenticate().then(()=> console.log("ok"))
//     .catch((error: any) => console.log(error.message));

// const getInvoiceByCartId = async () => {
//     const response = await http.get(serverUrl+baseInvoicetUrl+invoiceByCartQuery, defaultConfig);
//     fs.writeFileSync("./getInvoiceByCart.json", JSON.stringify(response.data))
// }

// getInvoiceByCartId().then(()=> console.log("ok"));

// const saveInvoice = async () => {
//     const response = await http.put(serverUrl+baseInvoicetUrl+'/11'+invoiceByCartQuery,{data:{shipping_address: {
//         numero: "12b",
//         street_way: "Brandon street",
//         city: "New York",
//         country: "USA",
//         zipCode: "15000",
//         name: "Davidson Henry"
//     }}}, defaultConfig);
//     fs.writeFileSync("./saveInvoice.json", JSON.stringify(response.data))
// }

// saveInvoice().then(()=> console.log("ok")).catch((err: any) => console.log(err.message)
// );