let debounceTimer;

function debounce(callback, delay = 1500) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, delay);
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('d-none');
    });
    document.getElementById(sectionId).classList.remove('d-none');

    if (sectionId === 'products') {
        getAllProducts();
    }

    if (sectionId === 'orders') {
        getAllOrders();
    }

    if (sectionId === 'shipping') {
        getAllShipping();
    }
}

function getAllProducts() {
    const apiUrl = `http://localhost:5555/restv2/warehouseManagementSystem/getAllProducts`;
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(errData.response || 'An error occurred while fetching data.');
                });
            }
            // console.log(response);
            return response.json();
        })
        .then(data => {
            const products = data.productDetails.products || [];

            if (products.length === 0) {
                productList.innerHTML = '<p class="text-center">No products available at the moment.</p>';
                return;
            }

            products.forEach(product => {
                const card = `
            <div class="col-md-4 mb-4" style="max-width: 300px; min-width: 250px; display: flex; justify-content: center;">
                <div class="card" style="width: 100%; border: none; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                    <div class = "bg-custom2">
                    <div class="card-body">
                        <h5 class="card-title">${product.productName}</h5>
                        <p class="card-text"><strong>Description:</strong> ${product.description}</p>
                        <p class="card-text"><strong>Category:</strong> ${product.category}</p>
                        <p class="card-text"><strong>Stock Quantity:</strong> ${product.stockQuantity}</p>
                        <p class="card-text"><strong>Price/unit:</strong> ₹${product.price}</p>
                        <p class="card-text"><strong>ProductId:</strong> ${product.productId}</p>
                        <button class="btn btn-primary mt-3" onclick="goToPlaceOrder('${product.productId}')">Place Order</button>
                    </div></div>
                </div>
            </div>
        `;
                productList.innerHTML += card;
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error.message);
            productList.innerHTML = `<p class="text-center text-danger">${error.message}</p>`;
        });
}

function getProductDetailsByCategory() {
    const category = document.getElementById('categorySelect').value;
    const apiUrl = `http://localhost:5555/restv2/warehouseManagementSystem/getProductsByCategory?category=${category}`;
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    if (category.length === 0) {
        productList.innerHTML = '<p class="text-center">Please select product category to get details.</p>';
        return;
    }

    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(errData.response || 'An error occurred while fetching data.');
                });
            }
            return response.json();
        })
        .then(data => {
            const products = data.productDetails.product || [];

            if (products.length === 0) {
                productList.innerHTML = '<p class="text-center">No products available at the moment.</p>';
                return;
            }

            products.forEach(product => {
                const card = `
            <div class="col-md-4 mb-4" style="max-width: 300px; min-width: 250px; display: flex; justify-content: center;">
                <div class="card" style="width: 100%; border: none; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                    <div class="card-body">
                        <h5 class="card-title">${product.productName}</h5>
                        <p class="card-text"><strong>Description:</strong> ${product.description}</p>
                        <p class="card-text"><strong>Category:</strong> ${product.category}</p>
                        <p class="card-text"><strong>Stock Quantity:</strong> ${product.stockQuantity}</p>
                        <p class="card-text"><strong>Price:</strong> ₹${product.price}</p>
                        
                        <button class="btn btn-primary mt-3" onclick="goToPlaceOrder('${product.productId}')">Place Order</button>
                    </div>
                </div>
            </div>
        `;
                productList.innerHTML += card;
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error.message);
            productList.innerHTML = `<p class="text-center text-danger">${error.message}</p>`;
        });
}

