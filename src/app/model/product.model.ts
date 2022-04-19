export class Product { 
    typeDescription: string;
    unitDescription: string;
    foodGroupDescription: string;
    Quantity: number;
    DateCaptured: Date;
    foodGroupID: number;
    typeID: number;
    unitID: number;
}

export class ProductReq {
    Quantity: number;
    FoodGroupID: number;
    TypeID: number;
    UnitID: number;
}

export class SchoolDonation {
    products: ProductReq[];
    NoLearners: number;
    Reason: string;
    // DateCaptured: Date;
    otherReason?: string;
    CaseNo?: number;
}
export class SchoolDonationReq {
DonationId?: number;
PrincipalId?: number;
FoodGroup: number;
Product: number;
Quantity: number;
Unit: number;
// DateCaptured: Date;
NoLearners: number;
Reason: string;
CaseNo?: number;
}
