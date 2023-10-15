export default class Buoy {
    constructor (id, lat, lon, name) {
        this.id = id;
        this.lat = lat;
        this.lon = lon;
        this.name = name;
        // this.data = [];
    } 
    // async init() {
    //     try {
    //         this.data = await this.getData(this.id);
    //     } catch (error) {
    //         console.error("Error fetching buoy data:", error);
    //         this.data = [];
    //     }
    }

    // getData(id) {
    //     const response = await fetch("/lastData/${id}");

    // }

    //     const abcButton = document.querySelector(".abcSort");
    //     const priceSort = document.querySelector(".priceSort");

    //     updateBreadcrumb(this.category, this.products.length);

    //     abcButton.addEventListener("click", () => this.sortABC());
    //     priceSort.addEventListener("click", () => this.sortPrice(this.products));

    //     if (Array.isArray(this.products) && this.products.length > 0) {
    //         this.renderList(this.products);
    //     } else {
    //         console.warn("No products to display.");
    //     }
    // }