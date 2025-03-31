// Configuration
const API_URL = 'http://localhost:3000'; // Backend API URL

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    // Navigation functionality
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the page id from data attribute
            const targetPage = link.dataset.page;
            
            // Remove active class from all links and pages
            navLinks.forEach(link => link.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            
            // Add active class to clicked link and corresponding page
            link.classList.add('active');
            document.getElementById(`${targetPage}-page`).classList.add('active');
        });
    });

    // Load initial data
    loadDashboardData();
    loadProducts();
    loadInventory();
    loadOrders();
    loadSuppliers();
    loadSales();

    // Modal functionality
    const productModal = document.getElementById('product-modal');
    const addProductBtn = document.getElementById('add-product-btn');
    const closeModalBtn = document.querySelector('.close');
    const productForm = document.getElementById('product-form');

    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => {
            document.getElementById('modal-title').textContent = 'Add New Product';
            productForm.reset();
            productModal.style.display = 'block';
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            productModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.style.display = 'none';
        }
    });

    // Form submission
    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const productData = {
                name: document.getElementById('product-name').value,
                sku: document.getElementById('product-sku').value,
                price: document.getElementById('product-price').value,
                quantityInStock: document.getElementById('product-quantity').value,
                description: document.getElementById('product-description').value
            };
            
            addProduct(productData);
            productModal.style.display = 'none';
        });
    }

    // Initialize buttons for other pages
    setupOrderButtons();
    setupSupplierButtons();
    setupReportButtons();
});

// API Functions
async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`API Error: ${error.message}`);
        return null;
    }
}

async function postData(endpoint, data) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`Error posting data: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`API Error: ${error.message}`);
        return null;
    }
}

// Dashboard Data
async function loadDashboardData() {
    try {
        const products = await fetchData('/products');
        const inventory = await fetchData('/inventory');
        const orders = await fetchData('/orders');
        const sales = await fetchData('/sales');
        
        if (products) {
            document.getElementById('total-products').textContent = products.length;
        }
        
        if (inventory) {
            const lowStockItems = inventory.filter(item => item.quantityInStock < 10).length;
            document.getElementById('low-stock').textContent = lowStockItems;
        }
        
        if (orders) {
            const recentOrders = orders.filter(order => {
                const orderDate = new Date(order.createdAt);
                const today = new Date();
                const diffTime = Math.abs(today - orderDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 7;
            }).length;
            
            document.getElementById('recent-orders').textContent = recentOrders;
        }
        
        if (sales) {
            const today = new Date().toISOString().split('T')[0];
            const todaySales = sales
                .filter(sale => sale.date.startsWith(today))
                .reduce((total, sale) => total + sale.total, 0);
            
            document.getElementById('today-sales').textContent = `$${todaySales.toFixed(2)}`;
        }
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

// Products
async function loadProducts() {
    const productsList = document.getElementById('products-list');
    if (!productsList) return;
    
    try {
        const products = await fetchData('/products');
        
        if (products && products.length > 0) {
            productsList.innerHTML = '';
            
            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.name}</td>
                    <td>${product.sku}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>${product.quantityInStock}</td>
                    <td>
                        <button class="action-btn edit-btn" data-id="${product._id}">Edit</button>
                        <button class="action-btn delete-btn" data-id="${product._id}">Delete</button>
                    </td>
                `;
                productsList.appendChild(row);
            });
            
            // Add event listeners to the edit and delete buttons
            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = e.target.dataset.id;
                    editProduct(productId);
                });
            });
            
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = e.target.dataset.id;
                    deleteProduct(productId);
                });
            });
        } else {
            productsList.innerHTML = '<tr><td colspan="5">No products found</td></tr>';
        }
    } catch (error) {
        console.error('Error loading products:', error);
        productsList.innerHTML = '<tr><td colspan="5">Error loading products</td></tr>';
    }
}

