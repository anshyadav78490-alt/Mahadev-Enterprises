// Starter storefront. Demo catalogue only; replace prices/items with actual stock before launch.
const WHATSAPP_NUMBER = "919354779499"; // India country code + shop number
const demoProducts = [
 {id:"p1",type:"phone",name:"Pre-owned Android Phone",desc:"Illustrative listing • add actual model",price:4500,condition:"Demo listing",art:"📱"},
 {id:"p2",type:"phone",name:"Pre-owned Smartphone",desc:"Illustrative listing • add actual model",price:6500,condition:"Demo listing",art:"📲"},
 {id:"p3",type:"phone",name:"Budget Used Phone",desc:"Illustrative listing • add actual model",price:2800,condition:"Demo listing",art:"📱"},
 {id:"p4",type:"phone",name:"Pre-owned 5G Phone",desc:"Illustrative listing • add actual model",price:8500,condition:"Demo listing",art:"📳"},
 {id:"a1",type:"accessory",name:"USB Charging Cable",desc:"Illustrative sample product",price:99,condition:"Sample",art:"🔌"},
 {id:"a2",type:"accessory",name:"Fast Charger",desc:"Illustrative sample product",price:299,condition:"Sample",art:"🔋"},
 {id:"a3",type:"accessory",name:"Wired Earphones",desc:"Illustrative sample product",price:199,condition:"Sample",art:"🎧"},
 {id:"a4",type:"accessory",name:"Screen Protector",desc:"Illustrative sample product",price:79,condition:"Sample",art:"🛡️"}
];
let cart = [];
const rupees = n => "₹" + Number(n).toLocaleString("en-IN");
const $ = id => document.getElementById(id);
function renderProducts(type,target){$(target).innerHTML=demoProducts.filter(p=>p.type===type).map(p=>`<article class="product"><div class="product-art ${p.type==="accessory"?"accessory":""}"><span class="demo-label">SAMPLE IMAGE</span>${p.art}</div><div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><div class="price-line"><span class="price">${rupees(p.price)}</span><span class="condition">${p.condition}</span></div><button class="add-button" data-add="${p.id}">Add to cart +</button></div></article>`).join("");}
function renderCart(){ $("cartCount").textContent=cart.reduce((n,x)=>n+x.qty,0);$("cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-item"><div><strong>${x.name}</strong><p>${rupees(x.price)} each</p></div><div class="qty"><button data-minus="${x.id}">−</button><span>${x.qty}</span><button data-plus="${x.id}">+</button></div></div>`).join(""):'<p class="small">Your cart is empty. Add a product to get started.</p>';$("cartTotal").textContent=rupees(cart.reduce((n,x)=>n+x.price*x.qty,0));}
function toast(msg){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2300)}
function openCart(){$("cartDrawer").classList.add("open");$("backdrop").classList.add("open")}
function closeCart(){$("cartDrawer").classList.remove("open");$("backdrop").classList.remove("open")}
renderProducts("phone","phoneProducts");renderProducts("accessory","accessoryProducts");renderCart();$("year").textContent=new Date().getFullYear();
document.addEventListener("click",e=>{const add=e.target.closest("[data-add]");if(add){const p=demoProducts.find(p=>p.id===add.dataset.add);const item=cart.find(x=>x.id===p.id);if(item)item.qty++;else cart.push({...p,qty:1});renderCart();toast("Added to cart");}
const plus=e.target.closest("[data-plus]");if(plus){const x=cart.find(x=>x.id===plus.dataset.plus);x.qty++;renderCart();}
const minus=e.target.closest("[data-minus]");if(minus){const x=cart.find(x=>x.id===minus.dataset.minus);x.qty--;if(x.qty<=0)cart=cart.filter(y=>y.id!==x.id);renderCart();}
const svc=e.target.closest("[data-service]");if(svc){const msg=`Hello Mahadev Enterprise, I want to ask about: ${svc.dataset.service}. Please share availability and estimate.`;window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank","noopener");}
});
$("openCart").onclick=openCart;$("closeCart").onclick=closeCart;$("backdrop").onclick=closeCart;$("menuBtn").onclick=()=>$("nav").classList.toggle("show");
$("shopWhatsapp").href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Mahadev Enterprise, please share product availability.")}`;
$("checkoutBtn").onclick=()=>{if(!cart.length)return toast("Your cart is empty");const name=$("customerName").value.trim(),phone=$("customerPhone").value.trim();if(!name||!/^[0-9+\-\s]{10,15}$/.test(phone))return toast("Enter your name and a valid phone number");const lines=cart.map(x=>`• ${x.name} × ${x.qty} — ${rupees(x.price*x.qty)}`).join("\n");const total=cart.reduce((n,x)=>n+x.price*x.qty,0);const msg=`New pickup order enquiry — Mahadev Enterprise\nName: ${name}\nCustomer phone: ${phone}\nPayment preference: ${$("paymentMethod").value}\nItems:\n${lines}\nTotal (demo prices): ${rupees(total)}\nPlease confirm stock and final price. This message is an enquiry, not a paid order.`;window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank","noopener");toast("WhatsApp order message prepared");};
