import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";


import {
    getFirestore,
    collection,
    doc,
    getDoc,
    runTransaction,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";


// ==================================================
// FIREBASE
// ==================================================

const firebaseConfig = {

    apiKey:
        "AIzaSyBkovmV3neR0N1ITqbSbvzwqTb06WdnWF8",

    authDomain:
        "whatdoubts.firebaseapp.com",

    projectId:
        "whatdoubts",

    storageBucket:
        "whatdoubts.firebasestorage.app",

    messagingSenderId:
        "44143274298",

    appId:
        "1:44143274298:web:8cde4fde974a916984c803",

    measurementId:
        "G-Q69TZ5DWHK"
};


const app =
    initializeApp(
        firebaseConfig
    );


const db =
    getFirestore(app);


let cart = [];


// ==================================================
// หมวดหมู่
// ==================================================

function showCategory(
    category,
    button
) {

    const products =
        document.querySelectorAll(
            ".product"
        );


    document
        .querySelectorAll(".category")
        .forEach(function(btn) {

            btn.classList.remove(
                "active"
            );

        });


    if (button) {

        button.classList.add(
            "active"
        );

    }


    const title =
        document.getElementById(
            "category-title"
        );


    if (title) {

        if (category === "all") {

            title.textContent =
                "สินค้าทั้งหมด";

        }

        if (category === "shirt") {

            title.textContent =
                "เสื้อ";

        }

        if (category === "pants") {

            title.textContent =
                "กางเกง";

        }

    }


    products.forEach(
        function(product) {

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

        }
    );

}


// ==================================================
// โหลด STOCK จาก FIREBASE
// ==================================================

async function loadProductStock(
    productId
) {

    const productElement =
        document.getElementById(
            "product-" +
            productId
        );


    const select =
        document.getElementById(
            "size-" +
            productId
        );


    const button =
        document.getElementById(
            "button-" +
            productId
        );


    if (
        !productElement ||
        !select ||
        !button
    ) {

        return;

    }


    try {

        const productRef =
            doc(
                db,
                "products",
                productId
            );


        const snapshot =
            await getDoc(
                productRef
            );


        // ถ้ายังไม่ได้สร้างสินค้าใน Firebase
        // ให้ถือว่ายังไม่มี stock

        if (!snapshot.exists()) {

            productElement
                .classList
                .add("sold-out");


            button.disabled =
                true;


            button.textContent =
                "SOLD OUT";


            select.disabled =
                true;


            return;

        }


        const data =
            snapshot.data();


        const stock = {

            S:
                Number(data.stockS || 0),

            M:
                Number(data.stockM || 0),

            L:
                Number(data.stockL || 0),

            XL:
                Number(data.stockXL || 0)

        };


        let availableCount = 0;


        Array
            .from(select.options)
            .forEach(
                function(option) {

                    const size =
                        option.value;


                    const amount =
                        stock[size] || 0;


                    if (amount <= 0) {

                        option.disabled =
                            true;


                        option.textContent =
                            size +
                            " — SOLD OUT";

                    }

                    else {

                        option.disabled =
                            false;


                        option.textContent =
                            size;


                        availableCount++;

                    }

                }
            );


        // ==========================================
        // หมดทุกไซซ์
        // ==========================================

        if (
            availableCount === 0
        ) {

            productElement
                .classList
                .add("sold-out");


            button.disabled =
                true;


            button.textContent =
                "SOLD OUT";


            select.disabled =
                true;

        }


        // ==========================================
        // ยังมีของ
        // ==========================================

        else {

            productElement
                .classList
                .remove("sold-out");


            button.disabled =
                false;


            button.textContent =
                "เพิ่มลงตะกร้า";


            select.disabled =
                false;


            // ถ้าไซซ์ที่เลือกอยู่หมด
            // ให้กระโดดไปไซซ์ที่ยังมี

            if (
                select
                    .options[
                        select.selectedIndex
                    ]
                    .disabled
            ) {

                const firstAvailable =
                    Array
                        .from(
                            select.options
                        )
                        .find(
                            function(option) {

                                return (
                                    !option.disabled
                                );

                            }
                        );


                if (firstAvailable) {

                    select.value =
                        firstAvailable.value;

                }

            }

        }

    }

    catch (error) {

        console.error(
            "Load stock error:",
            error
        );

    }

}


// ==================================================
// โหลดสินค้าทุกตัว
// ==================================================

async function loadAllStocks() {

    const products = [

        "shirt1",

        "shirt2",

        "pants1",

        "pants2"

    ];


    for (
        const productId
        of products
    ) {

        await loadProductStock(
            productId
        );

    }

}


// ==================================================
// เพิ่มตะกร้า
// ==================================================

async function addToCart(
    id,
    name,
    price,
    weight,
    sizeId
) {

    const select =
        document.getElementById(
            sizeId
        );


    if (!select) {

        return;

    }


    const size =
        select.value;


    try {

        const ref =
            doc(
                db,
                "products",
                id
            );


        const snap =
            await getDoc(ref);


        if (!snap.exists()) {

            alert(
                "สินค้านี้หมด"
            );

            return;

        }


        const data =
            snap.data();


        const stockField =
            "stock" +
            size;


        const stock =
            Number(
                data[
                    stockField
                ] || 0
            );


        const alreadyInCart =
            cart.filter(
                function(item) {

                    return (
                        item.id === id &&
                        item.size === size
                    );

                }
            ).length;


        if (
            stock <= alreadyInCart
        ) {

            alert(
                name +
                " ไซซ์ " +
                size +
                " เหลือไม่พอ"
            );

            return;

        }


        cart.push({

            id: id,

            name: name,

            price:
                Number(price),

            weight:
                Number(weight),

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

    catch (error) {

        console.error(error);


        alert(
            "ไม่สามารถเช็กสต๊อกได้"
        );

    }

}


// ==================================================
// ลบตะกร้า
// ==================================================

function removeItem(index) {

    cart.splice(
        index,
        1
    );


    updateCart();

}


// ==================================================
// รวมสินค้า
// ==================================================

function calculateProductTotal() {

    return cart.reduce(

        function(total, item) {

            return (
                total +
                Number(item.price)
            );

        },

        0
    );

}


// ==================================================
// น้ำหนัก
// ==================================================

function calculateTotalWeight() {

    let weight =
        cart.reduce(

            function(total, item) {

                return (
                    total +
                    Number(
                        item.weight
                    )
                );

            },

            0
        );


    if (
        cart.length > 0
    ) {

        weight += 100;

    }


    return weight;

}


// ==================================================
// PROVINCE
// ==================================================

function normalizeProvince(
    text
) {

    return String(text)

        .trim()

        .toLowerCase()

        .replace(
            /\s+/g,
            ""
        )

        .replace(
            "จังหวัด",
            ""
        )

        .replace(
            "จ.",
            ""
        )

        .replace(
            "ฯ",
            ""
        );

}


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


function getProvinceZone() {

    const input =
        document.getElementById(
            "customer-province"
        );


    if (!input) {

        return null;

    }


    const province =
        normalizeProvince(
            input.value
        );


    if (!province) {

        return null;

    }


    if (
        nearProvinces.some(
            function(item) {

                return (
                    normalizeProvince(item) ===
                    province
                );

            }
        )
    ) {

        return "near";

    }


    if (
        middleProvinces.some(
            function(item) {

                return (
                    normalizeProvince(item) ===
                    province
                );

            }
        )
    ) {

        return "middle";

    }


    if (
        farProvinces.some(
            function(item) {

                return (
                    normalizeProvince(item) ===
                    province
                );

            }
        )
    ) {

        return "far";

    }


    return "unknown";

}


// ==================================================
// SHIPPING
// ==================================================

function calculateWeightPrice() {

    const weight =
        calculateTotalWeight();


    if (!weight) {

        return 0;

    }


    if (
        weight <= 500
    ) {

        return 35;

    }


    if (
        weight <= 1000
    ) {

        return 45;

    }


    if (
        weight <= 2000
    ) {

        return 65;

    }


    if (
        weight <= 3000
    ) {

        return 85;

    }


    if (
        weight <= 5000
    ) {

        return 110;

    }


    return 150;

}


function calculateProvincePrice() {

    const zone =
        getProvinceZone();


    if (
        zone === "middle"
    ) {

        return 10;

    }


    if (
        zone === "far"
    ) {

        return 20;

    }


    return 0;

}


function calculateShipping() {

    if (
        cart.length === 0
    ) {

        return 0;

    }


    const zone =
        getProvinceZone();


    if (
        !zone ||
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
// CART UI
// ==================================================

function updateCart() {

    const count =
        document.getElementById(
            "cart-count"
        );


    if (count) {

        count.textContent =
            cart.length;

    }


    const container =
        document.getElementById(
            "cart-items"
        );


    if (container) {

        container.innerHTML = "";


        if (
            cart.length === 0
        ) {

            container.innerHTML =
                "<p class='empty-cart'>ยังไม่มีสินค้าในตะกร้า</p>";

        }


        cart.forEach(
            function(item, index) {

                container.innerHTML += `

                    <div class="cart-item">

                        <div>

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


    const totalElement =
        document.getElementById(
            "cart-total"
        );


    if (totalElement) {

        totalElement.textContent =
            total.toLocaleString();

    }


    updateCheckoutTotal();

}


// ==================================================
// CHECKOUT TOTAL
// ==================================================

function updateCheckoutTotal() {

    const productTotal =
        calculateProductTotal();


    const shipping =
        calculateShipping();


    const grandTotal =
        productTotal +
        shipping;


    const productElement =
        document.getElementById(
            "product-total"
        );


    const shippingElement =
        document.getElementById(
            "shipping-price"
        );


    const totalElement =
        document.getElementById(
            "checkout-total"
        );


    if (productElement) {

        productElement.textContent =
            productTotal.toLocaleString();

    }


    if (shippingElement) {

        if (
            cart.length > 0 &&
            (
                !getProvinceZone() ||
                getProvinceZone() ===
                "unknown"
            )
        ) {

            shippingElement.textContent =
                "-";

        }

        else {

            shippingElement.textContent =
                shipping.toLocaleString();

        }

    }


    if (totalElement) {

        totalElement.textContent =
            grandTotal.toLocaleString();

    }


    updateProvinceStatus();

}


// ==================================================
// PROVINCE STATUS
// ==================================================

function updateProvinceStatus() {

    const status =
        document.getElementById(
            "province-status"
        );


    const input =
        document.getElementById(
            "customer-province"
        );


    if (
        !status ||
        !input
    ) {

        return;

    }


    if (
        !input.value.trim()
    ) {

        status.textContent =
            "กรอกจังหวัดเพื่อคำนวณค่าจัดส่ง";


        status.className =
            "province-status";


        return;

    }


    if (
        getProvinceZone() ===
        "unknown"
    ) {

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


const provinceInput =
    document.getElementById(
        "customer-province"
    );


if (provinceInput) {

    provinceInput.addEventListener(

        "input",

        updateCheckoutTotal

    );

}


// ==================================================
// MODALS
// ==================================================

function openCart() {

    updateCart();


    document
        .getElementById(
            "cart-modal"
        )
        ?.classList
        .add("show");

}


function closeCart() {

    document
        .getElementById(
            "cart-modal"
        )
        ?.classList
        .remove("show");

}


function openCheckout() {

    if (
        cart.length === 0
    ) {

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
        ?.classList
        .add("show");

}


function closeCheckout() {

    document
        .getElementById(
            "checkout-modal"
        )
        ?.classList
        .remove("show");

}


// ==================================================
// CHECKOUT + CUT STOCK
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
                !/^\d{5}$/.test(
                    postcode
                )
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
                    "กรุณาตรวจสอบชื่อจังหวัด"
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


            try {

                await runTransaction(

                    db,

                    async function(transaction) {


                        // ================================
                        // รวมจำนวนตามสินค้า + ไซซ์
                        // ================================

                        const wanted = {};


                        cart.forEach(
                            function(item) {

                                const key =
                                    item.id +
                                    "_" +
                                    item.size;


                                if (!wanted[key]) {

                                    wanted[key] = {

                                        id:
                                            item.id,

                                        size:
                                            item.size,

                                        name:
                                            item.name,

                                        quantity:
                                            0

                                    };

                                }


                                wanted[key]
                                    .quantity++;

                            }
                        );


                        // ================================
                        // แยกตาม PRODUCT
                        // ================================

                        const groups = {};


                        Object
                            .values(wanted)
                            .forEach(
                                function(item) {

                                    if (
                                        !groups[
                                            item.id
                                        ]
                                    ) {

                                        groups[
                                            item.id
                                        ] = [];

                                    }


                                    groups[
                                        item.id
                                    ].push(item);

                                }
                            );


                        // ================================
                        // READ ก่อน
                        // ================================

                        const snapshots = {};


                        for (
                            const productId
                            of Object.keys(groups)
                        ) {

                            const ref =
                                doc(
                                    db,
                                    "products",
                                    productId
                                );


                            const snap =
                                await transaction.get(
                                    ref
                                );


                            if (!snap.exists()) {

                                throw new Error(
                                    "สินค้า " +
                                    productId +
                                    " ไม่มีในระบบสต๊อก"
                                );

                            }


                            snapshots[
                                productId
                            ] = {

                                ref: ref,

                                data:
                                    snap.data()

                            };

                        }


                        // ================================
                        // CHECK + UPDATE
                        // ================================

                        for (
                            const productId
                            of Object.keys(groups)
                        ) {

                            const information =
                                snapshots[
                                    productId
                                ];


                            const update = {};


                            groups[
                                productId
                            ].forEach(
                                function(item) {

                                    const size =
                                        item.size
                                            .toUpperCase();


                                    const field =
                                        "stock" +
                                        size;


                                    const current =
                                        Number(
                                            information
                                                .data[
                                                    field
                                                ] || 0
                                        );


                                    if (
                                        current <
                                        item.quantity
                                    ) {

                                        throw new Error(

                                            item.name +
                                            " ไซซ์ " +
                                            size +
                                            " SOLD OUT"

                                        );

                                    }


                                    update[field] =
                                        current -
                                        item.quantity;

                                }
                            );


                            transaction.update(

                                information.ref,

                                update

                            );

                        }


                        // ================================
                        // CREATE ORDER
                        // ================================

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


                closeCheckout();


                document
                    .getElementById(
                        "success-modal"
                    )
                    ?.classList
                    .add("show");


                // โหลด stock ใหม่ทันที
                await loadAllStocks();

            }

            catch (error) {

                console.error(
                    error
                );


                alert(
                    error.message ||
                    "ส่งคำสั่งซื้อไม่สำเร็จ"
                );


                await loadAllStocks();

            }

        }

    );

}


// ==================================================
// FINISH
// ==================================================

function finishOrder() {

    cart = [];


    updateCart();


    checkoutForm?.reset();


    document
        .getElementById(
            "success-modal"
        )
        ?.classList
        .remove("show");


    updateProvinceStatus();


    loadAllStocks();

}


// ==================================================
// PRODUCT IMAGE
// ==================================================

function changeProductImage(
    mainImageId,
    thumbnail,
    countId,
    number
) {

    const image =
        document.getElementById(
            mainImageId
        );


    if (!image) {

        return;

    }


    image.style.opacity =
        "0";


    setTimeout(
        function() {

            image.src =
                thumbnail.src;


            image.style.opacity =
                "1";

        },

        150
    );


    thumbnail
        .parentElement
        .querySelectorAll(
            ".thumbnail"
        )
        .forEach(
            function(item) {

                item.classList.remove(
                    "active-thumbnail"
                );

            }
        );


    thumbnail.classList.add(
        "active-thumbnail"
    );


    const count =
        document.getElementById(
            countId
        );


    if (count) {

        count.textContent =
            number +
            " / 4";

    }

}


// ==================================================
// BANNER
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
// HTML ONCLICK
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


// ==================================================
// START
// ==================================================

updateCart();

updateProvinceStatus();

loadAllStocks();
