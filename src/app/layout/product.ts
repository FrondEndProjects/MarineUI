export class Product {
	ref: any = null
	ts: number = 0
	data: ProductData = null

	constructor(data) {
		this.ref = data.ref
		this.ts = data.ts
		const product = { ...data.data }
		product.id = data.ref['@ref'].id
		this.data = new ProductData(product)
	}
}

export class ProductData {
	Insurer='N'
	Address2:any=''
	Address1:any=''
	AppointmentDate: any
	BusinessType:any=''
	ClientName: string = ''
	EmailId:string = ''
	Clientstatus:any=''
	CityName:any=''
	CityCode:any=0
	Country:any=''
	Gender:any=''
	IdNumber:any =''
	IdType:any=''
	isTaxExempted:any=''
	TaxExemptedId:any=''
	MobileNo:any=''
  MobileCode:any=''
  WhatsappCode:any=''
  WhatsappNo:any=''
  MobileCodeDesc:any=''
	Occupation:any=''
	PolicyHolderTypeid:any=''
	PreferredNotification:any=''
	state:any=''
	dobOrRegDate:any=''
	Street:any
	TelephoneNo:any=''
	Title:any = ''
	vrngst:any=''
	name: string = ''
	description: string = ''
	price: number = 0
	quantity: number = 0
	storehouse: any = null
	backorderLimit: number = 0
	backordered = false
	image?: string = ''
	occupationdesc:any = '';
	districtcode:any='';
	SocioProfessionalCategory:'';
	id: string = '';PinCode:any=null;
  maxDate: "2022-09-25";
  Department:any=null
  Nationality:any=''
  /*const currentYear = new Date().getFullYear();
  minDate= new Date(currentYear - 20, 0, 1);*/

	constructor(data?) {

	}


  model: any = {
    maxDate: "2019-09-25"
};
}
