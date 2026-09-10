import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";


// Firebase Config ของ WHATDOUBTS
const firebaseConfig = {
    apiKey: "ใส่ของคุณ",
    authDomain: "whatdoubts.firebaseapp.com",
    projectId: "whatdoubts",
    storageBucket: "ใส่ของคุณ",
    messagingSenderId: "ใส่ของคุณ",
    appId: "ใส่ของคุณ"
};


// เริ่ม Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

let cart = [];


// ==================================================
// ตั้งค่าน้ำหนักสินค้า
//
// น้ำหนักถูกเก็บหลังบ้าน
// ลูกค้าไม่เห็น
//
// เสื้อ = ประมาณ 300 กรัม
// กางเกง = ประมาณ 650 กรัม
// ==================================================


// ==================================================
// หมวดหมู่สินค้า
// ==================================================

function showCategory(category, button) {

    const products =
        document.querySelectorAll(".product");

    const buttons =
        document.querySelectorAll(".category");

    const title =
        document.getElementById("category-title");


    buttons.forEach(function(btn) {
        btn.classList.remove("active");
    });


    button.classList.add("active");


    if (category === "all") {

        title.textContent = "สินค้าทั้งหมด";

    }

    else if (category === "shirt") {

        title.textContent = "เสื้อ";

    }

    else if (category === "pants") {

        title.textContent = "กางเกง";

    }


    products.forEach(function(product) {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {

            product.style.display = "block";

        }

        else {

            product.style.display = "none";

        }

    });
}



// ==================================================
// เพิ่มสินค้าเข้าตะกร้า
//
// weight = น้ำหนักสินค้าเป็นกรัม
// ==================================================

function addToCart(
    id,
    name,
    price,
    weight,
    sizeId
) {

    const size =
        document.getElementById(sizeId).value;


    cart.push({

        id: id,

        name: name,

        price: price,

        weight: weight,

        size: size

    });


    updateCart();


    alert(
        "เพิ่ม " +
        name +
        " ไซซ์ " +
        size +
        " ลงตะกร้าแล้ว"
    );
}



// ==================================================
// ลบสินค้า
// ==================================================

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}



// ==================================================
// คำนวณราคาสินค้า
// ==================================================

function calculateProductTotal() {

    let total = 0;


    cart.forEach(function(item) {

        total += item.price;

    });


    return total;
}



// ==================================================
// คำนวณน้ำหนักรวม
//
// ลูกค้าไม่เห็น
// ==================================================

function calculateTotalWeight() {

    let weight = 0;


    cart.forEach(function(item) {

        weight += item.weight;

    });


    // เผื่อน้ำหนักซอง / กล่อง / เทป
    // 100 กรัมต่อออเดอร์

    if (cart.length > 0) {

        weight += 100;

    }


    return weight;
}



// ==================================================
// ทำความสะอาดชื่อจังหวัด
// ==================================================

function normalizeProvince(text) {

    return text

        .trim()

        .toLowerCase()

        .replace(/\s+/g, "")

        .replace("จังหวัด", "")

        .replace("จ.", "")

        .replace("ฯ", "");
}



// ==================================================
// จังหวัดที่อยู่ใกล้ร้าน
//
// ตอนนี้ตั้งตัวอย่างต้นทางบริเวณปทุมธานี
// ==================================================

const nearProvinces = [

    "ปทุมธานี",

    "กรุงเทพ",

    "กรุงเทพมหานคร",

    "นนทบุรี",

    "นครนายก",

    "พระนครศรีอยุธยา",

    "อยุธยา",

    "สมุทรปราการ"

];



// ==================================================
// จังหวัดระยะกลาง
// ==================================================

const middleProvinces = [

    "นครปฐม",

    "สมุทรสาคร",

    "สมุทรสงคราม",

    "สระบุรี",

    "ลพบุรี",

    "สุพรรณบุรี",

    "อ่างทอง",

    "สิงห์บุรี",

    "ชัยนาท",

    "ฉะเชิงเทรา",

    "ชลบุรี",

    "ปราจีนบุรี",

    "สระแก้ว",

    "ระยอง"

];



