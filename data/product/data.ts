import { Product, FilterCategory, SortOption } from '@/types/product/types';

export const mockProducts: Product[] = [
    {
        id: '1',
        brand: 'OLLINGTON ST.',
        name: 'Cotton Knit Half Sleeve T-Shirt & Joggers Set with Bag - Black',
        image: 'https://cdn.fcglcdn.com/brainbees/images/products/300x364/21680827a.webp',
        images: ['image1.jpg', 'image2.jpg'],
        price: 971.19,
        originalPrice: 1199,
        discount: 19,
        rating: 4.5,
        reviewCount: 128,
        colors: [
            { name: 'Black', code: '#000000' },
            { name: 'Blue', code: '#0000FF' },
            { name: 'Red', code: '#FF0000' }
        ],
        sizes: [
            { label: '2-3Y', available: true },
            { label: '3-4Y', available: true },
            { label: '4-5Y', available: true },
            { label: '5-6Y', available: false },
            { label: '6-7Y', available: true }
        ],
        clubPrice: 947.21,
        earnCash: 22,
        isBestSeller: true
    },
    {
        id: '2',
        brand: 'Hola Bonita',
        name: 'Knit Half Flutter Sleeves Texture Solid Color Dress With Belt - Dark Green',
        image: 'https://cdn.fcglcdn.com/brainbees/images/products/300x364/21390169a.webp',
        images: ['image1.jpg', 'image2.jpg'],
        price: 647.28,
        originalPrice: 899,
        discount: 28,
        rating: 4.3,
        reviewCount: 89,
        colors: [
            { name: 'Dark Green', code: '#013220' },
            { name: 'Navy Blue', code: '#000080' },
            { name: 'Pink', code: '#FFC0CB' }
        ],
        sizes: [
            { label: '4-5Y', available: true },
            { label: '5-6Y', available: true },
            { label: '6-7Y', available: true },
            { label: '7-8Y', available: true },
            { label: '8-9Y', available: true }
        ],
        clubPrice: 629.3,
        earnCash: 14,
        isNew: true
    },
    {
        id: '3',
        brand: 'Honeyhap',
        name: 'Premium 100% Cotton Knit Half Sleeves Bio Wash T-Shirts with Text Print Pack of 2',
        image: 'https://cdn.fcglcdn.com/brainbees/images/products/300x364/19964067a.webp',
        images: ['image1.jpg', 'image2.jpg'],
        price: 527.12,
        originalPrice: 599,
        discount: 12,
        rating: 4.7,
        reviewCount: 256,
        colors: [
            { name: 'Blue Radiance', code: '#87CEEB' },
            { name: 'Lemonade', code: '#FFFACD' },
            { name: 'Yellow', code: '#FFFF00' }
        ],
        sizes: [
            { label: '1-2Y', available: true },
            { label: '2-3Y', available: true },
            { label: '3-4Y', available: true },
            { label: '4-5Y', available: true },
            { label: '5-6Y', available: true },
            { label: '6-7Y', available: true }
        ],
        clubPrice: 515.14,
        earnCash: 12,
        stockLeft: 10
    },
    {
        id: '4',
        brand: 'Honeyhap Marvel',
        name: 'Single Jersey Knit Drop Shoulder Half Sleeves Oversized T-Shirts with Avengers Graphic Pack of 2',
        image: 'https://cdn.fcglcdn.com/brainbees/images/products/300x364/21520306a.webp',
        images: ['image1.jpg', 'image2.jpg'],
        price: 576.73,
        originalPrice: 749,
        discount: 23,
        rating: 4.8,
        reviewCount: 312,
        colors: [
            { name: 'Light Blue', code: '#ADD8E6' },
            { name: 'White', code: '#FFFFFF' }
        ],
        sizes: [
            { label: '1-2Y', available: true },
            { label: '2-3Y', available: true },
            { label: '3-4Y', available: true },
            { label: '4-5Y', available: true },
            { label: '5-6Y', available: true }
        ],
        clubPrice: 561.75,
        earnCash: 14,
        isBestSeller: true
    },
    {
        id: '5',
        brand: 'Bonfino Marvel',
        name: 'Single Jersey Knit Drop Shoulder Half Sleeves Oversized T-Shirt with Spiderman Graphic - Blue',
        image: 'https://cdn.fcglcdn.com/brainbees/images/products/300x364/21565374a.webp',
        images: ['image1.jpg', 'image2.jpg'],
        price: 331.17,
        originalPrice: 399,
        discount: 17,
        rating: 4.4,
        reviewCount: 67,
        colors: [
            { name: 'Blue', code: '#0000FF' }
        ],
        sizes: [
            { label: '12-18M', available: true },
            { label: '18-24M', available: true },
            { label: '2-3Y', available: true }
        ],
        clubPrice: 323.19,
        earnCash: 8,
        stockLeft: 3
    },
    {
        id: '6',
        brand: 'Honeyhap',
        name: 'Premium 100% Cotton Knit Half Sleeves T-Shirt With Text Print Pack Of 2 - Navy Blue & Maroon',
        image: 'https://cdn.fcglcdn.com/brainbees/images/products/300x364/21556394a.webp',
        images: ['image1.jpg', 'image2.jpg'],
        price: 527.12,
        originalPrice: 599,
        discount: 12,
        rating: 4.6,
        reviewCount: 178,
        colors: [
            { name: 'Navy Blue', code: '#000080' },
            { name: 'Maroon', code: '#800000' }
        ],
        sizes: [
            { label: '1-2Y', available: true },
            { label: '3-4Y', available: true },
            { label: '4-5Y', available: true },
            { label: '5-6Y', available: true }
        ],
        clubPrice: 515.14,
        earnCash: 12
    },
    {
        id: '7',
        brand: 'Babyhug',
        name: 'Knit Full Sleeves Frock With Text Patch - Mustard & White',
        image: 'https://cdn.fcglcdn.com/brainbees/images/products/300x364/21602288a.webp',
        images: ['image1.jpg', 'image2.jpg'],
        price: 663.17,
        originalPrice: 799,
        discount: 17,
        rating: 4.2,
        reviewCount: 45,
        colors: [
            { name: 'Mustard', code: '#FFDB58' }
        ],
        sizes: [
            { label: 'NB', available: true },
            { label: '0-3M', available: true },
            { label: '3-6M', available: true },
            { label: '6-9M', available: true },
            { label: 'Preemie', available: true }
        ],
        clubPrice: 647.19,
        earnCash: 14,
        isNew: true
    },
    {
        id: '8',
        brand: 'Pine Kids',
        name: 'Terry Knit Full Length Lounge Pant With Text Print - Grey',
        image: 'https://cdn.fcglcdn.com/brainbees/images/products/300x364/21666915a.webp',
        images: ['image1.jpg', 'image2.jpg'],
        price: 573.18,
        originalPrice: 699,
        discount: 18,
        rating: 4.3,
        reviewCount: 92,
        colors: [
            { name: 'Grey', code: '#808080' }
        ],
        sizes: [
            { label: '4-5Y', available: true },
            { label: '5-6Y', available: true },
            { label: '6-7Y', available: true },
            { label: '7-8Y', available: true },
            { label: '8-9Y', available: true }
        ],
        clubPrice: 559.2,
        earnCash: 12
    }
];

