

//Changind amount of items
$('document').ready(function () {
    var products = []; // { price, count }
    var totalPriceLabel = document.querySelector('.total-price > .price');
    var totalAmountLabel = document.querySelector('.total-items > .amount');
    var mailOptionEl = document.querySelector('#mail-option');

    // Initialize each product
    $('.product').each(function () {
        var productRow = this;
        
        var countEl = productRow.querySelector('.count');
        var minusBtn = productRow.querySelector('.minus');
        var plusBtn = productRow.querySelector('.plus');
        var deleteBtn = productRow.querySelector('.glyphicon-remove');

        var priceLabel =  productRow.querySelector('.sum > .price');
        
        // Create a new product
        var product = {
            index: products.length,
            unitPrice: Number(productRow.dataset.unitPrice),
            count: 1,
            isDeleted: false,
            price: null
        };

        calculatePrice();
        products.push(product);
        updateElements();
        
        //If press minus button substract 1 item
        $(minusBtn).click(function minus() {
           if (product.count > 1) {
                product.count--;
                calculatePrice();
                updateElements();
                updateSummary();
            } 
        })
        
        //If press pluss button add 1 item
        $(plusBtn).click(function plus() {
            product.count++;
            calculatePrice();
            updateElements();
            updateSummary();
        });

        // upate html entities to corresponding values
        function updateElements() {
            countEl.value = product.count;
            priceLabel.innerHTML = formatPrice(product.price);
        }

        function calculatePrice() {
            product.price = product.unitPrice * product.count;
        }

        //Remove row when press "x" button
        $(deleteBtn).click(function() {
            $(productRow).remove();
            product.isDeleted = true;
            updateSummary();
        });
    });

    // Run once for the first time. Also should run when product changes
    updateSummary();

    $(mailOptionEl).on('change', function () {
        updateSummary();
    });

    function updateSummary() {
        var summary = getTotalSummary(products);

        summary.total = summary.total + Number(mailOptionEl.value);
        totalPriceLabel.innerHTML = formatPrice(summary.total);
        totalAmountLabel.innerHTML = summary.amount;
    }

    /**
     * 1.234455 => 1.23
     * 1.2566 => 1.26 OR 1.2556 =>  1.25
     * @param {number} price 
     */
    function formatPrice(price) {
        price = price.toFixed(2);
        return price;
    }


});

/**
 * 
 * @param {Array} products  List of products
 * @return {Object} <total,amount> Summary of the cart
 */
function getTotalSummary(products) { 
    var total = 0;
    var amount = 0;

    products.forEach(function(product) {
        if (product.isDeleted) {
            return;
        }
        total = total + product.price;
        amount = amount + product.count
    });

    return {
        total: total,
        amount: amount
    }
}

/**
 * Close shopping cart when press checkout and show text 'Have a nice day'
 */
function demoDisplay() {
    document.getElementById('closing').style.display ="none";
    document.getElementById('final-text').style.display ="block";
}