// ==================================================
// จังหวัดระยะไกล
// ==================================================

const farProvinces = [

    "เชียงใหม่",
    "เชียงราย",
    "แม่ฮ่องสอน",
    "ลำพูน",
    "ลำปาง",
    "พะเยา",
    "แพร่",
    "น่าน",

    "อุตรดิตถ์",
    "พิษณุโลก",
    "สุโขทัย",
    "ตาก",
    "เพชรบูรณ์",

    "ขอนแก่น",
    "อุดรธานี",
    "หนองคาย",
    "เลย",
    "นครพนม",
    "สกลนคร",
    "มุกดาหาร",
    "กาฬสินธุ์",
    "มหาสารคาม",
    "ร้อยเอ็ด",

    "นครราชสีมา",
    "บุรีรัมย์",
    "สุรินทร์",
    "ศรีสะเกษ",
    "อุบลราชธานี",
    "ยโสธร",
    "อำนาจเจริญ",

    "ชุมพร",
    "สุราษฎร์ธานี",
    "นครศรีธรรมราช",
    "กระบี่",
    "พังงา",
    "ภูเก็ต",
    "ระนอง",

    "ตรัง",
    "พัทลุง",
    "สงขลา",
    "สตูล",
    "ปัตตานี",
    "ยะลา",
    "นราธิวาส"

];



// ==================================================
// ตรวจว่าจังหวัดอยู่โซนไหน
//
// ค่านี้ไม่แสดงให้ลูกค้าเห็น
// ==================================================

function getProvinceZone() {

    const provinceInput =
        document.getElementById(
            "customer-province"
        );


    if (!provinceInput) {

        return null;

    }


    const province =
        normalizeProvince(
            provinceInput.value
        );


    if (province === "") {

        return null;

    }


    // ----------------------------
    // ตรวจจังหวัดใกล้
    // ----------------------------

    const isNear =
        nearProvinces.some(
            function(item) {

                return (
                    normalizeProvince(item) ===
                    province
                );

            }
        );


    if (isNear) {

        return "near";

    }


    // ----------------------------
    // ตรวจจังหวัดระยะกลาง
    // ----------------------------

    const isMiddle =
        middleProvinces.some(
            function(item) {

                return (
                    normalizeProvince(item) ===
                    province
                );

            }
        );


    if (isMiddle) {

        return "middle";

    }


    // ----------------------------
    // ตรวจจังหวัดไกล
    // ----------------------------

    const isFar =
        farProvinces.some(
            function(item) {

                return (
                    normalizeProvince(item) ===
                    province
                );

            }
        );


    if (isFar) {

        return "far";

    }


    // ถ้าระบบไม่รู้จักชื่อ
    return "unknown";
}



// ==================================================
// ค่าส่งพื้นฐานจากน้ำหนัก
//
// เป็นเรทของร้านสำหรับระบบเว็บ
// ไม่ใช่การดึงราคา EMS จริง
// ==================================================

function calculateWeightPrice() {

    const weight =
        calculateTotalWeight();


    if (weight === 0) {

        return 0;

    }


    // ไม่เกิน 500 กรัม

    if (weight <= 500) {

        return 35;

    }


    // 501 - 1,000 กรัม

    else if (weight <= 1000) {

        return 45;

    }


    // 1,001 - 2,000 กรัม

    else if (weight <= 2000) {

        return 65;

    }


    // 2,001 - 3,000 กรัม

    else if (weight <= 3000) {

        return 85;

    }


    // 3,001 - 5,000 กรัม

    else if (weight <= 5000) {

        return 110;

    }


    // มากกว่า 5 กิโล

    else {

        return 150;

    }
}



