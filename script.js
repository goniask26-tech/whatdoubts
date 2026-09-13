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

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// ================================
// TEST FIREBASE CONNECTION
// ================================

db.collection("products")
    .limit(1)
    .get()
    .then((snapshot) => {
        console.log("✅ FIREBASE CONNECTED");
        console.log("Products found:", snapshot.size);
    })
    .catch((error) => {
        console.error("❌ FIREBASE ERROR:", error);
    });

// ==================================================
// PRODUCT DATA
//
// เสื้อ:
// colors: ["Black", "White"]
//
// กางเกง:
// colors: []
//
// เปลี่ยนชื่อ ราคา รูป ได้ตรงนี้ง่ายที่สุด
// ==================================================

const products = [


// ==================================================
// SHIRTS 01 - 18
// ==================================================

{
    id: "shirt1",
    category: "shirt",
    type: "SHIRT",
    name: "WHATDOUBTS T-Shirt 01",
    price: 390,
    weight: 300,

    colors: [
    {
        name: "Faded",
        key: "Faded"
    },
        {
        name: "Black",
        key: "black"
    },
    
],

    images: [
        "images/e8b126442fbd4573b3f622d65b83c7ee~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/41317e2cc4dc4ef385a680242436c2db~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/a97160001561436b981fc3747fee39ec~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/722d6e2dc54e4a74904a12c708754918~tplv-aphluv4xwc-resize-webp_800_949.jpg",

        "images/83b52ba201ee4165a307d92a09bcb1af~tplv-aphluv4xwc-resize-webp_800_800.jpg"

    ]
},


{
    id: "shirt2",
    category: "shirt",
    type: "SHIRT",
    name: "WHATDOUBTS T-Shirt 02",
    price: 390,
    weight: 300,

    colors: [
    {
        name: "Black",
        key: "black"
    },
    
],

    images: [
        "images/ba251fe5fb344c1ebe14d20087b11470~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/1156aca8480d4075b791c55ae9e7e52f~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/25c304d0697348d88590bebbde00186f~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/eebe37f2780b4fa18697e508d45c0543~tplv-aphluv4xwc-resize-webp_800_800.jpg",
    ]
},


{
    id: "shirt3",
    category: "shirt",
    type: "SHIRT",
    name: "WHATDOUBTS T-Shirt 03",
    price: 390,
    weight: 300,

    colors: [
    {
        name: "Black",
        key: "black"
    },
    {
        name: "White",
        key: "white"
    }
],

    images: [
        "images/58935376753647808a7719619d433418~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/99e90dea7b944622a9c36c1b6876ebdd~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/b17e087c2fef4091bcd57147b100ec92~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/61a140dae1b1400b99e40bd4b3cb37a7~tplv-aphluv4xwc-resize-webp_800_1000.jpg",

    ]
},


{
    id: "shirt4",
    category: "shirt",
    type: "SHIRT",
    name: "WHATDOUBTS T-Shirt 04",
    price: 390,
    weight: 300,

    colors: [
        {
            name: "Black",
            key: "black"
        },
        {
            name: "White",
            key: "white"
        }
    ],

    images: [
        "images/ec755916ecf141be89389a951566f132~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/3971168311474be1a76356b5232cf776~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/b247963c465f48e8ae25c9df67194293~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/11299f4c7d484e5a926e326e54d8df48~tplv-aphluv4xwc-resize-webp_800_1000.jpg",
    ]
},


{
    id: "shirt5",
    category: "shirt",
    type: "SHIRT",
    name: "WHATDOUBTS T-Shirt 05",
    price: 390,
    weight: 300,

    colors: [
        {
            name: "White",
            key: "white"
        }
    ],

    images: [
        "images/7f10c9ecac9441689190a2483f7a1b19~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/4a995ce7d9934fa09b69cadaa432c41a~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/023c4face5974deeafcf3867e022f4db~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/6d0215a5d99944f7a82866d184c6f093~tplv-aphluv4xwc-resize-webp_800_800.jpg",

    ]
},


{
    id: "shirt6",
    category: "shirt",
    type: "SHIRT",
    name: "WHATDOUBTS T-Shirt 06",
    price: 390,
    weight: 300,

    colors: [
        {
            name: "Black",
            key: "black"
        },
        {
            name: "White",
            key: "white"
        }
    ],
    images: [
        "images/f0a5a6c676d046b2a064179d21e3cf4d~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/27b98f3e6a0d46e1b58105fc3d6001b0~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/0a6a6c97d8734e0a9ec69414648ef48e~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/0eee3590663d420cbce26d9719fa6fbf~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/f229570b81834345b27efd1a8eee5a84~tplv-aphluv4xwc-resize-webp_800_800.jpg",

    ]
},


{
    id: "shirt7",
    category: "shirt",
    type: "SHIRT",
    name: "WHATDOUBTS T-Shirt 07",
    price: 390,
    weight: 300,

    colors: [
        {
            name: "Germany",
            key: "Germany"
        },
        {
            name: "France",
            key: "France"
        },
        {
            name: "Spain",
            key: "Spain"
        },
],

    images: [
        "images/f1ec52dac2144d5ba114a41b6dde7407~tplv-aphluv4xwc-resize-webp_705_940.jpg",

        "images/e47a32d617f4418394815e933ac3f726~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/d36d081d624d49c2ac277ad094ba2e37~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/f63c1d3f80b24260880da660beca90e9~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/e08b6ce16ae449d2883d026b6eb3729f~tplv-aphluv4xwc-resize-webp_800_1000.jpg",
    ]
},


{
    id: "shirt8",
    category: "shirt",
    type: "SHIRT",
    name: "WHATDOUBTS T-Shirt 08",
    price: 390,
    weight: 300,

    colors: [
        {
            name: "Orange & White",
            key: "orangewhite"
        },
        {
            name: "Grey & Blue",
            key: "greyblue"
        }
],

    images: [
        "images/ce995127c35d44308c75e862854fd7d1~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/e03a1cd7140d4749b4412db3461de113~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/886f95d519d541a6980da7b67ef73ab4~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/5df06e051e0b4bd4b1c0a39c11d3ef5b~tplv-aphluv4xwc-resize-webp_800_1000.jpg",
    ]
},


{
    id: "shirt9",
    category: "shirt",
    type: "SHIRT",
    name: "WHATDOUBTS T-Shirt 09",
    price: 390,
    weight: 300,

    colors: [
        {
            name:"Grey",
            key: "Grey"
        },
        {
            name:"Blue",
            key: "Blue"
        }
],

    images: [
        "images/27da1b560a0f4a2daee9eae9c5e99493~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/80523203406e472189d96a342989e7a2~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/dfd985f995634145b79dd8da863ddf91~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/5df06e051e0b4bd4b1c0a39c11d3ef5b~tplv-aphluv4xwc-resize-webp_800_1000.jpg",

        "images/0fcf62f673514bedb2225c988178ee93~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/edfbffa841084d4198d5643a6c4ca171~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/013f59e0f7b8424ca1996a32819fa512~tplv-aphluv4xwc-resize-webp_800_800.jpg",
    ]
},


{
    id: "shirt10",
    category: "shirt",
    type: "SHIRT",
    name: "WHATDOUBTS T-Shirt 10",
    price: 390,
    weight: 300,

    colors: [
        {
            name: "Charcoal",
            key: "charcoal"
        },
        {
            name: "Faded lilac",
            key: "lilac"
        },
        {
            name: "Raw white",
            key: "rawwhite"
        },
        {
            name: "Forest green",
            key: "forestgreen"
        },
        {
            name: "Sandtone",
            key: "sandtone"
        },
        {
            name: "Steel blue",
            key: "steelblue"
        }
],

    images: [
        "images/52aa0df5be80463096faa29c885c8421~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/efe4d26f0a2e481aacbec36397700ae2~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/f212833ddc404c36bf0bbd1a6d8ffed5~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/fbfaeb82e4cb42f8a35599e6a3e5f81d~tplv-aphluv4xwc-resize-webp_800_800.jpg",

    ]
},


{
    id: "shirt11",
    category: "shirt",
    type: "SHIRT",
    name: "WHATDOUBTS T-Shirt 11",
    price: 390,
    weight: 300,

    colors: [
        {
            name: "white",
            key: "white"
        }
],

    images: [
        "images/d2c4f655372c4f6cb104dc62ecd0b093~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/b006989fac194389bd571344041863ab~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/bb9acc374e6b425cbce34fb624fa5ad7~tplv-aphluv4xwc-resize-webp_800_1000.jpg",
    ]
},


{
    id: "shirt12",
    category: "shirt",
    type: "SHIRT",
    name: "WHATDOUBTS T-Shirt 12",
    price: 390,
    weight: 300,

    colors: [
        {
            name: "white",
            key: "white"
        }
],

    images: [
        "images/8647c90d8c7046718e9884cccee540c5~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/000b3b820ab8460b98f0b04a1e9b5f67~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/14c67c141f544ded928412dc9dac4a84~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/b407ac588e1a487e8bf1b1792bcc4491~tplv-aphluv4xwc-resize-webp_800_1000.jpg",

        "images/0f4cec1ebcde418e85d140efd7153f01~tplv-aphluv4xwc-resize-webp_800_1000.jpg",
    ]
},


{
    id: "shirt13",
    category: "shirt",
    type: "SHIRT",
    name: "WHATDOUBTS T-Shirt 13",
    price: 390,
    weight: 300,

    colors: [
        {
            name: "Faded",
            key: "faded"
        }
],

    images: [
        "images/2c9c57b74f2c4f18b010d6edf921c4d4~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/dc33018718814d90b6ec9c710e5d60e9~tplv-aphluv4xwc-resize-webp_800_1000.jpg",

    ]
},


{
    id: "shirt14",
    category: "shirt",
    type: "SHIRT",
    name: "WHATDOUBTS T-Shirt 14",
    price: 390,
    weight: 300,

    colors: [
        {
            name: "white",
            key: "white"
        }
],

    images: [
        "images/01149e7dff354810bd7bf459dce86ba8~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/c8229965190e49ffaafac7acbe1130e1~tplv-aphluv4xwc-resize-webp_800_800.jpg",

    ]
},


{
    id: "shirt15",
    category: "shirt",
    type: "SHIRT",
    name: "WHATDOUBTS T-Shirt 15",
    price: 390,
    weight: 300,

colors: [
    {
        name: "England",
        key: "England"
    }
],

    images: [
        "images/ad6e055bb2af4b90b89995144175cf7b~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/91536ad9d12249439a1ada7e1ed03d21~tplv-aphluv4xwc-resize-webp_800_1000.jpg",

        "images/43a4db6d54f948be978e1e7f55c9d88f~tplv-aphluv4xwc-resize-webp_800_1000.jpg",
    ]
},


{
    id: "shirt16",
    category: "shirt",
    type: "SHIRT",
    name: "WHATDOUBTS T-Shirt 16",
    price: 390,
    weight: 300,

colors: [
    {
        name: "Argentina",
        key: "argentina"
    },
    {
        name: "Brazil",
        key: "brazil"
    },
    {
        name: "Portugal",
        key: "portugal"
    }
],

    images: [
        "images/480c9a47a9cc46ee826a9ef653ef7440~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/8faef0d558bc4b92b6901f3c89b4526a~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/e061daae8b7247efa43485bbd81fbd03~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/1f5e24f003b542eda4c2d2662831b684~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/3b0a9d4563574e36a6f95aeebe23316d~tplv-aphluv4xwc-resize-webp_800_1000.jpg",

        "images/57bc5c0dd4244e63895d8ff96ab3fbf6~tplv-aphluv4xwc-resize-webp_800_1000.jpg",
    ]
},


{
    id: "shirt17",
    category: "shirt",
    type: "SHIRT",
    name: "WHATDOUBTS T-Shirt 17",
    price: 390,
    weight: 300,

    colors: [
    {
        name: "Faded",
        key: "faded"
    }
],

    images: [
        "images/3b8b2078f1674abd8589190a1cc5e865~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/2abe18bc017c4f09b4d9c63e53df22f7~tplv-aphluv4xwc-resize-webp_800_800.jpg",
    ]
},


{
    id: "shirt18",
    category: "shirt",
    type: "SHIRT",
    name: "WHATDOUBTS T-Shirt 18",
    price: 390,
    weight: 300,

    colors: [
    {
        name: "Ruud Gullit",
        key: "Ruud Gullit"
    }
],

    images: [
        "images/0ee2e76578e64077a44f16d4d9b3b9e8~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/8dd71edd7a2f4f4b9b7318a0419281c7~tplv-aphluv4xwc-resize-webp_800_1000.jpg",

        "images/a5e096d7529046438a65706b04ed162d~tplv-aphluv4xwc-resize-webp_800_1000.jpg",

    ]
},


// ==================================================
// PANTS 01 - 04
// ==================================================

{
    id: "pants1",
    category: "pants",
    type: "PANTS",
    name: "WHATDOUBTS Pants 01",
    price: 590,
    weight: 650,

    colors: [
    {
        name: "Jort camo pixel heart",
        key: "camo"
    }
],

    images: [
        "images/S__59162639_0.jpg",
        "images/S__59162640_0.jpg",
        "images/S__59162641_0.jpg",
        "images/S__59162642_0.jpg"
    ]
},


{
    id: "pants2",
    category: "pants",
    type: "PANTS",
    name: "WHATDOUBTS Pants 02",
    price: 650,
    weight: 650,

    colors: [
    {
        name: "Midnigt black",
        key: "black",
        name: "Balsam blue",
        key: "blue",
    }
],

    images: [
        "images/51cecfecdce44b7fb78671bb88d9b867~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/51cecfecdce44b7fb78671bb88d9b867~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/f17cbb2287e64a63ba3d4acf1fe2f297~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/355107e861e349bca24760639472580c~tplv-aphluv4xwc-resize-webp_800_1000.jpg",
    ]
},


{
    id: "pants3",
    category: "pants",
    type: "PANTS",
    name: "WHATDOUBTS Pants 03",
    price: 650,
    weight: 650,

    colors: [
    {
        name: "Faded",
        key: "faded"
    }
],

    images: [
        "images/46f95ec35f40427881adc828a189c8f0~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/f0120a3220064fd6a8d73a5955b7b808~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/2073056a8664407da0d0c93498601d63~tplv-aphluv4xwc-resize-webp_800_800.jpg",
    ]
},


{
    id: "pants4",
    category: "pants",
    type: "PANTS",
    name: "WHATDOUBTS Pants 04",
    price: 650,
    weight: 650,

    colors: [
    {
        name: "Faded",
        key: "faded"
    }
],

    images: [
        "images/58795f5206be456f9caef0f6ea296b7d~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/db36773444fc41dfb1b105ab46a34a34~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/d0f96ccf1bd240608485e447a29966c7~tplv-aphluv4xwc-resize-webp_800_800.jpg",

        "images/b92964fc3a624c34b13a70486e53d5af~tplv-aphluv4xwc-origin-jpeg_11zon.jpg",
    ]
}

];


