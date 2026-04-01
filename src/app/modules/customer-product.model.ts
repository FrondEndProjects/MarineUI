export class CustomerProduct {
    name: string = '';
    imageUrl: string = '';
    ProductType: string = ''; // 'individual' or 'package'
    ProductName: string = '';
    ProductId?: number | string;
    PackageYn?: string;
}