// ==================================================
// ค่าเพิ่มตามจังหวัด
//
// ลูกค้าไม่เห็นว่าเพิ่มเท่าไร
// ==================================================

function calculateProvincePrice() {

    const zone =
        getProvinceZone();


    if (zone === null) {

        return 0;

    }


    if (zone === "near") {

        return 0;

    }


    if (zone === "middle") {

        return 10;

    }


    if (zone === "far") {

        return 20;

    }


    // ถ้าพิมพ์จังหวัดที่ระบบไม่รู้จัก
    return 0;
}



// ==================================================
// ค่าจัดส่งสุดท้าย
//
// น้ำหนัก + จังหวัด
//
// ลูกค้าจะเห็นเฉพาะผลรวมตัวนี้
// ==================================================

function calculateShipping() {

    if (cart.length === 0) {

        return 0;

    }


    const zone =
        getProvinceZone();


    // ยังไม่ได้กรอกจังหวัด

    if (zone === null) {

        return 0;

    }


    // ชื่อจังหวัดไม่ถูกต้อง

    if (zone === "unknown") {

        return 0;

    }


    const weightPrice =
        calculateWeightPrice();


    const provincePrice =
        calculateProvincePrice();


    return (
        weightPrice +
        provincePrice
    );
}



// ==================================================
// อัปเดตตะกร้า
// ==================================================

