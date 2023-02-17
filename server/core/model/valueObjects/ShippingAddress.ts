import { ShippingAddressDto } from "../../command/ConfirmInvoiceCommand";

export class ShippingAddress {

    private name: string;
    private street: string;
    private numero: string;
    private city: string;
    private country: string;
    private zipCode: string;

    private constructor(dto: ShippingAddressDto){
        this.name = dto.name;
        this.street = dto.street;
        this.city = dto.city;
        this.country = dto.country;
        this.numero = dto.numero;
        this.country = dto.country;
        this.zipCode = dto.zipCode;
    }
    public static of(dto: ShippingAddressDto): ShippingAddress {
        return new ShippingAddress(dto)
    }

    public getName(): string {
        return this.name;
    }
    public getNumero(): string {
        return this.numero;
    }
    public getStreet(): string {
        return this.street;
    }
    public getCity(): string {
        return this.city;
    }
    public getCountry(): string {
        return this.country;
    }
    public getZipCode(): string {
        return this.zipCode;
    }

    public asDto(): ShippingAddressDto {
        return {
            city: this.city,
            country: this.country,
            name: this.name,
            numero: this.numero,
            street: this.street,
            zipCode: this.zipCode
        }
    }
}