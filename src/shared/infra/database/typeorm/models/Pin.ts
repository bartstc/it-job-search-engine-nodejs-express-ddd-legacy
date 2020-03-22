import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { Technology } from "modules/search/domain/types";

import { Offer } from "./Offer";

@Entity()
export class Pin extends BaseEntity {
  @PrimaryColumn()
  pinId!: string;

  @Column()
  offerTitle!: string;

  @Column()
  companyName!: string;

  @Column()
  technology!: Technology;

  @Column()
  priceMin!: number;

  @Column()
  priceMax!: number;

  @Column("decimal")
  longitude!: number;

  @Column("decimal")
  latitude!: number;

  @ManyToOne(
    () => Offer,
    offer => offer.pin,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  offer!: Offer;

  @Column()
  offerId!: string;
}