function getProductDetailsByProductName() {
    const productName = document.getElementById('productName').value;
    const apiUrl = `http://localhost:5555/restv2/warehouseManagementSystem/getProductsByName?productName=${productName}`;
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    if (productName.length === 0) {
        productList.innerHTML = '<p class="text-center">Please insert product name to get details.</p>';
        return;
    }

    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(errData.response || 'An error occurred while fetching data.');
                });
            }
            return response.json();
        })
        .then(data => {
            const product = data.productDetails.product || [];
            const productArray = Array.isArray(product) ? product : [product];

            productArray.forEach(product => {
                const card = `
            <div class="col-md-4 mb-4" style="max-width: 300px; min-width: 250px; display: flex; justify-content: center;">
                <div class="card" style="width: 100%; border: none; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                    <div class="card-body">
                        <h5 class="card-title">${product.productName}</h5>
                        <p class="card-text"><strong>Description:</strong> ${product.description}</p>
                        <p class="card-text"><strong>Category:</strong> ${product.category}</p>
                        <p class="card-text"><strong>Stock Quantity:</strong> ${product.stockQuantity}</p>
                        <p class="card-text"><strong>Price:</strong> ₹${product.price}</p>
                        <p class="card-text"><strong>ProductId:</strong> ${product.productId}</p>
                        <button class="btn btn-primary mt-3" onclick="goToPlaceOrder('${product.productId}')">Place Order</button>
                    </div>
                </div>
            </div>
        `;
                productList.innerHTML += card;
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error.message);
            productList.innerHTML = `<p class="text-center text-danger">${error.message}</p>`;
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const showAddProductFormButton = document.getElementById("addProductButton");
    const formContainer = document.getElementById("addProductFormContainer");
    const inputContainer = document.getElementById("inputContainer");
    const productList = document.getElementById("product-list");
    const availableProductsHeading = document.querySelector("#products h3"); // Select the "Available Products" h3 tag

    if (showAddProductFormButton) {
        showAddProductFormButton.addEventListener("click", () => {
            const isFormVisible = formContainer.style.display === "block";

            // Toggle visibility
            formContainer.style.display = isFormVisible ? "none" : "block";
            inputContainer.style.display = isFormVisible ? "flex" : "none";
            productList.style.display = isFormVisible ? "flex" : "none";
            availableProductsHeading.style.display = isFormVisible ? "block" : "none"; // Hide or show the heading
        });
    }

    const addProductForm = document.getElementById("addProductForm");

    if (addProductForm) {
        // Add validation handling
        addProductForm.addEventListener("submit", function (event) {
            // Prevent default submission if form is invalid
            if (!addProductForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                addProductForm.classList.add("was-validated");
                return;
            }

            event.preventDefault(); // Prevent actual form submission for our example

            const productName = document.getElementById("productNameInput").value.trim();
            const description = document.getElementById("productDescription").value.trim();
            const category = document.getElementById("productCategory").value;
            const stock = document.getElementById("productStock").value.trim();
            const price = document.getElementById("productPrice").value.trim();

            const payload = {
                ProductDetails: {
                    ProductName: productName,
                    Description: description,
                    Category: category,
                    StockQuantity: stock,
                    Price: price,
                },
            };

            fetch("http://localhost:5555/restv2/warehouseManagementSystem/insertProduct", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then((response) => {
                    if (!response.ok) {
                        return response.json().then((errData) => {
                            throw new Error(errData.response || "An error occurred while adding the product.");
                        });
                    }
                    return response.json();
                })
                .then((data) => {
                    alert(data.response);
                    addProductForm.reset();
                    addProductForm.classList.remove("was-validated");
                    formContainer.style.display = "none";
                    inputContainer.style.display = "flex";
                    productList.style.display = "flex";
                    availableProductsHeading.style.display = "block"; // Show the heading after submission
                })
                .catch((error) => {
                    console.error("Error adding product:", error.message);
                    alert(`Error: ${error.message}`);
                });
        });
    }
});

function getAllOrders() {
    const apiUrl = `http://localhost:5555/restv2/warehouseManagementSystem/getAllOrders`;
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';

    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(errData.response || 'An error occurred while fetching data.');
                });
            }
            return response.json();
        })
        .then(data => {
            const orders = data.orderDetails.orders || [];

            if (orders.length === 0) {
                orderList.innerHTML = '<p class="text-center">No orders available at the moment.</p>';
                return;
            }

            orders.forEach(order => {
                const card = `
        <div class="col-md-4 mb-4" style="max-width: 300px; min-width: 250px; display: flex; justify-content: center;">
            <div class="card" style="width: 100%; border: none; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                <div class="card-body">
                    <h5 class="card-title">${order.orderId}</h5>
                    <p class="card-text"><strong>Customer Name:</strong> ${order.customerName}</p>
                    <p class="card-text"><strong>Email:</strong> ${order.email}</p>
                    <p class="card-text"><strong>Mobile:</strong> ${order.mobile}</p>
                    <p class="card-text"><strong>Order Type:</strong> ${order.orderType}</p>
                    <p class="card-text"><strong>Quantity:</strong> ${order.quantity}</p>
                    <p class="card-text"><strong>Order Date:</strong> ${order.orderDate}</p>
                    <p class="card-text"><strong>Shipping Address:</strong> ${order.shippingAddress}</p>
                    <p class="card-text"><strong>Product Id:</strong> ${order.productId}</p>
                    <button class="btn btn-primary mt-3" onclick="goToPlaceShipment('${order.orderId}')">Place Shipment</button>
                </div>
            </div>
        </div>
    `;
                orderList.innerHTML += card;
            });
        })
        .catch(error => {
            console.error('Error fetching orders:', error.message);
            orderList.innerHTML = `<p class="text-center text-danger">${error.message}</p>`;
        });
}

