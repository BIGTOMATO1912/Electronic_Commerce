import { ProductPrices } from '../product-prices/product-prices.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Oders } from '../oders/oders.entity';
import {
  IsLatLong,
  IsLatitude,
  IsNumber,
  IsNotEmpty,
  IsUrl,
  ValidateIf,
  IsEmail,
  IsMobilePhone,
  IsString,
  validate,
} from 'class-validator';

@Entity()
export class OderItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  price: string;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @Column({ nullable: true })
  @IsNotEmpty()
  @IsNumber()
  productPricesId: number;

  @Column({ nullable: true })
  @IsNumber()
  @IsNotEmpty()
  oderId: number;

  @ManyToOne((type) => Oders, (oder) => oder.id)
  Oder: Oders;

  @ManyToOne((type) => ProductPrices, (productPrices) => productPrices.id)
  @JoinColumn()
  productPrices: ProductPrices;
}
