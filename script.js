import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
    getFirestore,
    collection,
    Doc,
    runTransaction,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBkovmV3neR0N1ITqbSbvzwqTb06WdnWF8",
    authDomain: "whatdoubts.firebaseapp.com",
    projectId: "whatdoubts",
    storageBucket: "whatdoubts.firebasestorage.app",
    messagingSenderId: "44143274298",
    appId: "1:44143274298:web:8cde4fde974a916984c803",
    measurementId: "G-Q69TZ5DWHK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let cart = [];


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
// ==================================================

function calculateTotalWeight() {

    let weight = 0;


    cart.forEach(function(item) {

        weight += item.weight;

    });


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
// จังหวัดใกล้
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
// จังหวัดไกล
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
// ตรวจโซนจังหวัด
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


    const isNear =
        nearProvinces.some(function(item) {

            return (
                normalizeProvince(item) ===
                province
            );

        });


    if (isNear) {

        return "near";

    }


    const isMiddle =
        middleProvinces.some(function(item) {

            return (
                normalizeProvince(item) ===
                province
            );

        });


    if (isMiddle) {

        return "middle";

    }


    const isFar =
        farProvinces.some(function(item) {

            return (
                normalizeProvince(item) ===
                province
            );

        });


    if (isFar) {

        return "far";

    }


    return "unknown";
}



// ==================================================
// ค่าส่งตามน้ำหนัก
// ==================================================

function calculateWeightPrice() {

    const weight =
        calculateTotalWeight();


    if (weight === 0) {

        return 0;

    }


    if (weight <= 500) {

        return 35;

    }


    else if (weight <= 1000) {

        return 45;

    }


    else if (weight <= 2000) {

        return 65;

    }


    else if (weight <= 3000) {

        return 85;

    }


    else if (weight <= 5000) {

        return 110;

    }


    else {

        return 150;

    }
}



// ==================================================
// ค่าเพิ่มตามจังหวัด
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


    return 0;
}



// ==================================================
// ค่าจัดส่งสุดท้าย
// ==================================================

