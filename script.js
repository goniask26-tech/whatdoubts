import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";

import {
    getFirestore,
    collection,
    doc,
    runTransaction,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";


// ==================================================
// FIREBASE
// ==================================================

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


// ==================================================
// ตะกร้า
// ==================================================

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


    if (button) {

        button.classList.add("active");

    }


    if (title) {

        if (category === "all") {

            title.textContent =
                "สินค้าทั้งหมด";

        }

        else if (category === "shirt") {

            title.textContent =
                "เสื้อ";

        }

        else if (category === "pants") {

            title.textContent =
                "กางเกง";

        }

    }


    products.forEach(function(product) {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {

            product.style.display =
                "block";

        }

        else {

            product.style.display =
                "none";

        }

    });

}


// ==================================================
// เพิ่มสินค้าเข้าตะกร้า
//
// ตัวอย่างกางเกง:
//
// addToCart(
//   'pants1',
//   'WHATDOUBTS Pants 01',
//   590,
//   650,
//   'size-pants1'
// )
// ==================================================

function addToCart(
    id,
    name,
    price,
    weight,
    sizeId
) {

    const sizeElement =
        document.getElementById(
            sizeId
        );


    if (!sizeElement) {

        console.error(
            "ไม่พบช่องไซซ์:",
            sizeId
        );

        alert(
            "เกิดข้อผิดพลาดในการเลือกไซซ์"
        );

        return;

    }


    const size =
        sizeElement.value;


    cart.push({

        id: id,

        name: name,

        price: Number(price),

        weight: Number(weight),

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
// ลบสินค้าออกจากตะกร้า
// ==================================================

function removeItem(index) {

    cart.splice(
        index,
        1
    );


    updateCart();

}


// ==================================================
// ราคารวมสินค้า
// ==================================================

function calculateProductTotal() {

    let total = 0;


    cart.forEach(function(item) {

        total +=
            Number(item.price);

    });


    return total;

}


// ==================================================
// น้ำหนักรวม
//
// +100 กรัมสำหรับแพ็กของ
// ==================================================

function calculateTotalWeight() {

    let weight = 0;


    cart.forEach(function(item) {

        weight +=
            Number(item.weight);

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

    return String(text)
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

    "ระยอง",

    "ราชบุรี",

    "กาญจนบุรี",

    "เพชรบุรี",

    "ประจวบคีรีขันธ์"

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

    "กำแพงเพชร",

    "นครสวรรค์",

    "อุทัยธานี",

    "ขอนแก่น",

    "อุดรธานี",

    "หนองคาย",

    "หนองบัวลำภู",

    "บึงกาฬ",

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


    return "unknown";

}


// ==================================================
// ค่าส่งจากน้ำหนัก
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


    if (weight <= 1000) {

        return 45;

    }


    if (weight <= 2000) {

        return 65;

    }


    if (weight <= 3000) {

        return 85;

    }


    if (weight <= 5000) {

        return 110;

    }


    return 150;

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
// ค่าส่งทั้งหมด
// ==================================================

function calculateShipping() {

    if (cart.length === 0) {

        return 0;

    }


    const zone =
        getProvinceZone();


    if (
        zone === null ||
        zone === "unknown"
    ) {

        return 0;

    }


    return (
        calculateWeightPrice() +
        calculateProvincePrice()
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


    if (cartItems) {

        cartItems.innerHTML = "";


        if (cart.length === 0) {

            cartItems.innerHTML =
                "<p class='empty-cart'>ยังไม่มีสินค้าในตะกร้า</p>";

        }


        cart.forEach(
            function(item, index) {

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

            }
        );

    }


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
            (
                getProvinceZone() === null ||
                getProvinceZone() === "unknown"
            )
        ) {

            shippingElement.textContent =
                "-";

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
// สถานะจังหวัด
// ==================================================

function updateProvinceStatus() {

    const status =
        document.getElementById(
            "province-status"
        );


    const provinceElement =
        document.getElementById(
            "customer-province"
        );


    if (
        !status ||
        !provinceElement
    ) {

        return;

    }


    const province =
        provinceElement.value.trim();


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
// พิมพ์จังหวัดแล้วคำนวณทันที
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


    const modal =
        document.getElementById(
            "cart-modal"
        );


    if (modal) {

        modal.classList.add("show");

    }

}


// ==================================================
// ปิดตะกร้า
// ==================================================

function closeCart() {

    const modal =
        document.getElementById(
            "cart-modal"
        );


    if (modal) {

        modal.classList.remove("show");

    }

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


    const modal =
        document.getElementById(
            "checkout-modal"
        );


    if (modal) {

        modal.classList.add("show");

    }

}


// ==================================================
// ปิด Checkout
// ==================================================

function closeCheckout() {

    const modal =
        document.getElementById(
            "checkout-modal"
        );


    if (modal) {

        modal.classList.remove("show");

    }

}


// ==================================================
// ยืนยันออเดอร์
//
// 1. เช็ก stock
// 2. ตัด stock
// 3. สร้าง order
//
// ทำทั้งหมดใน Transaction เดียว
// ==================================================

const checkoutForm =
    document.getElementById(
        "checkout-form"
    );


if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            if (cart.length === 0) {

                alert(
                    "ไม่มีสินค้าในตะกร้า"
                );

                return;

            }


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

                alert(
                    "กรุณากรอกข้อมูลให้ครบ"
                );

                return;

            }


            if (
                !/^\d{5}$/.test(postcode)
            ) {

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
                checkoutForm.querySelector(
                    'button[type="submit"]'
                );


            try {

                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.textContent =
                        "กำลังส่งคำสั่งซื้อ...";

                }


                await runTransaction(
                    db,
                    async function(transaction) {


                        // ======================================
                        // รวมจำนวนสินค้าตาม ID + SIZE
                        // ======================================

                        const stockChanges = {};


                        cart.forEach(
                            function(item) {

                                const key =
                                    item.id +
                                    "_" +
                                    item.size;


                                if (!stockChanges[key]) {

                                    stockChanges[key] = {

                                        productId:
                                            item.id,

                                        size:
                                            item.size,

                                        quantity:
                                            0,

                                        name:
                                            item.name

                                    };

                                }


                                stockChanges[key]
                                    .quantity++;

                            }
                        );


                        // ======================================
                        // รวมตามสินค้า เพื่ออ่าน Firestore
                        // แค่ครั้งเดียวต่อสินค้า
                        // ======================================

                        const productGroups = {};


                        Object.keys(
                            stockChanges
                        ).forEach(
                            function(key) {

                                const change =
                                    stockChanges[key];


                                if (
                                    !productGroups[
                                        change.productId
                                    ]
                                ) {

                                    productGroups[
                                        change.productId
                                    ] = [];

                                }


                                productGroups[
                                    change.productId
                                ].push(
                                    change
                                );

                            }
                        );


                        // ======================================
                        // ต้อง READ ทุกสินค้าให้ครบก่อน WRITE
                        // ======================================

                        const snapshots = {};


                        for (
                            const productId
                            of Object.keys(
                                productGroups
                            )
                        ) {

                            const productRef =
                                doc(
                                    db,
                                    "products",
                                    productId
                                );


                            const snapshot =
                                await transaction.get(
                                    productRef
                                );


                            if (
                                !snapshot.exists()
                            ) {

                                throw new Error(
                                    "ไม่พบสินค้า " +
                                    productId +
                                    " ในระบบสต๊อก"
                                );

                            }


                            snapshots[
                                productId
                            ] = {

                                ref:
                                    productRef,

                                data:
                                    snapshot.data()

                            };

                        }


                        // ======================================
                        // ตรวจสต๊อก + เตรียมจำนวนใหม่
                        // ======================================

                        const updates = {};


                        for (
                            const productId
                            of Object.keys(
                                productGroups
                            )
                        ) {

                            const productInfo =
                                snapshots[
                                    productId
                                ];


                            const updateData = {};


                            productGroups[
                                productId
                            ].forEach(
                                function(change) {

                                    const size =
                                        String(
                                            change.size
                                        ).toUpperCase();


                                    const stockField =
                                        "stock" +
                                        size;


                                    const currentStock =
                                        Number(
                                            productInfo
                                                .data[
                                                    stockField
                                                ]
                                        );


                                    if (
                                        Number.isNaN(
                                            currentStock
                                        )
                                    ) {

                                        throw new Error(
                                            "ไม่พบสต๊อกไซซ์ " +
                                            size +
                                            " ของ " +
                                            change.name
                                        );

                                    }


                                    if (
                                        currentStock <
                                        change.quantity
                                    ) {

                                        throw new Error(
                                            change.name +
                                            " ไซซ์ " +
                                            size +
                                            " เหลือไม่พอ"
                                        );

                                    }


                                    updateData[
                                        stockField
                                    ] =
                                        currentStock -
                                        change.quantity;

                                }
                            );


                            updates[
                                productId
                            ] = updateData;

                        }


                        // ======================================
                        // ตัดสต๊อก
                        // ======================================

                        for (
                            const productId
                            of Object.keys(
                                updates
                            )
                        ) {

                            transaction.update(

                                snapshots[
                                    productId
                                ].ref,

                                updates[
                                    productId
                                ]

                            );

                        }


                        // ======================================
                        // สร้าง Order
                        // ======================================

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

                                customerName:
                                    name,

                                phone:
                                    phone,

                                address:
                                    address,

                                province:
                                    province,

                                postcode:
                                    postcode,


                                items:
                                    cart.map(
                                        function(item) {

                                            return {

                                                id:
                                                    item.id,

                                                name:
                                                    item.name,

                                                size:
                                                    item.size,

                                                price:
                                                    item.price

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


                // ======================================
                // สำเร็จ
                // ======================================

                closeCheckout();


                const successModal =
                    document.getElementById(
                        "success-modal"
                    );


                if (successModal) {

                    successModal.classList.add(
                        "show"
                    );

                }

            }

            catch (error) {

                console.error(
                    "ORDER ERROR:",
                    error
                );


                alert(
                    error.message ||
                    "ส่งคำสั่งซื้อไม่สำเร็จ กรุณาลองใหม่"
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

}


// ==================================================
// จบออเดอร์
// ==================================================

function finishOrder() {

    cart = [];


    updateCart();


    if (checkoutForm) {

        checkoutForm.reset();

    }


    const successModal =
        document.getElementById(
            "success-modal"
        );


    if (successModal) {

        successModal.classList.remove(
            "show"
        );

    }


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


    if (!mainImage) {

        return;

    }


    mainImage.style.opacity =
        "0";


    setTimeout(
        function() {

            mainImage.src =
                thumbnail.src;


            mainImage.style.opacity =
                "1";

        },
        150
    );


    const thumbnails =
        thumbnail.parentElement
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


    const countElement =
        document.getElementById(
            countId
        );


    if (countElement) {

        countElement.textContent =
            number + " / 4";

    }

}


// ==================================================
// BANNER SLIDESHOW
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
    ].classList.remove(
        "active"
    );


    currentBannerIndex++;


    if (
        currentBannerIndex >=
        bannerBackgrounds.length
    ) {

        currentBannerIndex = 0;

    }


    bannerBackgrounds[
        currentBannerIndex
    ].classList.add(
        "active"
    );

}


setInterval(
    nextBanner,
    5000
);


// ==================================================
// สำคัญมาก
// เปิดฟังก์ชันให้ onclick ใน index.html เรียกได้
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
// เริ่มระบบ
// ==================================================

updateCart();

updateProvinceStatus();