async function addProduct(productData) {
    try {
        const result = await postData('/products', productData);
        if (result) {
            loadProducts(); // Reload the products list
        }
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

async function editProduct(productId) {
    try {
        const product = await fetchData(`/products/${productId}`);
        
        if (product) {
            document.getElementById('modal-title').textContent = 'Edit Product';
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-sku').value = product.sku;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-quantity').value = product.quantityInStock;
            document.getElementById('product-description').value = product.description || '';
            
            const productForm = document.getElementById('product-form');
            const productModal = document.getElementById('product-modal');
            
            // Update form submission handler
            productForm.onsubmit = async (e) => {
                e.preventDefault();
                
                const updatedProduct = {
                    name: document.getElementById('product-name').value,
                    sku: document.getElementById('product-sku').value,
                    price: document.getElementById('product-price').value,
                    quantityInStock: document.getElementById('product-quantity').value,
                    description: document.getElementById('product-description').value
                };
                
                try {
                    const response = await fetch(`${API_URL}/products/${productId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedProduct)
                    });
                    
                    if (response.ok) {
                        loadProducts(); // Reload the products list
                        productModal.style.display = 'none';
                    }
                } catch (error) {
                    console.error('Error updating product:', error);
                }
            };
            
            productModal.style.display = 'block';
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

async function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            const response = await fetch(`${API_URL}/products/${productId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                loadProducts(); // Reload the products list
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }
}

// Inventory
async function loadInventory() {
    const inventoryList = document.getElementById('inventory-list');
    if (!inventoryList) return;
    
    try {
        const inventory = await fetchData('/inventory');
        
        if (inventory && inventory.length > 0) {
            inventoryList.innerHTML = '';
            
            inventory.forEach(item => {
                const status = item.quantityInStock < 10 ? 'Low Stock' : 'In Stock';
                const statusClass = item.quantityInStock < 10 ? 'low-stock' : 'in-stock';
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.product.name}</td>
                    <td>${item.quantityInStock}</td>
                    <td>${item.reorderLevel || 5}</td>
                    <td><span class="status ${statusClass}">${status}</span></td>
                    <td>
                        <button class="action-btn update-btn" data-id="${item._id}">Update</button>
                    </td>
                `;
                inventoryList.appendChild(row);
            });
            
            // Add event listeners to update buttons
            document.querySelectorAll('.update-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const inventoryId = e.target.dataset.id;
                    updateInventory(inventoryId);
                });
            });
        } else {
            inventoryList.innerHTML = '<tr><td colspan="5">No inventory items found</td></tr>';
        }
    } catch (error) {
        console.error('Error loading inventory:', error);
        inventoryList.innerHTML = '<tr><td colspan="5">Error loading inventory</td></tr>';
    }
}

async function updateInventory(inventoryId) {
    try {
        const inventory = await fetchData(`/inventory/${inventoryId}`);
        
        if (inventory) {
            const newQuantity = prompt('Enter new quantity:', inventory.quantityInStock);
            
            if (newQuantity !== null && !isNaN(newQuantity)) {
                const updatedInventory = {
                    quantityInStock: parseInt(newQuantity),
                    reorderLevel: inventory.reorderLevel || 5
                };
                
                const response = await fetch(`${API_URL}/inventory/${inventoryId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedInventory)
                });
                
                if (response.ok) {
                    loadInventory(); // Reload the inventory list
                }
            }
        }
    } catch (error) {
        console.error('Error updating inventory:', error);
    }
}

// Orders
async function loadOrders() {
    const ordersList = document.getElementById('orders-list');
    if (!ordersList) return;
    
    try {
        const orders = await fetchData('/orders');
        
        if (orders && orders.length > 0) {
            ordersList.innerHTML = '';
            
            orders.forEach(order => {
                const date = new Date(order.createdAt).toLocaleDateString();
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order._id}</td>
                    <td>${date}</td>
                    <td>${order.customer || 'N/A'}</td>
                    <td>$${order.total.toFixed(2)}</td>
                    <td>${order.status}</td>
                    <td>
                        <button class="action-btn view-btn" data-id="${order._id}">View</button>
                    </td>
                `;
                ordersList.appendChild(row);
            });
            
            // Add event listeners to view buttons
            document.querySelectorAll('.view-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const orderId = e.target.dataset.id;
                    viewOrder(orderId);
                });
            });
        } else {
            ordersList.innerHTML = '<tr><td colspan="6">No orders found</td></tr>';
        }
    } catch (error) {
        console.error('Error loading orders:', error);
        ordersList.innerHTML = '<tr><td colspan="6">Error loading orders</td></tr>';
    }
}

function setupOrderButtons() {
    const addOrderBtn = document.getElementById('add-order-btn');
    
    if (addOrderBtn) {
        addOrderBtn.addEventListener('click', () => {
            // Create a new order form
            createOrderForm();
        });
    }
}

async function viewOrder(orderId) {
    try {
        const order = await fetchData(`/orders/${orderId}`);
        
        if (order) {
            // Create a modal to display order details
            const modalHtml = `
                <div class="modal" id="order-detail-modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <h2>Order Details</h2>
                        <div class="order-info">
                            <p><strong>Order ID:</strong> ${order._id}</p>
                            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
                            <p><strong>Customer:</strong> ${order.customer || 'N/A'}</p>
                            <p><strong>Status:</strong> ${order.status}</p>
                            <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
                        </div>
                        <h3>Items</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${order.items.map(item => `
                                    <tr>
                                        <td>${item.product.name}</td>
                                        <td>${item.quantity}</td>
                                        <td>$${item.price.toFixed(2)}</td>
                                        <td>$${(item.quantity * item.price).toFixed(2)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            
            // Add modal to the DOM
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            
            // Show the modal
            const modal = document.getElementById('order-detail-modal');
            modal.style.display = 'block';
            
            // Close button functionality
            const closeBtn = modal.querySelector('.close');
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
                // Remove modal from DOM when closed
                modal.addEventListener('transitionend', () => {
                    modal.remove();
                });
            });
            
            // Close when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    // Remove modal from DOM when closed
                    modal.addEventListener('transitionend', () => {
                        modal.remove();
                    });
                }
            });
        }
    } catch (error) {
        console.error('Error fetching order details:', error);
    }
}

async function createOrderForm() {
    try {
        // Get products for the order form
        const products = await fetchData('/products');
        
        if (products && products.length > 0) {
            // Create order form modal
            const modalHtml = `
                <div class="modal" id="new-order-modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <h2>Create New Order</h2>
                        <form id="order-form">
                            <div class="form-group">
                                <label for="customer-name">Customer Name</label>
                                <input type="text" id="customer-name" required>
                            </div>
                            <div class="form-group">
                                <label>Products</label>
                                <div id="order-items">
                                    <div class="order-item">
                                        <select class="product-select" required>
                                            <option value="">Select a product</option>
                                            ${products.map(product => `
                                                <option value="${product._id}" data-price="${product.price}">${product.name} - $${product.price.toFixed(2)}</option>
                                            `).join('')}
                                        </select>
                                        <input type="number" class="item-quantity" min="1" value="1" required>
                                        <span class="item-subtotal">$0.00</span>
                                        <button type="button" class="remove-item-btn">Remove</button>
                                    </div>
                                </div>
                                <button type="button" id="add-item-btn">Add Another Item</button>
                            </div>
                            <div class="form-group">
                                <label>Total: <span id="order-total">$0.00</span></label>
                            </div>
                            <button type="submit" class="btn">Create Order</button>
                        </form>
                    </div>
                </div>
            `;
            
            // Add modal to the DOM
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            
            // Show the modal
            const modal = document.getElementById('new-order-modal');
            modal.style.display = 'block';
            
            // Close button functionality
            const closeBtn = modal.querySelector('.close');
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
                // Remove modal from DOM when closed
                modal.remove();
            });
            
            // Close when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    // Remove modal from DOM when closed
                    modal.remove();
                }
            });
            
            // Setup order form functionality
            setupOrderForm(products);
        } else {
            alert('No products available. Please add products first.');
        }
    } catch (error) {
        console.error('Error creating order form:', error);
    }
}

function setupOrderForm(products) {
    const orderForm = document.getElementById('order-form');
    const addItemBtn = document.getElementById('add-item-btn');
    const orderItems = document.getElementById('order-items');
    
    // Add item to order
    addItemBtn.addEventListener('click', () => {
        const newItem = document.createElement('div');
        newItem.className = 'order-item';
        newItem.innerHTML = `
            <select class="product-select" required>
                <option value="">Select a product</option>
                ${products.map(product => `
                    <option value="${product._id}" data-price="${product.price}">${product.name} - $${product.price.toFixed(2)}</option>
                `).join('')}
            </select>
            <input type="number" class="item-quantity" min="1" value="1" required>
            <span class="item-subtotal">$0.00</span>
            <button type="button" class="remove-item-btn">Remove</button>
        `;
        orderItems.appendChild(newItem);
        
        // Setup event listeners for the new item
        setupOrderItemListeners(newItem);
        updateOrderTotal();
    });
    
    // Setup event listeners for initial item
    const initialItem = document.querySelector('.order-item');
    setupOrderItemListeners(initialItem);
    
    // Form submission
    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Gather order data
        const customerName = document.getElementById('customer-name').value;
        const items = [];
        let total = 0;
        
        document.querySelectorAll('.order-item').forEach(item => {
            const select = item.querySelector('.product-select');
            const quantity = parseInt(item.querySelector('.item-quantity').value);
            
            if (select.value && quantity > 0) {
                const selectedOption = select.options[select.selectedIndex];
                const price = parseFloat(selectedOption.dataset.price);
                const subtotal = price * quantity;
                
                items.push({
                    product: select.value,
                    quantity: quantity,
                    price: price
                });
                
                total += subtotal;
            }
        });
        
        if (items.length === 0) {
            alert('Please add at least one item to the order.');
            return;
        }
        
        // Create order object
        const orderData = {
            customer: customerName,
            items: items,
            total: total,
            status: 'Pending'
        };
        
        try {
            const result = await postData('/orders', orderData);
            if (result) {
                // Close modal and reload orders
                document.getElementById('new-order-modal').style.display = 'none';
                document.getElementById('new-order-modal').remove();
                loadOrders();
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    });
}

function setupOrderItemListeners(item) {
    const select = item.querySelector('.product-select');
    const quantity = item.querySelector('.item-quantity');
    const subtotal = item.querySelector('.item-subtotal');
    const removeBtn = item.querySelector('.remove-item-btn');
    
    // Update subtotal when product or quantity changes
    select.addEventListener('change', updateItemSubtotal);
    quantity.addEventListener('change', updateItemSubtotal);
    quantity.addEventListener('input', updateItemSubtotal);
    
    // Remove item
    removeBtn.addEventListener('click', () => {
        if (document.querySelectorAll('.order-item').length > 1) {
            item.remove();
            updateOrderTotal();
        } else {
            alert('Order must have at least one item.');
        }
    });
    
    function updateItemSubtotal() {
        if (select.value) {
            const price = parseFloat(select.options[select.selectedIndex].dataset.price);
            const qty = parseInt(quantity.value) || 0;
            subtotal.textContent = `$${(price * qty).toFixed(2)}`;
            updateOrderTotal();
        } else {
            subtotal.textContent = '$0.00';
        }
    }
}

function updateOrderTotal() {
    let total = 0;
    
    document.querySelectorAll('.order-item').forEach(item => {
        const select = item.querySelector('.product-select');
        const quantity = parseInt(item.querySelector('.item-quantity').value) || 0;
        
        if (select.value) {
            const price = parseFloat(select.options[select.selectedIndex].dataset.price);
            total += price * quantity;
        }
    });
    
    document.getElementById('order-total').textContent = `$${total.toFixed(2)}`;
}

// Suppliers
async function loadSuppliers() {
    const suppliersList = document.getElementById('suppliers-list');
    if (!suppliersList) return;
    
    try {
        const suppliers = await fetchData('/suppliers');
        
        if (suppliers && suppliers.length > 0) {
            suppliersList.innerHTML = '';
            
            suppliers.forEach(supplier => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${supplier.name}</td>
                    <td>${supplier.contactName || 'N/A'}</td>
                    <td>${supplier.email || 'N/A'}</td>
                    <td>${supplier.phone || 'N/A'}</td>
                    <td>
                        <button class="action-btn edit-btn" data-id="${supplier._id}">Edit</button>
                        <button class="action-btn delete-btn" data-id="${supplier._id}">Delete</button>
                    </td>
                `;
                suppliersList.appendChild(row);
            });
            
            // Add event listeners to the edit and delete buttons
            document.querySelectorAll('#suppliers-list .edit-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const supplierId = e.target.dataset.id;
                    editSupplier(supplierId);
                });
            });
            
            document.querySelectorAll('#suppliers-list .delete-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const supplierId = e.target.dataset.id;
                    deleteSupplier(supplierId);
                });
            });
        } else {
            suppliersList.innerHTML = '<tr><td colspan="5">No suppliers found</td></tr>';
        }
    } catch (error) {
        console.error('Error loading suppliers:', error);
        suppliersList.innerHTML = '<tr><td colspan="5">Error loading suppliers</td></tr>';
    }
}