function calculateShipping() {

    if (cart.length === 0) {

        return 0;

    }


    const zone =
        getProvinceZone();


    if (zone === null) {

        return 0;

    }


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
// อ่านจังหวัดตอนลูกค้าพิมพ์
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
// ยืนยันคำสั่งซื้อ + ตัดสต๊อก + สร้างออเดอร์
// ==================================================

document
    .getElementById("checkout-form")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const name =
                document.getElementById(
                    "customer-name"
                ).value.trim();

            const phone =
                document.getElementById(
                    "customer-phone"
                ).value.trim();

            const address =
                document.getElementById(
                    "customer-address"
                ).value.trim();

            const province =
                document.getElementById(
                    "customer-province"
                ).value.trim();

            const postcode =
                document.getElementById(
                    "customer-postcode"
                ).value.trim();

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

                alert(
                    "กรุณากรอกรหัสไปรษณีย์ 5 หลัก"
                );

                return;
            }

            if (
                getProvinceZone() ===
                "unknown"
            ) {

                alert(
                    "ไม่พบจังหวัด กรุณาตรวจสอบชื่อจังหวัด"
                );

                return;
            }

            const productTotal =
                calculateProductTotal();

            const shippingPrice =
                calculateShipping();

            const grandTotal =
                productTotal +
                shippingPrice;

            const submitButton =
                document.querySelector(
                    '#checkout-form button[type="submit"]'
                );

            try {

                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent =
                        "กำลังส่งคำสั่งซื้อ...";
                }

                await runTransaction(
                    db,
                    async function(transaction) {

                        const stockChanges = {};

                        cart.forEach(function(item) {

                            const key =
                                item.id +
                                "_" +
                                item.size;

                            if (!stockChanges[key]) {
                                stockChanges[key] = {
                                    id: item.id,
                                    size: item.size,
                                    quantity: 0
                                };
                            }

                            stockChanges[key].quantity++;
                        });

                        const productSnapshots = {};

                        for (
                            const key in stockChanges
                        ) {

                            const change =
                                stockChanges[key];

                            const productRef =
                                doc(
                                    db,
                                    "products",
                                    change.id
                                );

                            const productSnap =
                                await transaction.get(
                                    productRef
                                );

                            if (!productSnap.exists()) {

                                throw new Error(
                                    "ไม่พบสินค้า " +
                                    change.id
                                );
                            }

                            productSnapshots[key] = {
                                ref: productRef,
                                data: productSnap.data(),
                                change: change
                            };
                        }

                        for (
                            const key in productSnapshots
                        ) {

                            const item =
                                productSnapshots[key];

                            const stockField =
                                "stock" +
                                item.change.size;

                            const currentStock =
                                Number(
                                    item.data[
                                        stockField
                                    ]
                                );

                            if (
                                currentStock <
                                item.change.quantity
                            ) {

                                throw new Error(
                                    "สินค้าไซซ์ " +
                                    item.change.size +
                                    " เหลือไม่พอ"
                                );
                            }

                            transaction.update(
                                item.ref,
                                {
                                    [stockField]:
                                        currentStock -
                                        item.change.quantity
                                }
                            );
                        }

                        const orderRef =
                            doc(
                                collection(
                                    db,
                                    "orders"
                                )
                            );

                        transaction.set(
                            orderRef,
                            {
                                customerName: name,
                                phone: phone,
                                address: address,
                                province: province,
                                postcode: postcode,

                                items:
                                    cart.map(
                                        function(item) {
                                            return {
                                                id: item.id,
                                                name: item.name,
                                                size: item.size,
                                                price: item.price
                                            };
                                        }
                                    ),

                                productTotal:
                                    productTotal,

                                shippingPrice:
                                    shippingPrice,

                                grandTotal:
                                    grandTotal,

                                shippingMethod:
                                    "Thailand Post EMS",

                                status:
                                    "pending",

                                createdAt:
                                    serverTimestamp()
                            }
                        );
                    }
                );

                closeCheckout();

                document
                    .getElementById(
                        "success-modal"
                    )
                    .classList.add(
                        "show"
                    );

            }

            catch (error) {

                console.error(
                    "Order error:",
                    error
                );

                alert(
                    error.message ||
                    "ส่งคำสั่งซื้อไม่สำเร็จ"
                );
            }

            finally {

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "ยืนยันคำสั่งซื้อ";
                }
            }
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
        .getElementById(
            countId
        )
        .textContent =
        number + " / 4";
}



// ==================================================
// BANNER AUTO SLIDESHOW
// ==================================================

const bannerBackgrounds =
    document.querySelectorAll(
        ".banner-bg"
    );


let currentBannerIndex = 0;


function nextBanner() {

    if (
        bannerBackgrounds.length <= 1
    ) {

        return;
    }


    bannerBackgrounds[
        currentBannerIndex
    ].classList.remove("active");


    currentBannerIndex++;


    if (
        currentBannerIndex >=
        bannerBackgrounds.length
    ) {

        currentBannerIndex = 0;

    }


    bannerBackgrounds[
        currentBannerIndex
    ].classList.add("active");

}


setInterval(
    nextBanner,
    5000
);



// ==================================================
// เปิดฟังก์ชันให้ HTML เรียกใช้ได้
// ==================================================

window.showCategory =
    showCategory;

window.addToCart =
    addToCart;

window.removeItem =
    removeItem;

window.openCart =
    openCart;

window.closeCart =
    closeCart;

window.openCheckout =
    openCheckout;

window.closeCheckout =
    closeCheckout;

window.finishOrder =
    finishOrder;

window.changeProductImage =
    changeProductImage;

window.updateCheckoutTotal =
    updateCheckoutTotal;

// ==================================================
// ให้ปุ่ม onclick ใน HTML เรียกฟังก์ชันได้
// ==================================================

window.showCategory = showCategory;
window.addToCart = addToCart;
window.removeItem = removeItem;
window.openCart = openCart;
window.closeCart = closeCart;
window.openCheckout = openCheckout;
window.closeCheckout = closeCheckout;
window.finishOrder = finishOrder;
window.changeProductImage = changeProductImage;
window.updateCheckoutTotal = updateCheckoutTotal;

// ==================================================
// เริ่มระบบ
// ==================================================


updateCart();

updateProvinceStatus();