export const filters: FilterCategory[] = [
    {
        id: 'category',
        title: 'CATEGORIES',
        type: 'checkbox',
        searchable: true,
        expanded: true,
        options: [
            { id: 'sets', label: 'Sets & Suits', count: 2799 },
            { id: 'frocks', label: 'Frocks and Dresses', count: 2021 },
            { id: 'innerwear', label: 'Inner Wear & Thermals', count: 1644 },
            { id: 'nightwear', label: 'Nightwear', count: 1569 },
            { id: 'onesies', label: 'Onesies & Rompers', count: 1693 },
            { id: 'pajamas', label: 'Pajamas & Leggings', count: 1664 },
            { id: 'party', label: 'Party Wear', count: 659 },
            { id: 'shirts', label: 'Shirts', count: 900 },
            { id: 'shorts', label: 'Shorts, Skirts & Jeans', count: 1566 },
            { id: 'tshirts', label: 'T-shirts', count: 4420 },
            { id: 'tops', label: 'Tops', count: 572 }
        ]
    },
    {
        id: 'brand',
        title: 'BRANDS',
        type: 'checkbox',
        searchable: true,
        expanded: true,
        options: [
            { id: 'babyhug', label: 'Babyhug', count: 4944 },
            { id: 'babyhug-disney', label: 'Babyhug Disney', count: 1767 },
            { id: 'babyoye', label: 'Babyoye', count: 588 },
            { id: 'bodycare', label: 'Bodycare', count: 38 },
            { id: 'hola-bonita', label: 'Hola Bonita', count: 224 },
            { id: 'mark-mia', label: 'Mark & Mia', count: 718 },
            { id: 'ollington', label: 'OLLINGTON ST.', count: 612 },
            { id: 'pine-kids', label: 'Pine Kids', count: 1493 },
            { id: 'rikidoos', label: 'Rikidoos', count: 68 },
            { id: 'trampoline', label: 'Trampoline', count: 77 }
        ]
    },
    {
        id: 'price',
        title: 'PRICE',
        type: 'price',
        searchable: true,
        expanded: true,
        options: [
            { id: 'p0', label: '0 to 250', count: 822 },
            { id: 'p1', label: '250 to 500', count: 6744 },
            { id: 'p2', label: '500 to 1000', count: 10517 },
            { id: 'p3', label: '1000 to 2000', count: 1962 },
            { id: 'p4', label: '2000 to 3000', count: 151 },
            { id: 'p5', label: '3000 to 4000', count: 22 },
            { id: 'p6', label: '4000 to 5000', count: 2 },
            { id: 'p7', label: '5000 and above', count: 2 }
        ]
    },
    {
        id: 'discount',
        title: 'DISCOUNT',
        type: 'price',
        expanded: true,
        options: [
            { id: 'd0', label: 'Upto 10%', count: 1783 },
            { id: 'd1', label: '10% - 20%', count: 6527 },
            { id: 'd2', label: '20% - 30%', count: 5196 },
            { id: 'd3', label: '30% - 40%', count: 2753 },
            { id: 'd4', label: 'More than 40%', count: 3610 }
        ]
    },
    {
        id: 'age',
        title: 'AGE',
        type: 'checkbox',
        searchable: true,
        expanded: true,
        options: [
            { id: 'preemie', label: 'Preemie', count: 1087 },
            { id: '0-3m', label: '0-3 Months', count: 3179 },
            { id: '3-6m', label: '3-6 Months', count: 4742 },
            { id: '6-9m', label: '6-9 Months', count: 6099 },
            { id: '9-12m', label: '9-12 Months', count: 6701 },
            { id: '12-18m', label: '12-18 Months', count: 6318 },
            { id: '18-24m', label: '18-24 Months', count: 5275 },
            { id: '2-4y', label: '2-4 Years', count: 7641 },
            { id: '4-6y', label: '4-6 Years', count: 8698 },
            { id: '6-8y', label: '6-8 Years', count: 4435 },
            { id: '8-10y', label: '8-10 Years', count: 4658 },
            { id: '10-12y', label: '10-12 Years', count: 3753 },
            { id: '12+y', label: '12+ Years', count: 2379 },
            { id: 'newborn', label: 'New born', count: 1366 }
        ]
    },
    {
        id: 'gender',
        title: 'GENDER',
        type: 'checkbox',
        expanded: true,
        options: [
            { id: 'unisex', label: 'Unisex', count: 585 },
            { id: 'girl', label: 'Girl', count: 8499 },
            { id: 'boy', label: 'Boy', count: 11541 }
        ]
    },
    {
        id: 'color',
        title: 'COLORS',
        type: 'color',
        searchable: true,
        expanded: true,
        options: [
            { id: 'white', label: 'White', count: 2173 },
            { id: 'blue', label: 'Blue', count: 2098 },
            { id: 'navy', label: 'Navy Blue', count: 1801 },
            { id: 'multi', label: 'Multi Color', count: 1634 },
            { id: 'pink', label: 'Pink', count: 1615 },
            { id: 'red', label: 'Red', count: 1612 },
            { id: 'yellow', label: 'Yellow', count: 1316 },
            { id: 'skyblue', label: 'Light/Sky Blue', count: 1058 },
            { id: 'black', label: 'Black', count: 789 },
            { id: 'green', label: 'Green', count: 666 },
            { id: 'orange', label: 'Orange', count: 435 },
            { id: 'purple', label: 'Purple', count: 405 }
        ]
    },
    {
        id: 'availability',
        title: 'AVAILABILITY',
        type: 'checkbox',
        expanded: true,
        options: [
            { id: 'instock', label: 'Exclude out of stock items', count: 0 }
        ]
    },
    {
        id: 'collections',
        title: 'CURATED COLLECTIONS',
        type: 'checkbox',
        expanded: true,
        options: [
            { id: 'featured', label: 'Featured Looks', count: 1128 },
            { id: 'exclusive', label: 'Only On FC', count: 45 }
        ]
    }
];

export const sortOptions: SortOption[] = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'newArrivals', label: 'New Arrivals' },
    { value: 'bestSeller', label: 'Best Seller' },
    { value: 'discount', label: 'Discount' },
    { value: 'priceLowToHigh', label: 'Price: Low To High' },
    { value: 'priceHighToLow', label: 'Price: High To Low' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'name', label: 'Name' }
];