function setupSupplierButtons() {
    const addSupplierBtn = document.getElementById('add-supplier-btn');
    
    if (addSupplierBtn) {
        addSupplierBtn.addEventListener('click', () => {
            createSupplierForm();
        });
    }
}

async function editSupplier(supplierId) {
    try {
        const supplier = await fetchData(`/suppliers/${supplierId}`);
        
        if (supplier) {
            // Create a modal to edit supplier
            const modalHtml = `
                <div class="modal" id="edit-supplier-modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <h2>Edit Supplier</h2>
                        <form id="edit-supplier-form">
                            <div class="form-group">
                                <label for="supplier-name">Name</label>
                                <input type="text" id="supplier-name" value="${supplier.name}" required>
                            </div>
                            <div class="form-group">
                                <label for="supplier-contact">Contact Name</label>
                                <input type="text" id="supplier-contact" value="${supplier.contactName || ''}">
                            </div>
                            <div class="form-group">
                                <label for="supplier-email">Email</label>
                                <input type="email" id="supplier-email" value="${supplier.email || ''}">
                            </div>
                            <div class="form-group">
                                <label for="supplier-phone">Phone</label>
                                <input type="tel" id="supplier-phone" value="${supplier.phone || ''}">
                            </div>
                            <button type="submit" class="btn">Save Changes</button>
                        </form>
                    </div>
                </div>
            `;
            
            // Add modal to the DOM
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            
            // Show the modal
            const modal = document.getElementById('edit-supplier-modal');
            modal.style.display = 'block';
            
            // Close button functionality
            const closeBtn = modal.querySelector('.close');
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
                modal.remove();
            });
            
            // Close when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    modal.remove();
                }
            });
            
            // Form submission
            const form = document.getElementById('edit-supplier-form');
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const updatedSupplier = {
                    name: document.getElementById('supplier-name').value,
                    contactName: document.getElementById('supplier-contact').value,
                    email: document.getElementById('supplier-email').value,
                    phone: document.getElementById('supplier-phone').value
                };
                
                try {
                    const response = await fetch(`${API_URL}/suppliers/${supplierId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedSupplier)
                    });
                    
                    if (response.ok) {
                        modal.style.display = 'none';
                        modal.remove();
                        loadSuppliers();
                    }
                } catch (error) {
                    console.error('Error updating supplier:', error);
                }
            });
        }
    } catch (error) {
        console.error('Error fetching supplier details:', error);
    }
}

async function deleteSupplier(supplierId) {
    if (confirm('Are you sure you want to delete this supplier?')) {
        try {
            const response = await fetch(`${API_URL}/suppliers/${supplierId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                loadSuppliers();
            }
        } catch (error) {
            console.error('Error deleting supplier:', error);
        }
    }
}