// ==================================================
// CART
// ==================================================

let cart = [];


// ==================================================
// IMAGE INDEX
// ==================================================

const productImageIndexes = {};


// ==================================================
// FIND PRODUCT
// ==================================================

function findProduct(productId) {

    return products.find(
        product =>
            product.id === productId
    );

}


// ==================================================
// COLOR TEXT
// ==================================================

function getColorName(color) {

    if (!color) {
        return "";
    }

    // รองรับแบบเก่า เช่น "Black", "White"
    if (typeof color === "string") {

        if (color === "Black") {
            return "ดำ";
        }

        if (color === "White") {
            return "ขาว";
        }

        return color;
    }

    // รองรับแบบใหม่
    // { name: "Jort camo pixel heart", key: "camo" }
    return color.name || "";
}


// ==================================================
// STOCK FIELD
//
// เสื้อ:
// Black + M
// => stockBlackM
//
// กางเกง:
// M
// => stockM
// ==================================================

function getStockField(
    product,
    colorKey,
    size
) {

    if (
        product.colors &&
        product.colors.length > 0
    ) {

        return (
            "stock" +
            colorKey.charAt(0).toUpperCase() +
            colorKey.slice(1) +
            size
        );

    }

    return (
        "stock" +
        size
    );
}


// ==================================================
// RENDER PRODUCTS
// ==================================================