function updateCart() {

    const countElement =
        document.getElementById(
            "cart-count"
        );


    if (countElement) {

        countElement.textContent =
            cart.length;

    }


    const cartItems =
        document.getElementById(
            "cart-items"
        );


    if (!cartItems) {

        return;

    }


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p class='empty-cart'>ยังไม่มีสินค้าในตะกร้า</p>";

    }


    cart.forEach(function(item, index) {

        cartItems.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-info">

                    <strong>
                        ${item.name}
                    </strong>

                    <p>
                        ไซซ์ ${item.size}
                        •
                        ฿${item.price.toLocaleString()}
                    </p>

                </div>


                <button
                    class="remove-button"
                    onclick="removeItem(${index})"
                >
                    ลบ
                </button>

            </div>

        `;

    });


    const total =
        calculateProductTotal();


    const cartTotal =
        document.getElementById(
            "cart-total"
        );


    if (cartTotal) {

        cartTotal.textContent =
            total.toLocaleString();

    }


    updateCheckoutTotal();
}



// ==================================================
// อัปเดตยอด Checkout
// ==================================================

function updateCheckoutTotal() {

    const productTotal =
        calculateProductTotal();


    const shippingPrice =
        calculateShipping();


    const grandTotal =
        productTotal +
        shippingPrice;


    const productTotalElement =
        document.getElementById(
            "product-total"
        );


    const shippingElement =
        document.getElementById(
            "shipping-price"
        );


    const checkoutElement =
        document.getElementById(
            "checkout-total"
        );


    if (productTotalElement) {

        productTotalElement.textContent =
            productTotal.toLocaleString();

    }


    if (shippingElement) {

        // ถ้ายังไม่ได้กรอกจังหวัด
        // แสดง - แทน 0 บาท

        if (
            cart.length > 0 &&
            getProvinceZone() === null
        ) {

            shippingElement.textContent = "-";

        }

        else if (
            getProvinceZone() === "unknown"
        ) {

            shippingElement.textContent = "-";

        }

        else {

            shippingElement.textContent =
                shippingPrice.toLocaleString();

        }

    }


    if (checkoutElement) {

        checkoutElement.textContent =
            grandTotal.toLocaleString();

    }


    updateProvinceStatus();
}



// ==================================================
// ข้อความตรวจสอบจังหวัด
// ==================================================

function updateProvinceStatus() {

    const status =
        document.getElementById(
            "province-status"
        );


    if (!status) {

        return;

    }


    const province =
        document.getElementById(
            "customer-province"
        ).value.trim();


    if (province === "") {

        status.textContent =
            "กรอกจังหวัดเพื่อคำนวณค่าจัดส่ง";

        status.className =
            "province-status";

        return;
    }


    const zone =
        getProvinceZone();


    if (zone === "unknown") {

        status.textContent =
            "กรุณาตรวจสอบชื่อจังหวัด";

        status.className =
            "province-status error";

    }

    else {

        status.textContent =
            "คำนวณค่าจัดส่งแล้ว";

        status.className =
            "province-status success";

    }
}



// ==================================================
// อ่านจังหวัดทันทีที่ลูกค้าพิมพ์
// ==================================================

const provinceInput =
    document.getElementById(
        "customer-province"
    );


if (provinceInput) {

    provinceInput.addEventListener(
        "input",
        function() {

            updateCheckoutTotal();

        }
    );

}



// ==================================================
// เปิดตะกร้า
// ==================================================

function openCart() {

    updateCart();


    document
        .getElementById(
            "cart-modal"
        )
        .classList.add("show");
}



// ==================================================
// ปิดตะกร้า
// ==================================================

function closeCart() {

    document
        .getElementById(
            "cart-modal"
        )
        .classList.remove("show");
}



// ==================================================
// เปิด Checkout
// ==================================================

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "กรุณาเลือกสินค้าก่อน"
        );

        return;
    }


    closeCart();


    updateCheckoutTotal();


    document
        .getElementById(
            "checkout-modal"
        )
        .classList.add("show");
}



// ==================================================
// ปิด Checkout
// ==================================================

function closeCheckout() {

    document
        .getElementById(
            "checkout-modal"
        )
        .classList.remove("show");
}



// ==================================================
// ยืนยันคำสั่งซื้อ
// ==================================================

    document
        .getElementById("checkout-form")
        .addEventListener(
            "submit",
            async function(event) {
    
                event.preventDefault();
    
    
                const name =
                    document
                        .getElementById("customer-name")
                        .value.trim();
    
    
                const phone =
                    document
                        .getElementById("customer-phone")
                        .value.trim();
    
    
                const address =
                    document
                        .getElementById("customer-address")
                        .value.trim();
    
    
                const province =
                    document
                        .getElementById("customer-province")
                        .value.trim();
    
    
                const postcode =
                    document
                        .getElementById("customer-postcode")
                        .value.trim();
    
    
                if (
                    !name ||
                    !phone ||
                    !address ||
                    !province ||
                    !postcode
                ) {
    
                    alert("กรุณากรอกข้อมูลให้ครบ");
    
                    return;
                }
    
    
                if (!/^\d{5}$/.test(postcode)) {
    
                    alert("กรุณากรอกรหัสไปรษณีย์ 5 หลัก");
    
                    return;
                }
    
    
                if (
                    getProvinceZone() === "unknown"
                ) {
    
                    alert("ไม่พบจังหวัด กรุณาตรวจสอบชื่อจังหวัด");
    
                    return;
                }
    
    
                const productTotal =
                    calculateProductTotal();
    
    
                const shippingPrice =
                    calculateShipping();
    
    
                const grandTotal =
                    productTotal +
                    shippingPrice;
    
    
                const orderData = {
    
                    customerName: name,
    
                    phone: phone,
    
                    address: address,
    
                    province: province,
    
                    postcode: postcode,
    
                    items: cart.map(function(item) {
    
                        return {
                            id: item.id,
                            name: item.name,
                            size: item.size,
                            price: item.price
                        };
    
                    }),
    
                    productTotal: productTotal,
    
                    shippingPrice: shippingPrice,
    
                    grandTotal: grandTotal,
    
                    shippingMethod:
                        "Thailand Post EMS",
    
                    status:
                        "pending",
    
                    createdAt:
                        serverTimestamp()
    
                };
    
    
                try {
    
                    const docRef =
                        await addDoc(
                            collection(db, "orders"),
                            orderData
                        );
    
    
                    console.log(
                        "Order saved:",
                        docRef.id
                    );
    
    
                    closeCheckout();
    
    
                    document
                        .getElementById("success-modal")
                        .classList.add("show");
    
                }
    
                catch (error) {
    
                    console.error(error);
    
                    alert(
                        "เกิดข้อผิดพลาดในการส่งคำสั่งซื้อ กรุณาลองใหม่"
                    );
    
                }
    
            }
        );


            // ตรวจรหัสไปรษณีย์

            if (
                !/^\d{5}$/.test(postcode)
            ) {

                alert(
                    "กรุณากรอกรหัสไปรษณีย์ 5 หลัก"
                );

                return;
            }


            // ตรวจชื่อจังหวัด

            if (
                getProvinceZone() ===
                "unknown"
            ) {

                alert(
                    "ไม่พบจังหวัด กรุณาตรวจสอบชื่อจังหวัด"
                );

                return;
            }


            const shipping =
                calculateShipping();


            const total =
                calculateProductTotal() +
                shipping;


            // ตอนนี้ข้อมูลยังไม่ได้บันทึก
            // ลงฐานข้อมูล
            //
            // เราสามารถต่อ Firebase
            // ในขั้นตอนถัดไปได้


            closeCheckout();


            document
                .getElementById(
                    "success-modal"
                )
                .classList.add("show");

        }
    );



// ==================================================
// จบออเดอร์
// ==================================================

function finishOrder() {

    cart = [];


    updateCart();


    document
        .getElementById(
            "checkout-form"
        )
        .reset();


    document
        .getElementById(
            "success-modal"
        )
        .classList.remove("show");


    updateProvinceStatus();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });
}



// ==================================================
// เปลี่ยนรูปสินค้า
// ==================================================

function changeProductImage(
    mainImageId,
    thumbnail,
    countId,
    number
) {

    const mainImage =
        document.getElementById(
            mainImageId
        );


    mainImage.style.opacity =
        "0";


    setTimeout(function() {

        mainImage.src =
            thumbnail.src;


        mainImage.style.opacity =
            "1";

    }, 150);


    const thumbnails =
        thumbnail
            .parentElement
            .querySelectorAll(
                ".thumbnail"
            );


    thumbnails.forEach(
        function(item) {

            item.classList.remove(
                "active-thumbnail"
            );

        }
    );


    thumbnail.classList.add(
        "active-thumbnail"
    );


    document
        .getElementById(countId)
        .textContent =
        number + " / 4";
}

// =====================================
// BANNER AUTO SLIDESHOW
// =====================================

const bannerBackgrounds =
    document.querySelectorAll(".banner-bg");


let currentBannerIndex = 0;


function nextBanner() {

    if (bannerBackgrounds.length <= 1) {
        return;
    }


    // ซ่อนรูปปัจจุบัน
    bannerBackgrounds[
        currentBannerIndex
    ].classList.remove("active");


    // ไปรูปต่อไป
    currentBannerIndex++;


    // ถ้าถึงรูปสุดท้าย
    // ให้กลับไปเริ่มรูปแรก
    if (
        currentBannerIndex >=
        bannerBackgrounds.length
    ) {

        currentBannerIndex = 0;

    }


    // แสดงรูปใหม่
    bannerBackgrounds[
        currentBannerIndex
    ].classList.add("active");

}


// เปลี่ยนรูปทุก 5 วินาที

setInterval(
    nextBanner,
    5000
);

// ==================================================
// เริ่มระบบ
// ==================================================

updateCart();
updateProvinceStatus();

window.showCategory = showCategory;
window.addToCart = addToCart;
window.removeItem = removeItem;

window.openCart = openCart;
window.closeCart = closeCart;

window.openCheckout = openCheckout;
window.closeCheckout = closeCheckout;

window.finishOrder = finishOrder;

window.changeProductImage =
    changeProductImage;

window.updateCheckoutTotal =
    updateCheckoutTotal;
