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


// ==================================================
// CART
// ==================================================

let cart = [];


// ==================================================
// CATEGORY
// ==================================================

function showCategory(
    category,
    button
) {

    const products =
        document.querySelectorAll(
            ".product"
        );

    const buttons =
        document.querySelectorAll(
            ".category"
        );

    const title =
        document.getElementById(
            "category-title"
        );


    buttons.forEach(
        function(btn) {

            btn.classList.remove(
                "active"
            );

        }
    );


    if (button) {

        button.classList.add(
            "active"
        );

    }


    if (title) {

        if (category === "all") {

            title.textContent =
                "สินค้าทั้งหมด";

        }

        else if (
            category === "shirt"
        ) {

            title.textContent =
                "เสื้อ";

        }

        else if (
            category === "pants"
        ) {

            title.textContent =
                "กางเกง";

        }

    }


    products.forEach(
        function(product) {

            if (
                category === "all" ||
                product.dataset.category ===
                category
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
// FIREBASE STOCK
// ==================================================

async function getProductStock(
    productId
) {

    try {

        const ref =
            doc(
                db,
                "products",
                productId
            );

        const snapshot =
            await getDoc(ref);


        if (!snapshot.exists()) {

            return null;

        }


        return snapshot.data();

    }

    catch (error) {

        console.error(
            "Stock error:",
            error
        );

        return null;

    }

}


// ==================================================
// LOAD PRODUCT STOCK
// ==================================================

async function loadProductStock(
    productId
) {

    const product =
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
        !product ||
        !select ||
        !button
    ) {

        return;

    }


    try {

        const ref =
            doc(
                db,
                "products",
                productId
            );


        const snapshot =
            await getDoc(ref);


        // ==========================================
        // ไม่มีใน Firebase
        // ยังขายแบบปกติ
        // ==========================================

        if (!snapshot.exists()) {

            product.classList.remove(
                "sold-out"
            );

            button.disabled =
                false;

            button.textContent =
                "เพิ่มลงตะกร้า";

            select.disabled =
                false;


            Array
                .from(
                    select.options
                )
                .forEach(
                    function(option) {

                        option.disabled =
                            false;

                        option.textContent =
                            option.value;

                    }
                );


            return;

        }


        // ==========================================
        // มีข้อมูล STOCK
        // ==========================================

        const data =
            snapshot.data();


        const stocks = {

            S:
                Number(
                    data.stockS ?? 0
                ),

            M:
                Number(
                    data.stockM ?? 0
                ),

            L:
                Number(
                    data.stockL ?? 0
                ),

            XL:
                Number(
                    data.stockXL ?? 0
                )

        };


        let available =
            0;


        Array
            .from(
                select.options
            )
            .forEach(
                function(option) {

                    const size =
                        option.value;


                    const amount =
                        stocks[size] ?? 0;


                    if (
                        amount <= 0
                    ) {

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

                        available++;

                    }

                }
            );


        // ==========================================
        // หมดทุก SIZE
        // ==========================================

        if (
            available === 0
        ) {

            product.classList.add(
                "sold-out"
            );

            button.disabled =
                true;

            button.textContent =
                "SOLD OUT";

            select.disabled =
                true;


            return;

        }


        // ==========================================
        // ยังมีบาง SIZE
        // ==========================================

        product.classList.remove(
            "sold-out"
        );

        button.disabled =
            false;

        button.textContent =
            "เพิ่มลงตะกร้า";

        select.disabled =
            false;


        const selected =
            select.options[
                select.selectedIndex
            ];


        if (
            selected &&
            selected.disabled
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

    catch (error) {

        console.error(
            "Load stock error:",
            error
        );

    }

}


// ==================================================
// LOAD ALL STOCK
// ==================================================

async function loadAllStocks() {

    const productElements =
        document.querySelectorAll(
            "[data-product-id]"
        );


    for (
        const element
        of productElements
    ) {

        const productId =
            element.dataset.productId;


        if (productId) {

            await loadProductStock(
                productId
            );

        }

    }

}


// ==================================================
// ADD TO CART
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

        alert(
            "ไม่พบช่องเลือกไซซ์"
        );

        return;

    }


    if (select.disabled) {

        alert(
            "สินค้านี้ SOLD OUT"
        );

        return;

    }


    const size =
        select.value;


    try {

        const stockData =
            await getProductStock(
                id
            );


        // ==========================================
        // ถ้ามีระบบ STOCK
        // ต้องเช็กจำนวนก่อน
        // ==========================================

        if (stockData) {

            const field =
                "stock" +
                size.toUpperCase();


            const stock =
                Number(
                    stockData[field] ?? 0
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
                stock <=
                alreadyInCart
            ) {

                alert(
                    name +
                    " ไซซ์ " +
                    size +
                    " เหลือไม่พอ"
                );

                return;

            }

        }


        // ==========================================
        // เพิ่มลง CART
        // ==========================================

        cart.push({

            id:
                id,

            name:
                name,

            price:
                Number(price),

            weight:
                Number(weight),

            size:
                size

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
            "เกิดข้อผิดพลาด กรุณาลองใหม่"
        );

    }

}


// ==================================================
// REMOVE ITEM
// ==================================================

function removeItem(
    index
) {

    cart.splice(
        index,
        1
    );


    updateCart();

}


// ==================================================
// PRODUCT TOTAL
// ==================================================

function calculateProductTotal() {

    return cart.reduce(
        function(
            total,
            item
        ) {

            return (
                total +
                Number(
                    item.price
                )
            );

        },

        0
    );

}


// ==================================================
// TOTAL WEIGHT
// ==================================================

function calculateTotalWeight() {

    let weight =
        cart.reduce(
            function(
                total,
                item
            ) {

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

        // น้ำหนักแพ็ก
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


// ==================================================
// PROVINCE ZONES
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


// ==================================================
// GET PROVINCE ZONE
// ==================================================

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
                    normalizeProvince(
                        item
                    ) === province
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
                    normalizeProvince(
                        item
                    ) === province
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
                    normalizeProvince(
                        item
                    ) === province
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


    if (
        weight === 0
    ) {

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
// UPDATE CART
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


    const cartItems =
        document.getElementById(
            "cart-items"
        );


    if (cartItems) {

        cartItems.innerHTML =
            "";


        if (
            cart.length === 0
        ) {

            cartItems.innerHTML =
                "<p class='empty-cart'>ยังไม่มีสินค้าในตะกร้า</p>";

        }


        cart.forEach(
            function(
                item,
                index
            ) {

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
// CHECKOUT TOTAL
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


    if (
        productTotalElement
    ) {

        productTotalElement.textContent =
            productTotal.toLocaleString();

    }


    if (
        shippingElement
    ) {

        if (
            cart.length > 0 &&
            (
                getProvinceZone() === null ||
                getProvinceZone() ===
                "unknown"
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


    if (
        checkoutElement
    ) {

        checkoutElement.textContent =
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


// ==================================================
// PROVINCE INPUT
// ==================================================

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


    const modal =
        document.getElementById(
            "cart-modal"
        );


    if (modal) {

        modal.classList.add(
            "show"
        );

    }

}


function closeCart() {

    const modal =
        document.getElementById(
            "cart-modal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

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


    const modal =
        document.getElementById(
            "checkout-modal"
        );


    if (modal) {

        modal.classList.add(
            "show"
        );

    }

}


function closeCheckout() {

    const modal =
        document.getElementById(
            "checkout-modal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

}


// ==================================================
// CHECKOUT FORM
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


            if (
                cart.length === 0
            ) {

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


            const submitButton =
                checkoutForm.querySelector(
                    'button[type="submit"]'
                );


            try {

                if (
                    submitButton
                ) {

                    submitButton.disabled =
                        true;

                    submitButton.textContent =
                        "กำลังส่งคำสั่งซื้อ...";

                }


                await runTransaction(
                    db,
                    async function(
                        transaction
                    ) {


                        // =====================================
                        // รวมสินค้าตาม ID
                        // =====================================

                        const productGroups =
                            {};


                        cart.forEach(
                            function(item) {

                                if (
                                    !productGroups[
                                        item.id
                                    ]
                                ) {

                                    productGroups[
                                        item.id
                                    ] = [];

                                }


                                productGroups[
                                    item.id
                                ].push(
                                    item
                                );

                            }
                        );


                        // =====================================
                        // อ่านทุก PRODUCT
                        // ก่อน WRITE
                        // =====================================

                        const snapshots =
                            {};


                        for (
                            const productId
                            of Object.keys(
                                productGroups
                            )
                        ) {

                            const ref =
                                doc(
                                    db,
                                    "products",
                                    productId
                                );


                            const snapshot =
                                await transaction.get(
                                    ref
                                );


                            snapshots[
                                productId
                            ] = {

                                ref:
                                    ref,

                                exists:
                                    snapshot.exists(),

                                data:
                                    snapshot.exists()
                                        ? snapshot.data()
                                        : null

                            };

                        }


                        // =====================================
                        // ตรวจ + เตรียม STOCK
                        // เฉพาะตัวที่มีใน FIREBASE
                        // =====================================

                        const updates =
                            {};


                        for (
                            const productId
                            of Object.keys(
                                productGroups
                            )
                        ) {

                            const information =
                                snapshots[
                                    productId
                                ];


                            // ไม่มี Firestore doc
                            // ไม่ตัด stock
                            if (
                                !information.exists
                            ) {

                                continue;

                            }


                            const update =
                                {};


                            const sizeAmounts =
                                {};


                            productGroups[
                                productId
                            ]
                            .forEach(
                                function(item) {

                                    const size =
                                        String(
                                            item.size
                                        )
                                        .toUpperCase();


                                    if (
                                        !sizeAmounts[
                                            size
                                        ]
                                    ) {

                                        sizeAmounts[
                                            size
                                        ] = 0;

                                    }


                                    sizeAmounts[
                                        size
                                    ]++;

                                }
                            );


                            for (
                                const size
                                of Object.keys(
                                    sizeAmounts
                                )
                            ) {

                                const field =
                                    "stock" +
                                    size;


                                const current =
                                    Number(
                                        information
                                            .data[
                                                field
                                            ] ?? 0
                                    );


                                const wanted =
                                    sizeAmounts[
                                        size
                                    ];


                                if (
                                    current <
                                    wanted
                                ) {

                                    throw new Error(
                                        productGroups[
                                            productId
                                        ][0].name +
                                        " ไซซ์ " +
                                        size +
                                        " SOLD OUT"
                                    );

                                }


                                update[
                                    field
                                ] =
                                    current -
                                    wanted;

                            }


                            updates[
                                productId
                            ] = update;

                        }


                        // =====================================
                        // ตัด STOCK
                        // =====================================

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


                        // =====================================
                        // CREATE ORDER
                        // =====================================

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


                // =====================================
                // สำเร็จ
                // =====================================

                closeCheckout();


                const success =
                    document.getElementById(
                        "success-modal"
                    );


                if (
                    success
                ) {

                    success.classList.add(
                        "show"
                    );

                }


                await loadAllStocks();

            }

            catch (error) {

                console.error(
                    "ORDER ERROR:",
                    error
                );


                alert(
                    error.message ||
                    "ส่งคำสั่งซื้อไม่สำเร็จ"
                );


                await loadAllStocks();

            }

            finally {

                if (
                    submitButton
                ) {

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
// FINISH ORDER
// ==================================================

function finishOrder() {

    cart = [];


    updateCart();


    if (
        checkoutForm
    ) {

        checkoutForm.reset();

    }


    const success =
        document.getElementById(
            "success-modal"
        );


    if (
        success
    ) {

        success.classList.remove(
            "show"
        );

    }


    updateProvinceStatus();


    loadAllStocks();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ==================================================
// CHANGE IMAGE
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


let currentBannerIndex =
    0;


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

        currentBannerIndex =
            0;

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
// WINDOW FUNCTIONS
// สำคัญสำหรับ onclick
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
// START
// ==================================================

updateCart();

updateProvinceStatus();

loadAllStocks();