function renderProducts() {

    const grid =
        document.getElementById(
            "product-grid"
        );


    if (!grid) {
        return;
    }


    grid.innerHTML = "";


    products.forEach(
        function(product) {


            productImageIndexes[
                product.id
            ] = 0;


            // ==========================================
            // COLOR SELECT
            // ==========================================

            let colorHTML = "";


            if (
                product.colors &&
                product.colors.length > 0
            ) {

                let options = "";


                product.colors.forEach(
                    function(color) {

                        options += `
                            <option value="${color.key}">
                                ${color.name}
                            </option>
                        `;

                    }
                );


                colorHTML = `

                    <label>
                        สี
                    </label>

                    <select
                        class="color-select"
                        id="color-${product.id}"
                        onchange="
                            handleColorChange(
                                '${product.id}'
                            )
                        "
                    >

                        ${options}

                    </select>

                `;

            }


            // ==========================================
            // IMAGE COUNTER
            // ==========================================

            let countHTML = "";


            if (
                product.images.length > 1
            ) {

                countHTML = `

                    <div
                        class="image-count"
                        id="count-${product.id}"
                    >

                        1 /
                        ${product.images.length}

                    </div>

                `;

            }


            // ==========================================
            // ARROWS
            // ==========================================

            let arrowsHTML = "";


            if (
                product.images.length > 1
            ) {

                arrowsHTML = `

                    <button
                        type="button"
                        class="
                            product-arrow
                            product-arrow-left
                        "
                        onclick="
                            moveProductImage(
                                '${product.id}',
                                -1
                            )
                        "
                    >

                        ‹

                    </button>


                    <button
                        type="button"
                        class="
                            product-arrow
                            product-arrow-right
                        "
                        onclick="
                            moveProductImage(
                                '${product.id}',
                                1
                            )
                        "
                    >

                        ›

                    </button>

                `;

            }


            // ==========================================
            // THUMBNAILS
            // ==========================================

            let thumbnailsHTML = "";


            if (
                product.images.length > 1
            ) {

                thumbnailsHTML = `

                    <div
                        class="thumbnail-row"
                        id="thumbnails-${product.id}"
                    >

                `;


                product.images.forEach(
                    function(
                        image,
                        index
                    ) {

                        thumbnailsHTML += `

                            <img
                                src="${image}"

                                class="
                                    product-thumbnail
                                    ${
                                        index === 0
                                        ?
                                        "active"
                                        :
                                        ""
                                    }
                                "

                                onclick="
                                    changeProductImage(
                                        '${product.id}',
                                        ${index},
                                        this
                                    )
                                "
                            >

                        `;

                    }
                );


                thumbnailsHTML +=
                    "</div>";

            }


            // ==========================================
            // PRODUCT CARD
            // ==========================================

            const html = `

                <article

                    class="product-card"

                    id="product-${product.id}"

                    data-product-id="${product.id}"

                    data-category="${product.category}"

                >


                    <div
                        class="product-image-box"
                    >


                        <img
                            id="main-${product.id}"

                            class="product-main-image"

                            src="${product.images[0]}"

                            alt="${product.name}"
                        >


                        ${arrowsHTML}


                        <div
                            class="sold-out-text"
                        >

                            SOLD OUT

                        </div>


                        ${countHTML}


                    </div>


                    ${thumbnailsHTML}


                    <div
                        class="product-info"
                    >


                        <span
                            class="product-category"
                        >

                            ${product.type}

                        </span>


                        <h3
                            class="product-name"
                        >

                            ${product.name}

                        </h3>


                        <strong
                            class="product-price"
                        >

                            ฿${product.price.toLocaleString()}

                        </strong>


                        ${colorHTML}

                            <label>
                                ไซซ์
                            </label>

                            <select
                                class="size-select"
                                id="size-${product.id}"
                            >
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                
                            </select>


                        <button

                            type="button"

                            class="add-cart-button"

                            id="button-${product.id}"

                            onclick="
                                addProductToCart(
                                    '${product.id}'
                                )
                            "

                        >

                            เพิ่มลงตะกร้า

                        </button>


                    </div>


                </article>

            `;


            grid.insertAdjacentHTML(
                "beforeend",
                html
            );

        }
    );

}