function getOrderDetailsByOrderno() {
    const orderNo = document.getElementById("orderno").value.trim();
    const apiUrl = `http://localhost:5555/restv2/warehouseManagementSystem/getOrderByOrderId?orderId=${orderNo}`;
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';

    if (orderNo.length === 0) {
        orderList.innerHTML = 'Order number is empty or null!. Please insert correctly';
        return;
    }

    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(errData.response || 'An error occurred while fetching data.');
                });
            }
            return response.json();
        })
        .then(data => {
            const orderDetails = data.orderDetails.orders || [];

            const orders = Array.isArray(orderDetails) ? orderDetails : [orderDetails];

            if (!orderDetails) {
                orderList.innerHTML = "<p class='text-center text-danger'>Order not found.</p>";
                return;
            }

            orders.forEach(order => {
                const card = `
    <div class="col-md-4 mb-4" style="max-width: 300px; min-width: 250px; display: flex; justify-content: center;">
        <div class="card" style="width: 100%; border: none; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <div class="card-body">
                <h5 class="card-title">${order.orderId}</h5>
                <p class="card-text"><strong>Customer Name:</strong> ${order.customerName}</p>
                <p class="card-text"><strong>Email:</strong> ${order.email}</p>
                <p class="card-text"><strong>Mobile:</strong> ${order.mobile}</p>
                <p class="card-text"><strong>Order Type:</strong> ${order.orderType}</p>
                <p class="card-text"><strong>Quantity:</strong> ${order.quantity}</p>
                <p class="card-text"><strong>Order Date:</strong> ${order.orderDate}</p>
                <p class="card-text"><strong>Shipping Address:</strong> ${order.shippingAddress}</p>
                <p class="card-text"><strong>Product Id:</strong> ${order.productId}</p>
                <button class="btn btn-primary mt-3" onclick="goToPlaceShipment('${order.orderId}')">Place Shipment</button>
            </div>
        </div>
    </div>
`;
                orderList.innerHTML += card;
            });
        })
        .catch(error => {
            console.error("Error fetching order details:", error.message);
            orderList.innerHTML = `<p class='text-center text-danger'>${error.message}</p>`;
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const showAddProductFormButton = document.getElementById("addOrderButton");
    const formContainer = document.getElementById("addOrderFormContainer");
    const inputContainer = document.getElementById("orderInputContainer");
    const orderList = document.getElementById("order-list");
    const availableProductsHeading = document.querySelector("#orders h3");

    if (showAddProductFormButton) {
        showAddProductFormButton.addEventListener("click", () => {
            const isFormVisible = formContainer.style.display === "block";

            formContainer.style.display = isFormVisible ? "none" : "block";
            inputContainer.style.display = isFormVisible ? "flex" : "none";
            orderList.style.display = isFormVisible ? "flex" : "none";
            availableProductsHeading.style.display = isFormVisible ? "block" : "none";
        });
    }

    const addProductForm = document.getElementById("addOrderForm");

    if (addProductForm) {
        addProductForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!addProductForm.checkValidity()) {
                event.stopPropagation();
                addProductForm.classList.add("was-validated");
                return;
            }

            const name = document.getElementById("nameInput").value.trim();
            const mobile = document.getElementById("mobile").value.trim();
            const email = document.getElementById("email").value.trim();
            const shippingAddress = document.getElementById("shippingAddress").value.trim();
            const orderType = document.getElementById("orderType").value;
            const productQuantity = document.getElementById("productQuantity").value.trim();
            const productId = document.getElementById("productId").value.trim();

            const payload = {
                NewOrder: {
                    Name: name,
                    Mobile: mobile,
                    Email: email,
                    ShippingAddress: shippingAddress,
                    OrderType: orderType,
                    Quantity: productQuantity,
                    ProductId: productId,
                },
            };

            fetch("http://localhost:5555/restv2/warehouseManagementSystem/insertOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then((response) => {
                    if (!response.ok) {
                        return response.json().then((errData) => {
                            throw new Error(errData.response || "An error occurred while adding the product.");
                        });
                    }
                    return response.json();
                })
                .then((data) => {
                    alert(data.response);
                    addProductForm.reset();
                    addProductForm.classList.remove("was-validated");
                    formContainer.style.display = "none";
                    inputContainer.style.display = "flex";
                    orderList.style.display = "flex";
                    availableProductsHeading.style.display = "block";
                })
                .catch((error) => {
                    console.error("Error adding product:", error.message);
                    alert(`Error: ${error.message}`);
                });
        });
    }
});

