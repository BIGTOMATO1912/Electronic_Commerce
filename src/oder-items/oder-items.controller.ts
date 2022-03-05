import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OderItemsService } from './oder-items.service';
import { ProductPrices } from '../product-prices/product-prices.entity';
import { OderItems } from './oder-items.entity';
import { User } from '../users/users.entity';
import { CreateOrderItemsDto } from './dto/create-orderItem.dto';
@Controller('order-items')
export class OderItemsController {
  constructor(private readonly OderItemMethod: OderItemsService) {}

  @Get()
  getAll(@Param() param: any) {
    return this.OderItemMethod.findAll();
  }

  @Post()
  addPoductPriceForCart(@Body() item: CreateOrderItemsDto) {
    return this.OderItemMethod.addOrderItem(item);
  }

  @Delete()
  deleteProductPriceForCart(@Body() ids: any) {
    return this.OderItemMethod.deleteItemInCart(ids);
  }
}