// ==================================================
// CATEGORY
// ==================================================

function showCategory(
    category,
    button
) {

    document
        .querySelectorAll(
            ".category-button"
        )
        .forEach(
            btn =>
                btn.classList.remove(
                    "active"
                )
        );


    if (button) {

        button.classList.add(
            "active"
        );

    }


    const title =
        document.getElementById(
            "category-title"
        );


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

    else {

        title.textContent =
            "กางเกง";

    }


    document
        .querySelectorAll(
            ".product-card"
        )
        .forEach(
            function(card) {

                card.style.display =
                    category === "all" ||
                    card.dataset.category === category

                    ?

                    "block"

                    :

                    "none";

            }
        );

}


// ==================================================
// GET FIREBASE STOCK
// ==================================================

async function getStockDocument(
    productId
) {

    try {

        const snapshot =
            await db
                .collection("products")
                .doc(productId)
                .get();


        if (!snapshot.exists) {

            return null;

        }


        return snapshot.data();

    }

    catch (error) {

        console.error(
            "Stock Error:",
            error
        );


        return null;

    }

}


// ==================================================
// UPDATE SIZE OPTIONS
// ==================================================

async function updateSizeOptions(
    productId
) {

    const product =
        findProduct(
            productId
        );


    if (!product) {
        return;
    }


    const select =
        document.getElementById(
            "size-" +
            productId
        );


    const colorSelect =
        document.getElementById(
            "color-" +
            productId
        );


    if (!select) {
        return;
    }


    const stock =
        await getStockDocument(
            productId
        );


    // ไม่มี Firebase stock
    // ขายปกติ

    if (!stock) {

        Array
            .from(
                select.options
            )
            .forEach(
                function(option) {

                    option.disabled = false;

                    option.textContent =
                        option.value;

                }
            );


        return;

    }


    const color =
        colorSelect
        ?
        colorSelect.value
        :
        null;


    let availableSizes = 0;


    Array
        .from(
            select.options
        )
        .forEach(
            function(option) {

                const size =
                    option.value;


                const field =
                    getStockField(
                        product,
                        color,
                        size
                    );


                const amount =
                    Number(
                        stock[field]
                        ??
                        0
                    );


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


                    availableSizes++;

                }

            }
        );


    if (
        select.options[
            select.selectedIndex
        ]?.disabled
    ) {

        const first =
            Array
                .from(
                    select.options
                )
                .find(
                    option =>
                        !option.disabled
                );


        if (first) {

            select.value =
                first.value;

        }

    }


    return availableSizes;

}