function goToPlaceOrder(productId) {
    const orderSection = document.getElementById('orders');
    const productSection = document.getElementById('products');

    productSection.classList.add('d-none');
    orderSection.classList.remove('d-none');

    orderSection.scrollIntoView({ behavior: 'smooth' });

    const productIdInput = document.getElementById('productId');
    productIdInput.value = productId;

    const orderInputContainer = document.getElementById('orderInputContainer');
    const addOrderButton = document.getElementById('addOrderButton');
    const orderListContainer = document.getElementById('order-list');
    const availableProductsHeading = document.querySelector("#orders h3");

    orderInputContainer.style.display = 'none';
    addOrderButton.style.display = 'none';
    orderListContainer.style.display = 'none';
    availableProductsHeading.style.display = "none";

    const addOrderFormContainer = document.getElementById('addOrderFormContainer');
    addOrderFormContainer.style.display = 'block';
}

function getAllShipping() {
    const apiUrl = `http://localhost:5555/restv2/warehouseManagementSystem/getAllShipping`;
    const shippingList = document.getElementById('shipping-list');
    shippingList.innerHTML = '';

    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(errData.response || 'An error occurred while fetching data.');
                });
            }
            return response.json();
        })
        .then(data => {
            const shippings = data.shippingDetails.shipping || [];

            if (shippings.length === 0) {
                shippingList.innerHTML = '<p class="text-center">No shipping available at the moment.</p>';
                return;
            }

            shippings.forEach(shipping => {
                const card = `
    <div class="col-md-4 mb-4" style="max-width: 300px; min-width: 250px; display: flex; justify-content: center;">
        <div class="card" style="width: 100%; border: none; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <div class="card-body">
                <h5 class="card-text"><strong>Order ID:</strong>${shipping.orderId}</h5>
                <p class="card-text"><strong>Status:</strong> ${shipping.status}</p>
                <p class="card-text"><strong>Shipping Date:</strong> ${shipping.shippingDate}</p>
                <p class="card-text"><strong>Delivery Date:</strong> ${shipping.deliveryDate}</p>
                <p class="card-text"><strong>Carrier Name:</strong> ${shipping.carrierName}</p>
                <p class="card-text"><strong>Tracking No:</strong> ${shipping.trackingNumber}</p>
            </div>
        </div>
    </div>
`;
                shippingList.innerHTML += card;
            });
        })
        .catch(error => {
            console.error('Error fetching shippings:', error.message);
            shippingList.innerHTML = `<p class="text-center text-danger">${error.message}</p>`;
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const showAddShippingFormButton = document.getElementById("addShippingButton");
    const formContainer = document.getElementById("addShippingFormContainer");
    const inputContainer = document.getElementById("shippingInputContainer");
    const shippingList = document.getElementById("shipping-list");
    const availableShippingHeading = document.querySelector("#shipping h3");

    if (showAddShippingFormButton) {
        showAddShippingFormButton.addEventListener("click", () => {
            const isFormVisible = formContainer.style.display === "block";

            formContainer.style.display = isFormVisible ? "none" : "block";
            inputContainer.style.display = isFormVisible ? "flex" : "none";
            shippingList.style.display = isFormVisible ? "flex" : "none";
            availableShippingHeading.style.display = isFormVisible ? "block" : "none";
        });
    }

    const addShippingForm = document.getElementById("addShippingForm");

    if (addShippingForm) {
        addShippingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!addShippingForm.checkValidity()) {
                event.stopPropagation();
                addShippingForm.classList.add("was-validated");
                return;
            }

            const shippingStatus = document.getElementById("shippingStatus").value;
            const shippingDate = document.getElementById("shippedDate").value;
            console.log(shippingDate);
            const deliveredDate = document.getElementById("deliveredDate").value;
            console.log(deliveredDate);
            const carrierName = document.getElementById("carrierName").value.trim();
            const orderId = document.getElementById("orderId").value.trim();

            const payload = {
                ShippingDetails: {
                    Status: shippingStatus,
                    ShippingDate: shippingDate,
                    DeliveredDate: deliveredDate,
                    CarrierName: carrierName,
                    OrderId: orderId,
                },
            };

            fetch("http://localhost:5555/restv2/warehouseManagementSystem/insertShipping", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then((response) => {
                    if (!response.ok) {
                        return response.json().then((errData) => {
                            throw new Error(errData.response || "An error occurred while adding the shipping details.");
                        });
                    }
                    return response.json();
                })
                .then((data) => {
                    alert(data.response);
                    addShippingForm.reset();
                    addShippingForm.classList.remove("was-validated");
                    formContainer.style.display = "none";
                    inputContainer.style.display = "flex";
                    shippingList.style.display = "flex";
                })
                .catch((error) => {
                    console.error("Error adding shipping details:", error.message);
                    alert(`Error: ${error.message}`);
                });
        });
    }
});

