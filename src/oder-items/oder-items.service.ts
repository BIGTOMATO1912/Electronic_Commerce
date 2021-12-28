import { Injectable, Inject } from '@nestjs/common';
import { OderItems } from './oder-items.entity';
import { OdersService } from "../oders/oders.service";
import { Repository } from 'typeorm';
import { CartItemsDto } from "./dto/cart.dto";
import { ProductPricesService } from "../product-prices/product-prices.service";
import { ProductsService } from "../products/products.service";
import { StoresService } from "../stores/stores.service";
import { Oders } from 'src/oders/oders.entity';
@Injectable()
export class OderItemsService {
    constructor(
        @Inject('ODERSITEMS_REPOSITORY')
        private oderItemsRepository: Repository<OderItems>,
        private readonly orderService: OdersService,
        private readonly ProductPricesService: ProductPricesService,
        private readonly ProductService: ProductsService,
        private readonly StoresService: StoresService,
    ) { }

    async addPoductForCart(item: OderItems) {
        const oderId: number = item.oderId;
        const productPricesId: number = item.productPricesId;

        const checkOderItem = await this.checkOrderItemExist(oderId, productPricesId);

        if (checkOderItem == null) {
            return await this.addOrderItem(item);
        }
        else {
            const quantity: number = item.quantity + checkOderItem.quantity;
            const id: number = checkOderItem.id;

            return await this.updateQuantityOrderItems(quantity, id);
        }
    }

    async addOrderItem(item: OderItems) {
        const result = await this.oderItemsRepository
            .createQueryBuilder()
            .insert()
            .values({ ...item })
            .execute()
        return { statusCode: 200, message: "OK" }
    }

    async updateQuantityOrderItems(quantitty: number, id: number) {
        const updateOrderItem = await this.oderItemsRepository
            .createQueryBuilder()
            .update(OderItems)
            .set({ quantity: quantitty })
            .where("id = :id", { id: id })
            .execute();
        return { statusCode: 200, message: "OK" }
    }

    async deleteItemInCart(ids: number[]) {
        for (let i = 0; i < ids.length; i++) {
            await this.oderItemsRepository.delete(ids[i])
        }
        return { statusCode: 200, message: "OK" };
    }


    async checkOrderItemExist(orderId: number, productPrId: number) {
        const result = await this.oderItemsRepository.find(
            { where: { 
                oderId: orderId, 
                productPricesId: productPrId 
            } 
        })
        if (result.length == 0) return null;
        else return { quantity: result[0].quantity, id: result[0].id };
    }


    async findOderItemsByOrderId(id: number) {
        const as = await this.oderItemsRepository.createQueryBuilder()
            .select('orderitems')
            .from(OderItems, 'orderitems')
            .where("orderitems.oderId = :id", { id: id })
            .getMany();
        return as;
    }


    async getOrderItemForCart(userId: number) {
        const Order = await this.orderService.getOrderByUserId(userId);
        const OrderItem = await this.findOderItemsByOrderId(Order.id);
        let Cart: CartItemsDto[] = [];
        for (let i = 0; i < OrderItem.length; i++) {
            const ProductPrices = await this.ProductPricesService.findByProducPriceById(OrderItem[i].productPricesId);
            const Product = await this.ProductService.findProductByProducId(ProductPrices.productId);
            const Store = await this.StoresService.findByStoreId(ProductPrices.storesId);
            Cart[i] = {
                id: OrderItem[i].id,
                nameProduct: ProductPrices.nameProductPrice,
                price: ProductPrices.price,
                nameStore: Store.nameStore,
                addressStore: Store.adress,
                quanlity: OrderItem[i].quantity
            }
        }
        return Cart;
    }
}