// ==================================================
// CHECK IF COLOR HAS STOCK
// ==================================================

function colorHasStock(
    product,
    stock,
    color
) {

    const sizes = [
        "S",
        "M",
        "L",
        "XL"
    ];


    return sizes.some(
        function(size) {

            const field =
                getStockField(
                    product,
                    color,
                    size
                );


            return (
                Number(
                    stock[field]
                    ??
                    0
                )
                >
                0
            );

        }
    );

}


// ==================================================
// LOAD PRODUCT STOCK
// ==================================================

async function loadProductStock(
    productId
) {

    const product =
        findProduct(
            productId
        );


    if (!product) {
        return;
    }


    const card =
        document.getElementById(
            "product-" +
            productId
        );


    const sizeSelect =
        document.getElementById(
            "size-" +
            productId
        );


    const colorSelect =
        document.getElementById(
            "color-" +
            productId
        );


    const button =
        document.getElementById(
            "button-" +
            productId
        );


    if (
        !card ||
        !sizeSelect ||
        !button
    ) {

        return;

    }


    const stock =
        await getStockDocument(
            productId
        );


    // ==========================================
    // ไม่มี Firestore doc
    // ขายได้ตามปกติ
    // ==========================================

    if (!stock) {

        card.classList.remove(
            "sold-out"
        );


        sizeSelect.disabled =
            false;


        if (colorSelect) {

            colorSelect.disabled =
                false;

        }


        button.disabled =
            false;


        button.textContent =
            "เพิ่มลงตะกร้า";


        await updateSizeOptions(
            productId
        );


        return;

    }


    // ==========================================
    // เสื้อมีสี
    // ==========================================

    if (
        product.colors.length > 0 &&
        colorSelect
    ) {

        let totalAvailableColors =
            0;


        Array
            .from(
                colorSelect.options
            )
            .forEach(
                function(option) {

                    const available =
                        colorHasStock(
                            product,
                            stock,
                            option.value
                        );


                    if (!available) {

                        option.disabled =
                            true;


                        option.textContent =
                            getColorName(
                                option.value
                            )
                            +
                            " — SOLD OUT";

                    }

                    else {

                        option.disabled =
                            false;


                        option.textContent =
                            getColorName(
                                option.value
                            );


                        totalAvailableColors++;

                    }

                }
            );


        // หมดทุกสีทุกไซซ์

        if (
            totalAvailableColors === 0
        ) {

            card.classList.add(
                "sold-out"
            );


            colorSelect.disabled =
                true;


            sizeSelect.disabled =
                true;


            button.disabled =
                true;


            button.textContent =
                "SOLD OUT";


            return;

        }


        // สีที่เลือกหมด
        // กระโดดไปสีที่ยังมี

        if (
            colorSelect.options[
                colorSelect.selectedIndex
            ]?.disabled
        ) {

            const firstColor =
                Array
                    .from(
                        colorSelect.options
                    )
                    .find(
                        option =>
                            !option.disabled
                    );


            if (firstColor) {

                colorSelect.value =
                    firstColor.value;

            }

        }

    }


    // ==========================================
    // SIZE
    // ==========================================

    const sizesLeft =
        await updateSizeOptions(
            productId
        );


    if (
        sizesLeft === 0
    ) {

        card.classList.add(
            "sold-out"
        );


        button.disabled =
            true;


        button.textContent =
            "SOLD OUT";

    }

    else {

        card.classList.remove(
            "sold-out"
        );


        button.disabled =
            false;


        button.textContent =
            "เพิ่มลงตะกร้า";

    }

}


// ==================================================
// COLOR CHANGED
// ==================================================

async function handleColorChange(
    productId
) {

    await loadProductStock(
        productId
    );

}