function goToPlaceShipment(orderId) {
    const orderSection = document.getElementById('orders');
    const shippingSection = document.getElementById('shipping');

    orderSection.classList.add('d-none');
    shippingSection.classList.remove('d-none');

    shippingSection.scrollIntoView({ behavior: 'smooth' });

    const orderIdInput = document.getElementById('orderId');
    orderIdInput.value = orderId;

    const shippingInputContainer = document.getElementById('shippingInputContainer');
    const addShippingButton = document.getElementById('addShippingButton');
    const shippingListContainer = document.getElementById('shipping-list');
    const availableShippingHeading = document.querySelector("#shipping h3");

    shippingInputContainer.style.display = 'none';
    addShippingButton.style.display = 'none';
    shippingListContainer.style.display = 'none';
    if (availableShippingHeading) {
        availableShippingHeading.style.display = "none";
    }

    const addShippingFormContainer = document.getElementById('addShippingFormContainer');
    addShippingFormContainer.style.display = 'block';
}

function generateReportByShippingDate() {
    const shippingDateElement = document.getElementById("shippingDate");
    const shippingDate = shippingDateElement.value.trim();
    const shippingList = document.getElementById('shipping-list');
    shippingList.innerHTML = '';

    if (!shippingDate) {
        console.log("Shipping date is empty or null!");
        return;
    }

    const apiUrl = `http://localhost:5555/restv2/warehouseManagementSystem/getShippingDetailsByDate?shippingDate=${shippingDate}`;

    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(errData.response || "Failed to fetch shipping details.");
                });
            }
            return response.json();
        })
        .then(data => {
            const shippingRecords = data.shippingDetails.shipping || [];
            const errorMessage = data.response || '';

            // If API returns an error message (no records found)
            if (errorMessage) {
                shippingList.innerHTML = `<p class="text-center text-danger">${errorMessage}</p>`;
                return;
            }

            if (shippingRecords.length === 0) {
                shippingList.innerHTML = '<p class="text-center text-danger">No shipping records found for the selected date.</p>';
            } else {
                shippingRecords.forEach(shipping => {
                    const card = `
                    <div class="col-md-4 mb-4" style="max-width: 300px; min-width: 250px; display: flex; justify-content: center;">
                        <div class="card" style="width: 100%; border: none; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                            <div class="card-body">
                                <h5 class="card-text"><strong>Order ID:</strong> ${shipping.orderId}</h5>
                                <p class="card-text"><strong>Status:</strong> ${shipping.status}</p>
                                <p class="card-text"><strong>Shipping Date:</strong> ${shipping.shippingDate}</p>
                                <p class="card-text"><strong>Delivery Date:</strong> ${shipping.deliveryDate}</p>
                                <p class="card-text"><strong>Carrier Name:</strong> ${shipping.carrierName}</p>
                                <p class="card-text"><strong>Tracking No:</strong> ${shipping.trackingNo}</p>
                            </div>
                        </div>
                    </div>
                    `;
                    shippingList.innerHTML += card;
                });
            }
        })
        .catch(error => {
            console.error("Error fetching shipping report:", error.message);
            shippingList.innerHTML = `<p class="text-center text-danger">${error.message}</p>`;
        });
}