async function createSupplierForm() {
    // Create a modal to add a new supplier
    const modalHtml = `
        <div class="modal" id="add-supplier-modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Add New Supplier</h2>
                <form id="add-supplier-form">
                    <div class="form-group">
                        <label for="new-supplier-name">Name</label>
                        <input type="text" id="new-supplier-name" required>
                    </div>
                    <div class="form-group">
                        <label for="new-supplier-contact">Contact Name</label>
                        <input type="text" id="new-supplier-contact">
                    </div>
                    <div class="form-group">
                        <label for="new-supplier-email">Email</label>
                        <input type="email" id="new-supplier-email">
                    </div>
                    <div class="form-group">
                        <label for="new-supplier-phone">Phone</label>
                        <input type="tel" id="new-supplier-phone">
                    </div>
                    <button type="submit" class="btn">Add Supplier</button>
                </form>
            </div>
        </div>
    `;
    
    // Add modal to the DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Show the modal
    const modal = document.getElementById('add-supplier-modal');
    modal.style.display = 'block';
    
    // Close button functionality
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modal.remove();
    });
    
    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modal.remove();
        }
    });
    
    // Form submission
    const form = document.getElementById('add-supplier-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const newSupplier = {
            name: document.getElementById('new-supplier-name').value,
            contactName: document.getElementById('new-supplier-contact').value,
            email: document.getElementById('new-supplier-email').value,
            phone: document.getElementById('new-supplier-phone').value
        };
        
        try {
            const result = await postData('/suppliers', newSupplier);
            if (result) {
                modal.style.display = 'none';
                modal.remove();
                loadSuppliers();
            }
        } catch (error) {
            console.error('Error adding supplier:', error);
        }
    });
}