// ==================================================
// LOAD ALL STOCK
// ==================================================

async function loadAllStocks() {

    for (
        const product
        of products
    ) {

        await loadProductStock(
            product.id
        );

    }

}


// ==================================================
// ADD TO CART
// ==================================================

async function addProductToCart(
    productId
) {

    const product =
        findProduct(
            productId
        );


    if (!product) {
        return;
    }


    const sizeSelect =
        document.getElementById(
            "size-" +
            productId
        );


    const colorSelect =
        document.getElementById(
            "color-" +
            productId
        );


    if (
        !sizeSelect ||
        sizeSelect.disabled
    ) {

        alert(
            "สินค้านี้ SOLD OUT"
        );


        return;

    }


    const size =
        sizeSelect.value;


    const color =
        colorSelect
        ?
        colorSelect.value
        :
        null;


    const stock =
        await getStockDocument(
            productId
        );


    if (stock) {

        const field =
            getStockField(
                product,
                color,
                size
            );


        const available =
            Number(
                stock[field]
                ??
                0
            );


        const inCart =
            cart.filter(
                function(item) {

                    return (
                        item.id ===
                        productId

                        &&

                        item.size ===
                        size

                        &&

                        item.color ===
                        color
                    );

                }
            ).length;


        if (
            inCart >=
            available
        ) {

            alert(
                product.name +
                (
                    color
                    ?
                    " สี" +
                    getColorName(color)
                    :
                    ""
                )
                +
                " ไซซ์ " +
                size +
                " เหลือไม่พอ"
            );


            return;

        }

    }


    cart.push({

        id:
            product.id,

        name:
            product.name,

        price:
            product.price,

        weight:
            product.weight,

        color:
            color,

        size:
            size

    });


    updateCart();


    alert(
        "เพิ่ม " +
        product.name +
        (
            color
            ?
            " สี" +
            getColorName(color)
            :
            ""
        )
        +
        " ไซซ์ " +
        size +
        " ลงตะกร้าแล้ว"
    );

}