function getShippingDetailsByTrackingNo() {
    const trackingNo = document.getElementById("trackingNo").value.trim();
    const apiUrl = `http://localhost:5555/restv2/warehouseManagementSystem/getShippingDetailsByTrackingNo?trackingNo=${trackingNo}`;
    const shippingList = document.getElementById('shipping-list');
    shippingList.innerHTML = '';

    if (!trackingNo) {
        shippingList.innerHTML = "Tracking No is empty or null!";
        return;
    }

    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(errData.response || "Failed to fetch shipping details.");
                });
            }
            return response.json();
        })
        .then(data => {
            const shippingRecords = data.shippingDetails.shipping || [];

            // Ensure we handle both single record and array case
            const shippings = Array.isArray(shippingRecords) ? shippingRecords : [shippingRecords];

            // Check if the shipping records are empty
            if (shippings.length === 0) {
                shippingList.innerHTML = `<p class="text-center text-danger">No records found.</p>`;
                return;
            }

            // Generate and display cards for each shipping record
            shippings.forEach(shipping => {
                const card = `
                <div class="col-md-4 mb-4" style="max-width: 300px; min-width: 250px; display: flex; justify-content: center;">
                    <div class="card" style="width: 100%; border: none; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                        <div class="card-body">
                            <h5 class="card-text"><strong>Order ID:</strong> ${shipping.orderId}</h5>
                            <p class="card-text"><strong>Status:</strong> ${shipping.status}</p>
                            <p class="card-text"><strong>Shipping Date:</strong> ${shipping.shippingDate}</p>
                            <p class="card-text"><strong>Delivery Date:</strong> ${shipping.deliveryDate}</p>
                            <p class="card-text"><strong>Carrier Name:</strong> ${shipping.carrierName}</p>
                            <p class="card-text"><strong>Tracking No:</strong> ${shipping.trackingNo}</p>
                        </div>
                    </div>
                </div>
            `;
                shippingList.innerHTML += card;
            });

        })
        .catch(error => {
            console.error("Error fetching shipping report:", error.message);
            shippingList.innerHTML = `<p class="text-center text-danger">${error.message}</p>`;
        });
}
