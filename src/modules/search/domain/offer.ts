import { AggregateRoot, UniqueEntityID } from "shared/domain";
import { Guard, Result } from "shared/core";
import { IGuardArgument } from "shared/core/Guard";

import { OfferTitle } from "./offerTitle";
import { OfferDescription } from "./offerDescription";
import { CompanyName } from "./companyName";
import { CompanyDescription } from "./companyDescription";
import {
  employmentTypeList,
  technologyList,
  levelList,
  EmploymentType,
  Technology,
  Level
} from "./types";
import { CityName } from "./cityName";
import { StreetName } from "./streetName";
import { Price } from "./price";
import { SkillsList } from "./skillsList";
import { Coordinate } from "./coordinate";
import { OfferId } from "./offerId";
import { EmployerId } from "./employerId";
import { Comments } from "./comments";
import { Comment } from "./comment";

export interface OfferProps {
  employerId: EmployerId;
  title: OfferTitle;
  description: OfferDescription;
  companyName: CompanyName;
  companyDescription: CompanyDescription;
  technology: Technology;
  level: Level;
  employmentType: EmploymentType;
  cityName: CityName;
  streetName: StreetName;
  priceMin: Price;
  priceMax: Price;
  mustHave: SkillsList;
  niceToHave: SkillsList;
  latitude: Coordinate;
  longitude: Coordinate;
  totalNumComments: number;
  comments: Comments;
}

export class Offer extends AggregateRoot<OfferProps> {
  get offerId(): OfferId {
    return OfferId.create(this._id).getValue();
  }

  get employerId(): EmployerId {
    return this.props.employerId;
  }

  get title(): OfferTitle {
    return this.props.title;
  }

  get description(): OfferDescription {
    return this.props.description;
  }

  get companyName(): CompanyName {
    return this.props.companyName;
  }

  get companyDescription(): CompanyDescription {
    return this.props.companyDescription;
  }

  get technology(): Technology {
    return this.props.technology;
  }

  get level(): Level {
    return this.props.level;
  }

  get employmentType(): EmploymentType {
    return this.props.employmentType;
  }

  get cityName(): CityName {
    return this.props.cityName;
  }

  get streetName(): StreetName {
    return this.props.streetName;
  }

  get priceMin(): Price {
    return this.props.priceMax;
  }

  get priceMax(): Price {
    return this.props.priceMax;
  }

  get mustHave(): SkillsList {
    return this.props.mustHave;
  }

  get niceToHave(): SkillsList {
    return this.props.niceToHave;
  }

  get latitude(): Coordinate {
    return this.props.latitude;
  }

  get longitude(): Coordinate {
    return this.props.longitude;
  }

  get totalNumComments(): number {
    return this.props.totalNumComments;
  }

  get comments(): Comments {
    return this.props.comments;
  }

  public updateTotalNumberComments(numComments: number): void {
    if (numComments >= 0) {
      this.props.totalNumComments = numComments;
    }
  }

  public hasComments(): boolean {
    return this.totalNumComments !== 0;
  }

  private removeCommentIfExists(comment: Comment): void {
    if (this.props.comments.exists(comment)) {
      this.props.comments.remove(comment);
    }
  }

  public addComment(comment: Comment): Result<void> {
    this.removeCommentIfExists(comment);
    this.props.comments.add(comment);
    this.props.totalNumComments++;
    // todo: domain events
    // this.addDomainEvent(new CommentPosted(this, comment));
    return Result.ok();
  }

  public updateComment(comment: Comment): Result<void> {
    this.removeCommentIfExists(comment);
    this.props.comments.add(comment);
    // todo: domain events
    // this.addDomainEvent(new CommentVotesChanged(this, comment));
    return Result.ok();
  }

  public static isValidTechnology(rawTechnology: string): boolean {
    return technologyList.includes(rawTechnology);
  }

  public static isValidLevel(rawLevel: string): boolean {
    return levelList.includes(rawLevel);
  }

  public static isValidEmploymentType(rawEmploymentType: string): boolean {
    return employmentTypeList.includes(rawEmploymentType);
  }

  private constructor(props: OfferProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: OfferProps, id?: UniqueEntityID): Result<Offer> {
    const guardArgs: IGuardArgument[] = [
      { argument: props.employerId, argumentName: "employerId" },
      { argument: props.title, argumentName: "title" },
      { argument: props.description, argumentName: "description" },
      { argument: props.companyName, argumentName: "companyName" },
      {
        argument: props.companyDescription,
        argumentName: "companyDescription"
      },
      { argument: props.cityName, argumentName: "cityName" },
      { argument: props.streetName, argumentName: "streetName" },
      { argument: props.priceMin, argumentName: "priceMin" },
      { argument: props.priceMax, argumentName: "priceMax" },
      { argument: props.mustHave, argumentName: "mustHave" },
      { argument: props.niceToHave, argumentName: "niceToHave" },
      { argument: props.latitude, argumentName: "latitude" },
      { argument: props.longitude, argumentName: "longitude" }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);

    if (!guardResult.succeeded) {
      return Result.fail(guardResult.message!);
    }

    if (!this.isValidTechnology(props.technology)) {
      return Result.fail("Invalid technology type");
    }

    if (!this.isValidLevel(props.level)) {
      return Result.fail("Invalid level type");
    }

    if (!this.isValidEmploymentType(props.employmentType)) {
      return Result.fail("Invalid employment type");
    }

    const defaultValues: OfferProps = {
      ...props,
      comments: props.comments ?? Comments.create([]),
      totalNumComments: props.totalNumComments ?? 0
    };

    const offer = new Offer(defaultValues, id);

    const isNewOffer = !!id;
    if (isNewOffer) {
      // todo: domain events
      // offer.addDomainEvent(new OfferCreated(offer));
    }

    return Result.ok(offer);
  }
}