// ==================================================
// REMOVE
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
// TOTAL
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
// WEIGHT
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

        .replace(/\s+/g, "")

        .replace("จังหวัด", "")

        .replace("จ.", "")

        .replace("ฯ", "");

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
            item =>
                normalizeProvince(item)
                ===
                province
        )
    ) {

        return "near";

    }


    if (
        middleProvinces.some(
            item =>
                normalizeProvince(item)
                ===
                province
        )
    ) {

        return "middle";

    }


    if (
        farProvinces.some(
            item =>
                normalizeProvince(item)
                ===
                province
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


function calculateProvincePrice() {

    const zone =
        getProvinceZone();


    if (zone === "middle") {
        return 10;
    }


    if (zone === "far") {
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
        calculateWeightPrice()
        +
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


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (
        cart.length === 0
    ) {

        container.innerHTML = `

            <p class="empty-cart">

                ยังไม่มีสินค้าในตะกร้า

            </p>

        `;

    }


    cart.forEach(
        function(
            item,
            index
        ) {

            const colorText =
                item.color

                ?

                `สี ${getColorName(item.color)} • `

                :

                "";


            container.insertAdjacentHTML(
                "beforeend",

                `

                <div
                    class="cart-item"
                >


                    <div>


                        <strong>

                            ${item.name}

                        </strong>


                        <p>

                            ${colorText}

                            ไซซ์ ${item.size}

                            •

                            ฿${item.price.toLocaleString()}

                        </p>


                    </div>


                    <button
                        type="button"
                        class="remove-button"
                        onclick="
                            removeItem(
                                ${index}
                            )
                        "
                    >

                        ลบ

                    </button>


                </div>

                `
            );

        }
    );


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


    const productTotalElement =
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


    if (productTotalElement) {

        productTotalElement.textContent =
            productTotal.toLocaleString();

    }


    if (shippingElement) {

        if (
            cart.length > 0 &&
            (
                !getProvinceZone() ||
                getProvinceZone()
                ===
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
        getProvinceZone()
        ===
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
        document
            .getElementById(
                "customer-name"
            )
            .value
            .trim();


    const phone =
        document
            .getElementById(
                "customer-phone"
            )
            .value
            .trim();


    const address =
        document
            .getElementById(
                "customer-address"
            )
            .value
            .trim();


    const province =
        document
            .getElementById(
                "customer-province"
            )
            .value
            .trim();


    const postcode =
        document
            .getElementById(
                "customer-postcode"
            )
            .value
            .trim();


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
        getProvinceZone()
        ===
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


        if (submitButton) {

            submitButton.disabled =
                true;


            submitButton.textContent =
                "กำลังส่งคำสั่งซื้อ...";

        }


        await db.runTransaction(

        async function(transaction) {


            // ==========================================
            // GROUP PRODUCTS
            // ==========================================

            const groups = {};


            cart.forEach(
                function(item) {

                    if (
                        !groups[item.id]
                    ) {

                        groups[item.id] =
                            [];

                    }


                    groups[item.id]
                        .push(item);

                }
            );


            // ==========================================
            // READ
            // ==========================================

            const snapshots = {};


            for (
                const productId
                of
                Object.keys(groups)
            ) {

                const ref =
                    db
                        .collection(
                            "products"
                        )
                        .doc(
                            productId
                        );


                const snap =
                    await transaction.get(
                        ref
                    );


                snapshots[
                    productId
                ] = {

                    ref:
                        ref,

                    exists:
                        snap.exists,

                    data:
                        snap.exists
                        ?
                        snap.data()
                        :
                        null

                };

            }


            // ==========================================
            // STOCK UPDATES
            // ==========================================

            const updates = {};


            for (
                const productId
                of
                Object.keys(groups)
            ) {


                const information =
                    snapshots[
                        productId
                    ];


                if (
                    !information.exists
                ) {

                    continue;

                }


                const product =
                    findProduct(
                        productId
                    );


                const quantities = {};


                groups[
                    productId
                ]
                .forEach(
                    function(item) {

                        const field =
                            getStockField(
                                product,
                                item.color,
                                item.size
                            );


                        if (
                            !quantities[
                                field
                            ]
                        ) {

                            quantities[
                                field
                            ] =
                                0;

                        }


                        quantities[
                            field
                        ]++;

                    }
                );


                const updateData = {};


                for (
                    const field
                    of
                    Object.keys(
                        quantities
                    )
                ) {

                    const current =
                        Number(
                            information
                                .data[
                                    field
                                ]
                            ??
                            0
                        );


                    const wanted =
                        quantities[
                            field
                        ];


                    if (
                        current <
                        wanted
                    ) {

                        throw new Error(
                            product.name +
                            " SOLD OUT"
                        );

                    }


                    updateData[
                        field
                    ] =
                        current -
                        wanted;

                }


                updates[
                    productId
                ] =
                    updateData;

            }


            // ==========================================
            // CUT STOCK
            // ==========================================

            for (
                const productId
                of
                Object.keys(
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


            // ==========================================
            // CREATE ORDER
            // ==========================================

            const orderRef =
                db
                    .collection(
                        "orders"
                    )
                    .doc();


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

                                    color:
                                        item.color,

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
                        firebase
                            .firestore
                            .FieldValue
                            .serverTimestamp()

                }

            );

        });


        closeCheckout();


        document
            .getElementById(
                "success-modal"
            )
            ?.classList
            .add(
                "show"
            );


        await loadAllStocks();

    }

    catch (error) {


        console.error(
            error
        );


        alert(
            error.message
            ||
            "ส่งคำสั่งซื้อไม่สำเร็จ"
        );


        await loadAllStocks();

    }

    finally {


        if (submitButton) {

            submitButton.disabled =
                false;


            submitButton.textContent =
                "ยืนยันคำสั่งซื้อ";

        }

    }

});

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


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ==================================================
// CHANGE PRODUCT IMAGE
// ==================================================

function changeProductImage(
    productId,
    imageIndex,
    thumbnail = null
) {

    const product =
        findProduct(
            productId
        );


    const image =
        document.getElementById(
            "main-" +
            productId
        );


    if (
        !product ||
        !image
    ) {

        return;

    }


    if (
        imageIndex < 0
    ) {

        imageIndex =
            product.images.length -
            1;

    }


    if (
        imageIndex >=
        product.images.length
    ) {

        imageIndex = 0;

    }


    productImageIndexes[
        productId
    ] =
        imageIndex;


    image.style.opacity =
        "0";


    setTimeout(

        function() {

            image.src =
                product.images[
                    imageIndex
                ];


            image.style.opacity =
                "1";

        },

        120
    );


    const row =
        document.getElementById(
            "thumbnails-" +
            productId
        );


    if (row) {

        const thumbnails =
            row.querySelectorAll(
                ".product-thumbnail"
            );


        thumbnails.forEach(
            function(
                item,
                index
            ) {

                item.classList.toggle(
                    "active",
                    index ===
                    imageIndex
                );

            }
        );


        thumbnails[
            imageIndex
        ]?.scrollIntoView({

            behavior:
                "smooth",

            inline:
                "center",

            block:
                "nearest"

        });

    }


    const count =
        document.getElementById(
            "count-" +
            productId
        );


    if (count) {

        count.textContent =
            (
                imageIndex + 1
            )
            +
            " / "
            +
            product.images.length;

    }

}


// ==================================================
// ARROWS
// ==================================================

function moveProductImage(
    productId,
    direction
) {

    const product =
        findProduct(
            productId
        );


    if (
        !product ||
        product.images.length <= 1
    ) {

        return;

    }


    let index =
        productImageIndexes[
            productId
        ]
        ??
        0;


    index +=
        direction;


    if (
        index < 0
    ) {

        index =
            product.images.length -
            1;

    }


    if (
        index >=
        product.images.length
    ) {

        index = 0;

    }


    changeProductImage(
        productId,
        index
    );

}


// ==================================================
// BANNER
// ==================================================

const bannerSlides =
    document.querySelectorAll(
        ".banner-bg"
    );


let bannerIndex = 0;


function nextBanner() {

    if (
        bannerSlides.length <= 1
    ) {

        return;

    }


    bannerSlides[
        bannerIndex
    ]
    .classList
    .remove("active");


    bannerIndex++;


    if (
        bannerIndex >=
        bannerSlides.length
    ) {

        bannerIndex = 0;

    }


    bannerSlides[
        bannerIndex
    ]
    .classList
    .add("active");

}


setInterval(
    nextBanner,
    5000
);


// ==================================================
// PROVINCE LIVE UPDATE
// ==================================================

document
    .getElementById(
        "customer-province"
    )
    ?.addEventListener(
        "input",
        updateCheckoutTotal
    );


// ==================================================
// START
// ==================================================

renderProducts();

updateCart();

updateProvinceStatus();

loadAllStocks();

// ==================================================
// PRODUCT IMAGE VIEWER
// ==================================================

let viewerZoom = 1;

let viewerProductId = null;
let viewerImageIndex = 0;


// ==================================================
// OPEN VIEWER
// ==================================================

function openImageViewer(
    productId,
    imageIndex = 0
) {

    const product =
        findProduct(productId);

    if (!product) {
        return;
    }


    viewerProductId =
        productId;

    viewerImageIndex =
        imageIndex;

    viewerZoom =
        1;


    const viewer =
        document.getElementById(
            "image-viewer"
        );

    if (!viewer) {
        return;
    }


    if (
        product.images.length <= 1
    ) {

        viewer.classList.add(
            "single-image"
        );

    }

    else {

        viewer.classList.remove(
            "single-image"
        );

    }


    updateViewerImage();


    viewer.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";

}


// ==================================================
// UPDATE VIEWER IMAGE
// ==================================================

function updateViewerImage() {

    const product =
        findProduct(
            viewerProductId
        );


    if (!product) {
        return;
    }


    const image =
        document.getElementById(
            "viewer-image"
        );


    const count =
        document.getElementById(
            "viewer-image-count"
        );


    if (image) {

        image.src =
            product.images[
                viewerImageIndex
            ];

    }


    if (count) {

        count.textContent =
            (
                viewerImageIndex + 1
            )
            +
            " / "
            +
            product.images.length;

    }


    viewerZoom =
        1;


    updateViewerZoom();

}


// ==================================================
// PREVIOUS
// ==================================================

function viewerPrevImage() {

    const product =
        findProduct(
            viewerProductId
        );


    if (
        !product ||
        product.images.length <= 1
    ) {
        return;
    }


    viewerImageIndex--;


    if (
        viewerImageIndex < 0
    ) {

        viewerImageIndex =
            product.images.length - 1;

    }


    updateViewerImage();

}


// ==================================================
// NEXT
// ==================================================

function viewerNextImage() {

    const product =
        findProduct(
            viewerProductId
        );


    if (
        !product ||
        product.images.length <= 1
    ) {
        return;
    }


    viewerImageIndex++;


    if (
        viewerImageIndex >=
        product.images.length
    ) {

        viewerImageIndex =
            0;

    }


    updateViewerImage();

}


// ==================================================
// CLOSE VIEWER
// ==================================================

function closeImageViewer() {

    const viewer =
        document.getElementById(
            "image-viewer"
        );


    if (!viewer) {
        return;
    }


    viewer.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";

}


// ==================================================
// ZOOM
// ==================================================

function zoomImage(amount) {

    viewerZoom +=
        amount;


    if (
        viewerZoom < 0.6
    ) {

        viewerZoom =
            0.6;

    }


    if (
        viewerZoom > 2.5
    ) {

        viewerZoom =
            2.5;

    }


    updateViewerZoom();

}


// ==================================================
// RESET ZOOM
// ==================================================

function resetImageZoom() {

    viewerZoom =
        1;


    updateViewerZoom();

}


// ==================================================
// UPDATE ZOOM
// ==================================================

function updateViewerZoom() {

    const image =
        document.getElementById(
            "viewer-image"
        );


    const text =
        document.getElementById(
            "viewer-zoom"
        );


    if (image) {

        image.style.transform =
            `scale(${viewerZoom})`;

    }


    if (text) {

        text.textContent =
            Math.round(
                viewerZoom * 100
            )
            +
            "%";

    }

}


// ==================================================
// CLICK MAIN PRODUCT IMAGE
// ==================================================

document.addEventListener(
    "click",
    function(event) {

        const image =
            event.target.closest(
                ".product-main-image"
            );


        if (!image) {
            return;
        }


        const card =
            image.closest(
                ".product-card"
            );


        if (!card) {
            return;
        }


        const productId =
            card.dataset.productId;


        const currentIndex =
            productImageIndexes[
                productId
            ]
            ??
            0;


        openImageViewer(
            productId,
            currentIndex
        );

    }
);


// ==================================================
// CLICK BLACK BACKGROUND = CLOSE
// ==================================================

document
    .getElementById(
        "image-viewer"
    )
    ?.addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closeImageViewer();

            }

        }
    );


// ==================================================
// KEYBOARD
// ==================================================

document.addEventListener(
    "keydown",
    function(event) {

        const viewer =
            document.getElementById(
                "image-viewer"
            );


        if (
            !viewer ||
            !viewer.classList.contains(
                "show"
            )
        ) {
            return;
        }


        if (
            event.key === "Escape"
        ) {

            closeImageViewer();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            viewerPrevImage();

        }


        if (
            event.key === "ArrowRight"
        ) {

            viewerNextImage();

        }

    }
);


// ==================================================
// CLICK PRODUCT IMAGE
// ใช้ Event Delegation เพราะสินค้า render จาก JS
// ==================================================

document.addEventListener(
    "click",
    function(event) {

        const image =
            event.target.closest(
                ".product-main-image"
            );

        if (!image) {
            return;
        }

        openImageViewer(
            image.src
        );

    }
);


// กดพื้นหลังดำ = ปิด
document
    .getElementById("image-viewer")
    ?.addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closeImageViewer();

            }

        }
    );


// กด ESC = ปิด
document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeImageViewer();

        }

    }
);