// Sales
async function loadSales() {
    const salesList = document.getElementById('sales-list');
    if (!salesList) return;
    
    try {
        const sales = await fetchData('/sales');
        
        if (sales && sales.length > 0) {
            salesList.innerHTML = '';
            
            sales.forEach(sale => {
                const date = new Date(sale.date).toLocaleDateString();
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${date}</td>
                    <td>${sale.products.length}</td>
                    <td>${sale.quantity}</td>
                    <td>$${sale.total.toFixed(2)}</td>
                `;
                salesList.appendChild(row);
            });
        } else {
            salesList.innerHTML = '<tr><td colspan="4">No sales found</td></tr>';
        }
    } catch (error) {
        console.error('Error loading sales:', error);
        salesList.innerHTML = '<tr><td colspan="4">Error loading sales</td></tr>';
    }
}

// Report generation
function setupReportButtons() {
    const reportButtons = document.querySelectorAll('.report-btn');
    
    reportButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const reportType = button.dataset.report;
            
            try {
                const response = await fetch(`${API_URL}/sales-report?type=${reportType}`);
                
                if (response.ok) {
                    const reportData = await response.json();
                    displayReport(reportType, reportData);
                }
            } catch (error) {
                console.error(`Error generating ${reportType} report:`, error);
                alert(`Error generating report. Please try again.`);
            }
        });
    });
}

function displayReport(reportType, reportData) {
    let title, content;
    
    switch (reportType) {
        case 'sales':
            title = 'Sales Report';
            content = generateSalesReportContent(reportData);
            break;
        case 'inventory':
            title = 'Inventory Report';
            content = generateInventoryReportContent(reportData);
            break;
        case 'products':
            title = 'Product Performance Report';
            content = generateProductReportContent(reportData);
            break;
        default:
            title = 'Report';
            content = '<p>No data available</p>';
    }
    
    // Create modal for displaying the report
    const modalHtml = `
        <div class="modal" id="report-modal">
            <div class="modal-content wide-modal">
                <span class="close">&times;</span>
                <h2>${title}</h2>
                <div class="report-content">
                    ${content}
                </div>
                <button id="print-report-btn" class="btn">Print Report</button>
            </div>
        </div>
    `;
    
    // Add modal to the DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Show the modal
    const modal = document.getElementById('report-modal');
    modal.style.display = 'block';
    
    // Close button functionality
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modal.remove();
    });
    
    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modal.remove();
        }
    });
    
    // Print functionality
    const printBtn = document.getElementById('print-report-btn');
    printBtn.addEventListener('click', () => {
        const printContent = document.querySelector('.report-content').innerHTML;
        const printWindow = window.open('', '_blank');
        
        printWindow.document.write(`
            <html>
                <head>
                    <title>${title}</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                        th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
                        th { background-color: #f2f2f2; }
                        h1, h2 { color: #333; }
                    </style>
                </head>
                <body>
                    <h1>${title}</h1>
                    ${printContent}
                </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        
        // Print after a short delay to let the content load
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    });
}

function generateSalesReportContent(data) {
    if (!data || !data.sales || data.sales.length === 0) {
        return '<p>No sales data available</p>';
    }
    
    // Generate summary statistics
    const totalSales = data.sales.reduce((total, sale) => total + sale.total, 0).toFixed(2);
    const averageSale = (totalSales / data.sales.length).toFixed(2);
    const startDate = new Date(data.dateRange.start).toLocaleDateString();
    const endDate = new Date(data.dateRange.end).toLocaleDateString();
    
    // Generate content
    let content = `
        <div class="report-summary">
            <h3>Summary</h3>
            <p><strong>Date Range:</strong> ${startDate} to ${endDate}</p>
            <p><strong>Total Sales:</strong> $${totalSales}</p>
            <p><strong>Number of Sales:</strong> ${data.sales.length}</p>
            <p><strong>Average Sale:</strong> $${averageSale}</p>
        </div>
        
        <h3>Sales Details</h3>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Products</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    data.sales.forEach(sale => {
        const date = new Date(sale.date).toLocaleDateString();
        content += `
            <tr>
                <td>${date}</td>
                <td>${sale.products.length}</td>
                <td>${sale.quantity}</td>
                <td>$${sale.total.toFixed(2)}</td>
            </tr>
        `;
    });
    
    content += `
            </tbody>
        </table>
    `;
    
    return content;
}

function generateInventoryReportContent(data) {
    if (!data || !data.inventory || data.inventory.length === 0) {
        return '<p>No inventory data available</p>';
    }
    
    // Generate summary statistics
    const totalItems = data.inventory.reduce((total, item) => total + item.quantityInStock, 0);
    const totalValue = data.inventory.reduce((total, item) => {
        return total + (item.quantityInStock * item.product.price);
    }, 0).toFixed(2);
    
    const lowStockItems = data.inventory.filter(item => item.quantityInStock < 10).length;
    
    // Generate content
    let content = `
        <div class="report-summary">
            <h3>Summary</h3>
            <p><strong>Total Items in Stock:</strong> ${totalItems}</p>
            <p><strong>Total Inventory Value:</strong> $${totalValue}</p>
            <p><strong>Low Stock Items:</strong> ${lowStockItems}</p>
        </div>
        
        <h3>Inventory Details</h3>
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Current Stock</th>
                    <th>Reorder Level</th>
                    <th>Unit Price</th>
                    <th>Value</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    data.inventory.forEach(item => {
        const status = item.quantityInStock < 10 ? 'Low Stock' : 'In Stock';
        const value = (item.quantityInStock * item.product.price).toFixed(2);
        
        content += `
            <tr>
                <td>${item.product.name}</td>
                <td>${item.product.sku}</td>
                <td>${item.quantityInStock}</td>
                <td>${item.reorderLevel || 5}</td>
                <td>$${item.product.price.toFixed(2)}</td>
                <td>$${value}</td>
                <td>${status}</td>
            </tr>
        `;
    });
    
    content += `
            </tbody>
        </table>
    `;
    
    return content;
}

function generateProductReportContent(data) {
    if (!data || !data.products || data.products.length === 0) {
        return '<p>No product data available</p>';
    }
    
    // Generate content
    let content = `
        <div class="report-summary">
            <h3>Summary</h3>
            <p><strong>Total Products:</strong> ${data.products.length}</p>
        </div>
        
        <h3>Product Performance</h3>
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Price</th>
                    <th>Units Sold</th>
                    <th>Revenue</th>
                    <th>Current Stock</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    data.products.forEach(product => {
        content += `
            <tr>
                <td>${product.name}</td>
                <td>${product.sku}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.unitsSold || 0}</td>
                <td>$${product.revenue ? product.revenue.toFixed(2) : '0.00'}</td>
                <td>${product.quantityInStock}</td>
            </tr>
        `;
    });
    
    content += `
            </tbody>
        </table>
    `;
    
    return content;
} 