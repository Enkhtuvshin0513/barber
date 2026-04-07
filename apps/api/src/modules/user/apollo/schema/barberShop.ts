export const Types = `
    type BarberShop {
        id:         String  
        name:       String
        location:   String
        email:      String 
        phone:      Int
        profile:    String
        cover:      String
        contacts:   [String]
        type:       String
        categories: [String] 
    }
    
    input BarbesShopFilter {
        name:        String
        location:    String
        categories:  String
    }
`;

export const Queries = `
    barberShops(filter: BarbesShopFilter): [BarberShop]
    barberShop(id: String): BarberShop
`;

export const Mutations = `
    barberShopReview(orderNumber: String, review: String, rating: Float): BarberShop
`;
